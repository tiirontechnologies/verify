import { useEffect, useState } from "react";
import DashboardLayout from "../../../layouts/DashboardLayout";

import { documentTemplateApi } from "../../../api/documentTemplateApi";

import CertificateTemplateHero from "../components/certificateTemplates/CertificateTemplateHero";
import TemplateCards from "../components/certificateTemplates/TemplateCards";
import ImportTemplateModal from "../components/certificateTemplates/ImportTemplateModal";
import FabricEditor from "../components/documentTemplate/editor/FabricEditor";
import { useNavigate } from "react-router-dom";

function readTemplateList(responseData: any): any[] {
  const payload = responseData?.templates ??
    responseData?.data?.templates ??
    responseData?.data ??
    responseData?.template ??
    responseData;
  if (Array.isArray(payload)) return payload;
  return payload && typeof payload === "object" && payload._id ? [payload] : [];
}

export default function CertificateTemplatesPage() {
  const [templates, setTemplates] = useState<any[]>([]);
  const [selectedTemplate, setSelectedTemplate] = useState<any>(null);
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [editingTemplate, setEditingTemplate] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchTemplates = async (showLoading = true) => {
    try {
      if (showLoading) setLoading(true);

      const { data } = await documentTemplateApi.getTemplates();
      const templateList = readTemplateList(data);

      setTemplates(templateList);

      if (templateList.length > 0) {
        setSelectedTemplate((prev: any) => {
          if (!prev) return templateList[0];
          return (
            templateList.find((item: any) => item._id === prev._id) || templateList[0]
          );
        });
      } else {
        setSelectedTemplate(null);
      }
    } catch (error) {
      console.error("Failed to fetch templates:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (template: any) => {
    if (!template) return;

    const confirmed = window.confirm(
      `Are you sure you want to delete "${template.name}"?`
    );

    if (!confirmed) return;

    try {
      await documentTemplateApi.deleteTemplate(template._id);
      await fetchTemplates();
    } catch (error) {
      console.error("Failed to delete template:", error);
    }
  };

  const handleSetDefault = async (template: any) => {
    if (!template) return;
    try {
      await documentTemplateApi.setDefaultTemplate(template._id);
      await fetchTemplates();
    } catch (error) {
      console.error("Failed to set default template:", error);
    }
  };

  useEffect(() => {
    let isMounted = true;

    documentTemplateApi
      .getTemplates()
      .then(({ data }) => {
        if (!isMounted) return;
        const templateList = readTemplateList(data);
        setTemplates(templateList);

        if (templateList.length > 0) {
          setSelectedTemplate((prev: any) => {
            if (!prev) return templateList[0];
            return (
              templateList.find((item: any) => item._id === prev._id) || templateList[0]
            );
          });
        } else {
          setSelectedTemplate(null);
        }
      })
      .catch((error) => {
        console.error("Failed to fetch templates:", error);
      })
      .finally(() => {
        if (isMounted) {
          setLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  if (isEditorOpen) {
    return (
      <FabricEditor
        template={editingTemplate}
        onBack={() => {
          setIsEditorOpen(false);
          fetchTemplates();
        }}
      />
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <CertificateTemplateHero
          onCreateTemplate={() => {
            setEditingTemplate(null);
            setIsEditorOpen(true);
          }}
          onImportTemplate={() => {
            setIsModalOpen(true);
          }}
        />

        <TemplateCards
          templates={templates}
          selectedTemplate={selectedTemplate}
          onSelect={setSelectedTemplate}
          onPreview={(template) => navigate(`/certificate-templates/${template._id}`)}
          onEdit={async (template) => {
            try {
              const { data } = await documentTemplateApi.getTemplateById(template._id);
              const fullTemplate = data.template || data;
              if (!fullTemplate?.design?.data) {
                window.alert("This template has no saved canvas data yet, so it was not opened in edit mode.");
                return;
              }
              setEditingTemplate(fullTemplate);
              setIsEditorOpen(true);
            } catch (error) {
              console.error("Failed to load the full template before editing:", error);
              window.alert("Could not load this template's saved design. Please try again.");
            }
          }}
          onDelete={(template) => handleDelete(template)}
          onSetDefault={(template) => handleSetDefault(template)}
          loading={loading}
        />

        <ImportTemplateModal
          open={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSuccess={fetchTemplates}
        />
      </div>
    </DashboardLayout>
  );
}
