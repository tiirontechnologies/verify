import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FileBadge2, CheckCircle2 } from "lucide-react";
import { documentTemplateApi } from "../../../api/documentTemplateApi";
import FabricCertificateRenderer from "../../student/components/FabricCertificateRenderer";
import DocumentHeader from "../../../components/shared/DocumentHeader";
import DashboardLayout from "../../../layouts/DashboardLayout";

const SAMPLE_PREVIEW_STUDENT = {
  studentName: "Rahul Sharma",
  email: "rahul.sharma@example.com",
  course: "Full Stack Web Development",
  role: "Software Developer Intern",
  certificateId: "TIIRON-2026-98421",
  issueDate: "02 August 2026",
  startDate: "01 February 2026",
  endDate: "01 August 2026",
  organization: "Tiiron Technologies Pvt. Ltd.",
  mentor: "Dr. Ananya Verma",
  director: "Nitesh Singh",
};

export default function TemplatePreviewPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [template, setTemplate] = useState<any>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    let isMounted = true;

    documentTemplateApi
      .getTemplateById(id)
      .then(({ data }) => {
        if (isMounted) {
          setTemplate(data.template);
        }
      })
      .catch((error) => {
        console.error("Failed to load template:", error);
      })
      .finally(() => {
        if (isMounted) {
          setLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [id]);

  if (loading) {
    return (
      <DashboardLayout><div className="min-h-[70vh] bg-gray-100 flex items-center justify-center p-6">
        <div className="flex flex-col items-center">
          <div className="h-16 w-16 animate-spin rounded-full border-4 border-red-600 border-t-transparent"></div>
          <p className="mt-4 font-semibold text-gray-700">Loading Template Preview...</p>
        </div>
      </div></DashboardLayout>
    );
  }

  if (!template) {
    return (
      <DashboardLayout><div className="min-h-[70vh] bg-gray-100 flex items-center justify-center p-6">
        <div className="text-center">
          <FileBadge2 size={60} className="mx-auto text-gray-300" />
          <h2 className="mt-4 text-2xl font-bold text-gray-800">Template Not Found</h2>
          <button
            onClick={() => navigate(-1)}
            className="mt-6 rounded-xl bg-red-600 px-6 py-2.5 font-semibold text-white hover:bg-red-700 cursor-pointer"
          >
            Go Back
          </button>
        </div>
      </div></DashboardLayout>
    );
  }

  return (
    <DashboardLayout><div className="min-h-screen bg-slate-100 -m-4 p-4 space-y-6 md:-m-8 md:p-8">
      <div className="max-w-7xl mx-auto">
        <DocumentHeader
          title={template.name}
          subtitle={`Live sample preview of document template.`}
          docType={template.documentType}
          backText="Back to Templates"
          actions={
            <span className="inline-flex items-center gap-1.5 rounded-full bg-green-50 px-3 py-1 text-xs font-semibold text-green-700 border border-green-200">
              <CheckCircle2 size={14} /> Active Template
            </span>
          }
        />
      </div>

      {/* Render Canvas Preview */}
      <div className="max-w-7xl mx-auto">
        <FabricCertificateRenderer
          templateData={{
            ...(template.design?.data || { objects: [], width: 1056, height: 747 }),
            objects: Array.isArray(template.design?.data?.objects)
              ? template.design.data.objects
              : [],
            width: Number(template.design?.data?.width) || 1056,
            height: Number(template.design?.data?.height) || 747,
            orientation:
              template.design?.orientation ||
              template.design?.data?.orientation ||
              "landscape",
          }}
          studentData={SAMPLE_PREVIEW_STUDENT}
          hideHeader={true}
          templateName={template.name}
          documentType={template.documentType}
        />
      </div>
    </div></DashboardLayout>
  );
}
