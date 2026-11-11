// Wraps pages that require the user to be logged in.
// Checks the /me endpoint (which relies on the login cookie).
// If the user is not authenticated, redirect them to /login.

import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { getMe } from "../api/authApi";
import Loading from "./Loading";

export default function ProtectedRoute({ children }) {
  const [checking, setChecking] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    async function checkAuth() {
      try {
        await getMe();
        setIsAuthenticated(true);
      } catch (error) {
        setIsAuthenticated(false);
      } finally {
        setChecking(false);
      }
    }
    checkAuth();
  }, []);

  if (checking) {
    return <Loading />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
