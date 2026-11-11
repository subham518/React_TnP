// All authentication-related routes live here.

const express = require("express");
const router = express.Router();

const {
  register,
  login,
  verifyLoginOtp,
  resendLoginOtp,
  getMe,
  forgotPassword,
  verifyForgotPasswordOtp,
  resendForgotPasswordOtp,
  resetPassword,
  changePassword,
  verifyChangePasswordOtp,
  resendChangePasswordOtp,
  logout,
} = require("../controllers/authController");

const protectRoute = require("../middleware/authMiddleware");

// Registration
router.post("/register", register);

// Login (email + password, then OTP)
router.post("/login", login);
router.post("/verify-login-otp", verifyLoginOtp);
router.post("/resend-login-otp", resendLoginOtp);

// Current logged-in user (protected)
router.get("/me", protectRoute, getMe);

// Forgot password (no login required)
router.post("/forgot-password", forgotPassword);
router.post("/verify-forgot-password-otp", verifyForgotPasswordOtp);
router.post("/resend-forgot-password-otp", resendForgotPasswordOtp);
router.post("/reset-password", resetPassword);

// Change password (login required)
router.post("/change-password", protectRoute, changePassword);
router.post("/verify-change-password-otp", protectRoute, verifyChangePasswordOtp);
router.post("/resend-change-password-otp", protectRoute, resendChangePasswordOtp);

// Logout
router.post("/logout", logout);

module.exports = router;
