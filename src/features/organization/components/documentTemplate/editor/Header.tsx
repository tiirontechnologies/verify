import { useState, useEffect } from "react";
import { useFabric } from "./FabricContext";
import { FabricToolService } from "./services/FabricToolService";
import { documentTemplateApi } from "../../../../../api/documentTemplateApi";
import { Save, ArrowLeft, Trash2, CheckCircle, AlertCircle } from "lucide-react";

interface HeaderProps {
  template?: any;
  onBack: () => void;
}

export default function Header({ template, onBack }: HeaderProps) {
  const { canvas, orientation, setOrientation } = useFabric();
  const [isSaveModalOpen, setIsSaveModalOpen] = useState(false);
  const [templateName, setTemplateName] = useState(template?.name || "");
  const [documentType, setDocumentType] = useState(template?.documentType || "internship");
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  useEffect(() => {
    if (template) {
      setTemplateName(template.name || "");
      setDocumentType(template.documentType || "internship");
    } else {
      setTemplateName("");
      setDocumentType("internship");
    }
  }, [template]);

  const handleSave = async () => {
    if (!canvas) return;
    if (!templateName.trim()) {
      setMessage({ type: "error", text: "Please enter a template name." });
      return;
    }

    setSaving(true);
    setMessage(null);

    try {
      const canvasJson = canvas.toJSON();
      (canvasJson as any).orientation = orientation;

      if (template?._id) {
        await documentTemplateApi.updateCanvasTemplate(template._id, {
          name: templateName,
          documentType,
          design: {
            editor: "fabric",
            version: "1.0",
            orientation,
            data: canvasJson,
          },
        });
      } else {
        await documentTemplateApi.saveCanvasTemplate({
          name: templateName,
          documentType,
          status: "active",
          design: {
            editor: "fabric",
            version: "1.0",
            orientation,
            data: canvasJson,
          },
        });
      }

      setMessage({ type: "success", text: "Template saved successfully!" });
      setTimeout(() => {
        setIsSaveModalOpen(false);
        onBack();
      }, 1000);
    } catch (err: any) {
      console.error("Save error:", err);
      setMessage({
        type: "error",
        text: err.response?.data?.message || "Failed to save template.",
      });
    } finally {
      setSaving(false);
    }
  };

  return (
    <>
      <header className="flex h-16 items-center justify-between border-b bg-white px-6 shadow-sm">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="flex items-center gap-1.5 rounded-lg border border-gray-200 px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-50 transition"
          >
            <ArrowLeft size={16} /> Back
          </button>
          <div>
            <h1 className="text-base font-bold text-gray-900">
              {template?.name ? `Editing: ${template.name}` : "Certificate Template Builder"}
            </h1>
            <span className="text-xs text-gray-400">Fabric.js Canvas Engine</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* Orientation Switcher */}
          <div className="flex items-center rounded-xl border border-gray-200 bg-gray-50 p-1 text-xs font-semibold">
            <button
              onClick={() => setOrientation("landscape")}
              className={`px-3 py-1 rounded-lg transition ${
                orientation === "landscape"
                  ? "bg-white text-red-600 shadow-sm font-bold"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Landscape (1056x747)
            </button>
            <button
              onClick={() => setOrientation("portrait")}
              className={`px-3 py-1 rounded-lg transition ${
                orientation === "portrait"
                  ? "bg-white text-red-600 shadow-sm font-bold"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Portrait (747x1056)
            </button>
          </div>

          <button
            onClick={() => {
              if (!canvas) return;
              FabricToolService.deleteSelected(canvas);
            }}
            className="flex items-center gap-1.5 rounded-lg border border-gray-200 px-3.5 py-2 text-sm font-medium text-gray-700 hover:bg-red-50 hover:text-red-600 transition"
          >
            <Trash2 size={16} /> Delete Object
          </button>

          <button
            onClick={() => setIsSaveModalOpen(true)}
            className="flex items-center gap-1.5 rounded-xl bg-red-600 px-5 py-2 text-sm font-semibold text-white shadow-md hover:bg-red-700 transition"
          >
            <Save size={16} /> Save Template
          </button>
        </div>
      </header>

      {/* Save Modal */}
      {isSaveModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl space-y-5">
            <div>
              <h2 className="text-lg font-bold text-gray-900">Save Certificate Template</h2>
              <p className="text-xs text-gray-500 mt-1">
                Enter template details to store this design in MongoDB.
              </p>
            </div>

            {message && (
              <div
                className={`flex items-center gap-2 rounded-xl p-3 text-xs font-medium ${
                  message.type === "success"
                    ? "bg-green-50 text-green-700 border border-green-200"
                    : "bg-red-50 text-red-700 border border-red-200"
                }`}
              >
                {message.type === "success" ? <CheckCircle size={16} /> : <AlertCircle size={16} />}
                {message.text}
              </div>
            )}

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Template Name *
                </label>
                <input
                  type="text"
                  value={templateName}
                  onChange={(e) => setTemplateName(e.target.value)}
                  placeholder="e.g. Official Internship Certificate 2026"
                  className="w-full rounded-xl border border-gray-300 px-3.5 py-2.5 text-sm focus:border-red-500 focus:ring-1 focus:ring-red-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Document Type *
                </label>
                <select
                  value={documentType}
                  onChange={(e) => setDocumentType(e.target.value)}
                  className="w-full rounded-xl border border-gray-300 px-3.5 py-2.5 text-sm focus:border-red-500 focus:ring-1 focus:ring-red-500 outline-none bg-white"
                >
                  <option value="internship">Internship Certificate</option>
                  <option value="training">Training Certificate</option>
                  <option value="offer-letter">Offer Letter</option>
                  <option value="appreciation-letter">Appreciation Letter</option>
                  <option value="custom">Custom</option>
                </select>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={() => setIsSaveModalOpen(false)}
                className="rounded-xl border border-gray-200 px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={saving}
                className="rounded-xl bg-red-600 px-5 py-2 text-sm font-semibold text-white hover:bg-red-700 disabled:opacity-60 transition"
              >
                {saving ? "Saving..." : "Confirm & Save"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}