import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

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

export default function VerificationPage() {

  const { id } = useParams();
  const navigate = useNavigate();

  const [certificate, setCertificate] =
    useState<CertificateData | null>(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {

const fetchCertificate = async () => {

  try {

    const response = await verifyCertificate(id!);

    const data = response?.data || response;

    if (!data || data?.success === false) {
      throw new Error(data?.message || "Certificate not found");
    }

    setCertificate({

      id: data._id,

      type: "internship",

      studentName: data.studentName,

      email: data.email,

      certificateId: data.certificateId,

      organization: data.organization,

      course: data.course,

      role: data.role,

      issueDate: new Date(data.issueDate).toLocaleDateString("en-GB"),

      startDate: new Date(data.startDate).toLocaleDateString("en-GB"),

      endDate: new Date(data.endDate).toLocaleDateString("en-GB"),

      mentor: data.mentor,

      director: data.director,

      qrCode: data.qrCode || "../../assets/qrcode_inacademic.com.png",

      status: data.status,

    });

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

  if (loading) {

    return (
      <div className="min-h-screen bg-[radial-gradient(circle_at_top,_#fff7f7_0%,_#f8fafc_55%,_#f1f5f9_100%)] flex items-center justify-center px-6 py-20">
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
      </div>
    );

  }

  if (!certificate) {
    return null;
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC]">

      <Navbar />

      {/* Hero */}

      <div className="max-w-[1650px] mx-auto px-6 lg:px-10 pt-8">

        <VerificationHeroAny
          verificationId={id ?? ""}
        />

      </div>

      {/* Main */}

      <main className="max-w-[1650px] mx-auto px-6 lg:px-10 py-8">

        <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">

          {/* Left */}

          <div className="xl:col-span-8 space-y-8">

            <CandidateCard
              certificate={certificate}
            />

            <AvailableCertificates />

          </div>

          {/* Right */}

          <div className="xl:col-span-4 space-y-6">

            <StatusCard
              certificate={certificate}
            />

            <VerificationSummary
              certificate={certificate}
            />

          </div>

        </div>

      </main>

      <Footer />

    </div>
  );

}