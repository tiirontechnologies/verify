
import { useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import DashboardLayout from "../../../layouts/DashboardLayout";
import { getMyCertificate } from "../../../api/certificate.api";
import FabricCertificateRenderer from "../components/FabricCertificateRenderer";
import OfferLetterDocument from "../components/OfferLetterDocument";
import DocumentHeader from "../../../components/shared/DocumentHeader";
import { ArrowLeft, AlertCircle, Download, GraduationCap } from "lucide-react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

interface DocumentViewerPageProps {
  forcedType?: string;
}

export default function DocumentViewerPage({
  forcedType,
}: DocumentViewerPageProps) {
  const { certificateId } = useParams<{ certificateId?: string }>();
  const navigate = useNavigate();

  const [documentData, setDocumentData] = useState<any>(null);
  const [templateData, setTemplateData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [noCertificate, setNoCertificate] = useState(false);
  const [downloading, setDownloading] = useState(false);

  const captureRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchDoc = async () => {
      try {
        setLoading(true);
        setError("");
        setNoCertificate(false);
        const response = await getMyCertificate();
        const list = Array.isArray(response.data)
          ? response.data
          : [response.data];
        const validList = list.filter(Boolean);

        let match = null;

        if (certificateId) {
          match = validList.find(
            (c: any) =>
              c._id === certificateId ||
              c.certificateId === certificateId ||
              c.certificateId?.toLowerCase() === certificateId.toLowerCase(),
          );
        }

        if (!match && forcedType) {
          match = validList.find(
            (c: any) =>
              (c.certificateType || "").toLowerCase() ===
              forcedType.toLowerCase(),
          );
        }

        if (!match && validList.length > 0) {
          match = validList[0];
        }

        if (!match) {
          setNoCertificate(true);
          return;
        }

        setDocumentData(match);

        if (match.template?.design?.data) {
          const orientation =
            match.template.orientation ||
            match.template.design?.orientation ||
            match.template.design?.data?.orientation ||
            (match.template.design?.data?.height >
            match.template.design?.data?.width
              ? "portrait"
              : "landscape");

          setTemplateData({
            ...match.template.design.data,
            orientation,
          });
        }
      } catch (err: any) {
        console.error("Failed to load document:", err);
        setError(err?.message || "Failed to load document details.");
      } finally {
        setLoading(false);
      }
    };

    fetchDoc();
  }, [certificateId, forcedType]);

  const getFileName = (ext: string) => {
    const idPart =
      documentData?.certificateId || documentData?._id || "document";
    return `${idPart}.${ext}`;
  };

  const handleDownloadPDF = async () => {
    if (!captureRef.current) return;
    try {
      setDownloading(true);
      const canvas = await html2canvas(captureRef.current, {
        scale: 2,
        useCORS: true,
        backgroundColor: "#ffffff",
      });

      const imgData = canvas.toDataURL("image/png", 1.0);
      const orientation =
        templateData?.orientation === "portrait" ? "portrait" : "landscape";

      const pdf = new jsPDF({
        orientation,
        unit: "px",
        format: [canvas.width, canvas.height],
      });

      pdf.addImage(imgData, "PNG", 0, 0, canvas.width, canvas.height);
      pdf.save(getFileName("pdf"));
    } catch (err) {
      console.error("PDF download failed:", err);
    } finally {
      setDownloading(false);
    }
  };

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex min-h-[70vh] items-center justify-center px-4">
          <div className="flex flex-col items-center">
            <div className="relative">
              <div className="h-20 w-20 rounded-full border-4 border-red-100"></div>
              <div className="absolute inset-0 h-20 w-20 rounded-full border-4 border-transparent border-t-red-600 animate-spin"></div>
            </div>
            <h2 className="mt-8 text-2xl font-bold text-gray-900">
              Loading Document
            </h2>
            <p className="mt-2 text-sm text-gray-500">
              Fetching security metadata and template details...
            </p>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  // Friendly empty state — no certificate issued yet
  if (noCertificate) {
    return (
      <DashboardLayout>
        <div className="min-h-[70vh] flex items-center justify-center p-6">
          <div className="w-full max-w-lg bg-white rounded-3xl border border-slate-200 p-8 text-center shadow-lg">
            <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <GraduationCap size={32} />
            </div>
            <h2 className="text-2xl font-bold text-slate-900">
              No Certificate Added Yet
            </h2>
            <p className="text-sm text-slate-500 mt-2">
              You got this! Your certificate will appear here once your
              organization issues it. You'll be able to download your
              credentials as soon as it's added for you.
            </p>
            <button
              onClick={() => navigate("/student/my-certificate")}
              className="mt-6 inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-xl transition cursor-pointer"
            >
              <ArrowLeft size={16} /> Back to My Credentials
            </button>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  if (error || !documentData) {
    return (
      <DashboardLayout>
        <div className="min-h-[70vh] flex items-center justify-center p-6">
          <div className="w-full max-w-lg bg-white rounded-3xl border border-slate-200 p-8 text-center shadow-lg">
            <div className="w-16 h-16 bg-red-50 text-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <AlertCircle size={32} />
            </div>
            <h2 className="text-2xl font-bold text-slate-900">
              Document Unavailable
            </h2>
            <p className="text-sm text-slate-500 mt-2">
              {error ||
                "The document you are looking for has not been assigned or issued yet."}
            </p>
            <button
              onClick={() => navigate("/student/my-certificate")}
              className="mt-6 inline-flex items-center gap-2 px-6 py-3 bg-red-600 hover:bg-red-700 text-white text-sm font-semibold rounded-xl transition cursor-pointer"
            >
              <ArrowLeft size={16} /> Back to My Credentials
            </button>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  const certType = (documentData.certificateType || "internship").toLowerCase();
  const formattedTitle = certType
    .replace(/-/g, " ")
    .replace(/\b\w/g, (l: string) => l.toUpperCase());

  const titleText =
    formattedTitle.includes("Certificate") || formattedTitle.includes("Letter")
      ? formattedTitle
      : `${formattedTitle} Document`;

  const downloadActions = (
    <button
      onClick={handleDownloadPDF}
      disabled={downloading}
      className="inline-flex items-center gap-2 px-5 py-3 bg-red-600 hover:bg-red-700 disabled:opacity-60 disabled:cursor-not-allowed text-white text-sm font-semibold rounded-xl transition cursor-pointer shadow-sm"
    >
      <Download size={16} />
      {downloading ? "Downloading..." : "Download"}
    </button>
  );

  return (
    <DashboardLayout>
      <div className="bg-slate-100 min-h-screen -m-4 sm:-m-8 p-4 sm:p-8 space-y-6">
        <DocumentHeader
          title={titleText}
          subtitle={`Official ${certType.replace("-", " ")} issued to ${documentData.studentName || "you"}.`}
          docType={certType}
          certificateId={documentData.certificateId}
          actions={downloadActions}
        />

        <div ref={captureRef} className="bg-white">
          {templateData ? (
            <FabricCertificateRenderer
              templateData={templateData}
              studentData={{
                studentName: documentData.studentName,
                course: documentData.course,
                role: documentData.role,
                certificateId: documentData.certificateId,
                issueDate: documentData.issueDate,
                startDate: documentData.startDate,
                endDate: documentData.endDate,
                organization: documentData.organization,
                mentor: documentData.mentor,
                director: documentData.director,
                email: documentData.email || "",
              }}
              hideHeader={true}
            />
          ) : (
            <OfferLetterDocument
              documentData={documentData}
              onBack={() => navigate(-1)}
            />
          )}
        </div>
      </div>  
    </DashboardLayout>
  );
}