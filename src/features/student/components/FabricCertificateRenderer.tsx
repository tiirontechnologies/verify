import { useEffect, useRef, useState, useCallback } from "react";
import { StaticCanvas } from "fabric";
import { Download, Award, RefreshCw, ZoomIn, ZoomOut, Move } from "lucide-react";
import { processFabricCanvasObjects } from "../../../utils/templateUtils";

interface FabricCertificateRendererProps {
  templateData: any; // Fabric JSON payload
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
}

export default function FabricCertificateRenderer({
  templateData,
  studentData,
  hideHeader = false,
}: FabricCertificateRendererProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [downloading, setDownloading] = useState(false);

  // Dynamic orientation detection supporting both landscape & portrait templates
  const orientation = (() => {
    const raw = (
      templateData?.orientation ||
      templateData?.design?.orientation ||
      templateData?.design?.data?.orientation ||
      ""
    ).toString().toLowerCase();

    if (raw === "portrait") return "portrait";
    if (raw === "landscape") return "landscape";

    const tWidth = Number(templateData?.width || templateData?.design?.data?.width || 0);
    const tHeight = Number(templateData?.height || templateData?.design?.data?.height || 0);
    if (tHeight > tWidth && tHeight > 0) {
      return "portrait";
    }

    return "landscape";
  })();

  const isPortrait = orientation === "portrait";

  // Compute initial target dimensions synchronously from template background image metadata
  const initialDimensions = (() => {
    let targetW = isPortrait ? 747 : 1056;
    let targetH = isPortrait ? 1056 : 747;

    const bgObj = templateData?.backgroundImage || templateData?.design?.data?.backgroundImage;
    const bgW = Number(bgObj?.width || 0);
    const bgH = Number(bgObj?.height || 0);

    if (bgW > 0 && bgH > 0) {
      const imgRatio = bgW / bgH;
      if (isPortrait) {
        targetH = 1056;
        targetW = Math.round(1056 * imgRatio);
      } else {
        targetW = 1056;
        targetH = Math.round(1056 / imgRatio);
      }
    }

    return { width: targetW, height: targetH };
  })();

  const [dimensions] = useState(initialDimensions);
  const [zoomScale, setZoomScale] = useState<number>(1.0);
  const [zoomMode, setZoomMode] = useState<"fit" | "custom">("fit");

  // Auto calculate fit zoom scale to fit entire template inside screen container width
  const calculateFitZoom = useCallback(() => {
    if (!containerRef.current) return;
    const parentW = containerRef.current.clientWidth - 32;
    if (parentW > 0 && dimensions.width > 0) {
      const fitRatio = parentW / dimensions.width;
      setZoomScale(Number(Math.max(0.25, Math.min(1.0, fitRatio)).toFixed(2)));
    }
  }, [dimensions.width]);

  useEffect(() => {
    if (zoomMode === "fit") {
      calculateFitZoom();
      window.addEventListener("resize", calculateFitZoom);
      return () => window.removeEventListener("resize", calculateFitZoom);
    }
  }, [zoomMode, calculateFitZoom]);

  useEffect(() => {
    if (!canvasRef.current || !templateData) return;

    const targetW = dimensions.width;
    const targetH = dimensions.height;

    const clonedData = JSON.parse(JSON.stringify(templateData));
    if (clonedData.objects) {
      processFabricCanvasObjects(clonedData.objects, studentData);
    }

    const canvas = new StaticCanvas(canvasRef.current, {
      width: targetW,
      height: targetH,
      backgroundColor: "#ffffff",
    });

    const renderCanvas = async () => {
      try {
        await canvas.loadFromJSON(clonedData);

        if (canvas.backgroundImage) {
          const bg = canvas.backgroundImage as any;
          const el = bg._element || (bg.getElement && bg.getElement()) || bg;
          const naturalW = bg.width || el?.naturalWidth || el?.width;
          const naturalH = bg.height || el?.naturalHeight || el?.height;

          if (naturalW && naturalH) {
            bg.set({
              scaleX: targetW / naturalW,
              scaleY: targetH / naturalH,
              originX: "left",
              originY: "top",
              left: 0,
              top: 0,
            });
          }

          if (el && !el.complete) {
            el.onload = () => {
              canvas.renderAll();
            };
          }
        }

        canvas.setDimensions({ width: targetW, height: targetH });
        canvas.renderAll();
      } catch (err) {
        console.error("Failed to load certificate canvas JSON:", err);
      }
    };

    renderCanvas();

    return () => {
      canvas.dispose();
    };
  }, [templateData, studentData, dimensions.width, dimensions.height]);

  const handleDownload = () => {
    if (!canvasRef.current) return;
    setDownloading(true);

    try {
      const dataUrl = canvasRef.current.toDataURL("image/png", 1.0);
      const link = document.createElement("a");
      const filename = `${(studentData.studentName || "Student").trim().replace(/\s+/g, "_")}-${
        isPortrait ? "Portrait" : "Landscape"
      }-Certificate.png`;
      link.download = filename;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error("Failed to download canvas image:", err);
    } finally {
      setDownloading(false);
    }
  };

  return (
    <div className="space-y-4">
      {/* Top Controls Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white p-5 rounded-2xl border border-gray-200 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="h-11 w-11 rounded-xl bg-red-50 flex items-center justify-center text-red-600 shrink-0">
            <Award size={26} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base sm:text-lg font-bold text-gray-900">Official Document Preview</h2>
              <span className="text-[10px] font-semibold uppercase px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
                {orientation}
              </span>
            </div>
          </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* Zoom Controls Bar */}
          <div className="flex items-center gap-1 bg-gray-100 p-1 rounded-xl border border-gray-200 text-xs font-semibold text-gray-700">
            <button
              onClick={() => {
                setZoomMode("fit");
                calculateFitZoom();
              }}
              className={`px-2.5 py-1.5 rounded-lg transition ${
                zoomMode === "fit" ? "bg-white text-red-600 shadow-xs font-bold" : "hover:bg-gray-200"
              }`}
              title="Fit Entire Screen"
            >
              Fit Screen
            </button>
            <button
              onClick={() => {
                setZoomMode("custom");
                setZoomScale(1.0);
              }}
              className={`px-2.5 py-1.5 rounded-lg transition ${
                zoomScale === 1.0 && zoomMode === "custom" ? "bg-white text-red-600 shadow-xs font-bold" : "hover:bg-gray-200"
              }`}
              title="View 100% Full Resolution"
            >
              100%
            </button>
            <button
              onClick={() => {
                setZoomMode("custom");
                setZoomScale((prev) => Math.max(0.25, Number((prev - 0.15).toFixed(2))));
              }}
              className="p-1.5 rounded-lg hover:bg-gray-200"
              title="Zoom Out"
            >
              <ZoomOut size={15} />
            </button>
            <span className="px-1.5 font-mono text-xs min-w-[40px] text-center font-bold">
              {Math.round(zoomScale * 100)}%
            </span>
            <button
              onClick={() => {
                setZoomMode("custom");
                setZoomScale((prev) => Math.min(2.0, Number((prev + 0.15).toFixed(2))));
              }}
              className="p-1.5 rounded-lg hover:bg-gray-200"
              title="Zoom In"
            >
              <ZoomIn size={15} />
            </button>
          </div>

          <button
            onClick={handleDownload}
            disabled={downloading}
            className="flex items-center justify-center gap-2 rounded-xl bg-red-600 px-5 py-2.5 text-xs font-bold text-white shadow-md shadow-red-200 hover:bg-red-700 disabled:opacity-60 transition"
          >
            {downloading ? <RefreshCw size={15} className="animate-spin" /> : <Download size={15} />}
            {downloading ? "Exporting..." : "Download PNG"}
          </button>
        </div>
      </div>

      {/* Rendered Canvas Container supporting Touch Pan & Zoom */}
      <div
        ref={containerRef}
        className="flex justify-center items-start overflow-auto bg-slate-900/5 p-4 sm:p-8 rounded-3xl border border-slate-200 shadow-inner relative min-h-[350px] touch-pan-x touch-pan-y"
      >
        <div
          className="rounded-2xl border border-slate-300 bg-white shadow-2xl shrink-0 transition-transform duration-200 origin-top flex items-center justify-center"
          style={{
            width: dimensions.width,
            height: dimensions.height,
            transform: `scale(${zoomScale})`,
            marginBottom: zoomScale < 1 ? `-${dimensions.height * (1 - zoomScale)}px` : undefined,
          }}
        >
          <canvas
            ref={canvasRef}
            width={dimensions.width}
            height={dimensions.height}
          />
        </div>
      </div>

      {/* Mobile Hint Banner */}
      <div className="sm:hidden flex items-center justify-between gap-2 px-3 py-2 bg-slate-100 rounded-xl text-[11px] text-slate-600 border border-slate-200">
        <span className="flex items-center gap-1.5">
          <Move size={13} className="text-red-600 shrink-0" />
          <span>Swipe/scroll to view full high-resolution details</span>
        </span>
        <button
          onClick={() => {
            setZoomMode("fit");
            calculateFitZoom();
          }}
          className="text-xs font-bold text-red-600 hover:underline shrink-0"
        >
          Fit Width
        </button>
      </div>
    </div>
  );
}
