import { Link, useNavigate } from "react-router-dom";
import api from "../api/axios";

function Home() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await api.post("/auth/logout"); // backend clears the cookie
    } catch (err) {
      console.log(err);
    }
    navigate("/login");
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded space-y-4">
      <h1 className="text-xl font-bold">Welcome to AuThPrO</h1>
      <p>You are logged in.</p>

      <div className="space-x-4">
        <Link to="/user-details" className="inline-block px-4 py-2 border rounded">
          View User Details
        </Link>

        <button onClick={handleLogout} className="px-4 py-2 border rounded">
          Logout
        </button>
      </div>
    </div>
  );
}

export default Home;
