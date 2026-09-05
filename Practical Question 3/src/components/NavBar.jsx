import { Link } from "react-router-dom";

const navItems = [
  { to: "/", label: "Home" },
  { to: "/courses", label: "Courses" },
  { to: "/about", label: "About" }
];

export default function NavBar() {
  return (
    <nav className="bg-blue-600 shadow-md">
      <div className="max-w-6xl mx-auto px-6 py-4">
        <div className="flex flex-wrap items-center gap-6">
          <h2 className="text-white text-xl font-bold mr-auto">
            Student Management
          </h2>

          {navItems.map(({ to, label }) => (
            <Link
              key={to}
              to={to}
              className="text-white hover:text-yellow-300 font-semibold"
            >
              {label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
