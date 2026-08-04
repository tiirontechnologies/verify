import { useEffect, useState } from "react";
import DashboardLayout from "../../../layouts/DashboardLayout";

import { documentTemplateApi } from "../../../api/documentTemplateApi";

import CertificateTemplateHero from "../components/certificateTemplates/CertificateTemplateHero";
import TemplateCards from "../components/certificateTemplates/TemplateCards";
import ImportTemplateModal from "../components/certificateTemplates/ImportTemplateModal";
import FabricEditor from "../components/documentTemplate/editor/FabricEditor";
import { useNavigate } from "react-router-dom";

export default function CertificateTemplatesPage() {
  const [templates, setTemplates] = useState<any[]>([]);
  const [selectedTemplate, setSelectedTemplate] = useState<any>(null);
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [editingTemplate, setEditingTemplate] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchTemplates = async () => {
    try {
      setLoading(true);

      const { data } = await documentTemplateApi.getTemplates();
      const templateList = data.templates || [];

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
    fetchTemplates();
  }, []);

  if (isEditorOpen) {
    return (
      <DashboardLayout>
        <FabricEditor
          template={editingTemplate}
          onBack={() => {
            setIsEditorOpen(false);
            fetchTemplates();
          }}
        />
      </DashboardLayout>
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
          onEdit={(template) => {
            setEditingTemplate(template);
            setIsEditorOpen(true);
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