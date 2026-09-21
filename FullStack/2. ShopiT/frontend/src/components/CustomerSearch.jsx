import React from 'react';

const CustomerSearch = ({ searchTerm, onSearchChange }) => {
  return (
    <div className="relative">
      <input
        type="text"
        placeholder="Search customer by name or phone..."
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      {searchTerm && (
        <button
          onClick={() => onSearchChange('')}
          className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600 text-sm font-semibold"
        >
          Clear
        </button>
      )}
    </div>
  );
};

export default CustomerSearch;
