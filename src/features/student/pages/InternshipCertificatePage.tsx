import { useEffect, useRef, useState, type CSSProperties } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../../../layouts/DashboardLayout";
import { Download } from "lucide-react";
import { toPng } from "html-to-image";
import { getMyCertificate } from "../../../api/certificate.api";
import type { CertificateData } from "../../../types/certificate";
import certificateBg from "../../../assets/certificate-bg.png";
import FabricCertificateRenderer from "../components/FabricCertificateRenderer";
import DocumentHeader from "../../../components/shared/DocumentHeader";

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
          (c: any) => (c.certificateType || "").toLowerCase() === "internship"
        );

        if (!data) {
          setError("No Internship Certificate Found");
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

  const captureCertificate = async () => {
    if (!certificateRef.current || !outerRef.current) return null;

    await document.fonts.ready;

    const prevWidth = outerRef.current.style.width;
    const prevMaxWidth = outerRef.current.style.maxWidth;

    outerRef.current.style.width = `${CAPTURE_WIDTH}px`;
    outerRef.current.style.maxWidth = `${CAPTURE_WIDTH}px`;

    await new Promise((resolve) =>
      requestAnimationFrame(() => requestAnimationFrame(resolve))
    );

    const cqwElements = certificateRef.current.querySelectorAll<HTMLElement>(
      "[data-cqw-font]"
    );
    const restoreFns: Array<() => void> = [];

    cqwElements.forEach((el) => {
      const computed = window.getComputedStyle(el).fontSize;
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
            <div className="relative">
              <div className="h-20 w-20 rounded-full border-4 border-red-100"></div>
              <div className="absolute inset-0 h-20 w-20 rounded-full border-4 border-transparent border-t-red-600 animate-spin"></div>
            </div>
            <h2 className="mt-8 text-2xl font-bold text-gray-900">
              Loading Certificate
            </h2>
            <p className="mt-2 text-sm text-gray-500">
              Please wait while we securely prepare your certificate.
            </p>
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
            <h1 className="relative mt-6 text-2xl font-semibold text-slate-800">
              Certificate Not Yet Available
            </h1>
            <p className="relative mx-auto mt-4 max-w-2xl text-sm text-slate-500">
              {error}
            </p>
            <div className="relative mt-8">
              <button
                onClick={() => navigate(-1)}
                className="rounded-2xl bg-red-600 px-6 py-3 font-semibold text-white transition hover:bg-red-700 text-sm cursor-pointer"
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
        <div className="bg-slate-100 min-h-screen -m-6 p-4 sm:p-8 space-y-6">
          <DocumentHeader
            title="Internship Certificate"
            subtitle="View your official internship completion certificate."
            docType="internship"
            certificateId={certificate.certificateId}
          />

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
            hideHeader={true}
          />
        </div>
      </DashboardLayout>
    );
  }

  const { description, plainDescription } = getCourseContent(certificate);

  return (
    <DashboardLayout>
      <div className="bg-slate-100 min-h-screen -m-6 p-4 sm:p-8 space-y-6">
        <DocumentHeader
          title="Internship Certificate"
          subtitle="View your internship completion certificate and download it as an image."
          docType="internship"
          certificateId={certificate.certificateId}
          actions={
            <button
              onClick={downloadCertificateImage}
              disabled={downloadingImage}
              className="bg-red-600 hover:bg-red-700 disabled:opacity-60 text-white px-5 sm:px-7 py-2.5 sm:py-3.5 rounded-xl flex items-center justify-center gap-2 sm:gap-3 transition text-sm font-medium shadow-lg shadow-red-200 cursor-pointer"
            >
              <Download size={18} />
              {downloadingImage ? "Preparing..." : "Download Image"}
            </button>
          }
        />

        <div className="bg-white rounded-2xl sm:rounded-3xl shadow-lg border p-3 sm:p-6">
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
              <div
                data-cqw-font
                style={{
                  position: "absolute",
                  top: "13.8%",
                  left: "6%",
                  fontSize: "clamp(8px, 1.15cqw, 17px)",
                  fontWeight: 700,
                  letterSpacing: "0.4px",
                  color: "#081F5C",
                  whiteSpace: "nowrap",
                }}
              >
                {certificate.certificateId}
              </div>

              <div
                data-cqw-font
                style={{
                  position: "absolute",
                  top: "13.5%",
                  right: "7%",
                  fontSize: "clamp(8px, 1.15cqw, 17px)",
                  fontWeight: 700,
                  letterSpacing: "0.2px",
                  color: "#081F5C",
                  whiteSpace: "nowrap",
                }}
              >
                {certificate.issueDate}
              </div>

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
                  fontFamily: "'Great Vibes', 'Brush Script MT', cursive",
                  lineHeight: 1.5,
                }}
              >
                {certificate.studentName?.trim()}
              </div>

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
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
