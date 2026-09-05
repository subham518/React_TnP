import React from "react";

function Student({ name, course, college }) {
  return (
    <div className="bg-white shadow-md rounded-lg p-6 mb-4 border border-gray-200">
      <h2 className="text-xl font-bold text-blue-600 mb-4">
        Student Profile
      </h2>

      <p className="text-gray-700 mb-2">
        <span className="font-semibold">Name:</span> {name}
      </p>

      <p className="text-gray-700 mb-2">
        <span className="font-semibold">Course:</span> {course}
      </p>

      <p className="text-gray-700">
        <span className="font-semibold">College:</span> {college}
      </p>
    </div>
  );
}

export default Student;