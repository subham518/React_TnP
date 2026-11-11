// Reusable OTP verification page.
// Used for three different purposes: LOGIN, FORGOT_PASSWORD, CHANGE_PASSWORD.
// Which purpose we're handling comes from the router state (location.state).

import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import OtpInput from "../components/OtpInput";
import {
  verifyLoginOtp,
  resendLoginOtp,
  verifyForgotPasswordOtp,
  resendForgotPasswordOtp,
  verifyChangePasswordOtp,
  resendChangePasswordOtp,
} from "../api/authApi";

const OTP_SECONDS = 60;
const RESEND_COOLDOWN_SECONDS = 30;

export default function VerifyOtp() {
  const location = useLocation();
  const navigate = useNavigate();

  const email = location.state?.email;
  const purpose = location.state?.purpose;

  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [info, setInfo] = useState("");
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(OTP_SECONDS);
  const [resendCooldown, setResendCooldown] = useState(RESEND_COOLDOWN_SECONDS);

  // If someone lands here directly without going through login/forgot-password
  // (no purpose in state), send them back to a sensible starting page.
  useEffect(() => {
    if (!purpose) {
      navigate("/login", { replace: true });
    }
  }, [purpose, navigate]);

  // OTP expiry countdown - this is only for DISPLAY.
  // The backend always independently checks the real expiry timestamp.
  useEffect(() => {
    if (secondsLeft <= 0) return;
    const timer = setInterval(() => {
      setSecondsLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, [secondsLeft]);

  // Resend cooldown countdown.
  useEffect(() => {
    if (resendCooldown <= 0) return;
    const timer = setInterval(() => {
      setResendCooldown((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, [resendCooldown]);

  function formatTime(totalSeconds) {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  }

  async function handleVerify(e) {
    e.preventDefault();
    setError("");
    setInfo("");

    if (otp.length !== 6) {
      setError("OTP must contain 6 digits.");
      return;
    }

    if (secondsLeft <= 0) {
      setError("OTP has expired. Please request a new OTP.");
      return;
    }

    setLoading(true);
    try {
      if (purpose === "LOGIN") {
        await verifyLoginOtp({ email, otp });
        navigate("/details");
      } else if (purpose === "FORGOT_PASSWORD") {
        await verifyForgotPasswordOtp({ email, otp });
        navigate("/reset-password", { state: { email } });
      } else if (purpose === "CHANGE_PASSWORD") {
        await verifyChangePasswordOtp({ otp });
        navigate("/details", { state: { message: "Password changed successfully." } });
      }
    } catch (err) {
      setError(err.response?.data?.message || "Invalid OTP. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  async function handleResend() {
    setError("");
    setInfo("");
    setResending(true);
    try {
      if (purpose === "LOGIN") {
        await resendLoginOtp({ email });
      } else if (purpose === "FORGOT_PASSWORD") {
        await resendForgotPasswordOtp({ email });
      } else if (purpose === "CHANGE_PASSWORD") {
        await resendChangePasswordOtp();
      }
      setInfo("OTP resent successfully.");
      setOtp("");
      setSecondsLeft(OTP_SECONDS);
      setResendCooldown(RESEND_COOLDOWN_SECONDS);
    } catch (err) {
      setError(err.response?.data?.message || "Please wait before requesting another OTP.");
    } finally {
      setResending(false);
    }
  }

  if (!purpose) {
    return null;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-sm bg-white rounded-xl shadow-md p-6 text-center">
        <h1 className="text-xl font-semibold text-gray-800 mb-1">Verify Your Email</h1>
        <p className="text-sm text-gray-500 mb-1">We sent a 6-digit OTP to:</p>
        <p className="text-sm font-medium text-gray-800 mb-5">{email}</p>

        {error && (
          <div className="mb-4 text-sm text-red-700 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
            {error}
          </div>
        )}
        {info && (
          <div className="mb-4 text-sm text-green-700 bg-green-50 border border-green-200 rounded-lg px-3 py-2">
            {info}
          </div>
        )}

        <form onSubmit={handleVerify} className="space-y-5">
          <OtpInput value={otp} onChange={setOtp} />

          <p className="text-sm text-gray-500">
            {secondsLeft > 0 ? (
              <>OTP expires in: {formatTime(secondsLeft)}</>
            ) : (
              <span className="text-red-600">OTP has expired.</span>
            )}
          </p>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white text-sm font-medium py-2.5 rounded-lg transition"
          >
            {loading ? "Verifying..." : "Verify OTP"}
          </button>
        </form>

        <div className="mt-4">
          {resendCooldown > 0 ? (
            <p className="text-xs text-gray-400">Resend OTP in {resendCooldown} seconds</p>
          ) : (
            <button
              onClick={handleResend}
              disabled={resending}
              className="text-sm text-blue-600 font-medium disabled:opacity-60"
            >
              {resending ? "Resending..." : "Resend OTP"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
