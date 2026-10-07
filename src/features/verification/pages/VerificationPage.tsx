import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import jsPDF from "jspdf";
import { toCanvas } from "html-to-image";
import toast from "react-hot-toast";

import Navbar from "../../landing/components/Navbar";
import Footer from "../../../components/shared/Footer";

import VerificationHero from "../components/VerificationHero";

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
          profileImage: data.profileImage,
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

        const relatedCertificates = Array.isArray(data.certificates)
          ? data.certificates
          : Array.isArray(data.relatedCertificates)
            ? data.relatedCertificates
            : [];
        const reportCertificates = [data, ...relatedCertificates];
        const uniqueCertificates = reportCertificates.filter((item, index, list) => {
          const itemId = item.certificateId || item._id;
          return list.findIndex((candidate) => (candidate.certificateId || candidate._id) === itemId) === index;
        });

        // AvailableCertificates receives raw records so issue dates remain parseable.
        setCertList(uniqueCertificates.map((item) => ({
          _id: item._id,
          certificateId: item.certificateId,
          certificateType: item.certificateType,
          organization: item.organization,
          course: item.course,
          role: item.role,
          issueDate: item.issueDate,
        })));
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
      const image = await toCanvas(reportRef.current, {
        pixelRatio: 2,
        cacheBust: true,
        backgroundColor: "#F8FAFC",
        filter: (node) => !(node instanceof HTMLElement && node.hasAttribute("data-html2canvas-ignore")),
      });
      const pdf = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      const margin = 8;
      const contentWidth = pageWidth - margin * 2;
      const pixelsPerMm = image.width / contentWidth;
      const pageSliceHeight = Math.floor((pageHeight - margin * 2) * pixelsPerMm);
      const availableHeight = pageHeight - margin * 2;

      if (certList.length <= 3) {
        const scale = Math.min(contentWidth / image.width, availableHeight / image.height);
        const width = image.width * scale;
        const height = image.height * scale;
        pdf.addImage(image, "PNG", (pageWidth - width) / 2, (pageHeight - height) / 2, width, height);
      } else {
        let sourceY = 0;
        while (sourceY < image.height) {
          const sliceHeight = Math.min(pageSliceHeight, image.height - sourceY);
          const pageCanvas = document.createElement("canvas");
          pageCanvas.width = image.width;
          pageCanvas.height = sliceHeight;
          const context = pageCanvas.getContext("2d");
          if (!context) throw new Error("Unable to prepare the report for download.");
          context.drawImage(image, 0, sourceY, image.width, sliceHeight, 0, 0, image.width, sliceHeight);

          if (sourceY > 0) pdf.addPage();
          pdf.addImage(
            pageCanvas.toDataURL("image/png"),
            "PNG",
            margin,
            margin,
            contentWidth,
            sliceHeight / pixelsPerMm,
          );
          sourceY += sliceHeight;
        }
      }

      pdf.save(`${certificate.certificateId || id || "verification"}-report.pdf`);
    } catch (error) {
      console.error("Verification report download failed:", error);
      toast.error("Could not create the PDF. Please try again.");
    } finally {
      setDownloading(false);
    }
  };

  const shareVerification = async () => {
    const url = window.location.href;
    try {
      if (navigator.share) {
        await navigator.share({ title: "Verified credential", url });
      } else {
        await navigator.clipboard.writeText(url);
        window.alert("Verification link copied to clipboard.");
      }
    } catch (error) {
      if ((error as DOMException).name !== "AbortError") {
        console.error("Verification link share failed:", error);
      }
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
      <div className="mx-auto max-w-[210mm] px-3 pt-4 sm:px-5 lg:px-0">
        <div ref={reportRef} className="mx-auto min-h-[297mm] space-y-5 border border-slate-200 bg-white p-4 shadow-sm sm:p-6 lg:p-8">
          <VerificationHero verificationId={id ?? ""} downloading={downloading} onDownload={downloadVerificationReport} onShare={shareVerification} />

          <main>
            <div className="grid grid-cols-1 gap-5 lg:gap-6">
              <div className="space-y-5">
                <CandidateCard certificate={certificate} />
                <AvailableCertificates certificates={certList} />
              </div>

              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
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
