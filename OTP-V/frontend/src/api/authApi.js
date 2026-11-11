// Simple Axios setup for talking to the backend auth API.
// Kept beginner-friendly - just one axios instance and one function per endpoint.

import axios from "axios";

const API_BASE_URL = "http://localhost:5000/api/auth";

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true, // important: allows the login cookie to be sent/received
});

// ---------- Registration & Login ----------

export const registerUser = (data) => api.post("/register", data);

export const loginUser = (data) => api.post("/login", data);

export const verifyLoginOtp = (data) => api.post("/verify-login-otp", data);

export const resendLoginOtp = (data) => api.post("/resend-login-otp", data);

// ---------- Current user ----------

export const getMe = () => api.get("/me");

// ---------- Forgot password ----------

export const forgotPassword = (data) => api.post("/forgot-password", data);

export const verifyForgotPasswordOtp = (data) => api.post("/verify-forgot-password-otp", data);

export const resendForgotPasswordOtp = (data) => api.post("/resend-forgot-password-otp", data);

export const resetPassword = (data) => api.post("/reset-password", data);

// ---------- Change password ----------

export const changePassword = (data) => api.post("/change-password", data);

export const verifyChangePasswordOtp = (data) => api.post("/verify-change-password-otp", data);

export const resendChangePasswordOtp = (data) => api.post("/resend-change-password-otp", data);

// ---------- Logout ----------

export const logoutUser = () => api.post("/logout");

export default api;
