import { useRef, useState } from "react";
import { ArrowLeft, Download, Printer, CheckCircle, ShieldCheck } from "lucide-react";
import html2canvas from "html2canvas";
import TiironLogo from "../../../assets/Tiiron_Technologies_Logo.png";

interface OfferLetterDocumentProps {
  documentData: {
    studentName: string;
    course: string;
    role: string;
    certificateId: string;
    issueDate?: string;
    startDate?: string;
    endDate?: string;
    organization?: string;
    mentor?: string;
    director?: string;
    email?: string;
  };
  onBack?: () => void;
}

export default function OfferLetterDocument({
  documentData,
  onBack,
}: OfferLetterDocumentProps) {
  const letterRef = useRef<HTMLDivElement>(null);
  const [downloading, setDownloading] = useState(false);

  const formatDate = (dateStr?: string) => {
    if (!dateStr) return "N/A";
    const d = new Date(dateStr);
    return isNaN(d.getTime())
      ? dateStr
      : d.toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "long",
          year: "numeric",
        });
  };

  const handleDownloadImage = async () => {
    if (!letterRef.current) return;
    try {
      setDownloading(true);
      const canvas = await html2canvas(letterRef.current, {
        scale: 2,
        useCORS: true,
        backgroundColor: "#ffffff",
      });
      const dataUrl = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      const cleanName = (documentData.studentName || "Student")
        .trim()
        .replace(/\s+/g, "_");
      link.download = `${cleanName}-Offer-Letter.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error("Failed to download offer letter:", err);
    } finally {
      setDownloading(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const orgName = documentData.organization || "Tiiron Technologies Pvt. Ltd.";
  const issueDateFormatted = formatDate(documentData.issueDate || new Date().toISOString());
  const startDateFormatted = formatDate(documentData.startDate);
  const endDateFormatted = formatDate(documentData.endDate);

  return (
    <div className="space-y-6">
      {/* Top Bar / Actions */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-slate-200 shadow-sm print:hidden">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 text-sm font-semibold text-slate-700 hover:text-red-600 transition"
        >
          <ArrowLeft size={18} /> Back to Dashboard
        </button>

        <div className="flex items-center gap-3">
          <button
            onClick={handlePrint}
            className="inline-flex items-center gap-2 px-4 py-2 text-xs sm:text-sm font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition"
          >
            <Printer size={16} /> Print / Save PDF
          </button>
          <button
            onClick={handleDownloadImage}
            disabled={downloading}
            className="inline-flex items-center gap-2 px-5 py-2 text-xs sm:text-sm font-semibold text-white bg-red-600 hover:bg-red-700 rounded-xl shadow-md shadow-red-200 transition disabled:opacity-50"
          >
            <Download size={16} />
            {downloading ? "Exporting..." : "Download Image"}
          </button>
        </div>
      </div>

      {/* Offer Letter Document Container */}
      <div className="flex justify-center overflow-x-auto pb-8">
        <div
          ref={letterRef}
          id="offer-letter-document"
          className="w-[800px] min-h-[1050px] bg-white text-slate-900 shadow-2xl rounded-sm p-12 sm:p-16 relative flex flex-col justify-between border border-slate-200 font-sans print:shadow-none print:w-full print:m-0"
        >
          {/* Decorative Top Accent Bar */}
          <div className="absolute top-0 left-0 right-0 h-3 bg-gradient-to-r from-red-600 via-red-500 to-amber-500"></div>

          <div>
            {/* Header / Branding */}
            <div className="flex items-start justify-between border-b border-slate-200 pb-8">
              <div>
                <img
                  src={TiironLogo}
                  alt={orgName}
                  className="h-14 w-auto object-contain mb-2"
                />
                <h2 className="text-sm font-bold text-slate-800 tracking-wide uppercase">
                  {orgName}
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Official Document & Verification Portal
                </p>
              </div>

              <div className="text-right space-y-1">
                <span className="inline-block px-3 py-1 bg-red-50 text-red-700 text-xs font-semibold rounded-md border border-red-100">
                  OFFICIAL OFFER LETTER
                </span>
                <p className="text-xs text-slate-500 mt-2 font-mono">
                  Ref ID: <span className="font-semibold text-slate-700">{documentData.certificateId}</span>
                </p>
                <p className="text-xs text-slate-500">
                  Date: <span className="font-medium text-slate-700">{issueDateFormatted}</span>
                </p>
              </div>
            </div>

            {/* Candidate & Subject Section */}
            <div className="mt-8 space-y-4">
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/80 flex justify-between items-center">
                <div>
                  <p className="text-xs text-slate-500 uppercase font-semibold tracking-wider">Candidate Name</p>
                  <h3 className="text-xl font-bold text-slate-900 mt-0.5">{documentData.studentName}</h3>
                  {documentData.email && (
                    <p className="text-xs text-slate-600 mt-0.5">{documentData.email}</p>
                  )}
                </div>
                <div className="text-right">
                  <p className="text-xs text-slate-500 uppercase font-semibold tracking-wider">Designation / Role</p>
                  <p className="text-sm font-semibold text-red-600 mt-0.5">{documentData.role || "Trainee / Intern"}</p>
                </div>
              </div>

              <div className="pt-2">
                <p className="text-base font-bold text-slate-800 underline underline-offset-4">
                  SUBJECT: OFFER LETTER FOR PROGRAM APPOINTMENT
                </p>
              </div>
            </div>

            {/* Letter Body Text */}
            <div className="mt-6 text-sm text-slate-700 leading-relaxed space-y-4">
              <p>
                Dear <strong className="text-slate-900">{documentData.studentName}</strong>,
              </p>

              <p>
                We are pleased to formally offer you the position of{" "}
                <strong className="text-slate-900">{documentData.role || "Program Participant"}</strong> for the{" "}
                <strong className="text-slate-900">{documentData.course || "Technical Training"}</strong> program at{" "}
                <strong className="text-slate-900">{orgName}</strong>.
              </p>

              <p>
                Your appointment is effective from{" "}
                <strong className="text-slate-900">{startDateFormatted}</strong> to{" "}
                <strong className="text-slate-900">{endDateFormatted}</strong>. During this duration, you will work closely under the mentorship of{" "}
                <strong className="text-slate-900">{documentData.mentor || "Technical Mentor"}</strong> and engage in hands-on practical assignments, industry workflows, and real-world project scenarios designed to hone your skill sets.
              </p>

              <p className="font-semibold text-slate-800 pt-1">
                Key Terms & Highlights of the Program:
              </p>
              <ul className="list-disc pl-5 space-y-1.5 text-xs sm:text-sm text-slate-600">
                <li>
                  <strong>Domain Focus:</strong> Specialized practical training in {documentData.course}.
                </li>
                <li>
                  <strong>Guidance:</strong> Direct supervision and evaluation by mentor {documentData.mentor || "Designated Lead"}.
                </li>
                <li>
                  <strong>Verification:</strong> Upon successful completion of your tenure, an verified certificate of completion will be issued under reference ID <span className="font-mono font-medium text-slate-800">{documentData.certificateId}</span>.
                </li>
              </ul>

              <p>
                We welcome you to <strong className="text-slate-900">{orgName}</strong> and wish you an enriched and impactful learning experience ahead!
              </p>
            </div>
          </div>

          {/* Signatures & Footer Section */}
          <div className="mt-12 pt-8 border-t border-slate-200">
            <div className="grid grid-cols-2 gap-8 items-end">
              <div>
                <p className="text-xs text-slate-400 mb-6">Authorized Signatory</p>
                <div className="w-36 border-b-2 border-slate-900 mb-2"></div>
                <p className="text-sm font-bold text-slate-900">{documentData.director || "Managing Director"}</p>
                <p className="text-xs text-slate-500">Director / Program Coordinator</p>
                <p className="text-xs font-semibold text-slate-700">{orgName}</p>
              </div>

              <div className="flex flex-col items-end text-right space-y-2">
                <div className="flex items-center gap-1.5 text-green-700 bg-green-50 border border-green-200 px-3 py-1.5 rounded-lg text-xs font-semibold">
                  <ShieldCheck size={16} /> Verified Official Document
                </div>
                <p className="text-[11px] font-mono text-slate-400">
                  Document Hash ID: {documentData.certificateId}
                </p>
              </div>
            </div>

            {/* Bottom Footer Line */}
            <div className="mt-10 pt-4 border-t border-slate-100 text-center flex items-center justify-between text-[11px] text-slate-400">
              <span className="flex items-center gap-1">
                <CheckCircle size={12} className="text-green-600" /> Issued via Tiiron Credentials
              </span>
              <span>Confidential & Authentic Document</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
