import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import DashboardLayout from "../../../layouts/DashboardLayout";
import InternshipCertificate from "../components/certificate/InternshipCertificate";

import { ArrowLeft } from "lucide-react";

// import html2canvas from "html2canvas";
// import jsPDF from "jspdf";

import { getMyCertificate } from "../../../api/certificate.api";
import type { CertificateData } from "../../../types/certificate";

export default function InternshipCertificatePage() {
  const navigate = useNavigate();

  const [certificate, setCertificate] =
    useState<CertificateData | null>(null);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCertificate = async () => {
      try {
        const response = await getMyCertificate();

        const data = response.data;
        console.log("API Response:", response);

console.log("Certificate:", data);

console.log("startDate =", data.startDate);

console.log("endDate =", data.endDate);

console.log("issueDate =", data.issueDate);

        setCertificate({
          id: data._id,
          type: data.certificateType.toLowerCase(),

          studentName: data.studentName,
          email: data.email,
          certificateId: data.certificateId,

          organization: data.organization,
          course: data.course,
          role: data.role,

          issueDate: new Date(data.issueDate).toLocaleDateString(
            "en-GB",
            {
              day: "2-digit",
              month: "long",
              year: "numeric",
            }
          ),

          startDate: new Date(data.startDate).toLocaleDateString(
            "en-GB",
            {
              day: "2-digit",
              month: "short",
              year: "numeric",
            }
          ),

          endDate: new Date(data.endDate).toLocaleDateString(
            "en-GB",
            {
              day: "2-digit",
              month: "short",
              year: "numeric",
            }
          ),

          mentor: data.mentor,
          director: data.director,

          qrCode: data.qrCode || "/qr.png",
          status: data.status,
        });
      } catch (err: any) {
        setError(
          err.response?.data?.message ||
            "No Certificate Found"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchCertificate();
  }, []);

  // const downloadCertificate = async () => {
  //   const certificateElement =
  //     document.getElementById("certificate");

  //   if (!certificateElement || !certificate) return;

  //   const canvas = await html2canvas(certificateElement, {
  //     scale: 3,
  //     useCORS: true,
  //     backgroundColor: "#ffffff",
  //   });

  //   const imgData = canvas.toDataURL("image/png");

  //   const pdf = new jsPDF({
  //     orientation: "landscape",
  //     unit: "mm",
  //     format: "a4",
  //   });

  //   const pdfWidth =
  //     pdf.internal.pageSize.getWidth();

  //   const pdfHeight =
  //     pdf.internal.pageSize.getHeight();

  //   pdf.addImage(
  //     imgData,
  //     "PNG",
  //     0,
  //     0,
  //     pdfWidth,
  //     pdfHeight
  //   );

  //   pdf.save(
  //     `${certificate.studentName}-Internship-Certificate.pdf`
  //   );
  // };

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex justify-center items-center h-screen">
          <h2 className="text-2xl font-semibold">
            Loading Certificate...
          </h2>
        </div>
      </DashboardLayout>
    );
  }

  if (error) {
    return (
      <DashboardLayout>
        <div className="flex justify-center items-center h-screen">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-red-600">
              No Certificate Found
            </h1>

            <p className="mt-4 text-gray-500">
              {error}
            </p>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  if (!certificate) {
    return null;
  }

  return (
    <DashboardLayout>
      <div className="bg-slate-100 min-h-screen -m-6 p-8">

        {/* Header */}

        <div className="bg-white rounded-3xl shadow-sm border p-8 flex justify-between items-center">

          <div>

            <button
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 text-red-600 hover:text-red-700 mb-4 transition"
            >
              <ArrowLeft size={18} />
              Back
            </button>

            <h1 className="text-4xl font-bold">
              Internship Certificate
            </h1>

            <p className="text-gray-500 mt-2">
              View your internship completion certificate, soon you can download it as a PDF.
            </p>

          </div>

          {/* <button
            onClick={downloadCertificate}
            className="bg-red-600 hover:bg-red-700 text-white px-7 py-3 rounded-xl flex items-center gap-3 transition"
          >
            <Download size={20} />
            Download PDF
          </button> */}

        </div>

        {/* Certificate */}

        <div className="mt-8 bg-white rounded-3xl shadow-lg border p-6 overflow-x-auto overflow-y-hidden">

          <div
            className="flex justify-center"
            style={{ minWidth: "1200px" }}
          >

            <InternshipCertificate
              certificate={certificate}
            />

          </div>

        </div>

      </div>
    </DashboardLayout>
  );
}