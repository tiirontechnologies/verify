

// import { useEffect, useRef, useState, type CSSProperties } from "react";
// import { useNavigate } from "react-router-dom";

// import DashboardLayout from "../../../layouts/DashboardLayout";

// import { ArrowLeft, Download } from "lucide-react";
// import { toPng } from "html-to-image";
// import jsPDF from "jspdf";

// import { getMyCertificate } from "../../../api/certificate.api";
// import type { CertificateData } from "../../../types/certificate";

// // 👇 apni certificate background image ko assets mein daal kar path yaha set karo
// import certificateBg from "../../../assets/certificate-bg.png";

// // ─────────────────────────────────────────────────────────────
// // Course-wise title + description templates
// // certificate.course field se match hota hai (case-insensitive)
// // ─────────────────────────────────────────────────────────────
// const COURSE_TEMPLATES: Record<
//   string,
//   { title: string; description: (start: string, end: string) => string }
// > = {
//   "frontend development": {
//     title: "Frontend Development",
//     description: (start, end) =>
//       `Has successfully completed an internship as a Frontend Developer Intern with Tiiron Technologies Pvt. Ltd. from ${start} to ${end}. During this period, the intern contributed to frontend development by building responsive user interfaces, implementing modern web technologies, integrating APIs, and collaborating within a product development environment. The intern demonstrated strong technical skills, creativity, teamwork, and problem-solving abilities. We wish them continued success in their future endeavors.`,
//   },
//   "python development": {
//     title: "Python Development",
//     description: (start, end) =>
//       `Has successfully completed an internship as a Python Developer Intern with Tiiron Technologies Pvt. Ltd. from ${start} to ${end}. During this period, the intern worked on Python-based applications, API development, automation tasks, and backend programming while collaborating in a product-oriented development environment. The intern demonstrated strong technical proficiency, analytical thinking, teamwork, and problem-solving abilities. We wish them continued success in their future endeavors.`,
//   },
//   "data analytics & ai": {
//     title: "Data Analytics & AI",
//     description: (start, end) =>
//       `Has successfully completed an internship as a Data Analytics & AI Intern with Tiiron Technologies Pvt. Ltd. from ${start} to ${end}. During this period, the intern worked with real-world datasets, performed data analysis and visualization, explored AI-driven solutions, and developed practical insights using modern analytics tools. The intern demonstrated strong analytical skills, technical competence, collaboration, and problem-solving abilities. We wish them continued success in their future endeavors.`,
//   },
// };

// function getCourseContent(certificate: CertificateData) {
//   const key = (certificate.course || "").trim().toLowerCase();
//   const template = COURSE_TEMPLATES[key];

//   if (template) {
//     return {
//       title: template.title,
//       description: template.description(certificate.startDate, certificate.endDate),
//     };
//   }

//   // Fallback agar course teeno mein se koi match na kare
//   return {
//     title: certificate.course,
//     description: `Has successfully completed an internship as a ${certificate.role} with ${certificate.organization} from ${certificate.startDate} to ${certificate.endDate}. During this period, the intern contributed to real project work, collaborative workflows, and hands-on technical tasks, demonstrating strong dedication, technical skill, and professionalism throughout the internship.`,
//   };
// }

// // ─────────────────────────────────────────────────────────────
// // Certificate design ratio: bg image is 2000 x 1414 (~1.4145 : 1)
// // containerType: "inline-size" + cqw units => font-size hamesha
// // certificate CARD ki actual width se scale hota hai, viewport se nahi.
// // Isse sidebar ho, split panel ho, chhota/bada phone/tablet/desktop —
// // kahin bhi text aur bg image proportion mein hi rahenge.
// // ─────────────────────────────────────────────────────────────
// const outerStyle: CSSProperties = {
//   containerType: "inline-size",
//   width: "100%",
// } as CSSProperties;

// export default function InternshipCertificatePage() {
//   const navigate = useNavigate();
//   const certificateRef = useRef<HTMLDivElement>(null);

//   const [certificate, setCertificate] = useState<CertificateData | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [downloading, setDownloading] = useState(false);

//   useEffect(() => {
//     const fetchCertificate = async () => {
//       try {
//         const response = await getMyCertificate();
//         const data = response.data;

//         setCertificate({
//           id: data._id,
//           type: data.certificateType.toLowerCase(),

//           studentName: data.studentName,
//           email: data.email,
//           certificateId: data.certificateId,

//           organization: data.organization,
//           course: data.course,
//           role: data.role,

//           issueDate: new Date(data.issueDate).toLocaleDateString("en-GB", {
//             day: "2-digit",
//             month: "long",
//             year: "numeric",
//           }),

//           startDate: new Date(data.startDate).toLocaleDateString("en-GB", {
//             day: "2-digit",
//             month: "short",
//             year: "numeric",
//           }),

//           endDate: new Date(data.endDate).toLocaleDateString("en-GB", {
//             day: "2-digit",
//             month: "short",
//             year: "numeric",
//           }),

//           mentor: data.mentor,
//           director: data.director,

//           qrCode: data.qrCode || "/qr.png",
//           status: data.status,
//         });
//       } catch (err: any) {
//         setError(err.response?.data?.message || "No Certificate Found");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchCertificate();
//   }, []);
//   const [downloadingImage, setDownloadingImage] = useState(false);

//   // const downloadCertificate = async () => {
//   //   if (!certificateRef.current || !certificate) return;

//   //   setDownloading(true);
//   //   try {
//   //     await document.fonts.ready;

//   //     // certificate ka asli design size (2000x1414) fix rakhkar screenshot lete hain
//   //     // taaki PDF hamesha sharp/high-res bane, chahe screen pe cert chhota dikh raha ho.
//   //     const dataUrl = await toPng(certificateRef.current, {
//   //       quality: 1,
//   //       pixelRatio: 3,
//   //       cacheBust: true,
//   //       backgroundColor: "#ffffff",
//   //       width: 2000,
//   //       height: 1414,
//   //       style: {
//   //         width: "2000px",
//   //         height: "1414px",
//   //       },
//   //     });

//   //     // A4 landscape (297mm x 210mm) ratio = 1.4143, certificate ratio (2000/1414) = 1.4144
//   //     // — almost exact match, isliye full page pe bina stretch/crop clean fit hoga.
//   //     const pdf = new jsPDF({
//   //       orientation: "landscape",
//   //       unit: "mm",
//   //       format: "a4",
//   //       compress: true,
//   //     });

//   //     const pageWidth = pdf.internal.pageSize.getWidth();
//   //     const pageHeight = pdf.internal.pageSize.getHeight();

//   //     pdf.addImage(dataUrl, "PNG", 0, 0, pageWidth, pageHeight);
//   //     pdf.save(
//   //       `${(certificate.studentName || "Student").trim().replace(/\s+/g, "_")}-Internship-Certificate.pdf`
//   //     );
//   //   } catch (err) {
//   //     console.error("Failed to download certificate:", err);
//   //   } finally {
//   //     setDownloading(false);
//   //   }
//   // };

//   const downloadCertificate= async () => {
//   if (!certificateRef.current || !certificate) return;

//   setDownloadingImage(true);
//   try {
//     await document.fonts.ready;

//     const dataUrl = await toPng(certificateRef.current, {
//       quality: 1,
//       pixelRatio: 3,
//       cacheBust: true,
//       backgroundColor: "#ffffff",
//       width: 2000,
//       height: 1414,
//       style: {
//         width: "2000px",
//         height: "1414px",
//       },
//     });

//     const link = document.createElement("a");
//     link.download = `${(certificate.studentName || "Student").trim().replace(/\s+/g, "_")}-Internship-Certificate.png`;
//     link.href = dataUrl;
//     link.click();
//   } catch (err) {
//     console.error("Failed to download certificate image:", err);
//   } finally {
//     setDownloadingImage(false);
//   }
// };

//   if (loading) {
//     return (
//       <DashboardLayout>
//         <div className="flex justify-center items-center h-screen px-4 text-center">
//           <h2 className="text-xl sm:text-2xl font-semibold">Loading Certificate...</h2>
//         </div>
//       </DashboardLayout>
//     );
//   }

//   if (error) {
//     return (
//       <DashboardLayout>
//         <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 -m-6 p-4 sm:p-6 flex items-center justify-center">
//           <div className="relative w-full max-w-2xl overflow-hidden rounded-[24px] sm:rounded-[32px] border border-slate-200 bg-white/90 p-6 sm:p-10 shadow-[0_24px_80px_rgba(15,23,42,0.08)] backdrop-blur-sm text-center sm:p-14">
//             <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-r from-red-500/10 via-red-400/5 to-transparent"></div>

//             <div className="relative mx-auto flex h-16 w-16 sm:h-24 sm:w-24 items-center justify-center rounded-full bg-gradient-to-br from-red-50 to-red-100 shadow-inner">
//               <svg viewBox="0 0 24 24" className="h-7 w-7 sm:h-10 sm:w-10 text-red-500" fill="none" stroke="currentColor" strokeWidth="1.8">
//                 <path d="M9 12h6m-6 4h6M9 8h.01M15 8h.01" />
//                 <path d="M3 5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5z" />
//               </svg>
//             </div>

//             <h1 className="relative mt-6 sm:mt-8 text-2xl sm:text-4xl lg:text-5xl font-semibold text-slate-800">
//               Certificate Not Yet Available
//             </h1>

//             <p className="relative mx-auto mt-4 sm:mt-5 max-w-2xl text-sm sm:text-lg leading-6 sm:leading-8 text-slate-500">
//               {error}
//             </p>

//             <div className="relative mt-6 sm:mt-8 rounded-2xl border border-slate-100 bg-slate-50 px-4 sm:px-5 py-3 sm:py-4 text-xs sm:text-sm text-slate-500">
//               Your internship completion certificate will appear here once it has been issued by your organization.
//             </div>

//             <div className="relative mt-8 sm:mt-10">
//               <button
//                 onClick={() => navigate(-1)}
//                 className="rounded-2xl bg-red-600 px-6 sm:px-8 py-3 sm:py-4 font-semibold text-white shadow-lg shadow-red-200 transition hover:bg-red-700 text-sm sm:text-base"
//               >
//                 Go Back
//               </button>
//             </div>
//           </div>
//         </div>
//       </DashboardLayout>
//     );
//   }

//   if (!certificate) {
//     return null;
//   }

//   const { title: courseTitle, description } = getCourseContent(certificate);

//   return (
//     <DashboardLayout>
//       <div className="bg-slate-100 min-h-screen -m-6 p-4 sm:p-8">
//         {/* Header */}
//         <div className="bg-white rounded-2xl sm:rounded-3xl shadow-sm border p-4 sm:p-8 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
//           <div>
//             <button
//               onClick={() => navigate(-1)}
//               className="flex items-center gap-2 text-red-600 hover:text-red-700 mb-3 sm:mb-4 transition text-sm sm:text-base"
//             >
//               <ArrowLeft size={18} />
//               Back
//             </button>

//             <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold">
//               Internship Certificate
//             </h1>

//             <p className="text-gray-500 mt-2 text-sm sm:text-base">
//               View your internship completion certificate and download it as a PDF.
//             </p>
//           </div>

//           <button
//             onClick={downloadCertificate}
//             disabled={downloading}
//             className="bg-red-600 hover:bg-red-700 disabled:opacity-60 disabled:cursor-not-allowed text-white px-5 sm:px-7 py-2.5 sm:py-3 rounded-xl flex items-center justify-center gap-2 sm:gap-3 transition text-sm sm:text-base self-start sm:self-auto"
//           >
//             <Download size={18} />
//             {downloading ? "Preparing..." : "Download PDF"}
//           </button>
//         </div>

//         {/* Certificate */}
//         <div className="mt-6 sm:mt-8 bg-white rounded-2xl sm:rounded-3xl shadow-lg border p-3 sm:p-6">
//           <div style={outerStyle}>
//             <div
//               id="certificate"
//               ref={certificateRef}
//               style={{
//                 position: "relative",
//                 width: "100%",
//                 maxWidth: 1200,
//                 margin: "0 auto",
//                 aspectRatio: "2000 / 1414",
//                 backgroundImage: `url(${certificateBg})`,
//                 backgroundSize: "100% 100%",
//                 backgroundRepeat: "no-repeat",
//                 fontFamily: "'Poppins', Arial, sans-serif",
//                 color: "#0f172a",
//                 overflow: "hidden",
//                 borderRadius: "clamp(6px, 1cqw, 14px)",
//               }}
//             >
//               {/* Certificate ID value */}
//               <div
//                 style={{
//                   position: "absolute",
//                   top: "13.8%",
//                   left: "9.6%",
//                   fontSize: "clamp(8px, 1.15cqw, 17px)",
//                   fontWeight: 700,
//                   letterSpacing: "0.4px",
//                   color: "#0f172a",
//                   whiteSpace: "nowrap",
//                 }}
//               >
//                 {certificate.certificateId}
//               </div>

//               {/* Issue Date value */}
//               <div
//                 style={{
//                   position: "absolute",
//                   top: "13.8%",
//                   right: "9%",
//                   fontSize: "clamp(8px, 1.15cqw, 17px)",
//                   fontWeight: 700,
//                   letterSpacing: "0.4px",
//                   color: "#0f172a",
//                   whiteSpace: "nowrap",
//                 }}
//               >
//                 {certificate.issueDate}
//               </div>

//               {/* Student Name — sits just above the blank underline */}
//               <div
//                 style={{
//                   position: "absolute",
//                   top: "48%",
//                   left: "50%",
//                   transform: "translate(-50%, 0)",
//                   width: "62%",
//                   textAlign: "center",
//                   fontSize: "clamp(15px, 3cqw, 38px)",
//                   fontWeight: 700,
//                   color: "#081F5C",
//                   fontFamily: "'Great Vibes', 'Brush Script MT', cursive",
//                   lineHeight: 1.1,
//                 }}
//               >
//                 {certificate.studentName?.trim()}
//               </div>

//               {/* Course title pill — role/track ka naam */}
//               <div
//                 style={{
//                   position: "absolute",
//                   top: "58%",
//                   left: "50%",
//                   transform: "translateX(-50%)",
//                   background: "#081F5C",
//                   color: "#fff",
//                   fontWeight: 700,
//                   fontSize: "clamp(7px, 1.15cqw, 14px)",
//                   letterSpacing: "0.5px",
//                   textTransform: "uppercase",
//                   padding: "clamp(3px, 0.55cqw, 7px) clamp(10px, 1.8cqw, 22px)",
//                   borderRadius: "999px",
//                   whiteSpace: "nowrap",
//                 }}
//               >
//                 {courseTitle}
//               </div>

//               {/* Body — course-specific description */}
//               <div
//                 style={{
//                   position: "absolute",
//                   top: "64%",
//                   left: "50%",
//                   transform: "translateX(-50%)",
//                   width: "72%",
//                   textAlign: "center",
//                   fontSize: "clamp(7.5px, 1.25cqw, 15px)",
//                   lineHeight: 1.35,
//                   color: "#334155",
//                 }}
//               >
//                 {description}
//                 <br />
//                 <br />
//                 {/* <span style={{ fontSize: "clamp(7px, 1.1cqw, 13px)" }}>
//                   Mentor: <strong style={{ color: "#0f172a" }}>{certificate.mentor}</strong>
//                   &nbsp;&nbsp;|&nbsp;&nbsp; Director:{" "}
//                   <strong style={{ color: "#0f172a" }}>{certificate.director}</strong>
//                 </span> */}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </DashboardLayout>
//   );
// }



import { useEffect, useRef, useState, type CSSProperties } from "react";
import { useNavigate } from "react-router-dom";

import DashboardLayout from "../../../layouts/DashboardLayout";

import { ArrowLeft, Download } from "lucide-react";
import { toPng } from "html-to-image";

import { getMyCertificate } from "../../../api/certificate.api";
import type { CertificateData } from "../../../types/certificate";

// 👇 apni certificate background image ko assets mein daal kar path yaha set karo
import certificateBg from "../../../assets/certificate-bg.png";

// ─────────────────────────────────────────────────────────────
// Course-wise title + description templates
// certificate.course field se match hota hai (case-insensitive)
// ─────────────────────────────────────────────────────────────
const COURSE_TEMPLATES: Record<
  string,
  { title: string; description: (start: string, end: string) => string }
> = {
  "frontend development": {
    title: "Frontend Development",
    description: (start, end) =>
      `Has successfully completed an internship as a Frontend Developer Intern with Tiiron Technologies Pvt. Ltd. from ${start} to ${end}. During this period, the intern contributed to frontend development by building responsive user interfaces, implementing modern web technologies, integrating APIs, and collaborating within a product development environment. The intern demonstrated strong technical skills, creativity, teamwork, and problem-solving abilities. We wish them continued success in their future endeavors.`,
  },
  "python development": {
    title: "Python Development",
    description: (start, end) =>
      `Has successfully completed an internship as a Python Developer Intern with Tiiron Technologies Pvt. Ltd. from ${start} to ${end}. During this period, the intern worked on Python-based applications, API development, automation tasks, and backend programming while collaborating in a product-oriented development environment. The intern demonstrated strong technical proficiency, analytical thinking, teamwork, and problem-solving abilities. We wish them continued success in their future endeavors.`,
  },
  "data analytics & ai": {
    title: "Data Analytics & AI",
    description: (start, end) =>
      `Has successfully completed an internship as a Data Analytics & AI Intern with Tiiron Technologies Pvt. Ltd. from ${start} to ${end}. During this period, the intern worked with real-world datasets, performed data analysis and visualization, explored AI-driven solutions, and developed practical insights using modern analytics tools. The intern demonstrated strong analytical skills, technical competence, collaboration, and problem-solving abilities. We wish them continued success in their future endeavors.`,
  },
};

function getCourseContent(certificate: CertificateData) {
  const key = (certificate.course || "").trim().toLowerCase();
  const template = COURSE_TEMPLATES[key];

  if (template) {
    return {
      title: template.title,
      description: template.description(certificate.startDate, certificate.endDate),
    };
  }

  // Fallback agar course teeno mein se koi match na kare
  return {
    title: certificate.course,
    description: `Has successfully completed an internship as a ${certificate.role} with ${certificate.organization} from ${certificate.startDate} to ${certificate.endDate}. During this period, the intern contributed to real project work, collaborative workflows, and hands-on technical tasks, demonstrating strong dedication, technical skill, and professionalism throughout the internship.`,
  };
}

// ─────────────────────────────────────────────────────────────
// Certificate design ratio: bg image is 2000 x 1414 (~1.4145 : 1)
// containerType: "inline-size" + cqw units => font-size hamesha
// certificate CARD ki actual width se scale hota hai, viewport se nahi.
// Isse sidebar ho, split panel ho, chhota/bada phone/tablet/desktop —
// kahin bhi text aur bg image proportion mein hi rahenge.
// ─────────────────────────────────────────────────────────────
const outerStyle: CSSProperties = {
  containerType: "inline-size",
  width: "100%",
} as CSSProperties;

// image capture ke time outer container ko isi fixed width pe rakha
// jaata hai, taaki cqw-based font-size hamesha isi width se calculate
// ho — on-screen jo dikhta hai wahi download hota hai
const CAPTURE_WIDTH = 1200;

export default function InternshipCertificatePage() {
  const navigate = useNavigate();
  const certificateRef = useRef<HTMLDivElement>(null);
  const outerRef = useRef<HTMLDivElement>(null);

  const [certificate, setCertificate] = useState<CertificateData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [downloadingImage, setDownloadingImage] = useState(false);

  useEffect(() => {
    const fetchCertificate = async () => {
      try {
        const response = await getMyCertificate();
        const data = response.data;

        setCertificate({
          id: data._id,
          type: data.certificateType.toLowerCase(),

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
      link.download = `${(certificate.studentName || "Student").trim().replace(/\s+/g, "_")}-Internship-Certificate.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error("Failed to download certificate image:", err);
    } finally {
      setDownloadingImage(false);
    }
  };

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex justify-center items-center h-screen px-4 text-center">
          <h2 className="text-xl sm:text-2xl font-semibold">Loading Certificate...</h2>
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
              Your internship completion certificate will appear here once it has been issued by your organization.
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

  const { title: courseTitle, description } = getCourseContent(certificate);

  return (
    <DashboardLayout>
      <div className="bg-slate-100 min-h-screen -m-6 p-4 sm:p-8">
        {/* Header */}
        <div className="bg-white rounded-2xl sm:rounded-3xl shadow-sm border p-4 sm:p-8 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
          <div>
            <button
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 text-red-600 hover:text-red-700 mb-3 sm:mb-4 transition text-sm sm:text-base"
            >
              <ArrowLeft size={18} />
              Back
            </button>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold">
              Internship Certificate
            </h1>

            <p className="text-gray-500 mt-2 text-sm sm:text-base">
              View your internship completion certificate and download it as an image.
            </p>
          </div>

          <button
            onClick={downloadCertificateImage}
            disabled={downloadingImage}
            className="bg-red-600 hover:bg-red-700 disabled:opacity-60 disabled:cursor-not-allowed text-white px-5 sm:px-7 py-2.5 sm:py-3 rounded-xl flex items-center justify-center gap-2 sm:gap-3 transition text-sm sm:text-base self-start sm:self-auto"
          >
            <Download size={18} />
            {downloadingImage ? "Preparing..." : "Download Image"}
          </button>
        </div>

        {/* Certificate */}
        <div className="mt-6 sm:mt-8 bg-white rounded-2xl sm:rounded-3xl shadow-lg border p-3 sm:p-6">
          <div style={outerStyle} ref={outerRef}>
            <div
              id="certificate"
              ref={certificateRef}
              style={{
                position: "relative",
                width: "100%",
                maxWidth: 1200,
                margin: "0 auto",
                aspectRatio: "2000 / 1414",
                backgroundImage: `url(${certificateBg})`,
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
                  color: "#0f172a",
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
                  right: "9%",
                  fontSize: "clamp(8px, 1.15cqw, 17px)",
                  fontWeight: 700,
                  letterSpacing: "0.4px",
                  color: "#0f172a",
                  whiteSpace: "nowrap",
                }}
              >
                {certificate.issueDate}
              </div>

              {/* Student Name — sits just above the blank underline */}
              <div
                style={{
                  position: "absolute",
                  top: "48%",
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
              </div>

              {/* Course title pill — role/track ka naam */}
              <div
                style={{
                  position: "absolute",
                  top: "58%",
                  left: "50%",
                  transform: "translateX(-50%)",
                  background: "#081F5C",
                  color: "#fff",
                  fontWeight: 700,
                  fontSize: "clamp(7px, 1.15cqw, 14px)",
                  letterSpacing: "0.5px",
                  textTransform: "uppercase",
                  padding: "clamp(3px, 0.55cqw, 7px) clamp(10px, 1.8cqw, 22px)",
                  borderRadius: "999px",
                  whiteSpace: "nowrap",
                }}
              >
                {courseTitle}
              </div>

              {/* Body — course-specific description */}
              <div
                style={{
                  position: "absolute",
                  top: "64%",
                  left: "50%",
                  transform: "translateX(-50%)",
                  width: "72%",
                  textAlign: "center",
                  fontSize: "clamp(7.5px, 1.25cqw, 15px)",
                  lineHeight: 1.35,
                  color: "#334155",
                }}
              >
                {description}
                <br />
                <br />
                {/* <span style={{ fontSize: "clamp(7px, 1.1cqw, 13px)" }}>
                  Mentor: <strong style={{ color: "#0f172a" }}>{certificate.mentor}</strong>
                  &nbsp;&nbsp;|&nbsp;&nbsp; Director:{" "}
                  <strong style={{ color: "#0f172a" }}>{certificate.director}</strong>
                </span> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}