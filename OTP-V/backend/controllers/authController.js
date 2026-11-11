// This file contains all the logic for registration, login, OTP handling,
// change password, forgot password, and logout.
// Keeping everything in one file keeps the project easy to follow.

const bcrypt = require("bcryptjs");
const User = require("../models/User");
const OTP = require("../models/OTP");
const generateOtp = require("../utils/generateOtp");
const sendOtpEmail = require("../utils/sendEmail");

const OTP_EXPIRY_MS = 60 * 1000; // 1 minute
const MAX_OTP_ATTEMPTS = 5;
const RESEND_COOLDOWN_MS = 30 * 1000; // 30 seconds
const PASSWORD_MIN_LENGTH = 6;

// Cookie options used whenever we set the login cookie.
// httpOnly -> JavaScript in the browser cannot read this cookie (helps against XSS).
// sameSite: "lax" -> cookie is not sent on most cross-site requests (helps against CSRF).
// secure -> only send the cookie over HTTPS, turned on automatically in production.
// maxAge -> cookie automatically expires after 7 days.
function getCookieOptions() {
  return {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  };
}

// ---------- small helper functions ----------

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// Creates (or replaces) an OTP for a given email + purpose, and emails it.
// `pendingPasswordHash` is only used for the CHANGE_PASSWORD purpose.
async function createAndSendOtp(email, purpose, pendingPasswordHash = null) {
  // Enforce the 30 second resend cooldown on the backend too.
  const recentOtp = await OTP.findOne({ email, purpose }).sort({ createdAt: -1 });
  if (recentOtp) {
    const secondsSinceCreated = (Date.now() - new Date(recentOtp.createdAt).getTime()) / 1000;
    if (secondsSinceCreated < RESEND_COOLDOWN_MS / 1000) {
      return { success: false, message: "Please wait before requesting another OTP." };
    }
  }

  // Invalidate any previous OTPs for this email + purpose.
  await OTP.deleteMany({ email, purpose });

  const otp = generateOtp();
  const expiresAt = new Date(Date.now() + OTP_EXPIRY_MS);

  await OTP.create({
    email,
    otp,
    purpose,
    pendingPasswordHash,
    expiresAt,
    attempts: 0,
    used: false,
  });

  await sendOtpEmail(email, otp);

  return { success: true };
}

// Checks a submitted OTP against the database.
// Returns { valid: true, otpDoc } or { valid: false, message }
async function checkOtp(email, purpose, submittedOtp) {
  const otpDoc = await OTP.findOne({ email, purpose }).sort({ createdAt: -1 });

  if (!otpDoc) {
    return { valid: false, message: "OTP has expired. Please request a new OTP." };
  }

  if (otpDoc.used) {
    return { valid: false, message: "OTP has expired. Please request a new OTP." };
  }

  if (otpDoc.attempts >= MAX_OTP_ATTEMPTS) {
    return { valid: false, message: "Too many incorrect attempts. Please request a new OTP." };
  }

  if (new Date() > new Date(otpDoc.expiresAt)) {
    return { valid: false, message: "OTP has expired. Please request a new OTP." };
  }

  if (otpDoc.otp !== submittedOtp) {
    otpDoc.attempts += 1;
    await otpDoc.save();

    if (otpDoc.attempts >= MAX_OTP_ATTEMPTS) {
      return { valid: false, message: "Too many incorrect attempts. Please request a new OTP." };
    }
    return { valid: false, message: "Invalid OTP. Please try again." };
  }

  return { valid: true, otpDoc };
}

// ---------- Registration ----------

exports.register = async (req, res) => {
  try {
    const { name, email, password, confirmPassword } = req.body;

    if (!name || !email || !password || !confirmPassword) {
      return res.status(400).json({ success: false, message: "All fields are required." });
    }

    if (!isValidEmail(email)) {
      return res.status(400).json({ success: false, message: "Please enter a valid email address." });
    }

    if (password.length < PASSWORD_MIN_LENGTH) {
      return res.status(400).json({
        success: false,
        message: `Password must be at least ${PASSWORD_MIN_LENGTH} characters.`,
      });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ success: false, message: "Passwords do not match." });
    }

    const normalizedEmail = email.toLowerCase().trim();

    const existingUser = await User.findOne({ email: normalizedEmail });
    if (existingUser) {
      return res.status(400).json({ success: false, message: "Email already exists." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({
      name: name.trim(),
      email: normalizedEmail,
      password: hashedPassword,
    });

    res.status(201).json({ success: true, message: "Registration successful." });
  } catch (error) {
    console.error("Register error:", error.message);
    res.status(500).json({ success: false, message: "Something went wrong. Please try again." });
  }
};

// ---------- Login (step 1: email + password) ----------

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, message: "Email and password are required." });
    }

    const normalizedEmail = email.toLowerCase().trim();
    const user = await User.findOne({ email: normalizedEmail });

    if (!user) {
      return res.status(400).json({ success: false, message: "Invalid email or password." });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ success: false, message: "Invalid email or password." });
    }

    const result = await createAndSendOtp(normalizedEmail, "LOGIN");
    if (!result.success) {
      return res.status(429).json({ success: false, message: result.message });
    }

    res.status(200).json({
      success: true,
      message: "OTP sent successfully.",
      email: normalizedEmail,
    });
  } catch (error) {
    console.error("Login error:", error.message);
    res.status(500).json({ success: false, message: "Something went wrong. Please try again." });
  }
};

// ---------- Login (step 2: verify OTP) ----------

exports.verifyLoginOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;

    if (!email || !otp) {
      return res.status(400).json({ success: false, message: "Email and OTP are required." });
    }

    const normalizedEmail = email.toLowerCase().trim();
    const result = await checkOtp(normalizedEmail, "LOGIN", otp);

    if (!result.valid) {
      return res.status(400).json({ success: false, message: result.message });
    }

    // Mark OTP as used so it cannot be reused.
    result.otpDoc.used = true;
    await result.otpDoc.save();

    // Set the login cookie containing the user's email.
    res.cookie("userEmail", normalizedEmail, getCookieOptions());

    res.status(200).json({ success: true, message: "Login successful." });
  } catch (error) {
    console.error("Verify login OTP error:", error.message);
    res.status(500).json({ success: false, message: "Something went wrong. Please try again." });
  }
};

// ---------- Resend login OTP ----------

exports.resendLoginOtp = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ success: false, message: "Email is required." });
    }

    const normalizedEmail = email.toLowerCase().trim();
    const user = await User.findOne({ email: normalizedEmail });
    if (!user) {
      return res.status(400).json({ success: false, message: "Invalid request." });
    }

    const result = await createAndSendOtp(normalizedEmail, "LOGIN");
    if (!result.success) {
      return res.status(429).json({ success: false, message: result.message });
    }

    res.status(200).json({ success: true, message: "OTP resent successfully." });
  } catch (error) {
    console.error("Resend login OTP error:", error.message);
    res.status(500).json({ success: false, message: "Something went wrong. Please try again." });
  }
};

// ---------- Get logged-in user ----------

exports.getMe = async (req, res) => {
  // req.user was attached by the authMiddleware
  res.status(200).json({
    success: true,
    user: {
      name: req.user.name,
      email: req.user.email,
    },
  });
};

// ---------- Forgot password (step 1: request OTP) ----------

exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ success: false, message: "Email is required." });
    }

    const normalizedEmail = email.toLowerCase().trim();
    const user = await User.findOne({ email: normalizedEmail });

    if (!user) {
      return res.status(400).json({ success: false, message: "No account found with this email." });
    }

    const result = await createAndSendOtp(normalizedEmail, "FORGOT_PASSWORD");
    if (!result.success) {
      return res.status(429).json({ success: false, message: result.message });
    }

    res.status(200).json({ success: true, message: "OTP sent successfully.", email: normalizedEmail });
  } catch (error) {
    console.error("Forgot password error:", error.message);
    res.status(500).json({ success: false, message: "Something went wrong. Please try again." });
  }
};

// ---------- Forgot password (step 2: verify OTP) ----------

exports.verifyForgotPasswordOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;
    if (!email || !otp) {
      return res.status(400).json({ success: false, message: "Email and OTP are required." });
    }

    const normalizedEmail = email.toLowerCase().trim();
    const result = await checkOtp(normalizedEmail, "FORGOT_PASSWORD", otp);

    if (!result.valid) {
      return res.status(400).json({ success: false, message: result.message });
    }

    // Mark the OTP as "verified" (but not yet fully used) so the
    // reset-password step knows this email proved ownership of the OTP.
    // We reuse the `used` flag together with a short verification window.
    result.otpDoc.used = true;
    await result.otpDoc.save();

    res.status(200).json({ success: true, message: "OTP verified successfully." });
  } catch (error) {
    console.error("Verify forgot password OTP error:", error.message);
    res.status(500).json({ success: false, message: "Something went wrong. Please try again." });
  }
};

// ---------- Resend forgot-password OTP ----------

exports.resendForgotPasswordOtp = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ success: false, message: "Email is required." });
    }

    const normalizedEmail = email.toLowerCase().trim();
    const user = await User.findOne({ email: normalizedEmail });
    if (!user) {
      return res.status(400).json({ success: false, message: "Invalid request." });
    }

    const result = await createAndSendOtp(normalizedEmail, "FORGOT_PASSWORD");
    if (!result.success) {
      return res.status(429).json({ success: false, message: result.message });
    }

    res.status(200).json({ success: true, message: "OTP resent successfully." });
  } catch (error) {
    console.error("Resend forgot password OTP error:", error.message);
    res.status(500).json({ success: false, message: "Something went wrong. Please try again." });
  }
};

// ---------- Forgot password (step 3: set new password) ----------

exports.resetPassword = async (req, res) => {
  try {
    const { email, newPassword, confirmPassword } = req.body;

    if (!email || !newPassword || !confirmPassword) {
      return res.status(400).json({ success: false, message: "All fields are required." });
    }

    if (newPassword.length < PASSWORD_MIN_LENGTH) {
      return res.status(400).json({
        success: false,
        message: `Password must be at least ${PASSWORD_MIN_LENGTH} characters.`,
      });
    }

    if (newPassword !== confirmPassword) {
      return res.status(400).json({ success: false, message: "Passwords do not match." });
    }

    const normalizedEmail = email.toLowerCase().trim();

    // Make sure there is a verified (used) FORGOT_PASSWORD OTP for this
    // email that has not expired - this proves the user completed OTP
    // verification before we allow the password to change.
    const otpDoc = await OTP.findOne({
      email: normalizedEmail,
      purpose: "FORGOT_PASSWORD",
      used: true,
    }).sort({ createdAt: -1 });

    if (!otpDoc || new Date() > new Date(otpDoc.expiresAt)) {
      return res.status(400).json({
        success: false,
        message: "Invalid or expired session. Please verify OTP again.",
      });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    const user = await User.findOneAndUpdate(
      { email: normalizedEmail },
      { password: hashedPassword }
    );

    if (!user) {
      return res.status(400).json({ success: false, message: "No account found with this email." });
    }

    // Clean up the OTP so it cannot be used again.
    await OTP.deleteMany({ email: normalizedEmail, purpose: "FORGOT_PASSWORD" });

    res.status(200).json({ success: true, message: "Password changed successfully." });
  } catch (error) {
    console.error("Reset password error:", error.message);
    res.status(500).json({ success: false, message: "Something went wrong. Please try again." });
  }
};

// ---------- Change password (step 1: request OTP, must be logged in) ----------

exports.changePassword = async (req, res) => {
  try {
    const { newPassword, confirmPassword } = req.body;
    const email = req.user.email; // comes from authMiddleware via the cookie

    if (!newPassword || !confirmPassword) {
      return res.status(400).json({ success: false, message: "All fields are required." });
    }

    if (newPassword.length < PASSWORD_MIN_LENGTH) {
      return res.status(400).json({
        success: false,
        message: `Password must be at least ${PASSWORD_MIN_LENGTH} characters.`,
      });
    }

    if (newPassword !== confirmPassword) {
      return res.status(400).json({ success: false, message: "Passwords do not match." });
    }

    // Hash the new password now, but do NOT save it to the user yet.
    // It is only stored temporarily on the OTP document, and only becomes
    // permanent once the OTP is verified.
    const pendingPasswordHash = await bcrypt.hash(newPassword, 10);

    const result = await createAndSendOtp(email, "CHANGE_PASSWORD", pendingPasswordHash);
    if (!result.success) {
      return res.status(429).json({ success: false, message: result.message });
    }

    res.status(200).json({ success: true, message: "OTP sent successfully.", email });
  } catch (error) {
    console.error("Change password error:", error.message);
    res.status(500).json({ success: false, message: "Something went wrong. Please try again." });
  }
};

// ---------- Change password (step 2: verify OTP + apply new password) ----------

exports.verifyChangePasswordOtp = async (req, res) => {
  try {
    const { otp } = req.body;
    const email = req.user.email;

    if (!otp) {
      return res.status(400).json({ success: false, message: "OTP is required." });
    }

    const result = await checkOtp(email, "CHANGE_PASSWORD", otp);
    if (!result.valid) {
      return res.status(400).json({ success: false, message: result.message });
    }

    if (!result.otpDoc.pendingPasswordHash) {
      return res.status(400).json({
        success: false,
        message: "Invalid or expired session. Please try again.",
      });
    }

    // Now that the OTP is verified, make the new password permanent.
    await User.findOneAndUpdate({ email }, { password: result.otpDoc.pendingPasswordHash });

    result.otpDoc.used = true;
    await result.otpDoc.save();
    await OTP.deleteMany({ email, purpose: "CHANGE_PASSWORD" });

    res.status(200).json({ success: true, message: "Password changed successfully." });
  } catch (error) {
    console.error("Verify change password OTP error:", error.message);
    res.status(500).json({ success: false, message: "Something went wrong. Please try again." });
  }
};

// ---------- Resend change-password OTP ----------

exports.resendChangePasswordOtp = async (req, res) => {
  try {
    const email = req.user.email;

    // Find the pending password hash from the most recent CHANGE_PASSWORD OTP.
    const previousOtp = await OTP.findOne({ email, purpose: "CHANGE_PASSWORD" }).sort({
      createdAt: -1,
    });

    if (!previousOtp || !previousOtp.pendingPasswordHash) {
      return res.status(400).json({
        success: false,
        message: "Invalid or expired session. Please start the change password process again.",
      });
    }

    const result = await createAndSendOtp(email, "CHANGE_PASSWORD", previousOtp.pendingPasswordHash);
    if (!result.success) {
      return res.status(429).json({ success: false, message: result.message });
    }

    res.status(200).json({ success: true, message: "OTP resent successfully." });
  } catch (error) {
    console.error("Resend change password OTP error:", error.message);
    res.status(500).json({ success: false, message: "Something went wrong. Please try again." });
  }
};

// ---------- Logout ----------

exports.logout = async (req, res) => {
  res.clearCookie("userEmail", getCookieOptions());
  res.status(200).json({ success: true, message: "Logout successful." });
};
