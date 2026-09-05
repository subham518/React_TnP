import { BrowserRouter, Route, Routes, useParams } from "react-router-dom";

import NavBar from "./components/NavBar";
import { StudentProvider } from "./context/StudentContext";
import Home from "./Home";
import Courses from "./Courses";

function CourseDetails() {
  const { id } = useParams();

  const courses = {
    101: "BCA",
    102: "B.Sc Computer Science"
  };

  return (
    <div className="max-w-4xl mx-auto mt-10">
      <div className="bg-white shadow-lg rounded-xl p-8">
        <h1 className="text-3xl font-bold text-purple-600 mb-6">
          Course Details
        </h1>

        <div className="bg-gray-100 rounded-lg p-5">
          <p className="text-gray-700 mb-3">
            <span className="font-semibold">Course ID:</span> {id}
          </p>
          <p className="text-gray-700">
            <span className="font-semibold">Course Name:</span>{" "}
            {courses[id] || "Course Not Found"}
          </p>
        </div>
      </div>
    </div>
  );
}

function About() {
  return (
    <div className="max-w-4xl mx-auto mt-10">
      <div className="bg-white shadow-lg rounded-xl p-8">
        <h1 className="text-3xl font-bold text-blue-600 mb-6">About</h1>

        <p className="text-gray-700 leading-relaxed">
          This is a Student Course Management Application developed using React,
          React Router, Context API, functional components, JSX, and Tailwind CSS.
        </p>
      </div>
    </div>
  );
}

function App() {
  return (
    <StudentProvider>
      <BrowserRouter>
        <div className="min-h-screen bg-gray-100">
          <NavBar />

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/course/:id" element={<CourseDetails />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </div>
      </BrowserRouter>
    </StudentProvider>
  );
}

export default App;