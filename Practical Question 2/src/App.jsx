import React, { useState } from "react";

function StudentRegistrationForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    course: ""
  });

  const [submittedData, setSubmittedData] = useState(null);


  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value
    });
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmittedData(formData);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="w-full max-w-lg bg-white shadow-lg rounded-xl p-8">

        <h1 className="text-3xl font-bold text-center text-blue-600 mb-8">
          Student Registration Form
        </h1>

        <form onSubmit={handleSubmit}>

          {/* Name */}
          <div className="mb-5">
            <label className="block text-gray-700 font-semibold mb-2">
              Name
            </label>

            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your name"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg
                         focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Email */}
          <div className="mb-5">
            <label className="block text-gray-700 font-semibold mb-2">
              Email
            </label>

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg
                         focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Course */}
          <div className="mb-5">
            <label className="block text-gray-700 font-semibold mb-2">
              Course
            </label>

            <input
              type="text"
              name="course"
              value={formData.course}
              onChange={handleChange}
              placeholder="Enter your course"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg
                         focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg
                       font-semibold hover:bg-blue-700 transition duration-200"
          >
            Register Student
          </button>
        </form>

        {/* Submitted Details */}
        {submittedData && (
          <div className="mt-8 bg-green-50 border border-green-200 rounded-lg p-6">

            <h2 className="text-xl font-bold text-green-700 mb-4">
              Submitted Student Details
            </h2>

            <p className="text-gray-700 mb-2">
              <span className="font-semibold">Name:</span>{" "}
              {submittedData.name}
            </p>

            <p className="text-gray-700 mb-2">
              <span className="font-semibold">Email:</span>{" "}
              {submittedData.email}
            </p>

            <p className="text-gray-700">
              <span className="font-semibold">Course:</span>{" "}
              {submittedData.course}
            </p>

          </div>
        )}

      </div>
    </div>
  );
}

export default StudentRegistrationForm;