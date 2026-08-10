import { useState } from "react";
import { useFabric } from "./FabricContext";
import { FabricToolService } from "./services/FabricToolService";
import { documentTemplateApi } from "../../../../../api/documentTemplateApi";
import {
  Save,
  ArrowLeft,
  Trash2,
  CheckCircle,
  AlertCircle,
  RotateCcw,
  ZoomIn,
  ZoomOut,
  Sparkles,
  Layers,
  Layout,
} from "lucide-react";

interface HeaderProps {
  template?: any;
  onBack: () => void;
}

export default function Header({ template, onBack }: HeaderProps) {
  const { canvas, orientation, setOrientation, zoomLevel, setZoomLevel } = useFabric();
  const [isSaveModalOpen, setIsSaveModalOpen] = useState(false);
  const [templateName, setTemplateName] = useState(template?.name || "");
  const [documentType, setDocumentType] = useState(template?.documentType || "internship");
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const [prevTemplate, setPrevTemplate] = useState(template);
  if (template !== prevTemplate) {
    setPrevTemplate(template);
    if (template) {
      setTemplateName(template.name || "");
      setDocumentType(template.documentType || "internship");
    } else {
      setTemplateName("");
      setDocumentType("internship");
    }
  }

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
      {/* Studio Bar Header */}
      <header className="flex h-16 items-center justify-between border-b border-slate-800 bg-slate-900 px-6 text-white shadow-xl z-30">
        {/* Left Section: Back & Title */}
        <div className="flex items-center gap-4">
          <button
            onClick={onBack}
            className="flex items-center gap-2 rounded-xl bg-slate-800 border border-slate-700 px-3.5 py-2 text-xs font-semibold text-slate-200 hover:bg-slate-700 hover:text-white transition shadow-sm"
          >
            <ArrowLeft size={16} /> Back to Dashboard
          </button>

          <div className="h-5 w-[1px] bg-slate-800"></div>

          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-xl bg-red-600/20 border border-red-500/30 flex items-center justify-center text-red-400">
              <Sparkles size={18} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-sm font-bold text-slate-100 tracking-tight">
                  {template?.name ? template.name : "New Certificate Template"}
                </h1>
                <span className="text-[10px] font-bold uppercase tracking-wider bg-red-600/30 text-red-300 border border-red-500/40 px-2 py-0.5 rounded">
                  {documentType.replace("-", " ")}
                </span>
              </div>
              <p className="text-[11px] text-slate-400">Fabric Studio Designer Engine</p>
            </div>
          </div>
        </div>

        {/* Right Section: Canvas Controls & Actions */}
        <div className="flex items-center gap-3">
          {/* Zoom Control Pill */}
          <div className="flex items-center rounded-xl bg-slate-800 border border-slate-700 p-1 text-xs font-medium">
            <button
              onClick={() => setZoomLevel((prev) => Math.max(0.4, Number((prev - 0.1).toFixed(1))))}
              className="p-1.5 rounded-lg text-slate-300 hover:bg-slate-700 hover:text-white transition"
              title="Zoom Out"
            >
              <ZoomOut size={14} />
            </button>

            <span className="px-2 font-mono text-[11px] font-bold text-slate-200 min-w-[45px] text-center">
              {Math.round(zoomLevel * 100)}%
            </span>

            <button
              onClick={() => setZoomLevel((prev) => Math.min(1.5, Number((prev + 0.1).toFixed(1))))}
              className="p-1.5 rounded-lg text-slate-300 hover:bg-slate-700 hover:text-white transition"
              title="Zoom In"
            >
              <ZoomIn size={14} />
            </button>

            <button
              onClick={() => setZoomLevel(orientation === "landscape" ? 0.75 : 0.65)}
              className="px-2 py-1 ml-1 rounded-lg bg-red-600/30 text-red-300 hover:bg-red-600 hover:text-white transition text-[11px] font-semibold"
              title="Fit to Screen"
            >
              Fit
            </button>
          </div>

          {/* Orientation Pill */}
          <div className="flex items-center rounded-xl bg-slate-800 border border-slate-700 p-1 text-xs font-semibold">
            <button
              onClick={() => setOrientation("landscape")}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-lg transition ${
                orientation === "landscape"
                  ? "bg-red-600 text-white shadow-md font-bold"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              <Layout size={13} /> Landscape
            </button>
            <button
              onClick={() => setOrientation("portrait")}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-lg transition ${
                orientation === "portrait"
                  ? "bg-red-600 text-white shadow-md font-bold"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              <Layers size={13} /> Portrait
            </button>
          </div>

          {/* Canvas Clear & Delete Buttons */}
          <button
            onClick={() => {
              if (!canvas) return;
              if (window.confirm("Are you sure you want to clear all objects from the canvas?")) {
                FabricToolService.clearCanvas(canvas);
              }
            }}
            className="flex items-center gap-1.5 rounded-xl border border-slate-700 bg-slate-800 px-3 py-2 text-xs font-semibold text-slate-300 hover:bg-red-600/20 hover:text-red-300 hover:border-red-500/30 transition"
            title="Clear Canvas"
          >
            <RotateCcw size={14} /> Clear
          </button>

          <button
            onClick={() => {
              if (!canvas) return;
              FabricToolService.deleteSelected(canvas);
            }}
            className="flex items-center gap-1.5 rounded-xl border border-slate-700 bg-slate-800 px-3 py-2 text-xs font-semibold text-slate-300 hover:bg-red-600/20 hover:text-red-300 hover:border-red-500/30 transition"
            title="Delete Selected Element"
          >
            <Trash2 size={14} /> Delete
          </button>

          {/* Save Button */}
          <button
            onClick={() => setIsSaveModalOpen(true)}
            className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-red-600 to-red-700 px-5 py-2 text-xs font-bold text-white shadow-lg shadow-red-900/30 hover:from-red-500 hover:to-red-600 transition"
          >
            <Save size={16} /> Save Template
          </button>
        </div>
      </header>

      {/* Save Modal */}
      {isSaveModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-md">
          <div className="w-full max-w-md overflow-hidden rounded-3xl bg-white p-6 shadow-2xl space-y-5 border border-slate-200 animate-in fade-in zoom-in duration-200">
            <div>
              <h2 className="text-xl font-bold text-slate-900">Save Certificate Template</h2>
              <p className="text-xs text-slate-500 mt-1">
                Configure template metadata before saving to your organization library.
              </p>
            </div>

            {message && (
              <div
                className={`flex items-center gap-2 rounded-xl p-3 text-xs font-semibold ${
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
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Template Name *
                </label>
                <input
                  type="text"
                  value={templateName}
                  onChange={(e) => setTemplateName(e.target.value)}
                  placeholder="e.g. Official Internship Certificate 2026"
                  className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm focus:border-red-500 focus:ring-2 focus:ring-red-100 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Document Type *
                </label>
                <select
                  value={documentType}
                  onChange={(e) => setDocumentType(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm focus:border-red-500 focus:ring-2 focus:ring-red-100 outline-none bg-white"
                >
                  <option value="internship">Internship Certificate</option>
                  <option value="training">Training Certificate</option>
                  <option value="offer-letter">Offer Letter</option>
                  <option value="appreciation-letter">Appreciation Letter</option>
                  <option value="custom">Custom Document</option>
                </select>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
              <button
                onClick={() => setIsSaveModalOpen(false)}
                className="rounded-xl border border-slate-200 px-5 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={saving}
                className="rounded-xl bg-red-600 px-6 py-2.5 text-sm font-semibold text-white hover:bg-red-700 disabled:opacity-60 transition shadow-md shadow-red-200"
              >
                {saving ? "Saving Template..." : "Confirm & Save"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}