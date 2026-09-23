const User = require("../models/User");

// Same options are used when setting AND clearing the cookie.
// (clearCookie only works if the options match.)
const cookieOptions = {
  httpOnly: true, // JavaScript in the browser cannot read this cookie
  sameSite: "lax", // fine for localhost (5173 -> 5000 is the same "site")
  secure: false, // false because local development uses http, not https
};

// POST /api/auth/register
const register = async (req, res) => {
  try {
    const { name, email, password, phone } = req.body;

    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ message: "Name, email and password are required" });
    }

    const lowerEmail = email.toLowerCase().trim();

    const existingUser = await User.findOne({ email: lowerEmail });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }

    // No hashing - password is stored as plain text (learning project only)
    await User.create({ name, email: lowerEmail, password, phone });

    // We do NOT log the user in here. They must login manually.
    res.status(201).json({ message: "Registration successful. Please login." });
  } catch (error) {
    // 11000 = MongoDB duplicate key error (unique email)
    if (error.code === 11000) {
      return res.status(400).json({ message: "Email already exists" });
    }
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};

// POST /api/auth/login
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    const user = await User.findOne({ email: email.toLowerCase().trim() });

    if (!user || user.password !== password) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Create the cookie that holds the user's email
    res.cookie("email", user.email, {
      ...cookieOptions,
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    });

    res.json({ message: "Login successful" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};

// POST /api/auth/logout
const logout = (req, res) => {
  res.clearCookie("email", cookieOptions);
  res.json({ message: "Logged out" });
};

// GET /api/auth/me  (protected by authMiddleware)
const getMe = async (req, res) => {
  try {
    // req.user was set by authMiddleware (it is the email from the cookie)
    const user = await User.findOne({ email: req.user });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Send only these fields - the password is NEVER sent back
    res.json({
      name: user.name,
      email: user.email,
      phone: user.phone || "",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { register, login, logout, getMe };
