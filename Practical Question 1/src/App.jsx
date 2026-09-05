import React from "react";
import Student from "./Student";

function App() {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Student Profiles
        </h1>

        <Student
          name="Rahul"
          course="BCA"
          college="ABC College"
        />

        <Student
          name="Priya"
          course="B.Sc Computer Science"
          college="XYZ College"
        />
      </div>
    </div>
  );
}

export default App;