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
  onSaveSuccess?: (message: string) => void;
  onTemplateUpdate?: (template: any) => void;
}

export default function Header({
  template,
  onBack,
  onSaveSuccess,
  onTemplateUpdate,
}: HeaderProps) {
  const { canvas, orientation, setOrientation, zoomLevel, setZoomLevel } = useFabric();
  const [isSaveModalOpen, setIsSaveModalOpen] = useState(false);
  const [templateName, setTemplateName] = useState(template?.name || "");
  const [documentType, setDocumentType] = useState(template?.documentType || "internship");
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [currentTemplate, setCurrentTemplate] = useState<any>(template);

  const [prevTemplate, setPrevTemplate] = useState(template);
  if (template !== prevTemplate) {
    setPrevTemplate(template);
    setCurrentTemplate(template);
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

      let savedData: any = null;

      if (currentTemplate?._id) {
        const res = await documentTemplateApi.updateCanvasTemplate(currentTemplate._id, {
          name: templateName,
          documentType,
          design: {
            editor: "fabric",
            version: "1.0",
            orientation,
            data: canvasJson,
          },
        });
        savedData = res.data?.template || currentTemplate;
      } else {
        const res = await documentTemplateApi.saveCanvasTemplate({
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
        savedData = res.data?.template;
      }

      if (savedData) {
        setCurrentTemplate(savedData);
        if (onTemplateUpdate) onTemplateUpdate(savedData);
      }

      const successText = "Template saved successfully!";
      setMessage({ type: "success", text: successText });

      // Close modal after brief delay without navigating away
      setTimeout(() => {
        setIsSaveModalOpen(false);
        if (onSaveSuccess) {
          onSaveSuccess("Template saved successfully! Click 'Back to Dashboard' whenever you are done.");
        }
      }, 500);
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
      <header className="flex h-14 lg:h-16 items-center justify-between border-b border-slate-800 bg-slate-900 px-3 sm:px-6 text-white shadow-xl z-30">
        {/* Left Section: Back & Title */}
        <div className="flex items-center gap-2 sm:gap-4">
          <button
            onClick={onBack}
            className="flex items-center gap-1.5 sm:gap-2 rounded-xl bg-slate-800 border border-slate-700 px-2.5 py-1.5 sm:px-3.5 sm:py-2 text-xs font-semibold text-slate-200 hover:bg-slate-700 hover:text-white transition shadow-sm shrink-0"
            title="Return to Dashboard"
          >
            <ArrowLeft size={16} />
            <span className="hidden sm:inline">Back to Dashboard</span>
            <span className="sm:hidden text-[11px]">Back</span>
          </button>

          <div className="hidden sm:block h-5 w-[1px] bg-slate-800"></div>

          <div className="flex items-center gap-2 sm:gap-3 min-w-0">
            <div className="hidden sm:flex h-9 w-9 shrink-0 rounded-xl bg-red-600/20 border border-red-500/30 items-center justify-center text-red-400">
              <Sparkles size={18} />
            </div>
            <div className="truncate">
              <div className="flex items-center gap-1.5 truncate">
                <h1 className="text-xs sm:text-sm font-bold text-slate-100 tracking-tight truncate max-w-[140px] sm:max-w-[240px]">
                  {currentTemplate?.name || templateName || "New Certificate Template"}
                </h1>
                <span className="hidden md:inline-block text-[9px] sm:text-[10px] font-bold uppercase tracking-wider bg-red-600/30 text-red-300 border border-red-500/40 px-1.5 py-0.5 rounded">
                  {documentType.replace("-", " ")}
                </span>
              </div>
              <p className="hidden sm:block text-[10px] sm:text-[11px] text-slate-400">Fabric Studio Engine</p>
            </div>
          </div>
        </div>

        {/* Right Section: Canvas Controls & Actions */}
        <div className="flex items-center gap-1.5 sm:gap-3">
          {/* Zoom Control Pill (Desktop/Tablet) */}
          <div className="hidden md:flex items-center rounded-xl bg-slate-800 border border-slate-700 p-1 text-xs font-medium">
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
          <div className="flex items-center rounded-xl bg-slate-800 border border-slate-700 p-0.5 sm:p-1 text-xs font-semibold shrink-0">
            <button
              onClick={() => setOrientation("landscape")}
              className={`flex items-center gap-1 sm:gap-1.5 px-2 py-1 sm:px-3 rounded-lg transition text-[11px] sm:text-xs ${
                orientation === "landscape"
                  ? "bg-red-600 text-white shadow-md font-bold"
                  : "text-slate-400 hover:text-slate-200"
              }`}
              title="Landscape Orientation"
            >
              <Layout size={13} /> <span className="hidden sm:inline">Landscape</span><span className="sm:hidden">Land</span>
            </button>
            <button
              onClick={() => setOrientation("portrait")}
              className={`flex items-center gap-1 sm:gap-1.5 px-2 py-1 sm:px-3 rounded-lg transition text-[11px] sm:text-xs ${
                orientation === "portrait"
                  ? "bg-red-600 text-white shadow-md font-bold"
                  : "text-slate-400 hover:text-slate-200"
              }`}
              title="Portrait Orientation"
            >
              <Layers size={13} /> <span className="hidden sm:inline">Portrait</span><span className="sm:hidden">Port</span>
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
            className="hidden sm:flex items-center gap-1 rounded-xl border border-slate-700 bg-slate-800 px-2.5 py-1.5 sm:px-3 sm:py-2 text-xs font-semibold text-slate-300 hover:bg-red-600/20 hover:text-red-300 hover:border-red-500/30 transition"
            title="Clear Canvas"
          >
            <RotateCcw size={14} /> <span className="hidden md:inline">Clear</span>
          </button>

          <button
            onClick={() => {
              if (!canvas) return;
              FabricToolService.deleteSelected(canvas);
            }}
            className="hidden sm:flex items-center gap-1 rounded-xl border border-slate-700 bg-slate-800 px-2.5 py-1.5 sm:px-3 sm:py-2 text-xs font-semibold text-slate-300 hover:bg-red-600/20 hover:text-red-300 hover:border-red-500/30 transition"
            title="Delete Selected Element"
          >
            <Trash2 size={14} /> <span className="hidden md:inline">Delete</span>
          </button>

          {/* Save Button */}
          <button
            onClick={() => setIsSaveModalOpen(true)}
            className="flex items-center gap-1.5 sm:gap-2 rounded-xl bg-gradient-to-r from-red-600 to-red-700 px-3 py-1.5 sm:px-5 sm:py-2 text-xs font-bold text-white shadow-lg shadow-red-900/30 hover:from-red-500 hover:to-red-600 transition shrink-0"
          >
            <Save size={15} />
            <span className="inline">Save</span>
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