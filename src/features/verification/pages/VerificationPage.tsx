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

  console.log("Route ID:", id);

  try {

    const response = await verifyCertificate(id!);

    console.log("Full Response:", response);

    const data = response.data;

    console.log("Certificate Data:", data);

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

    console.log("State Updated Successfully");

  } catch (error: any) {

    console.error("ERROR:", error);

    if (error.response) {
      console.error("Status:", error.response.status);
      console.error("Body:", error.response.data);
    }

    // TEMPORARILY COMMENT THIS
    // navigate("/verification-failed");

  } finally {

    setLoading(false);

  }

};

    fetchCertificate();

  }, [id, navigate]);

  if (loading) {

    return (
      <div className="min-h-screen flex justify-center items-center">
        Loading Verification...
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