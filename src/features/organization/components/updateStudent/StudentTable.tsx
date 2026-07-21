import { Pencil, Trash2, Eye } from "lucide-react";

const students = [
  {
    id: "VT-1001",
    name: "Rahul Sharma",
    email: "rahul@gmail.com",
    course: "Internship",
    status: "Verified",
  },
  {
    id: "VT-1002",
    name: "Aman Singh",
    email: "aman@gmail.com",
    course: "Training",
    status: "Pending",
  },
];

export default function StudentTable() {
  return (
    <section className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm">
      <div className="border-b border-gray-100 p-6">
        <h2 className="text-2xl font-bold text-gray-900">
          Student Records
        </h2>

        <p className="mt-2 text-gray-500">
          Search, review and manage uploaded students.
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead className="bg-gray-50">
            <tr className="text-left">
              <th className="px-6 py-4">Student</th>
              <th className="px-6 py-4">Email</th>
              <th className="px-6 py-4">Course</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">Actions</th>
            </tr>
          </thead>

          <tbody>
            {students.map((student) => (
              <tr
                key={student.id}
                className="border-t border-gray-100 hover:bg-gray-50"
              >
                <td className="px-6 py-5">
                  <div>
                    <div className="font-semibold">
                      {student.name}
                    </div>

                    <div className="text-sm text-gray-500">
                      {student.id}
                    </div>
                  </div>
                </td>

                <td className="px-6 py-5">{student.email}</td>

                <td className="px-6 py-5">{student.course}</td>

                <td className="px-6 py-5">
                  <span className="rounded-full bg-green-100 px-3 py-1 text-sm text-green-700">
                    {student.status}
                  </span>
                </td>

                <td className="px-6 py-5">
                  <div className="flex gap-3">
                    <button className="rounded-xl bg-blue-50 p-2 text-blue-600 hover:bg-blue-100">
                      <Eye size={18} />
                    </button>

                    <button className="rounded-xl bg-yellow-50 p-2 text-yellow-600 hover:bg-yellow-100">
                      <Pencil size={18} />
                    </button>

                    <button className="rounded-xl bg-red-50 p-2 text-red-600 hover:bg-red-100">
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}