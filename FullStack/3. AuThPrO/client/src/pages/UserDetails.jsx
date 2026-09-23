import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/axios";

function UserDetails() {
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // The cookie is sent automatically. The backend reads the email from it.
    api
      .get("/auth/me")
      .then((res) => setUser(res.data))
      .catch((err) => {
        if (err.response?.status === 401) {
          navigate("/login"); // cookie missing -> back to login
        } else {
          setError(err.response?.data?.message || "Something went wrong");
        }
      });
  }, []);

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded space-y-4">
      <h1 className="text-xl font-bold">User Details</h1>

      {error && <p className="text-red-600">{error}</p>}
      {!user && !error && <p>Loading...</p>}

      {user && (
        <div className="space-y-2">
          <p>
            <span className="font-bold">Name:</span> {user.name}
          </p>
          <p>
            <span className="font-bold">Email:</span> {user.email}
          </p>
          <p>
            <span className="font-bold">Phone:</span> {user.phone || "Not provided"}
          </p>
        </div>
      )}

      <Link to="/home" className="inline-block text-blue-600 underline">
        Back to Home
      </Link>
    </div>
  );
}

export default UserDetails;
