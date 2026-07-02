import DashboardLayout from "../../../layouts/DashboardLayout";
import TrainingCertificate from "../components/certificate/TrainingCertificate";

import { ArrowLeft, Download } from "lucide-react";
import { useNavigate } from "react-router-dom";

import html2canvas from "html2canvas";
import jsPDF from "jspdf";

import { trainingCertificateMock } from "../../../mocks/certificate.mock";

export default function TrainingCertificatePage() {
  const navigate = useNavigate();

  const downloadCertificate = async () => {
    const certificateElement = document.getElementById("certificate");

    if (!certificateElement) return;

    const canvas = await html2canvas(certificateElement, {
      scale: 3,
      useCORS: true,
      backgroundColor: "#ffffff",
    });

    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF({
      orientation: "landscape",
      unit: "mm",
      format: "a4",
    });

    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();

    pdf.addImage(
      imgData,
      "PNG",
      0,
      0,
      pdfWidth,
      pdfHeight
    );

    pdf.save(
      `${trainingCertificateMock.studentName}-Training-Certificate.pdf`
    );
  };

  return (
    <DashboardLayout>
      <div className="bg-slate-100 min-h-screen -m-6 p-8">

        {/* Header */}

        <div className="bg-white rounded-3xl shadow-sm border p-8 flex justify-between items-center">

          <div>

            <button
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-4 transition"
            >
              <ArrowLeft size={18} />
              Back
            </button>

            <h1 className="text-4xl font-bold">
              Training Certificate
            </h1>

            <p className="text-gray-500 mt-2">
              View and download your training completion certificate.
            </p>

          </div>

          <button
            onClick={downloadCertificate}
            className="bg-blue-600 hover:bg-blue-700 text-white px-7 py-3 rounded-xl flex items-center gap-3 transition"
          >
            <Download size={20} />
            Download PDF
          </button>

        </div>

        {/* Certificate Viewer */}

        <div className="mt-8 bg-white rounded-3xl shadow-lg border p-6 overflow-x-auto overflow-y-hidden">

          <div
            className="flex justify-center"
            style={{ minWidth: "1200px" }}
          >

            <TrainingCertificate
              certificate={trainingCertificateMock}
            />

          </div>

        </div>

      </div>
    </DashboardLayout>
  );
}