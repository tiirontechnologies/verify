
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { useNavigate } from "react-router-dom";

import DashboardLayout from "../../../layouts/DashboardLayout";

import { ArrowLeft, Award, Download } from "lucide-react";
import { toPng } from "html-to-image";

// 👇 agar tumhara actual function ka naam alag hai to sirf yaha badlo
import { getMyCertificate} from "../../../api/certificate.api";
import type { CertificateData } from "../../../types/certificate";

// 👇 training certificate ka background image (same ya alag, jo bhi use karna ho)
// import traningBg from "../../../assets/trainingbg.png";
import cert2 from "../../../assets/cert2.png";
import FabricCertificateRenderer from "../components/FabricCertificateRenderer";





// const TRAINING_TEMPLATES: Record<
//   string,
//   // { title: string; plainDescription: string; description: React.ReactNode }
//    {
//     title: string;
//     plainDescription: (start: string, end: string) => string;
//     description: (start: string, end: string) => React.ReactNode;
//   }
// > = {
//   "data analytics & ai": {
//     title: "Data Analytics & AI Training Certificate",
//     plainDescription:
//       "For successfully completing the Data Analytics & AI Training Program offered by Inacademic, an initiative of Tiiron Technologies Pvt. Ltd. from ${start} to ${end}. Throughout the program, the participant gained practical knowledge of data analysis, data visualization, Python for analytics, artificial intelligence fundamentals, and real-world data-driven problem solving. They demonstrated strong learning ability, consistency, and active participation throughout the program.",
//     description: (
//       <>
//         For successfully completing the{" "}
//         <strong>Data Analytics & AI Training Program</strong> offered by
//         Inacademic, an initiative of{" "}
//         <strong>Tiiron Technologies Pvt. Ltd.</strong> Throughout the
//         program, the participant gained practical knowledge of data
//         analysis, data visualization, Python for analytics, artificial
//         intelligence fundamentals, and real-world data-driven problem
//         solving. They demonstrated strong learning ability, consistency, and
//         active participation throughout the program.
//       </>
//     ),
//   },
//   "python development": {
//     title: "Python Development Training Certificate",
//     plainDescription:
//       "For successfully completing the Python Development Training Program offered by Inacademic, an initiative of Tiiron Technologies Pvt. Ltd. Throughout the program, the participant gained practical knowledge of Python programming, object-oriented programming, file handling, API fundamentals, and problem-solving through hands-on coding exercises. They demonstrated strong learning ability, consistency, and active participation throughout the program.",
//     description: (
//       <>
//         For successfully completing the{" "}
//         <strong>Python Development Training Program</strong> offered by
//         <strong> Inacademic</strong>, an initiative of{" "}
//         <strong>Tiiron Technologies Pvt. Ltd.</strong> Throughout the
//         program, the participant gained practical knowledge of Python
//         programming, object-oriented programming, file handling, API
//         fundamentals, and problem-solving through hands-on coding exercises.
//         They demonstrated strong learning ability, consistency, and active
//         participation throughout the program.
//       </>
//     ),
//   },
//   "frontend development": {
//     title: "Frontend Development Training Certificate",
//     plainDescription:
//       `For successfully completing the Frontend Development Training Program offered by Inacademic, an initiative of Tiiron Technologies Pvt. Ltd. Throughout the program, the participant gained practical knowledge of modern frontend development, responsive web design, JavaScript, React, API integration, and user interface development. They demonstrated strong learning ability, consistency, and active participation throughout the program.`,
//     description: (
//       <>
//         For successfully completing the{" "}
//         <strong>Frontend Development Training Program</strong> offered by
//         Inacademic, an initiative of{" "}
//         <strong>Tiiron Technologies Pvt. Ltd.</strong> Throughout the
//         program, the participant gained practical knowledge of modern
//         frontend development, responsive web design, JavaScript, React, API
//         integration, and user interface development. They demonstrated
//         strong learning ability, consistency, and active participation
//         throughout the program.
//       </>
//     ),
//   },
// };

const TRAINING_TEMPLATES: Record<
  string,
  {
    title: string;
    plainDescription: (start: string, end: string) => string;
    description: (start: string, end: string) => React.ReactNode;
  }
> = {
  "data analytics & ai/ml": {
    title: "Data Analytics & AI Training Certificate",
    plainDescription: (start, end) =>
      `For successfully completing the Data Analytics & AI Training Program offered by Inacademic, an initiative of Tiiron Technologies Pvt. Ltd. from ${start} to ${end}. Throughout the program, the participant gained practical knowledge of data analysis, data visualization, Python for analytics, artificial intelligence fundamentals, and real-world data-driven problem solving. They demonstrated strong learning ability, consistency, and active participation throughout the program.`,
    description: (start, end) => (
      <>
        For successfully completing the{" "}
        <strong>Data Analytics & AI Training Program</strong> offered by
        Inacademic, an initiative of{" "}
        <strong>Tiiron Technologies Pvt. Ltd.</strong> from{" "}
        <strong>{start}</strong> to <strong>{end}</strong>. Throughout the
        program, the participant gained practical knowledge of data
        analysis, data visualization, Python for analytics, artificial
        intelligence fundamentals, and real-world data-driven problem
        solving. They demonstrated strong learning ability, consistency, and
        active participation throughout the program.
      </>
    ),
  },
  "python development": {
    title: "Python Development Training Certificate",
    plainDescription: (start, end) =>
      `For successfully completing the Python Development Training Program offered by Inacademic, an initiative of Tiiron Technologies Pvt. Ltd. from ${start} to ${end}. Throughout the program, the participant gained practical knowledge of Python programming, object-oriented programming, file handling, API fundamentals, and problem-solving through hands-on coding exercises. They demonstrated strong learning ability, consistency, and active participation throughout the program.`,
    description: (start, end) => (
      <>
        For successfully completing the{" "}
        <strong>Python Development Training Program</strong> offered by
        <strong> Inacademic</strong>, an initiative of{" "}
        <strong>Tiiron Technologies Pvt. Ltd.</strong> from{" "}
        <strong>{start}</strong> to <strong>{end}</strong>. Throughout the
        program, the participant gained practical knowledge of Python
        programming, object-oriented programming, file handling, API
        fundamentals, and problem-solving through hands-on coding exercises.
        They demonstrated strong learning ability, consistency, and active
        participation throughout the program.
      </>
    ),
  },
  "frontend development": {
    title: "Frontend Development Training Certificate",
    plainDescription: (start, end) =>
      `For successfully completing the Frontend Development Training Program offered by Inacademic, an initiative of Tiiron Technologies Pvt. Ltd. from ${start} to ${end}. Throughout the program, the participant gained practical knowledge of modern frontend development, responsive web design, JavaScript, React, API integration, and user interface development. They demonstrated strong learning ability, consistency, and active participation throughout the program.`,
    description: (start, end) => (
      <>
        For successfully completing the{" "}
        <strong>Frontend Development Training Program</strong> offered by
        Inacademic, an initiative of{" "}
        <strong>Tiiron Technologies Pvt. Ltd.</strong> from{" "}
        <strong>{start}</strong> to <strong>{end}</strong>. Throughout the
        program, the participant gained practical knowledge of modern
        frontend development, responsive web design, JavaScript, React, API
        integration, and user interface development. They demonstrated
        strong learning ability, consistency, and active participation
        throughout the program.
      </>
    ),
  },
};


function getDescriptionFontClamp(plainDescription: string) {
  const len = plainDescription.length;
  if (len > 420) return "clamp(8px, 1.3cqw, 18px)";
  if (len > 300) return "clamp(8.5px, 1.45cqw, 20px)";
  return "clamp(9px, 1.45cqw, 22px)";
}
// function getTrainingContent(certificate: CertificateData) {
//   const key = (certificate.course || "").trim().toLowerCase();
//   const template = TRAINING_TEMPLATES[key];

//   if (template) {
//     return template;
//   }

//   // Fallback agar course teeno mein se koi match na kare
//   const plainDescription = `For successfully completing the ${certificate.course} Training Program offered by Inacademic, an initiative of Tiiron Technologies Pvt. Ltd. The participant demonstrated strong learning ability, consistency, and active participation throughout the program.`;

//   return {
//     title: `${certificate.course} Training Certificate`,
//     plainDescription,
//     description: (
//       <>
//         For successfully completing the{" "}
//         <strong>{certificate.course} Training Program</strong> offered by
//         <strong> Inacademic</strong>, an initiative of{" "}
//         <strong>Tiiron Technologies Pvt. Ltd.</strong> The participant
//         demonstrated strong learning ability, consistency, and active
//         participation throughout the program.
//       </>
//     ),
//   };
// }

function getTrainingContent(certificate: CertificateData) {
  const key = (certificate.course || "").trim().toLowerCase();
  const template = TRAINING_TEMPLATES[key];

  const start = certificate.startDate;
  const end = certificate.endDate;

  if (template) {
    return {
      title: template.title,
      plainDescription: template.plainDescription(start, end),
      description: template.description(start, end),
    };
  }

  // Fallback agar course teeno mein se koi match na kare
  const plainDescription = `For successfully completing the ${certificate.course} Training Program offered by Inacademic, an initiative of Tiiron Technologies Pvt. Ltd. from ${start} to ${end}. The participant demonstrated strong learning ability, consistency, and active participation throughout the program.`;

  return {
    title: `${certificate.course} Training Certificate`,
    plainDescription,
    description: (
      <>
        For successfully completing the{" "}
        <strong>{certificate.course} Training Program</strong> offered by
        <strong> Inacademic</strong>, an initiative of{" "}
        <strong>Tiiron Technologies Pvt. Ltd.</strong> from{" "}
        <strong>{start}</strong> to <strong>{end}</strong>. The participant
        demonstrated strong learning ability, consistency, and active
        participation throughout the program.
      </>
    ),
  };
}


const outerStyle: CSSProperties = {
  containerType: "inline-size",
  width: "100%",
} as CSSProperties;

const CAPTURE_WIDTH = 1200;

export default function TrainingCertificatePage() {
  const navigate = useNavigate();
  const certificateRef = useRef<HTMLDivElement>(null);
  const outerRef = useRef<HTMLDivElement>(null);
// const { description, plainDescription } = getTrainingContent(certificate);
  const [certificate, setCertificate] = useState<CertificateData | null>(null);
  const [templateData, setTemplateData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [downloadingImage, setDownloadingImage] = useState(false);

  useEffect(() => {
    const fetchCertificate = async () => {
      try {
        const response = await getMyCertificate();
        const certList = Array.isArray(response.data) ? response.data : [response.data];
        const data = certList.find(
          (c: any) => (c.certificateType || "").toLowerCase() === "training"
        );

        if (!data) {
          setError("No Training Certificate Found");
          return;
        }

        if (data.template?.design?.data) {
          const orientation =
            data.template.orientation ||
            data.template.design?.orientation ||
            data.template.design?.data?.orientation ||
            (data.template.design?.data?.height > data.template.design?.data?.width ? "portrait" : "landscape");

          setTemplateData({
            ...data.template.design.data,
            orientation,
          });
        }

        setCertificate({
          id: data._id,
          type: data.certificateType?.toLowerCase(),

          studentName: data.studentName,
          email: data.email,
          certificateId: data.certificateId,

          organization: data.organization,
          course: data.course,
          role: data.role,

          issueDate: new Date(data.issueDate).toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "long",
            year: "numeric",
          }),

          startDate: new Date(data.startDate).toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "short",
            year: "numeric",
          }),

          endDate: new Date(data.endDate).toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "short",
            year: "numeric",
          }),

          mentor: data.mentor,
          director: data.director,

          qrCode: data.qrCode || "/qr.png",
          status: data.status,
        });
      } catch (err: any) {
        setError(err.response?.data?.message || "No Certificate Found");
      } finally {
        setLoading(false);
      }
    };

    fetchCertificate();
  }, []);

  // outer container ko fixed width pe resize karke screenshot leta hai,
  // taaki cqw-based font-size hamesha consistent calculate ho — fir
  // original width wapas restore kar deta hai
  const captureCertificate = async () => {
    if (!certificateRef.current || !outerRef.current) return null;

    await document.fonts.ready;

    const prevWidth = outerRef.current.style.width;
    const prevMaxWidth = outerRef.current.style.maxWidth;

    outerRef.current.style.width = `${CAPTURE_WIDTH}px`;
    outerRef.current.style.maxWidth = `${CAPTURE_WIDTH}px`;

    // browser ko container-query recalc karne ka time do
    await new Promise((resolve) =>
      requestAnimationFrame(() => requestAnimationFrame(resolve))
    );

    try {
      return await toPng(certificateRef.current, {
        quality: 1,
        pixelRatio: 3,
        cacheBust: true,
        backgroundColor: "#ffffff",
      });
    } finally {
      outerRef.current.style.width = prevWidth;
      outerRef.current.style.maxWidth = prevMaxWidth;
    }
  };

  const downloadCertificateImage = async () => {
    if (!certificate) return;

    setDownloadingImage(true);
    try {
      const dataUrl = await captureCertificate();
      if (!dataUrl) return;

      const link = document.createElement("a");
      link.download = `${(certificate.studentName || "Student").trim().replace(/\s+/g, "_")}-Training-Certificate.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error("Failed to download training certificate image:", err);
    } finally {
      setDownloadingImage(false);
    }
  };

  if (loading) {
    return (
      <DashboardLayout>
        {/* <div className="flex justify-center items-center h-screen px-4 text-center">
          <h2 className="text-xl sm:text-2xl font-semibold">Loading Certificate...</h2>
        </div> */}
        <div className="flex min-h-[70vh] items-center justify-center px-4">
  <div className="flex flex-col items-center">
    {/* Loader */}
    <div className="relative">
      <div className="h-20 w-20 rounded-full border-4 border-red-100"></div>

      <div className="absolute inset-0 h-20 w-20 rounded-full border-4 border-transparent border-t-red-600 animate-spin"></div>

      <div className="absolute inset-3 h-14 w-14 rounded-full border-4 border-transparent border-b-red-500 animate-spin [animation-direction:reverse] [animation-duration:1.5s]"></div>

      <div className="absolute inset-0 flex items-center justify-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-8 w-8 text-red-600"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 12h6m-6 4h6M7 4h10a2 2 0 012 2v12a2 2 0 01-2 2H7a2 2 0 01-2-2V6a2 2 0 012-2z"
          />
        </svg>
      </div>
    </div>

    {/* Text */}
    <h2 className="mt-8 text-2xl font-bold text-gray-900">
      Loading Certificate
    </h2>

    <p className="mt-2 text-sm text-gray-500">
      Please wait while we securely prepare your certificate.
    </p>

    {/* Animated Dots */}
    <div className="mt-6 flex gap-2">
      <span className="h-2.5 w-2.5 rounded-full bg-red-600 animate-bounce"></span>
      <span className="h-2.5 w-2.5 rounded-full bg-red-500 animate-bounce delay-150"></span>
      <span className="h-2.5 w-2.5 rounded-full bg-red-400 animate-bounce delay-300"></span>
    </div>
  </div>
</div>
      </DashboardLayout>
    );
  }

  if (error) {
    return (
      <DashboardLayout>
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 -m-6 p-4 sm:p-6 flex items-center justify-center">
          <div className="relative w-full max-w-2xl overflow-hidden rounded-[24px] sm:rounded-[32px] border border-slate-200 bg-white/90 p-6 sm:p-10 shadow-[0_24px_80px_rgba(15,23,42,0.08)] backdrop-blur-sm text-center sm:p-14">
            <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-r from-red-500/10 via-red-400/5 to-transparent"></div>

            <div className="relative mx-auto flex h-16 w-16 sm:h-24 sm:w-24 items-center justify-center rounded-full bg-gradient-to-br from-red-50 to-red-100 shadow-inner">
              <svg viewBox="0 0 24 24" className="h-7 w-7 sm:h-10 sm:w-10 text-red-500" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path d="M9 12h6m-6 4h6M9 8h.01M15 8h.01" />
                <path d="M3 5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5z" />
              </svg>
            </div>

            <h1 className="relative mt-6 sm:mt-8 text-2xl sm:text-4xl lg:text-5xl font-semibold text-slate-800">
              Certificate Not Yet Available
            </h1>

            <p className="relative mx-auto mt-4 sm:mt-5 max-w-2xl text-sm sm:text-lg leading-6 sm:leading-8 text-slate-500">
              {error}
            </p>

            <div className="relative mt-6 sm:mt-8 rounded-2xl border border-slate-100 bg-slate-50 px-4 sm:px-5 py-3 sm:py-4 text-xs sm:text-sm text-slate-500">
              Your training completion certificate will appear here once it has been issued.
            </div>

            <div className="relative mt-8 sm:mt-10">
              <button
                onClick={() => navigate(-1)}
                className="rounded-2xl bg-red-600 px-6 sm:px-8 py-3 sm:py-4 font-semibold text-white shadow-lg shadow-red-200 transition hover:bg-red-700 text-sm sm:text-base"
              >
                Go Back
              </button>
            </div>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  if (!certificate) {
    return null;
  }

  if (templateData) {
    return (
      <DashboardLayout>
        <div className="bg-slate-100 min-h-screen -m-6 p-4 sm:p-8 space-y-4">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-red-600 hover:text-red-700 transition font-medium text-sm"
          >
            <ArrowLeft size={18} /> Back to Dashboard
          </button>

          <FabricCertificateRenderer
            templateData={templateData}
            studentData={{
              studentName: certificate.studentName,
              course: certificate.course,
              role: certificate.role,
              certificateId: certificate.certificateId,
              issueDate: certificate.issueDate,
              startDate: certificate.startDate,
              endDate: certificate.endDate,
              organization: certificate.organization,
              mentor: certificate.mentor,
              director: certificate.director,
              email: certificate.email || "",
            }}
          />
        </div>
      </DashboardLayout>
    );
  }

  // const { description } = getTrainingContent(certificate);
  const { description, plainDescription } = getTrainingContent(certificate);

  return (
    <DashboardLayout>
      <div className="bg-slate-100 min-h-screen -m-6 p-4 sm:p-8">
        {/* Header */}
        <div className="relative overflow-hidden bg-white rounded-2xl sm:rounded-3xl shadow-sm border border-slate-200 p-5 sm:p-8 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-5">
          <div className="absolute inset-x-0 top-0 h-20 bg-gradient-to-r from-red-500/10 via-orange-400/5 to-transparent pointer-events-none" />

          <div className="relative">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 text-red-600 hover:text-red-700 mb-4 sm:mb-5 transition text-sm sm:text-base font-medium"
            >
              <ArrowLeft size={18} />
              Back
            </button>

            <div className="flex items-center gap-3 sm:gap-4">
              <div className="flex h-11 w-11 sm:h-14 sm:w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-red-50 to-orange-100 shadow-inner">
                <Award className="h-5 w-5 sm:h-7 sm:w-7 text-red-600" />
              </div>
              <div>
                <h1 className="text-xl sm:text-3xl lg:text-4xl font-bold text-slate-900">
                  Training Certificate
                </h1>
                <p className="text-slate-500 mt-1 text-xs sm:text-base">
                  View your training completion certificate and download it as an image.
                </p>
              </div>
            </div>
          </div>

          <button
            onClick={downloadCertificateImage}
            disabled={downloadingImage}
            className="relative bg-red-600 hover:bg-red-700 disabled:opacity-60 disabled:cursor-not-allowed text-white px-5 sm:px-7 py-2.5 sm:py-3.5 rounded-xl flex items-center justify-center gap-2 sm:gap-3 transition text-sm sm:text-base font-medium shadow-lg shadow-red-200 self-start sm:self-auto"
          >
            <Download size={18} />
            {downloadingImage ? "Preparing..." : "Download Image"}
          </button>
        </div>

        {/* Certificate */}
        <div className="mt-6 sm:mt-8 bg-white rounded-2xl sm:rounded-3xl shadow-lg border border-slate-200 p-3 sm:p-6">
          <div style={outerStyle} ref={outerRef}>
            <div
              id="training-certificate"
              ref={certificateRef}
              style={{
                position: "relative",
                width: "100%",
                maxWidth: 1200,
                margin: "0 auto",
                aspectRatio: "2000 / 1414",
                backgroundImage: `url(${cert2})`,
                backgroundSize: "100% 100%",
                backgroundRepeat: "no-repeat",
                fontFamily: "'Poppins', Arial, sans-serif",
                color: "#0f172a",
                overflow: "hidden",
                borderRadius: "clamp(6px, 1cqw, 14px)",
              }}
            >
              {/* Certificate ID value */}
              <div
                style={{
                  position: "absolute",
                  top: "13.8%",
                  left: "9.6%",
                  fontSize: "clamp(8px, 1.15cqw, 17px)",
                  fontWeight: 700,
                  letterSpacing: "0.4px",
                  // color: "#0f172a",
                  color: "#081F5C",
                  whiteSpace: "nowrap",
                }}
              >
                {certificate.certificateId}
              </div>

              {/* Issue Date value */}
              <div
                style={{
                  position: "absolute",
                  top: "13.8%",
                  right: "10%",
                  fontSize: "clamp(8px, 1.15cqw, 17px)",
                  fontWeight: 700,
                  letterSpacing: "0.4px",
                  // color: "#0f172a",
                  color: "#081F5C",
                  whiteSpace: "nowrap",
                }}
              >
                {certificate.issueDate}
              </div>

              {/* Student Name — sits just above the blank underline */}
              {/* <div
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, 0)",
                  width: "62%",
                  textAlign: "center",
                  fontSize: "clamp(15px, 3cqw, 38px)",
                  fontWeight: 700,
                  color: "#081F5C",
                  fontFamily: "'Great Vibes', 'Brush Script MT', cursive",
                  lineHeight: 1.1,
                }}
              >
                {certificate.studentName?.trim()}
              </div> */}
              {/* Student Name — sits just above the blank underline */}
<div
  style={{
    position: "absolute",
    top: "48%",
    left: "50%",
    transform: "translate(-50%, 0)",
    width: "70%",
    textAlign: "center",
    fontSize: "clamp(18px, 3.6cqw, 48px)",
    fontWeight: 700,
    // color: "#f1931f",
    color: "#081F5C",
    fontFamily: "'Great Vibes', 'Brush Script MT', cursive",
    lineHeight: 1.1,
  }}
>
  {certificate.studentName?.trim()}
</div>

              {/* Body — training program description (directly below underline, no pill) */}
              <div
                style={{
                  position: "absolute",
                  top: "57%",
                  left: "50%",
                  transform: "translateX(-50%)",
                  width: "80%",
                  textAlign: "center",
                  fontSize: getDescriptionFontClamp(plainDescription),
                  lineHeight: 1.75,
                  fontWeight: 400,
                  color: "#334155",
                }}
              >
                {description}
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}