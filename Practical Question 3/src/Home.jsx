import { useStudent } from "./context/StudentContext";

export default function Home() {
  const student = useStudent();

  return (
    <div className="max-w-4xl mx-auto mt-10">
      <div className="bg-white shadow-lg rounded-xl p-8">
        <h1 className="text-3xl font-bold text-blue-600 mb-6">
          Student Course Management
        </h1>

        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Welcome, {student.name}
        </h2>

        <div className="space-y-2 text-gray-700">
          <p>
            <span className="font-semibold">Course:</span> {student.course}
          </p>

          <p>
            <span className="font-semibold">College:</span> {student.college}
          </p>
        </div>
      </div>
    </div>
  );
}