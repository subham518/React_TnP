// Simple cookie-based authentication middleware.
// This project does NOT use JWT - it just stores the user's email
// in a cookie after a successful login, and this middleware reads it back.

const User = require("../models/User");

async function protectRoute(req, res, next) {
  try {
    // Read the email from the cookie (set during login).
    const email = req.cookies.userEmail;

    if (!email) {
      return res.status(401).json({
        success: false,
        message: "Invalid or expired session.",
      });
    }

    // Look up the user so we know they still exist.
    const user = await User.findOne({ email }).select("-password");

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid or expired session.",
      });
    }

    // Attach the user to the request so later route handlers can use it.
    req.user = user;
    next();
  } catch (error) {
    console.error("Auth middleware error:", error.message);
    res.status(500).json({
      success: false,
      message: "Something went wrong. Please try again.",
    });
  }
}

module.exports = protectRoute;
