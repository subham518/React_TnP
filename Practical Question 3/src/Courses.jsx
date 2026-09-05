import { Link } from "react-router-dom";

export default function Courses() {
  return (
    <div className="max-w-4xl mx-auto mt-10">
      <div className="bg-white shadow-lg rounded-xl p-8">
        <h1 className="text-3xl font-bold text-blue-600 mb-6">Courses</h1>

        <div className="space-y-4">
          <Link
            to="/course/101"
            className="block bg-blue-100 hover:bg-blue-200 p-4 rounded-lg text-blue-700 font-semibold"
          >
            BCA - Course ID 101
          </Link>

          <Link
            to="/course/102"
            className="block bg-green-100 hover:bg-green-200 p-4 rounded-lg text-green-700 font-semibold"
          >
            B.Sc Computer Science - Course ID 102
          </Link>
        </div>
      </div>
    </div>
  );
}