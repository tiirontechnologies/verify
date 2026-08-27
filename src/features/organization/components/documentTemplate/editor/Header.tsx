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
  Undo2,
  Redo2,
} from "lucide-react";

interface HeaderProps {
  template?: any;
  onBack: () => void;
  onSaveSuccess?: (message: string) => void;
  onTemplateUpdate?: (template: any) => void;
}

export default function Header({ template, onBack }: HeaderProps) {
  const {
    canvas,
    orientation,
    setOrientation,
    zoomLevel,
    setZoomLevel,
    canUndo,
    canRedo,
    undo,
    redo,
  } = useFabric();
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
      <header className="flex flex-wrap items-center justify-between min-h-16 gap-3 border-b border-gray-200 bg-white px-4 sm:px-6 py-2.5 text-gray-900 shadow-sm z-30">
        {/* Left Section: Back & Title */}
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="flex items-center gap-2 rounded-xl bg-gray-100 border border-gray-200 px-3 py-2 text-xs font-semibold text-gray-700 hover:bg-gray-200 hover:text-gray-900 transition shadow-xs"
          >
            <ArrowLeft size={16} /> <span className="hidden sm:inline">Back to Dashboard</span>
          </button>

          <div className="hidden sm:block h-5 w-[1px] bg-gray-200"></div>

          <div className="flex items-center gap-2.5">
            <div className="h-8 w-8 sm:h-9 sm:w-9 rounded-xl bg-red-50 border border-red-200 flex items-center justify-center text-red-600 shrink-0">
              <Sparkles size={18} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xs sm:text-sm font-bold text-gray-900 tracking-tight truncate max-w-[150px] sm:max-w-[240px]">
                  {template?.name ? template.name : "New Template"}
                </h1>
                <span className="hidden md:inline-block text-[10px] font-bold uppercase tracking-wider bg-red-50 text-red-600 border border-red-200 px-2 py-0.5 rounded">
                  {documentType.replace("-", " ")}
                </span>
              </div>
              <p className="text-[10px] sm:text-[11px] text-gray-500 hidden sm:block font-medium">Fabric Studio Designer Engine</p>
            </div>
          </div>
        </div>

        {/* Right Section: Canvas Controls & Actions */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
          {/* Undo / Redo Control Pill */}
          <div className="flex items-center rounded-xl bg-gray-100 border border-gray-200 p-1 text-xs font-medium">
            <button
              onClick={undo}
              disabled={!canUndo}
              className="p-1.5 rounded-lg text-gray-700 hover:bg-white hover:text-gray-900 disabled:opacity-30 disabled:hover:bg-transparent transition shadow-xs"
              title="Undo (Ctrl + Z)"
            >
              <Undo2 size={15} />
            </button>
            <button
              onClick={redo}
              disabled={!canRedo}
              className="p-1.5 rounded-lg text-gray-700 hover:bg-white hover:text-gray-900 disabled:opacity-30 disabled:hover:bg-transparent transition shadow-xs"
              title="Redo (Ctrl + Y)"
            >
              <Redo2 size={15} />
            </button>
          </div>

          {/* Zoom Control Pill */}
          <div className="flex items-center rounded-xl bg-gray-100 border border-gray-200 p-1 text-xs font-medium">
            <button
              onClick={() => setZoomLevel((prev) => Math.max(0.4, Number((prev - 0.1).toFixed(1))))}
              className="p-1.5 rounded-lg text-gray-700 hover:bg-white hover:text-gray-900 transition shadow-xs"
              title="Zoom Out"
            >
              <ZoomOut size={14} />
            </button>

            <span className="px-1.5 font-mono text-[11px] font-bold text-gray-800 min-w-[40px] text-center">
              {Math.round(zoomLevel * 100)}%
            </span>

            <button
              onClick={() => setZoomLevel((prev) => Math.min(1.5, Number((prev + 0.1).toFixed(1))))}
              className="p-1.5 rounded-lg text-gray-700 hover:bg-white hover:text-gray-900 transition shadow-xs"
              title="Zoom In"
            >
              <ZoomIn size={14} />
            </button>

            <button
              onClick={() => setZoomLevel(orientation === "landscape" ? 0.75 : 0.65)}
              className="px-2 py-1 ml-0.5 rounded-lg bg-red-100 text-red-700 hover:bg-red-600 hover:text-white transition text-[10px] sm:text-[11px] font-semibold"
              title="Fit to Screen"
            >
              Fit
            </button>
          </div>

          {/* Orientation Pill */}
          <div className="flex items-center rounded-xl bg-gray-100 border border-gray-200 p-1 text-xs font-semibold">
            <button
              onClick={() => setOrientation("landscape")}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-lg transition ${
                orientation === "landscape"
                  ? "bg-red-600 text-white shadow-sm font-bold"
                  : "text-gray-600 hover:text-gray-900"
              }`}
              title="Landscape Orientation"
            >
              <Layout size={13} /> <span className="hidden lg:inline">Landscape</span>
            </button>
            <button
              onClick={() => setOrientation("portrait")}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-lg transition ${
                orientation === "portrait"
                  ? "bg-red-600 text-white shadow-sm font-bold"
                  : "text-gray-600 hover:text-gray-900"
              }`}
              title="Portrait Orientation"
            >
              <Layers size={13} /> <span className="hidden lg:inline">Portrait</span>
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
            className="hidden sm:flex items-center gap-1.5 rounded-xl border border-gray-200 bg-gray-100 px-3 py-2 text-xs font-semibold text-gray-700 hover:bg-red-50 hover:text-red-600 hover:border-red-200 transition"
            title="Clear Canvas"
          >
            <RotateCcw size={14} /> <span className="hidden md:inline">Clear</span>
          </button>

          <button
            onClick={() => {
              if (!canvas) return;
              FabricToolService.deleteSelected(canvas);
            }}
            className="flex items-center gap-1.5 rounded-xl border border-gray-200 bg-gray-100 px-3 py-2 text-xs font-semibold text-gray-700 hover:bg-red-50 hover:text-red-600 hover:border-red-200 transition"
            title="Delete Selected Element"
          >
            <Trash2 size={14} /> <span className="hidden sm:inline">Delete</span>
          </button>

          {/* Save Button */}
          <button
            onClick={() => setIsSaveModalOpen(true)}
            className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-red-600 to-red-700 px-4 sm:px-5 py-2 text-xs font-bold text-white shadow-md shadow-red-200 hover:from-red-700 hover:to-red-800 transition"
          >
            <Save size={16} /> <span className="hidden xs:inline">Save Template</span>
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