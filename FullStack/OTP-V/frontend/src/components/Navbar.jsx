// Simple top navigation bar showing the OTP-V brand.

import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="w-full border-b border-gray-200 bg-white">
      <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="text-lg font-semibold text-gray-800">
          OTP<span className="text-blue-600">-V</span>
        </Link>
      </div>
    </nav>
  );
}
