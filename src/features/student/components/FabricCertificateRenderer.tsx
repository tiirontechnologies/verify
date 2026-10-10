
import { useEffect, useRef, useState, useCallback, useMemo } from "react";
import { StaticCanvas } from "fabric";
import {
  Download,
  Award,
  RefreshCw,
  ZoomIn,
  ZoomOut,
  Move,
  AlertTriangle,
} from "lucide-react";
import { processFabricCanvasObjects } from "../../../utils/templateUtils";

interface FabricCertificateRendererProps {
  // Poora API response ({ template }), template object, ya seedha fabric JSON: teeno chalenge
  templateData: any;

  studentData: {
    studentName: string;
    course: string;
    role?: string;
    certificateId: string;
    issueDate?: string;
    startDate?: string;
    endDate?: string;
    organization?: string;
    mentor?: string;
    director?: string;
    email?: string;
    [key: string]: any;
  };

  hideHeader?: boolean;

  // Optional override, nahi diya to template se hi le lega
  templateName?: string;
  documentType?: string;
  onCanvasReady?: (canvas: HTMLCanvasElement) => void;
}

function formatType(type?: string) {
  return (type || "")
    .replace(/[-_]/g, " ")
    .replace(/\b\w/g, (l: string) => l.toUpperCase());
}

export default function FabricCertificateRenderer({
  templateData,
  studentData,
  hideHeader = false,
  templateName,
  documentType,
  onCanvasReady,
}: FabricCertificateRendererProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const [downloading, setDownloading] = useState(false);

  // ---------- Normalize: { template } -> template -> design.data ----------
  const templateDoc = templateData?.template ?? templateData;
  const savedData = templateDoc?.design?.data ?? templateDoc;
  const savedPages = Array.isArray(savedData?.pages) ? savedData.pages : [];
  const activeSavedPage = savedPages.find((page: any) => page.id === savedData?.activePageId);
  const pageJson = activeSavedPage?.json;
  const pageHasContent = Array.isArray(pageJson?.objects) && pageJson.objects.length > 0;
  const rootHasContent = Array.isArray(savedData?.objects) && savedData.objects.length > 0;
  // Keep the displayed page identical to the editor's selected saved page.
  const fabricData = pageHasContent || !rootHasContent ? pageJson || savedData : savedData;

  const displayName: string =
    templateName || templateDoc?.name || "Official Document Preview";
  const displayType: string = formatType(
    documentType || templateDoc?.documentType
  );

  const backgroundImage = fabricData?.backgroundImage;

  const hasRenderableBackground = Boolean(
    backgroundImage?.src || backgroundImage?.url || backgroundImage?.width
  );
  const hasCanvasData = Boolean(
    fabricData && (Array.isArray(fabricData.objects) || hasRenderableBackground)
  );
  const isCertificateMissing = !hasCanvasData;

  const orientation = (() => {
    const raw = (
      fabricData?.orientation ||
      activeSavedPage?.orientation ||
      templateDoc?.design?.orientation ||
      templateDoc?.orientation ||
      ""
    )
      .toString()
      .toLowerCase();

    if (raw === "portrait") return "portrait";
    if (raw === "landscape") return "landscape";

    const w = Number(fabricData?.width || 0);
    const h = Number(fabricData?.height || 0);

    return h > w ? "portrait" : "landscape";
  })();

  const isPortrait = orientation === "portrait";

  // useMemo: template late aaye tab bhi dimensions sahi banen
  const dimensions = useMemo(() => {
    const savedWidth = Number(fabricData?.width || 0);
    const savedHeight = Number(fabricData?.height || 0);
    if (savedWidth > 0 && savedHeight > 0) {
      return { width: savedWidth, height: savedHeight };
    }
    let width = isPortrait ? 747 : 1056;
    let height = isPortrait ? 1056 : 747;

    const bgW = Number(backgroundImage?.width || 0);
    const bgH = Number(backgroundImage?.height || 0);

    if (bgW && bgH) {
      const ratio = bgW / bgH;

      if (isPortrait) {
        height = 1056;
        width = Math.round(height * ratio);
      } else {
        width = 1056;
        height = Math.round(width / ratio);
      }
    }

    return { width, height };
  }, [fabricData?.width, fabricData?.height, isPortrait, backgroundImage?.width, backgroundImage?.height]);

  const [zoomScale, setZoomScale] = useState(1);
  const [zoomMode, setZoomMode] = useState<"fit" | "custom">("fit");

  const calculateFitZoom = useCallback(() => {
    if (!containerRef.current) return;

    const parent = containerRef.current.clientWidth - 32;

    if (parent > 0) {
      const ratio = parent / dimensions.width;
      setZoomScale(Math.max(0.25, Math.min(1, Number(ratio.toFixed(2)))));
    }
  }, [dimensions.width]);

  useEffect(() => {
    if (zoomMode !== "fit") return;

    calculateFitZoom();

    window.addEventListener("resize", calculateFitZoom);

    return () => window.removeEventListener("resize", calculateFitZoom);
  }, [zoomMode, calculateFitZoom]);

  useEffect(() => {
    if (isCertificateMissing) return;
    if (!canvasRef.current || !fabricData) return;

    // Ab fabric ko sahi JSON (objects + backgroundImage) milega
    const cloned = JSON.parse(JSON.stringify(fabricData));

    if (cloned.objects) {
      processFabricCanvasObjects(cloned.objects, studentData);
    }

    const canvas = new StaticCanvas(canvasRef.current, {
      width: dimensions.width,
      height: dimensions.height,
      backgroundColor: "#fff",
    });

    let cancelled = false;

    const render = async () => {
      try {
        await canvas.loadFromJSON(cloned);
        if (cancelled) return;

        // background ko current canvas dimensions ke hisaab se scale karo
        if (canvas.backgroundImage) {
          const bg: any = canvas.backgroundImage;
          const el = bg._element || (bg.getElement && bg.getElement()) || bg;

          const naturalW = bg.width || el?.naturalWidth || el?.width;
          const naturalH = bg.height || el?.naturalHeight || el?.height;

          if (naturalW && naturalH) {
            bg.set({
              scaleX: dimensions.width / naturalW,
              scaleY: dimensions.height / naturalH,
              originX: "left",
              originY: "top",
              left: 0,
              top: 0,
            });
          }

          if (el && !el.complete) {
            el.onload = () => canvas.renderAll();
          }
        }

        canvas.renderAll();
        onCanvasReady?.(canvasRef.current!);
      } catch (e) {
        console.error(e);
      }
    };

    render();

    return () => {
      cancelled = true;
      void canvas.dispose();
    };
  }, [fabricData, studentData, dimensions, isCertificateMissing, onCanvasReady]);

  const handleDownload = () => {
    if (!canvasRef.current) return;

    setDownloading(true);

    try {
      const url = canvasRef.current.toDataURL("image/png", 1);

      const link = document.createElement("a");

      link.href = url;
      const fileName = [studentData.studentName, displayType]
        .filter((part): part is string => typeof part === "string" && Boolean(part.trim()))
        .map((part) => part.trim().replace(/\s+/g, "_"))
        .join("-");
      link.download = `${fileName || "document"}.png`;

      link.click();
    } finally {
      setDownloading(false);
    }
  };

  if (isCertificateMissing) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 bg-white p-10 rounded-3xl border border-slate-200 shadow-inner min-h-[350px] text-center">
        <div className="h-14 w-14 rounded-full bg-red-50 flex items-center justify-center text-red-600">
          <AlertTriangle size={30} />
        </div>
        <div>
          <h2 className="text-lg font-bold text-gray-900">
            No certificate issued
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Contact your organization
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {!hideHeader && (
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white p-5 rounded-2xl border border-gray-200 shadow-sm">
          {/* LEFT */}
          <div className="flex items-center gap-3">
            <div className="h-11 w-11 rounded-xl bg-red-50 flex items-center justify-center text-red-600 shrink-0">
              <Award size={26} />
            </div>

            <div>
              <div className="flex flex-wrap items-center gap-2">
                {/* Template ka naam (jaise "JJK") */}
                <h2 className="text-base sm:text-lg font-bold text-gray-900">
                  {displayName}
                </h2>

                {/* Certificate type chip (jaise "Internship") */}
                {displayType && (
                  <span className="inline-flex items-center gap-1.5 text-[10px] font-semibold uppercase px-2.5 py-0.5 rounded-full bg-red-50 text-red-700 border border-red-200">
                    <span className="h-1.5 w-1.5 rounded-full bg-red-500" />
                    {displayType}
                  </span>
                )}

                <span className="text-[10px] font-semibold uppercase px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
                  {orientation}
                </span>
              </div>
            </div>
          </div>

          {/* RIGHT */}
          <div className="flex flex-wrap items-center gap-2">
            <div className="flex items-center gap-1 bg-gray-100 p-1 rounded-xl border border-gray-200 text-xs font-semibold text-gray-700">
              <button
                onClick={() => {
                  setZoomMode("fit");
                  calculateFitZoom();
                }}
                className={`px-2.5 py-1.5 rounded-lg ${
                  zoomMode === "fit"
                    ? "bg-white text-red-600 shadow"
                    : "hover:bg-gray-200"
                }`}
              >
                Fit
              </button>

              <button
                onClick={() => {
                  setZoomMode("custom");
                  setZoomScale(1);
                }}
                className="px-2.5 py-1.5 rounded-lg hover:bg-gray-200"
              >
                100%
              </button>

              <button
                onClick={() => {
                  setZoomMode("custom");
                  setZoomScale((p) =>
                    Math.max(0.25, Number((p - 0.15).toFixed(2)))
                  );
                }}
                className="p-1.5 rounded-lg hover:bg-gray-200"
              >
                <ZoomOut size={15} />
              </button>

              <span className="px-1.5 min-w-[42px] text-center font-bold">
                {Math.round(zoomScale * 100)}%
              </span>

              <button
                onClick={() => {
                  setZoomMode("custom");
                  setZoomScale((p) =>
                    Math.min(2, Number((p + 0.15).toFixed(2)))
                  );
                }}
                className="p-1.5 rounded-lg hover:bg-gray-200"
              >
                <ZoomIn size={15} />
              </button>
            </div>

            <button
              onClick={handleDownload}
              disabled={downloading}
              className="flex items-center gap-2 rounded-xl bg-red-600 px-5 py-2.5 text-xs font-bold text-white hover:bg-red-700"
            >
              {downloading ? (
                <RefreshCw size={15} className="animate-spin" />
              ) : (
                <Download size={15} />
              )}

              {downloading ? "Exporting..." : "Download PNG"}
            </button>
          </div>
        </div>
      )}

      {/* Canvas */}
      <div
        ref={containerRef}
        className="flex justify-center items-start overflow-auto bg-slate-900/5 p-4 sm:p-8 rounded-3xl border border-slate-200 shadow-inner min-h-[350px]"
      >
        <div
          className="rounded-2xl border border-slate-300 bg-white shadow-2xl shrink-0 transition-transform origin-top"
          style={{
            width: dimensions.width,
            height: dimensions.height,
            transform: `scale(${zoomScale})`,
            marginBottom:
              zoomScale < 1
                ? `-${dimensions.height * (1 - zoomScale)}px`
                : undefined,
          }}
        >
          <canvas
            ref={canvasRef}
            width={dimensions.width}
            height={dimensions.height}
          />
        </div>
      </div>

      {/* Mobile */}
      <div className="sm:hidden flex items-center justify-between gap-2 px-3 py-2 bg-slate-100 rounded-xl text-[11px] text-slate-600 border">
        <span className="flex items-center gap-1.5">
          <Move size={13} className="text-red-600" />
          Swipe / Scroll
        </span>

        <button
          onClick={() => {
            setZoomMode("fit");
            calculateFitZoom();
          }}
          className="text-red-600 font-bold"
        >
          Fit Width
        </button>
      </div>
    </div>
  );
}
