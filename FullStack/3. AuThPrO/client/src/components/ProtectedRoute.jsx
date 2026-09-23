import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import api from "../api/axios";

// The cookie is httpOnly, so React cannot read it directly.
// Instead we ask the backend (GET /auth/me). If the cookie is valid
// the backend answers OK, otherwise we send the user to /login.
function ProtectedRoute({ children }) {
  const [status, setStatus] = useState("checking"); // checking | allowed | denied

  useEffect(() => {
    api
      .get("/auth/me")
      .then(() => setStatus("allowed"))
      .catch(() => setStatus("denied"));
  }, []);

  if (status === "checking") {
    return <p className="max-w-md mx-auto p-6">Checking login...</p>;
  }

  if (status === "denied") {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default ProtectedRoute;
