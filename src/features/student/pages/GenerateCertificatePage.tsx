import DashboardLayout from "../../../layouts/DashboardLayout";
import { Award, GraduationCap } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function GenerateCertificatePage() {
  const navigate = useNavigate();

  return (
    <DashboardLayout>
      <div className="space-y-10">

        {/* Header */}

        <div>
          <h1 className="text-4xl font-bold">
            My Certificates
          </h1>

          <p className="text-gray-500 mt-2">
            View and download your issued certificates.
          </p>
        </div>

        {/* Cards */}

        <div className="grid md:grid-cols-2 gap-8">

          {/* Internship */}

          <div className="bg-white rounded-3xl border p-8 hover:border-red-500 hover:shadow-xl transition">

            <Award
              className="text-red-500"
              size={55}
            />

            <h2 className="text-2xl font-bold mt-6">
              Internship Certificate
            </h2>

            <p className="text-gray-500 mt-3 leading-7">
              View and download your internship completion certificate.
            </p>

            <button
              onClick={() =>
                navigate("/student/certificates/internship")
              }
              className="mt-8 bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-xl transition"
            >
              View Certificate
            </button>

          </div>

          {/* Training */}

          <div className="bg-white rounded-3xl border p-8 hover:border-blue-500 hover:shadow-xl transition">

            <GraduationCap
              className="text-blue-600"
              size={55}
            />

            <h2 className="text-2xl font-bold mt-6">
              Training Certificate
            </h2>

            <p className="text-gray-500 mt-3 leading-7">
              View and download your training completion certificate.
            </p>

            <button
              onClick={() =>
                navigate("/student/certificates/training")
              }
              className="mt-8 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl transition"
            >
              View Certificate
            </button>

          </div>

        </div>

      </div>
    </DashboardLayout>
  );
}