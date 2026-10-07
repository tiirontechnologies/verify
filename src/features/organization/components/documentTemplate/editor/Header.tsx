
import { useEffect, useRef, useState } from "react";
import { Canvas as FabricCanvas } from "fabric";
import jsPDF from "jspdf";
import toast from "react-hot-toast";
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
  RectangleHorizontal,
  RectangleVertical,
  Undo2,
  Redo2,
  Loader2,
  Eye,
  Download,
  ChevronDown,
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
    pages,
    activePageId,
    getPagesSnapshot,
    setPreviewMode,
  } = useFabric();

  const [isSaveModalOpen, setIsSaveModalOpen] = useState(false);
  const [templateName, setTemplateName] = useState(template?.name || "");
  const [documentType, setDocumentType] = useState(template?.documentType || "");
  const [saving, setSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState<"saved" | "unsaved" | "saving" | "error">("saved");
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [currentTemplate, setCurrentTemplate] = useState<any>(template);
  const [isExitWarningOpen, setIsExitWarningOpen] = useState(false);
  const [savedMetadata, setSavedMetadata] = useState({
    name: template?.name || "",
    documentType: template?.documentType || "",
  });
  const [exportMenuOpen, setExportMenuOpen] = useState(false);
  const autosaveTimerRef = useRef<number | undefined>(undefined);

  const [prevTemplate, setPrevTemplate] = useState(template);
  if (template !== prevTemplate) {
    setPrevTemplate(template);
    setCurrentTemplate(template);
    if (template) {
      setTemplateName(template.name || "");
      setDocumentType(template.documentType || "");
      setSavedMetadata({ name: template.name || "", documentType: template.documentType || "" });
    } else {
      setTemplateName("");
      setDocumentType("");
      setSavedMetadata({ name: "", documentType: "" });
    }
  }

  const hasUnsavedChanges = saveStatus === "unsaved" || saveStatus === "error" ||
    templateName !== savedMetadata.name || documentType !== savedMetadata.documentType;

  const requestExit = () => {
    if (saving) return;
    if (hasUnsavedChanges) {
      setIsExitWarningOpen(true);
      return;
    }
    onBack();
  };

  const handleSave = async (manual = true) => {
    if (!canvas) return;
    if (manual) window.clearTimeout(autosaveTimerRef.current);
    if (!manual && !currentTemplate?._id) return;
    if (!templateName.trim()) {
      if (manual) setMessage({ type: "error", text: "Please enter a template name." });
      return;
    }
    if (!documentType.trim()) {
      if (manual) setMessage({ type: "error", text: "Please enter a document type." });
      return;
    }

    setSaving(true);
    setSaveStatus("saving");
    if (manual) setMessage(null);

    const finalDocumentType = documentType.trim();

    try {
      const canvasJson = canvas.toJSON();
      (canvasJson as any).orientation = orientation;
      (canvasJson as any).width = canvas.getWidth();
      (canvasJson as any).height = canvas.getHeight();
      (canvasJson as any).pages = getPagesSnapshot();
      (canvasJson as any).activePageId = activePageId;

      let savedData: any = null;

      if (currentTemplate?._id) {
        const res = await documentTemplateApi.updateCanvasTemplate(currentTemplate._id, {
          name: templateName,
          documentType: finalDocumentType,
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
          documentType: finalDocumentType,
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
        setDocumentType(savedData.documentType || "");
        if (onTemplateUpdate) onTemplateUpdate(savedData);
      }

      setSaveStatus("saved");
      setSavedMetadata({ name: templateName, documentType: finalDocumentType });
      if (manual) {
        setMessage({ type: "success", text: "Template saved successfully!" });
        setTimeout(() => {
          setIsSaveModalOpen(false);
          if (onSaveSuccess) {
            onSaveSuccess("Template saved successfully.");
          }
          onBack();
        }, 500);
      }
    } catch (err: any) {
      console.error("Save error:", err);
      setSaveStatus("error");
      if (manual) {
        setMessage({
          type: "error",
          text: err.response?.data?.message || "Failed to save template.",
        });
      }
    } finally {
      setSaving(false);
    }
  };

  const saveHandlerRef = useRef(handleSave);
  saveHandlerRef.current = handleSave;
  const scheduleAutosaveRef = useRef<() => void>(() => undefined);
  scheduleAutosaveRef.current = () => {
    setSaveStatus("unsaved");
  };

  useEffect(() => {
    if (!canvas) return;
    const markUnsaved = () => {
      if ((canvas as any).__isHydratingTemplate) return;
      scheduleAutosaveRef.current();
    };
    canvas.on("object:added", markUnsaved);
    canvas.on("object:modified", markUnsaved);
    canvas.on("object:removed", markUnsaved);
    canvas.on("path:created", markUnsaved);
    canvas.on("text:changed", markUnsaved);
    return () => {
      canvas.off("object:added", markUnsaved);
      canvas.off("object:modified", markUnsaved);
      canvas.off("object:removed", markUnsaved);
      canvas.off("path:created", markUnsaved);
      canvas.off("text:changed", markUnsaved);
      window.clearTimeout(autosaveTimerRef.current);
    };
  }, [canvas, currentTemplate?._id]);

  const pageStateInitialized = useRef(false);
  useEffect(() => {
    if (!pageStateInitialized.current) {
      pageStateInitialized.current = true;
      return;
    }
    scheduleAutosaveRef.current();
  }, [pages, orientation, activePageId]);

  useEffect(() => {
    const handleBackRequest = () => requestExit();
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      if (!hasUnsavedChanges) return;
      event.preventDefault();
      event.returnValue = "";
    };
    window.addEventListener("fabric-editor-back", handleBackRequest);
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      window.removeEventListener("fabric-editor-back", handleBackRequest);
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [hasUnsavedChanges, saving, templateName, documentType, saveStatus]);

  const exportCurrentImage = (format: "png" | "jpeg") => {
    if (!canvas) return;
    try {
      const dataUrl = canvas.toDataURL({ format, multiplier: 2, quality: 0.95 });
      const link = document.createElement("a");
      link.download = `${templateName.trim().replace(/[^a-z0-9-_]+/gi, "-") || "certificate"}.${format === "jpeg" ? "jpg" : "png"}`;
      link.href = dataUrl;
      link.click();
      setExportMenuOpen(false);
    } catch (error) {
      console.error("Certificate image export failed:", error);
      toast.error("Could not export this page as an image.");
    }
  };

  const exportFabricJson = () => {
    if (!canvas) return;
    const data = {
      editor: "fabric",
      version: "1.0",
      name: templateName,
      documentType,
      orientation,
      activePageId,
      data: {
        ...canvas.toJSON(),
        width: canvas.getWidth(),
        height: canvas.getHeight(),
        orientation,
        activePageId,
        pages: getPagesSnapshot(),
      },
    };
    const url = URL.createObjectURL(new Blob([JSON.stringify(data, null, 2)], { type: "application/json" }));
    const link = document.createElement("a");
    link.href = url;
    link.download = `${templateName.trim().replace(/[^a-z0-9-_]+/gi, "-") || "certificate"}.fabric.json`;
    link.click();
    URL.revokeObjectURL(url);
    setExportMenuOpen(false);
  };

  const exportAllPagesPdf = async () => {
    const pageSnapshots = getPagesSnapshot();
    if (pageSnapshots.length === 0) return;
    let pdf: jsPDF | null = null;

    try {
      for (const page of pageSnapshots) {
        const pageOrientation = page.orientation;
        const width = pageOrientation === "portrait" ? 747 : 1056;
        const height = pageOrientation === "portrait" ? 1056 : 747;
        const offscreenElement = document.createElement("canvas");
        const offscreen = new FabricCanvas(offscreenElement, {
          width,
          height,
          backgroundColor: "#ffffff",
          renderOnAddRemove: false,
        });
        let image: string;
        try {
          if (page.json) await offscreen.loadFromJSON(page.json);
          offscreen.setDimensions({ width, height });
          offscreen.renderAll();
          image = offscreen.toDataURL({ format: "png", multiplier: 2 });
        } finally {
          await offscreen.dispose();
        }

        if (!pdf) {
          pdf = new jsPDF({ orientation: pageOrientation, unit: "mm", format: "a4" });
        } else {
          pdf.addPage("a4", pageOrientation);
        }
        pdf.addImage(image, "PNG", 0, 0, pdf.internal.pageSize.getWidth(), pdf.internal.pageSize.getHeight());
      }

      pdf?.save(`${templateName.trim().replace(/[^a-z0-9-_]+/gi, "-") || "certificates"}.pdf`);
      setExportMenuOpen(false);
    } catch (error) {
      console.error("Multi-page PDF export failed:", error);
      toast.error("Could not export the pages as a PDF.");
    }
  };

  useEffect(() => {
    const handleShortcutSave = () => {
      if (!templateName.trim()) {
        setIsSaveModalOpen(true);
        return;
      }
      void handleSave();
    };
    window.addEventListener("fabric-editor-save", handleShortcutSave);
    return () => window.removeEventListener("fabric-editor-save", handleShortcutSave);
  }, [handleSave, templateName]);

  return (
    <>
      {/* Compact Canva-style Top Bar — single row, horizontally scrollable on very small screens */}
      <header className="flex items-center h-12 sm:h-14 gap-1.5 sm:gap-2 border-b border-gray-200 bg-white px-2 sm:px-3 shadow-sm z-30 shrink-0">
        {/* Back */}
        <span className={`hidden md:inline text-[10px] font-semibold ${saveStatus === "error" ? "text-red-600" : saveStatus === "saved" ? "text-emerald-700" : "text-amber-700"}`} role="status">
          {saveStatus === "saving" ? "Saving..." : saveStatus === "unsaved" ? "Unsaved changes" : saveStatus === "error" ? "Save failed" : "Saved"}
        </span>

        <button
          onClick={requestExit}
          className="flex items-center justify-center h-8 w-8 sm:h-9 sm:w-9 rounded-lg text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition shrink-0"
          title="Back to Dashboard"
        >
          <ArrowLeft size={18} />
        </button>

        <div className="h-6 w-px bg-gray-200 shrink-0" />

        {/* Brand + title */}
        <div className="flex items-center gap-2 min-w-0 shrink-0">
          <div className="h-7 w-7 rounded-lg bg-red-600 flex items-center justify-center text-white shrink-0">
            <Sparkles size={14} />
          </div>
          <button
            onClick={() => setIsSaveModalOpen(true)}
            className="min-w-0 text-left hidden xs:block group"
            title="Rename & save"
          >
            <h1 className="text-[12.5px] font-bold text-gray-900 truncate max-w-[90px] sm:max-w-[180px] leading-tight group-hover:text-red-600 transition">
              {template?.name || "Untitled design"}
            </h1>
          </button>
        </div>

        {/* Center: scrollable control pills */}
        <div className="flex-1 flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
          {/* Undo / Redo */}
          <div className="flex items-center rounded-lg bg-gray-100 p-0.5 shrink-0">
            <button
              onClick={undo}
              disabled={!canUndo}
              className="p-1.5 rounded-md text-gray-700 hover:bg-white hover:text-gray-900 disabled:opacity-30 disabled:hover:bg-transparent transition"
              title="Undo (Ctrl+Z)"
            >
              <Undo2 size={15} />
            </button>
            <button
              onClick={redo}
              disabled={!canRedo}
              className="p-1.5 rounded-md text-gray-700 hover:bg-white hover:text-gray-900 disabled:opacity-30 disabled:hover:bg-transparent transition"
              title="Redo (Ctrl+Y)"
            >
              <Redo2 size={15} />
            </button>
          </div>

          {/* Zoom */}
          <div className="flex items-center rounded-lg bg-gray-100 p-0.5 shrink-0">
            <button
              onClick={() => setZoomLevel((prev) => Math.max(0.35, Number((prev - 0.1).toFixed(1))))}
              className="p-1.5 rounded-md text-gray-700 hover:bg-white transition"
              title="Zoom Out"
            >
              <ZoomOut size={14} />
            </button>
            <span className="px-1.5 font-mono text-[11px] font-bold text-gray-700 min-w-[36px] text-center select-none">
              {Math.round(zoomLevel * 100)}%
            </span>
            <button
              onClick={() => setZoomLevel((prev) => Math.min(1.5, Number((prev + 0.1).toFixed(1))))}
              className="p-1.5 rounded-md text-gray-700 hover:bg-white transition"
              title="Zoom In"
            >
              <ZoomIn size={14} />
            </button>
          </div>

          {/* Orientation */}
          <div className="flex items-center rounded-lg bg-gray-100 p-0.5 shrink-0">
            <button
              onClick={() => setOrientation("landscape")}
              className={`flex items-center gap-1 px-2 py-1.5 rounded-md text-[11px] font-bold transition ${
                orientation === "landscape" ? "bg-red-600 text-white" : "text-gray-600 hover:text-gray-900"
              }`}
              title="Landscape"
            >
              <RectangleHorizontal size={13} />
              <span className="hidden lg:inline">Landscape</span>
            </button>
            <button
              onClick={() => setOrientation("portrait")}
              className={`flex items-center gap-1 px-2 py-1.5 rounded-md text-[11px] font-bold transition ${
                orientation === "portrait" ? "bg-red-600 text-white" : "text-gray-600 hover:text-gray-900"
              }`}
              title="Portrait"
            >
              <RectangleVertical size={13} />
              <span className="hidden lg:inline">Portrait</span>
            </button>
          </div>

          {/* Clear / Delete */}
          <button
            onClick={() => {
              if (!canvas) return;
              if (window.confirm("Clear all objects from the canvas?")) {
                FabricToolService.clearCanvas(canvas);
              }
            }}
            className="p-2 rounded-lg text-gray-600 hover:bg-red-50 hover:text-red-600 transition shrink-0"
            title="Clear Canvas"
          >
            <RotateCcw size={15} />
          </button>
          <button
            onClick={() => canvas && FabricToolService.deleteSelected(canvas)}
            className="p-2 rounded-lg text-gray-600 hover:bg-red-50 hover:text-red-600 transition shrink-0"
            title="Delete Selected"
          >
            <Trash2 size={15} />
          </button>
        </div>

        <button
          type="button"
          onClick={() => setPreviewMode(true)}
          className="inline-flex shrink-0 items-center gap-1.5 rounded-lg border border-slate-200 px-2.5 sm:px-3 h-8 sm:h-9 text-[11px] font-semibold text-slate-700 hover:bg-slate-50"
          title="Preview certificate"
        ><Eye size={14} /><span className="hidden sm:inline">Preview</span></button>

        <div className="relative shrink-0">
          <button
            type="button"
            onClick={() => setExportMenuOpen((open) => !open)}
            className="inline-flex h-8 items-center gap-1 rounded-lg border border-slate-200 px-2 text-[11px] font-semibold text-slate-700 hover:bg-slate-50 sm:h-9 sm:px-3"
            aria-expanded={exportMenuOpen}
            title="Export certificate"
          ><Download size={14} /><span className="hidden sm:inline">Export</span><ChevronDown size={13} /></button>
          {exportMenuOpen && (
            <div className="absolute right-0 top-full z-50 mt-2 w-48 rounded-lg border border-slate-200 bg-white p-1.5 shadow-xl">
              <button type="button" onClick={() => exportCurrentImage("png")} className="w-full rounded-md px-3 py-2 text-left text-xs font-semibold text-slate-700 hover:bg-slate-50">Current page · PNG</button>
              <button type="button" onClick={() => exportCurrentImage("jpeg")} className="w-full rounded-md px-3 py-2 text-left text-xs font-semibold text-slate-700 hover:bg-slate-50">Current page · JPEG</button>
              <button type="button" onClick={() => void exportAllPagesPdf()} className="w-full rounded-md px-3 py-2 text-left text-xs font-semibold text-slate-700 hover:bg-slate-50">All pages · A4 PDF</button>
              <button type="button" onClick={exportFabricJson} className="w-full rounded-md px-3 py-2 text-left text-xs font-semibold text-slate-700 hover:bg-slate-50">Project · Fabric JSON</button>
            </div>
          )}
        </div>

        {/* Save — always pinned right */}
        <button
          onClick={() => setIsSaveModalOpen(true)}
          className="flex items-center gap-1.5 rounded-lg bg-red-600 px-2.5 sm:px-4 h-8 sm:h-9 text-[12px] font-bold text-white shadow-sm hover:bg-red-700 active:bg-red-800 transition shrink-0"
        >
          <Save size={14} /> <span className="hidden sm:inline">Save</span>
        </button>
      </header>

      {/* Save Modal — compact Canva-style card */}
      {isSaveModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
          <div className="w-full max-w-sm overflow-hidden rounded-2xl bg-white p-5 shadow-2xl space-y-4 border border-gray-100">
            <div>
              <h2 className="text-base font-bold text-gray-900">Save design</h2>
              <p className="text-[11px] text-gray-500 mt-0.5">
                Give your template a name before saving it to the library.
              </p>
            </div>

            {message && (
              <div
                className={`flex items-center gap-2 rounded-lg p-2.5 text-[11px] font-semibold ${
                  message.type === "success"
                    ? "bg-green-50 text-green-700 border border-green-200"
                    : "bg-red-50 text-red-700 border border-red-200"
                }`}
              >
                {message.type === "success" ? <CheckCircle size={14} /> : <AlertCircle size={14} />}
                {message.text}
              </div>
            )}

            <div className="space-y-3">
              <div>
                <label className="block text-[11px] font-bold text-gray-700 mb-1">Template Name *</label>
                <input
                  type="text"
                  value={templateName}
                  onChange={(e) => setTemplateName(e.target.value)}
                  placeholder="Enter a template name"
                  className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:border-red-500 focus:ring-2 focus:ring-red-100 outline-none"
                  autoFocus
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-gray-700 mb-1">Document Type</label>
                <input
                  type="text"
                  value={documentType}
                  onChange={(e) => setDocumentType(e.target.value)}
                  placeholder="Enter the document type"
                  className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:border-red-500 focus:ring-2 focus:ring-red-100 outline-none"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-gray-100">
              <button
                onClick={() => setIsSaveModalOpen(false)}
                className="rounded-lg border border-gray-200 px-4 py-2 text-xs font-semibold text-gray-700 hover:bg-gray-50 transition"
              >
                Cancel
              </button>
              <button
                onClick={() => void handleSave(true)}
                disabled={saving}
                className="flex items-center gap-1.5 rounded-lg bg-red-600 px-4 py-2 text-xs font-bold text-white hover:bg-red-700 disabled:opacity-60 transition shadow-sm"
              >
                {saving && <Loader2 size={13} className="animate-spin" />}
                {saving ? "Saving..." : "Confirm & Save"}
              </button>
            </div>
          </div>
        </div>
      )}

      {isExitWarningOpen && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center bg-slate-950/55 p-4 backdrop-blur-sm" role="presentation">
          <section role="dialog" aria-modal="true" aria-labelledby="unsaved-warning-title" className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-5 shadow-2xl sm:p-6">
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-50 text-amber-700"><AlertCircle size={20} /></div>
              <div>
                <h2 id="unsaved-warning-title" className="text-base font-bold text-slate-900">Unsaved changes</h2>
                <p className="mt-1 text-sm leading-6 text-slate-600">Your template has changes that haven’t been saved. Save before leaving, or discard these changes.</p>
              </div>
            </div>
            <div className="mt-6 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
              <button type="button" onClick={() => { setIsExitWarningOpen(false); window.clearTimeout(autosaveTimerRef.current); onBack(); }} className="rounded-lg border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50">Discard changes</button>
              <button type="button" onClick={() => { setIsExitWarningOpen(false); setMessage(null); setIsSaveModalOpen(true); }} className="rounded-lg bg-red-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-red-700">Save changes</button>
              <button type="button" onClick={() => setIsExitWarningOpen(false)} className="rounded-lg px-4 py-2.5 text-sm font-semibold text-slate-600 hover:bg-slate-100">Keep editing</button>
            </div>
          </section>
        </div>
      )}
    </>
  );
}
