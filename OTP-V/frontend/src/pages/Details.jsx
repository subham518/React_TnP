// Protected profile/details page.
// Shows the logged-in user's info, and lets them change their password or log out.

import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getMe, changePassword, logoutUser } from "../api/authApi";
import Loading from "../components/Loading";

export default function Details() {
  const location = useLocation();
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [loadingUser, setLoadingUser] = useState(true);
  const [message, setMessage] = useState(location.state?.message || "");

  const [showChangeForm, setShowChangeForm] = useState(false);
  const [form, setForm] = useState({ newPassword: "", confirmPassword: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);

  useEffect(() => {
    async function loadUser() {
      try {
        const res = await getMe();
        setUser(res.data.user);
      } catch (err) {
        navigate("/login", { replace: true });
      } finally {
        setLoadingUser(false);
      }
    }
    loadUser();
  }, [navigate]);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleChangePasswordSubmit(e) {
    e.preventDefault();
    setError("");
    setMessage("");

    if (!form.newPassword || !form.confirmPassword) {
      setError("All fields are required.");
      return;
    }
    if (form.newPassword.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }
    if (form.newPassword !== form.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setSubmitting(true);
    try {
      const res = await changePassword(form);
      navigate("/verify-otp", {
        state: { email: res.data.email || user.email, purpose: "CHANGE_PASSWORD" },
      });
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  async function handleLogout() {
    setLoggingOut(true);
    try {
      await logoutUser();
    } catch (err) {
      // even if this fails, still redirect to login
    } finally {
      navigate("/login", { replace: true });
    }
  }

  if (loadingUser) {
    return <Loading />;
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="w-full max-w-sm bg-white rounded-xl shadow-md p-6">
        <h1 className="text-xl font-semibold text-gray-800 mb-5">Your Profile</h1>

        {message && (
          <div className="mb-4 text-sm text-green-700 bg-green-50 border border-green-200 rounded-lg px-3 py-2">
            {message}
          </div>
        )}

        <div className="space-y-3 mb-6">
          <div>
            <p className="text-xs text-gray-400">Name</p>
            <p className="text-sm font-medium text-gray-800">{user?.name}</p>
          </div>
          <div>
            <p className="text-xs text-gray-400">Email</p>
            <p className="text-sm font-medium text-gray-800">{user?.email}</p>
          </div>
        </div>

        {!showChangeForm ? (
          <div className="space-y-3">
            <button
              onClick={() => {
                setShowChangeForm(true);
                setMessage("");
              }}
              className="w-full border border-gray-300 text-gray-700 text-sm font-medium py-2.5 rounded-lg hover:bg-gray-50 transition"
            >
              Change Password
            </button>
            <button
              onClick={handleLogout}
              disabled={loggingOut}
              className="w-full bg-red-600 hover:bg-red-700 disabled:opacity-60 text-white text-sm font-medium py-2.5 rounded-lg transition"
            >
              {loggingOut ? "Logging out..." : "Logout"}
            </button>
          </div>
        ) : (
          <form onSubmit={handleChangePasswordSubmit} className="space-y-4">
            {error && (
              <div className="text-sm text-red-700 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
                {error}
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="newPassword"
                  value={form.newPassword}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 pr-16 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-blue-600"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Confirm New Password</label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  value={form.confirmPassword}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 pr-16 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-blue-600"
                >
                  {showConfirmPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white text-sm font-medium py-2.5 rounded-lg transition"
            >
              {submitting ? "Sending OTP..." : "Submit"}
            </button>

            <button
              type="button"
              onClick={() => {
                setShowChangeForm(false);
                setError("");
                setForm({ newPassword: "", confirmPassword: "" });
              }}
              className="w-full text-gray-500 text-sm py-1"
            >
              Cancel
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
