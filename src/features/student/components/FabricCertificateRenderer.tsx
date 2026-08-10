import { useEffect, useRef, useState } from "react";
import { StaticCanvas } from "fabric";
import { Download, Award, RefreshCw } from "lucide-react";
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
}

export default function FabricCertificateRenderer({
  templateData,
  studentData,
}: FabricCertificateRendererProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
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

    // Auto-detect from dimensions if height > width
    const tWidth = Number(templateData?.width || templateData?.design?.data?.width || 0);
    const tHeight = Number(templateData?.height || templateData?.design?.data?.height || 0);
    if (tHeight > tWidth && tHeight > 0) {
      return "portrait";
    }

    return "landscape";
  })();

  const isPortrait = orientation === "portrait";
  const width = isPortrait ? 747 : 1056;
  const height = isPortrait ? 1056 : 747;

  useEffect(() => {
    if (!canvasRef.current || !templateData) return;

    // Initialize fabric canvas with correct portrait or landscape dimensions
    const canvas = new StaticCanvas(canvasRef.current, {
      width,
      height,
      backgroundColor: "#ffffff",
    });

    const clonedData = JSON.parse(JSON.stringify(templateData));
    if (clonedData.objects) {
      processFabricCanvasObjects(clonedData.objects, studentData);
    }

    const renderCanvas = async () => {
      try {
        await canvas.loadFromJSON(clonedData);
        canvas.setDimensions({ width, height });

        if (canvas.backgroundImage) {
          const bg = canvas.backgroundImage as any;
          if (bg.width && bg.height) {
            bg.set({
              scaleX: width / bg.width,
              scaleY: height / bg.height,
              originX: "left",
              originY: "top",
              left: 0,
              top: 0,
            });
          }
        }
        canvas.renderAll();
      } catch (err) {
        console.error("Failed to load certificate canvas JSON:", err);
      }
    };

    renderCanvas();

    return () => {
      canvas.dispose();
    };
  }, [templateData, studentData, width, height]);

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
    <div className="space-y-6">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="h-12 w-12 rounded-xl bg-red-50 flex items-center justify-center text-red-600">
            <Award size={28} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-bold text-gray-900">Official Document Preview</h2>
              <span className="text-[11px] font-semibold uppercase px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
                {orientation}
              </span>
            </div>
            <p className="text-xs text-gray-500 mt-0.5">
              Issued by {studentData.organization || "Tiiron Technologies"}
            </p>
          </div>
        </div>

        <button
          onClick={handleDownload}
          disabled={downloading}
          className="flex items-center justify-center gap-2 rounded-xl bg-red-600 px-6 py-3 font-semibold text-white shadow-lg shadow-red-200 hover:bg-red-700 disabled:opacity-60 transition"
        >
          {downloading ? <RefreshCw size={18} className="animate-spin" /> : <Download size={18} />}
          {downloading ? "Generating PNG..." : "Download Certificate PNG"}
        </button>
      </div>

      {/* Rendered Canvas Container supporting Portrait & Landscape */}
      <div className="flex justify-center overflow-x-auto bg-slate-900/5 p-4 sm:p-8 rounded-3xl border border-slate-200 shadow-inner">
        <div
          className="rounded-2xl border border-slate-300 bg-white shadow-2xl overflow-hidden flex items-center justify-center transition-all duration-300"
          style={{
            maxWidth: isPortrait ? "650px" : `${width}px`,
            width: "100%",
          }}
        >
          <canvas
            ref={canvasRef}
            width={width}
            height={height}
            className="w-full h-auto block"
          />
        </div>
      </div>
    </div>
  );
}
