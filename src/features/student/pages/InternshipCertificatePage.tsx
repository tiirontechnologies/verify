


// import { useEffect, useRef, useState, type CSSProperties } from "react";
// import { useNavigate } from "react-router-dom";

// import DashboardLayout from "../../../layouts/DashboardLayout";

// import { ArrowLeft, Download ,Award} from "lucide-react";
// import { toPng } from "html-to-image";

// import { getMyCertificate } from "../../../api/certificate.api";
// import type { CertificateData } from "../../../types/certificate";


// import certificateBg from "../../../assets/certificate-bg.png";


// // const COURSE_TEMPLATES: Record<
// //   string,
// //   { title: string; description: (start: string, end: string) => string }
// // > = {
// //   "frontend development": {
// //     title: "Frontend Development",
// //     description: (start, end) =>
// //       `Has successfully completed an internship as a Frontend Developer Intern with Tiiron Technologies Pvt. Ltd. from ${start} to ${end}. During this period, the intern contributed to frontend development by building responsive user interfaces, implementing modern web technologies, integrating APIs, and collaborating within a product development environment. The intern demonstrated strong technical skills, creativity, teamwork, and problem-solving abilities. We wish them continued success in their future endeavors.`,
// //   },
// //   "python development": {
// //     title: "Python Development",
// //     description: (start, end) =>
// //       `Has successfully completed an internship as a Python Developer Intern with Tiiron Technologies Pvt. Ltd. from ${start} to ${end}. During this period, the intern worked on Python-based applications, API development, automation tasks, and backend programming while collaborating in a product-oriented development environment. The intern demonstrated strong technical proficiency, analytical thinking, teamwork, and problem-solving abilities. We wish them continued success in their future endeavors.`,
// //   },
// //   "data analytics & ai": {
// //     title: "Data Analytics & AI",
// //     description: (start, end) =>
// //       `Has successfully completed an internship as a Data Analytics & AI Intern with Tiiron Technologies Pvt. Ltd. from ${start} to ${end}. During this period, the intern worked with real-world datasets, performed data analysis and visualization, explored AI-driven solutions, and developed practical insights using modern analytics tools. The intern demonstrated strong analytical skills, technical competence, collaboration, and problem-solving abilities. We wish them continued success in their future endeavors.`,
// //   },
// // };

// // function getCourseContent(certificate: CertificateData) {
// //   const key = (certificate.course || "").trim().toLowerCase();
// //   const template = COURSE_TEMPLATES[key];

// //   if (template) {
// //     return {
// //       title: template.title,
// //       description: template.description(certificate.startDate, certificate.endDate),
// //     };
// //   }

// //   // Fallback agar course teeno mein se koi match na kare
// //   return {
// //     title: certificate.course,
// //     description: `Has successfully completed an internship as a ${certificate.role} with ${certificate.organization} from ${certificate.startDate} to ${certificate.endDate}. During this period, the intern contributed to real project work, collaborative workflows, and hands-on technical tasks, demonstrating strong dedication, technical skill, and professionalism throughout the internship.`,
// //   };
// // }


// // ─────────────────────────────────────────────────────────────
// // Course-wise title + description templates
// // certificate.course field se match hota hai (case-insensitive)
// // ─────────────────────────────────────────────────────────────
// const COURSE_TEMPLATES: Record<
//   string,
//   { title: string; description: (start: string, end: string) => React.ReactNode }
// > = {
//   "frontend development": {
//     title: "Frontend Development",
//     description: (start, end) => (
//       <>
//         Has successfully completed an internship as a{" "}
//          <strong style={{ color: "#2E5A1C" }}>Frontend Developer Intern</strong> with{" "}
//          <strong style={{ color: "#2E5A1C" }}>Tiiron Technologies Pvt. Ltd.</strong> from {start} to {end}.
//         During this period, the intern contributed to frontend development by
//         building responsive user interfaces, implementing modern web
//         technologies, integrating APIs, and collaborating within a product
//         development environment. The intern demonstrated strong technical
//         skills, creativity, teamwork, and problem-solving abilities. We wish
//         them continued success in their future endeavors.
//       </>
//     ),
//   },
//   "python development": {
//     title: "Python Development",
//     description: (start, end) => (
//       <>
//         Has successfully completed an internship as a{" "}
//          <strong style={{ color: "#2E5A1C" }}>Python Developer Intern</strong> with{" "}
//          <strong style={{ color: "#2E5A1C" }}>Tiiron Technologies Pvt. Ltd.</strong> from {start} to {end}.
//         During this period, the intern worked on Python-based applications,
//         API development, automation tasks, and backend programming while
//         collaborating in a product-oriented development environment. The
//         intern demonstrated strong technical proficiency, analytical
//         thinking, teamwork, and problem-solving abilities. We wish them
//         continued success in their future endeavors.
//       </>
//     ),
//   },
//   "data analytics & ai": {
//     title: "Data Analytics & AI",
//     description: (start, end) => (
//       <>
//         Has successfully completed an internship as a{" "}
//          <strong style={{ color: "#2E5A1C" }}>Data Analytics & AI Intern</strong> with{" "}
//          <strong style={{ color: "#2E5A1C" }}>Tiiron Technologies Pvt. Ltd.</strong> from {start} to {end}.
//         During this period, the intern worked with real-world datasets,
//         performed data analysis and visualization, explored AI-driven
//         solutions, and developed practical insights using modern analytics
//         tools. The intern demonstrated strong analytical skills, technical
//         competence, collaboration, and problem-solving abilities. We wish
//         them continued success in their future endeavors.
//       </>
//     ),
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
//     description: (
//       <>
//         Has successfully completed an internship as a{" "}
//          <strong style={{ color: "#2E5A1C" }}>{certificate.role}</strong> with{" "}
//          <strong style={{ color: "#2E5A1C" }}>{certificate.organization}</strong> from {certificate.startDate}{" "}
//         to {certificate.endDate}. During this period, the intern contributed to
//         real project work, collaborative workflows, and hands-on technical
//         tasks, demonstrating strong dedication, technical skill, and
//         professionalism throughout the internship.
//       </>
//     ),
//   };
// }

// const outerStyle: CSSProperties = {
//   containerType: "inline-size",
//   width: "100%",
// } as CSSProperties;


// const CAPTURE_WIDTH = 1200;

// function getDescriptionFontClamp(plainDescription: string) {
//   const len = plainDescription.length;
//   if (len > 420) return "clamp(8px, 1.3cqw, 18px)";
//   if (len > 300) return "clamp(8.5px, 1.45cqw, 20px)";
//   return "clamp(9px, 1.45cqw, 22px)";
// }

// export default function InternshipCertificatePage() {
//   const navigate = useNavigate();
//   const certificateRef = useRef<HTMLDivElement>(null);
//   const outerRef = useRef<HTMLDivElement>(null);

//   const [certificate, setCertificate] = useState<CertificateData | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [downloadingImage, setDownloadingImage] = useState(false);

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

//   // outer container ko fixed width pe resize karke screenshot leta hai,
//   // taaki cqw-based font-size hamesha consistent calculate ho — fir
//   // original width wapas restore kar deta hai
//   // const captureCertificate = async () => {
//   //   if (!certificateRef.current || !outerRef.current) return null;

//   //   await document.fonts.ready;

//   //   const prevWidth = outerRef.current.style.width;
//   //   const prevMaxWidth = outerRef.current.style.maxWidth;

//   //   outerRef.current.style.width = `${CAPTURE_WIDTH}px`;
//   //   outerRef.current.style.maxWidth = `${CAPTURE_WIDTH}px`;

//   //   // browser ko container-query recalc karne ka time do
//   //   await new Promise((resolve) =>
//   //     requestAnimationFrame(() => requestAnimationFrame(resolve))
//   //   );

//   //   try {
//   //     return await toPng(certificateRef.current, {
//   //       quality: 1,
//   //       pixelRatio: 3,
//   //       cacheBust: true,
//   //       backgroundColor: "#ffffff",
//   //     });
//   //   } finally {
//   //     outerRef.current.style.width = prevWidth;
//   //     outerRef.current.style.maxWidth = prevMaxWidth;
//   //   }
//   // };

// //   const captureCertificate = async () => {
// //   if (!certificateRef.current || !outerRef.current) return null;

// //   // Explicitly force-load exact fonts/weights certificate me use ho rahe hain
// //   await Promise.all([
// //     document.fonts.load("400 16px Poppins"),
// //     document.fonts.load("500 16px Poppins"),
// //     document.fonts.load("700 16px Poppins"),
// //     document.fonts.load("700 16px 'Great Vibes'"),
// //   ]);
// //   await document.fonts.ready;

// //   const prevWidth = outerRef.current.style.width;
// //   const prevMaxWidth = outerRef.current.style.maxWidth;

// //   outerRef.current.style.width = `${CAPTURE_WIDTH}px`;
// //   outerRef.current.style.maxWidth = `${CAPTURE_WIDTH}px`;

// //   await new Promise((resolve) =>
// //     requestAnimationFrame(() => requestAnimationFrame(resolve))
// //   );

// //   try {
// //     return await toPng(certificateRef.current, {
// //       quality: 1,
// //       pixelRatio: 3,
// //       cacheBust: true,
// //       backgroundColor: "#ffffff",
// //     });
// //   } finally {
// //     outerRef.current.style.width = prevWidth;
// //     outerRef.current.style.maxWidth = prevMaxWidth;
// //   }
// // };
// const captureCertificate = async () => {
//   if (!certificateRef.current || !outerRef.current) return null;

//   await document.fonts.ready;

//   const prevWidth = outerRef.current.style.width;
//   const prevMaxWidth = outerRef.current.style.maxWidth;

//   outerRef.current.style.width = `${CAPTURE_WIDTH}px`;
//   outerRef.current.style.maxWidth = `${CAPTURE_WIDTH}px`;

//   // browser ko container-query recalc karne ka time do
//   await new Promise((resolve) =>
//     requestAnimationFrame(() => requestAnimationFrame(resolve))
//   );

//   // 👇 cqw-based font-size wale saare elements ka computed px value
//   // freeze kar do, taaki toPng ke rasterize-time cqw galat calculate
//   // na ho — capture ke baad original style wapas restore kar denge
//   const cqwElements = certificateRef.current.querySelectorAll<HTMLElement>(
//     "[data-cqw-font]"
//   );
//   const restoreFns: Array<() => void> = [];

//   cqwElements.forEach((el) => {
//     const computed = window.getComputedStyle(el).fontSize; // e.g. "18.4px"
//     const prevInlineFontSize = el.style.fontSize;
//     el.style.fontSize = computed;
//     restoreFns.push(() => {
//       el.style.fontSize = prevInlineFontSize;
//     });
//   });

//   try {
//     return await toPng(certificateRef.current, {
//       quality: 1,
//       pixelRatio: 3,
//       cacheBust: true,
//       backgroundColor: "#ffffff",
//     });
//   } finally {
//     restoreFns.forEach((fn) => fn());
//     outerRef.current.style.width = prevWidth;
//     outerRef.current.style.maxWidth = prevMaxWidth;
//   }
// };
//   const downloadCertificateImage = async () => {
//     if (!certificate) return;

//     setDownloadingImage(true);
//     try {
//       const dataUrl = await captureCertificate();
//       if (!dataUrl) return;

//       const link = document.createElement("a");
//       link.download = `${(certificate.studentName || "Student").trim().replace(/\s+/g, "_")}-Internship-Certificate.png`;
//       link.href = dataUrl;
//       link.click();
//     } catch (err) {
//       console.error("Failed to download certificate image:", err);
//     } finally {
//       setDownloadingImage(false);
//     }
//   };

//   if (loading) {
//     return (
//       <DashboardLayout>
//         <div className="flex min-h-[70vh] items-center justify-center px-4">
//   <div className="flex flex-col items-center">
//     {/* Loader */}
//     <div className="relative">
//       <div className="h-20 w-20 rounded-full border-4 border-red-100"></div>

//       <div className="absolute inset-0 h-20 w-20 rounded-full border-4 border-transparent border-t-red-600 animate-spin"></div>

//       <div className="absolute inset-3 h-14 w-14 rounded-full border-4 border-transparent border-b-red-500 animate-spin [animation-direction:reverse] [animation-duration:1.5s]"></div>

//       <div className="absolute inset-0 flex items-center justify-center">
//         <svg
//           xmlns="http://www.w3.org/2000/svg"
//           className="h-8 w-8 text-red-600"
//           fill="none"
//           viewBox="0 0 24 24"
//           stroke="currentColor"
//           strokeWidth={2}
//         >
//           <path
//             strokeLinecap="round"
//             strokeLinejoin="round"
//             d="M9 12h6m-6 4h6M7 4h10a2 2 0 012 2v12a2 2 0 01-2 2H7a2 2 0 01-2-2V6a2 2 0 012-2z"
//           />
//         </svg>
//       </div>
//     </div>

//     {/* Text */}
//     <h2 className="mt-8 text-2xl font-bold text-gray-900">
//       Loading Certificate
//     </h2>

//     <p className="mt-2 text-sm text-gray-500">
//       Please wait while we securely prepare your certificate.
//     </p>

//     {/* Animated Dots */}
//     <div className="mt-6 flex gap-2">
//       <span className="h-2.5 w-2.5 rounded-full bg-red-600 animate-bounce"></span>
//       <span className="h-2.5 w-2.5 rounded-full bg-red-500 animate-bounce delay-150"></span>
//       <span className="h-2.5 w-2.5 rounded-full bg-red-400 animate-bounce delay-300"></span>
//     </div>
//   </div>
// </div>
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

//   const { description } = getCourseContent(certificate);
//   // const { description, plainDescription } = getTrainingContent(certificate);

//   return (
//     <DashboardLayout>
//       <div className="bg-slate-100 min-h-screen -m-6 p-4 sm:p-8">
//         {/* Header */}
//         {/* <div className="bg-white rounded-2xl sm:rounded-3xl shadow-sm border p-4 sm:p-8 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
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
//               View your internship completion certificate and download it as an image.
//             </p>
//           </div>

//           <button
//             onClick={downloadCertificateImage}
//             disabled={downloadingImage}
//             className="bg-red-600 hover:bg-red-700 disabled:opacity-60 disabled:cursor-not-allowed text-white px-5 sm:px-7 py-2.5 sm:py-3 rounded-xl flex items-center justify-center gap-2 sm:gap-3 transition text-sm sm:text-base self-start sm:self-auto"
//           >
//             <Download size={18} />
//             {downloadingImage ? "Preparing..." : "Download Image"}
//           </button>
//         </div> */}

// <div className="bg-white rounded-2xl sm:rounded-3xl shadow-sm border overflow-hidden">
//   {/* Top strip with gradient + back button */}
//   <div className="bg-gradient-to-r from-red-50 via-orange-50/60 to-white px-4 sm:px-8 py-3 sm:py-4">
//     <button
//       onClick={() => navigate(-1)}
//       className="flex items-center gap-2 text-red-600 hover:text-red-700 transition text-sm sm:text-base font-medium"
//     >
//       <ArrowLeft size={18} />
//       Back
//     </button>
//   </div>

//   {/* Main content row */}
//   <div className="px-4 sm:px-8 pb-5 sm:pb-8 pt-1 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-5">
//     <div className="flex items-start gap-3 sm:gap-4">
//       <div className="shrink-0 w-11 h-11 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl bg-orange-100 flex items-center justify-center">
//         <Award size={22} className="text-red-600 sm:hidden" />
//         <Award size={26} className="text-red-600 hidden sm:block" />
//       </div>

//       <div>
//         <h1 className="text-xl sm:text-3xl lg:text-4xl font-bold text-gray-900">
//           Internship Certificate
//         </h1>
//         <p className="text-gray-500 mt-1 sm:mt-2 text-sm sm:text-base">
//           View your internship completion certificate and download it as an image.
//         </p>
//       </div>
//     </div>

//     <button
//       onClick={downloadCertificateImage}
//       disabled={downloadingImage}
//       className="bg-gradient-to-b from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 disabled:opacity-60 disabled:cursor-not-allowed text-white px-5 sm:px-7 py-2.5 sm:py-3 rounded-xl sm:rounded-2xl flex items-center justify-center gap-2 sm:gap-3 transition text-sm sm:text-base font-medium shadow-lg shadow-red-200 self-start sm:self-auto"
//     >
//       <Download size={18} />
//       {downloadingImage ? "Preparing..." : "Download Image"}
//     </button>
//   </div>
// </div>
        

//         {/* Certificate */}
//         <div className="mt-6 sm:mt-8 bg-white rounded-2xl sm:rounded-3xl shadow-lg border p-3 sm:p-6">
//           <div style={outerStyle} ref={outerRef}>
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
//               data-cqw-font
//                 style={{
//                   position: "absolute",
//                   top: "13.8%",
//                   left: "6%",
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
//               data-cqw-font
//                 style={{
//                   position: "absolute",
//                   top: "13.5%",
//                   right: "7%",
//                   fontSize: "clamp(8px, 1.15cqw, 17px)",
//                   fontWeight: 700,
//                   letterSpacing: "0.2px",
//                   color: "#0f172a",
//                   whiteSpace: "nowrap",
//                 }}
//               >
//                 {certificate.issueDate}
//               </div>

//               {/* Student Name — sits just above the blank underline */}
//               <div
//               data-cqw-font
//                 style={{
//                   position: "absolute",
//                   top: "44%",
//                   left: "50%",
//                   transform: "translate(-50%, 0)",
//                   width: "62%",
//                   textAlign: "center",
//                   fontSize: "clamp(15px, 3cqw, 48px)",
//                   fontWeight: 700,
//                   color: "#081F5C",
//                   fontFamily: "'Great Vibes', 'Brush Script MT', cursive",
//                   lineHeight: 1.5,
//                 }}
//               >
//                 {certificate.studentName?.trim()}
//               </div>

//               {/* Course title pill — role/track ka naam */}
//               {/* <div
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
//               </div> */}

//               {/* Body — course-specific description */}
//               <div
//               data-cqw-font
//                 style={{
//                   position: "absolute",
//                   top: "55%",
//                   left: "50%",
//                   transform: "translateX(-50%)",
//                   width: "70%",
//                   textAlign: "center",
//                   //  fontSize: "clamp(7.8px, 1.15cqw, 26px)",
//                   fontSize: getDescriptionFontClamp(plainDescription)
//                   lineHeight: 1.65,
//                   color: "#4D742B",
//                   //  fontFamily: "'Poppins', Arial, sans-serif",
//                   fontFamily: "'Poppins', Arial, sans-serif",
// letterSpacing: "0.2px",
// fontWeight: 500,
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

import { ArrowLeft, Download, Award } from "lucide-react";
import { toPng } from "html-to-image";

import { getMyCertificate } from "../../../api/certificate.api";
import type { CertificateData } from "../../../types/certificate";

import certificateBg from "../../../assets/certificate-bg.png";

// ─────────────────────────────────────────────────────────────
// Course-wise title + description templates
// certificate.course field se match hota hai (case-insensitive)
// ─────────────────────────────────────────────────────────────
const COURSE_TEMPLATES: Record<
  string,
  {
    title: string;
    plainDescription: (start: string, end: string) => string;
    description: (start: string, end: string) => React.ReactNode;
  }
> = {
  "frontend development": {
    title: "Frontend Development",
    plainDescription: (start, end) =>
      `Has successfully completed an internship as a Frontend Developer Intern with Tiiron Technologies Pvt. Ltd. from ${start} to ${end}. During this period, the intern contributed to frontend development by building responsive user interfaces, implementing modern web technologies, integrating APIs, and collaborating within a product development environment. The intern demonstrated strong technical skills, creativity, teamwork, and problem-solving abilities. We wish them continued success in their future endeavors.`,
    description: (start, end) => (
      <>
        Has successfully completed an internship as a{" "}
        <strong style={{ color: "#2E5A1C" }}>Frontend Developer Intern</strong> with{" "}
        <strong style={{ color: "#2E5A1C" }}>Tiiron Technologies Pvt. Ltd.</strong> from {start} to {end}.
        During this period, the intern contributed to frontend development by
        building responsive user interfaces, implementing modern web
        technologies, integrating APIs, and collaborating within a product
        development environment. The intern demonstrated strong technical
        skills, creativity, teamwork, and problem-solving abilities. We wish
        them continued success in their future endeavors.
      </>
    ),
  },
  "python development": {
    title: "Python Development",
    plainDescription: (start, end) =>
      `Has successfully completed an internship as a Python Developer Intern with Tiiron Technologies Pvt. Ltd. from ${start} to ${end}. During this period, the intern worked on Python-based applications, API development, automation tasks, and backend programming while collaborating in a product-oriented development environment. The intern demonstrated strong technical proficiency, analytical thinking, teamwork, and problem-solving abilities. We wish them continued success in their future endeavors.`,
    description: (start, end) => (
      <>
        Has successfully completed an internship as a{" "}
        <strong style={{ color: "#2E5A1C" }}>Python Developer Intern</strong> with{" "}
        <strong style={{ color: "#2E5A1C" }}>Tiiron Technologies Pvt. Ltd.</strong> from {start} to {end}.
        During this period, the intern worked on Python-based applications,
        API development, automation tasks, and backend programming while
        collaborating in a product-oriented development environment. The
        intern demonstrated strong technical proficiency, analytical
        thinking, teamwork, and problem-solving abilities. We wish them
        continued success in their future endeavors.
      </>
    ),
  },
  "data analytics & ai": {
    title: "Data Analytics & AI",
    plainDescription: (start, end) =>
      `Has successfully completed an internship as a Data Analytics & AI Intern with Tiiron Technologies Pvt. Ltd. from ${start} to ${end}. During this period, the intern worked with real-world datasets, performed data analysis and visualization, explored AI-driven solutions, and developed practical insights using modern analytics tools. The intern demonstrated strong analytical skills, technical competence, collaboration, and problem-solving abilities. We wish them continued success in their future endeavors.`,
    description: (start, end) => (
      <>
        Has successfully completed an internship as a{" "}
        <strong style={{ color: "#2E5A1C" }}>Data Analytics & AI Intern</strong> with{" "}
        <strong style={{ color: "#2E5A1C" }}>Tiiron Technologies Pvt. Ltd.</strong> from {start} to {end}.
        During this period, the intern worked with real-world datasets,
        performed data analysis and visualization, explored AI-driven
        solutions, and developed practical insights using modern analytics
        tools. The intern demonstrated strong analytical skills, technical
        competence, collaboration, and problem-solving abilities. We wish
        them continued success in their future endeavors.
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

function getCourseContent(certificate: CertificateData) {
  const key = (certificate.course || "").trim().toLowerCase();
  const template = COURSE_TEMPLATES[key];

  if (template) {
    return {
      title: template.title,
      plainDescription: template.plainDescription(certificate.startDate, certificate.endDate),
      description: template.description(certificate.startDate, certificate.endDate),
    };
  }

  // Fallback agar course teeno mein se koi match na kare
  const plainDescription = `Has successfully completed an internship as a ${certificate.role} with ${certificate.organization} from ${certificate.startDate} to ${certificate.endDate}. During this period, the intern contributed to real project work, collaborative workflows, and hands-on technical tasks, demonstrating strong dedication, technical skill, and professionalism throughout the internship.`;

  return {
    title: certificate.course,
    plainDescription,
    description: (
      <>
        Has successfully completed an internship as a{" "}
        <strong style={{ color: "#2E5A1C" }}>{certificate.role}</strong> with{" "}
        <strong style={{ color: "#2E5A1C" }}>{certificate.organization}</strong> from {certificate.startDate}{" "}
        to {certificate.endDate}. During this period, the intern contributed to
        real project work, collaborative workflows, and hands-on technical
        tasks, demonstrating strong dedication, technical skill, and
        professionalism throughout the internship.
      </>
    ),
  };
}

const outerStyle: CSSProperties = {
  containerType: "inline-size",
  width: "100%",
} as CSSProperties;

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

    // 👇 cqw-based font-size wale saare elements ka computed px value
    // freeze kar do, taaki toPng ke rasterize-time cqw galat calculate
    // na ho — capture ke baad original style wapas restore kar denge
    const cqwElements = certificateRef.current.querySelectorAll<HTMLElement>(
      "[data-cqw-font]"
    );
    const restoreFns: Array<() => void> = [];

    cqwElements.forEach((el) => {
      const computed = window.getComputedStyle(el).fontSize; // e.g. "18.4px"
      const prevInlineFontSize = el.style.fontSize;
      el.style.fontSize = computed;
      restoreFns.push(() => {
        el.style.fontSize = prevInlineFontSize;
      });
    });

    try {
      return await toPng(certificateRef.current, {
        quality: 1,
        pixelRatio: 3,
        cacheBust: true,
        backgroundColor: "#ffffff",
      });
    } finally {
      restoreFns.forEach((fn) => fn());
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

  const { description, plainDescription } = getCourseContent(certificate);

  return (
    <DashboardLayout>
      <div className="bg-slate-100 min-h-screen -m-6 p-4 sm:p-8">
        {/* Header */}
        <div className="bg-white rounded-2xl sm:rounded-3xl shadow-sm border overflow-hidden">
          {/* Top strip with gradient + back button */}
          <div className="bg-gradient-to-r from-red-50 via-orange-50/60 to-white px-4 sm:px-8 py-3 sm:py-4">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 text-red-600 hover:text-red-700 transition text-sm sm:text-base font-medium"
            >
              <ArrowLeft size={18} />
              Back
            </button>
          </div>

          {/* Main content row */}
          <div className="px-4 sm:px-8 pb-5 sm:pb-8 pt-1 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-5">
            <div className="flex items-start gap-3 sm:gap-4">
              <div className="shrink-0 w-11 h-11 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl bg-orange-100 flex items-center justify-center">
                <Award size={22} className="text-red-600 sm:hidden" />
                <Award size={26} className="text-red-600 hidden sm:block" />
              </div>

              <div>
                <h1 className="text-xl sm:text-3xl lg:text-4xl font-bold text-gray-900">
                  Internship Certificate
                </h1>
                <p className="text-gray-500 mt-1 sm:mt-2 text-sm sm:text-base">
                  View your internship completion certificate and download it as an image.
                </p>
              </div>
            </div>

            <button
              onClick={downloadCertificateImage}
              disabled={downloadingImage}
              className="bg-gradient-to-b from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 disabled:opacity-60 disabled:cursor-not-allowed text-white px-5 sm:px-7 py-2.5 sm:py-3 rounded-xl sm:rounded-2xl flex items-center justify-center gap-2 sm:gap-3 transition text-sm sm:text-base font-medium shadow-lg shadow-red-200 self-start sm:self-auto"
            >
              <Download size={18} />
              {downloadingImage ? "Preparing..." : "Download Image"}
            </button>
          </div>
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
                data-cqw-font
                style={{
                  position: "absolute",
                  top: "13.8%",
                  left: "6%",
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
                data-cqw-font
                style={{
                  position: "absolute",
                  top: "13.5%",
                  right: "7%",
                  fontSize: "clamp(8px, 1.15cqw, 17px)",
                  fontWeight: 700,
                  letterSpacing: "0.2px",
                  // color: "#0f172a",
                  color: "#081F5C",
                  whiteSpace: "nowrap",
                }}
              >
                {certificate.issueDate}
              </div>

              {/* Student Name — sits just above the blank underline */}
              <div
                data-cqw-font
                style={{
                  position: "absolute",
                  top: "43%",
                  left: "50%",
                  transform: "translate(-50%, 0)",
                  width: "62%",
                  textAlign: "center",
                  fontSize: "clamp(15px, 3cqw, 48px)",
                  fontWeight: 700,
                  
                  color: "#081F5C",
                  // color: "#223B72",
                  fontFamily: "'Great Vibes', 'Brush Script MT', cursive",
                  lineHeight: 1.5,
                }}
              >
                {certificate.studentName?.trim()}
              </div>

              {/* Body — course-specific description */}
              <div
                data-cqw-font
                style={{
                  position: "absolute",
                  top: "56%",
                  left: "50%",
                  transform: "translateX(-50%)",
                  width: "72%",
                  textAlign: "center",
                  fontSize: getDescriptionFontClamp(plainDescription),
                  lineHeight: 1.65,
                  color: "#4D742B",
                  fontFamily: "'Poppins', Arial, sans-serif",
                  letterSpacing: "0.2px",
                  fontWeight: 400,
                }}
              >
                {description}
                <br />
                <br />
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}