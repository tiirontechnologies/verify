import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Download } from "lucide-react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

import Navbar from "../../landing/components/Navbar";
import Footer from "../../../components/shared/Footer";

import VerificationHero from "../components/VerificationHero";
const VerificationHeroAny = VerificationHero as any;

import CandidateCard from "../components/CandidateCard";
import StatusCard from "../components/StatusCard";
import VerificationSummary from "../components/VerificationSummary";
import AvailableCertificates from "../components/AvailableCertificates";

import { verifyCertificate } from "../../../api/certificate.api";
import type { CertificateData } from "../../../types/certificate";

// ISO date -> "30/09/2026", invalid/missing ho to empty string
const fmtDate = (iso?: string): string => {
  if (!iso) return "";
  const d = new Date(iso);
  return isNaN(d.getTime()) ? "" : d.toLocaleDateString("en-GB");
};

export default function VerificationPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [certificate, setCertificate] = useState<CertificateData | null>(null);
  const [certList, setCertList] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [downloading, setDownloading] = useState(false);
  const reportRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchCertificate = async () => {
      try {
        const raw: any = await verifyCertificate(id!);

        // axios response, {success, data} body, ya seedha object: teeno handle
        const body = raw?.data ?? raw;
        const data = body?.data ?? body;

        if (!data || body?.success === false) {
          throw new Error(body?.message || "Certificate not found");
        }

        setCertificate({
          id: data._id,
          type: data.certificateType, // dynamic, backend se
          studentName: data.studentName,
          email: data.email,
          certificateId: data.certificateId,
          organization: data.organization,
          course: data.course,
          role: data.role,
          issueDate: fmtDate(data.issueDate),
          startDate: fmtDate(data.startDate),
          endDate: fmtDate(data.endDate),
          mentor: data.mentor,
          director: data.director,
          qrCode: data.qrCode || "../../assets/qrcode_inacademic.com.png",
          status: data.status,
        } as CertificateData);

        // AvailableCertificates ke liye raw data (ISO date ke saath)
        setCertList([
          {
            _id: data._id,
            certificateId: data.certificateId,
            certificateType: data.certificateType,
            organization: data.organization,
            course: data.course,
            role: data.role,
            issueDate: data.issueDate,
          },
        ]);
      } catch (error: any) {
        console.error("ERROR:", error);

        if (error.response) {
          console.error("Status:", error.response.status);
          console.error("Body:", error.response.data);
        }

        const status = error.response?.status;
        const backendMessage = error.response?.data?.message || error.message;

        navigate("/verification-failed", {
          replace: true,
          state: {
            verificationId: id,
            message:
              status === 404 || /not found/i.test(backendMessage || "")
                ? "Certificate not found"
                : backendMessage ||
                  "The verification ID you entered is invalid or does not exist.",
          },
        });
      } finally {
        setLoading(false);
      }
    };

    fetchCertificate();
  }, [id, navigate]);

  const downloadVerificationReport = async () => {
    if (!reportRef.current || !certificate) return;
    setDownloading(true);

    try {
      const image = await html2canvas(reportRef.current, {
        scale: 2,
        useCORS: true,
        backgroundColor: "#F8FAFC",
      });
      const orientation = image.width >= image.height ? "landscape" : "portrait";
      const pdf = new jsPDF({ orientation, unit: "mm", format: "a4" });
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      const margin = 8;
      const scale = Math.min(
        (pageWidth - margin * 2) / image.width,
        (pageHeight - margin * 2) / image.height,
      );
      const width = image.width * scale;
      const height = image.height * scale;
      const x = (pageWidth - width) / 2;
      const y = (pageHeight - height) / 2;

      pdf.addImage(image.toDataURL("image/png"), "PNG", x, y, width, height);
      pdf.save(`${certificate.certificateId || id || "verification"}-report.pdf`);
    } catch (error) {
      console.error("Verification report download failed:", error);
    } finally {
      setDownloading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[radial-gradient(circle_at_top,_#fff7f7_0%,_#f8fafc_55%,_#f1f5f9_100%)]">
        <Navbar />
        <main className="flex min-h-[calc(100vh-64px)] items-center justify-center px-6 py-20">
        <div className="relative w-full max-w-2xl overflow-hidden rounded-[32px] border border-slate-200 bg-white/90 p-10 shadow-[0_20px_60px_rgba(15,23,42,0.08)] backdrop-blur-sm text-center">
          <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-r from-red-500/10 via-red-400/5 to-transparent"></div>

          <div className="relative mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-red-50 to-red-100 shadow-inner">
            <div className="absolute inset-0 rounded-full border border-red-200"></div>
            <div className="h-9 w-9 animate-spin rounded-full border-4 border-red-200 border-t-red-600"></div>
          </div>

          <h2 className="relative mt-7 text-3xl font-semibold text-slate-800">
            Verifying Certificate
          </h2>

          <p className="relative mt-3 text-lg text-slate-500">
            Please wait while we authenticate the credential and fetch its details.
          </p>

          <div className="relative mt-8 flex items-center justify-center gap-3">
            <div className="h-3 w-3 animate-bounce rounded-full bg-red-500 [animation-delay:-0.3s]"></div>
            <div className="h-3 w-3 animate-bounce rounded-full bg-red-400 [animation-delay:-0.15s]"></div>
            <div className="h-3 w-3 animate-bounce rounded-full bg-red-300"></div>
          </div>

          <div className="relative mt-8 rounded-2xl border border-slate-100 bg-slate-50 px-5 py-4 text-sm text-slate-500">
            Secure verification in progress · checking certificate authenticity
          </div>
        </div>
        </main>
      </div>
    );
  }

  if (!certificate) {
    return null;
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <Navbar />
      <div className="mx-auto max-w-[1650px] px-4 pt-4 sm:px-6 lg:px-10">
        <div className="mt-4 flex justify-end">
          <button
            type="button"
            onClick={downloadVerificationReport}
            disabled={downloading}
            className="inline-flex min-h-10 items-center justify-center gap-2 rounded-lg border border-red-200 bg-white px-4 py-2 text-sm font-semibold text-red-700 transition hover:border-red-400 hover:bg-red-50 disabled:cursor-wait disabled:opacity-60"
          >
            <Download size={16} /> {downloading ? "Preparing PDF..." : "Download report"}
          </button>
        </div>

        <div ref={reportRef} className="space-y-5 pb-6 pt-4 lg:space-y-8 lg:pb-8">
          <VerificationHeroAny verificationId={id ?? ""} />

          <main>
            <div className="grid grid-cols-1 gap-5 lg:gap-8 xl:grid-cols-12">
              <div className="space-y-5 xl:col-span-8 lg:space-y-8">
                <CandidateCard certificate={certificate} />
                <AvailableCertificates certificates={certList} />
              </div>

              <div className="space-y-5 xl:col-span-4 lg:space-y-6">
                <StatusCard certificate={certificate} />
                <VerificationSummary certificate={certificate} />
              </div>
            </div>
          </main>
        </div>

      </div>

      <Footer />
    </div>
  );
}