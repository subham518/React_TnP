import React from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
  const navLinkClass = ({ isActive }) =>
    `text-sm font-medium transition-colors ${
      isActive
        ? 'text-blue-600 border-b-2 border-blue-600 pb-1'
        : 'text-gray-600 hover:text-gray-900'
    }`;

  return (
    <header className="bg-white border-b border-gray-200">
      <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
        <NavLink to="/dashboard" className="text-xl font-bold text-gray-900 tracking-tight">
          ShopiT
        </NavLink>

        <nav className="flex items-center space-x-6">
          <NavLink to="/dashboard" className={navLinkClass}>
            Dashboard
          </NavLink>
          <NavLink to="/customers" className={navLinkClass}>
            Customers
          </NavLink>
          <NavLink to="/create-bill" className={navLinkClass}>
            Create Bill
          </NavLink>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
