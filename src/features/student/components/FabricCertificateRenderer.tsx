import { useEffect, useRef, useState } from "react";
import { StaticCanvas } from "fabric";
import { Download, Award } from "lucide-react";

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
  };
}

export default function FabricCertificateRenderer({
  templateData,
  studentData,
}: FabricCertificateRendererProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [downloading, setDownloading] = useState(false);

  const orientation =
    templateData?.orientation ||
    templateData?.design?.orientation ||
    "landscape";
  const width = orientation === "landscape" ? 1056 : 747;
  const height = orientation === "landscape" ? 747 : 1056;

  useEffect(() => {
    if (!canvasRef.current || !templateData) return;

    // Use StaticCanvas for read-only crisp rendering
    const canvas = new StaticCanvas(canvasRef.current, {
      width,
      height,
      backgroundColor: "#ffffff",
    });

    // Helper function to recursively replace placeholders in text objects
    const replacePlaceholders = (objects: any[]) => {
      if (!objects || !Array.isArray(objects)) return;

      objects.forEach((obj) => {
        if (obj.text && typeof obj.text === "string") {
          let updatedText = obj.text;

          updatedText = updatedText.replace(/\{\{studentName\}\}/gi, studentData.studentName || "");
          updatedText = updatedText.replace(/\{\{course\}\}/gi, studentData.course || "");
          updatedText = updatedText.replace(/\{\{role\}\}/gi, studentData.role || "");
          updatedText = updatedText.replace(/\{\{certificateId\}\}/gi, studentData.certificateId || "");
          updatedText = updatedText.replace(/\{\{issueDate\}\}/gi, studentData.issueDate || "");
          updatedText = updatedText.replace(/\{\{startDate\}\}/gi, studentData.startDate || "");
          updatedText = updatedText.replace(/\{\{endDate\}\}/gi, studentData.endDate || "");
          updatedText = updatedText.replace(/\{\{organization\}\}/gi, studentData.organization || "");
          updatedText = updatedText.replace(/\{\{mentor\}\}/gi, studentData.mentor || "");
          updatedText = updatedText.replace(/\{\{director\}\}/gi, studentData.director || "");

          obj.text = updatedText;
        }

        // Handle grouped objects if any
        if (obj.objects) {
          replacePlaceholders(obj.objects);
        }
      });
    };

    // Clone template JSON to avoid mutating raw object
    const clonedData = JSON.parse(JSON.stringify(templateData));
    if (clonedData.objects) {
      replacePlaceholders(clonedData.objects);
    }

    const renderCanvas = async () => {
      try {
        await canvas.loadFromJSON(clonedData);
        canvas.renderAll();
      } catch (err) {
        console.error("Failed to load certificate canvas JSON:", err);
      }
    };

    renderCanvas();

    return () => {
      canvas.dispose();
    };
  }, [templateData, studentData]);

  const handleDownload = () => {
    if (!canvasRef.current) return;
    setDownloading(true);

    try {
      // Export high-resolution PNG using canvas toDataURL
      const dataUrl = canvasRef.current.toDataURL("image/png", 1.0);
      const link = document.createElement("a");
      const filename = `${(studentData.studentName || "Student").trim().replace(/\s+/g, "_")}-Certificate.png`;
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
      {/* Top Header & Download Action */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="h-12 w-12 rounded-xl bg-red-50 flex items-center justify-center text-red-600">
            <Award size={28} />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900">Your Official Certificate</h2>
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
          <Download size={18} />
          {downloading ? "Generating PNG..." : "Download Certificate PNG"}
        </button>
      </div>

      {/* Rendered Canvas Container */}
      <div className="flex justify-center overflow-x-auto bg-gray-200/70 p-4 sm:p-8 rounded-3xl border border-gray-300 shadow-inner">
        <div className="rounded-xl border border-gray-400 bg-white shadow-2xl overflow-hidden">
          <canvas
            ref={canvasRef}
            width={width}
            height={height}
            className="w-full h-auto block"
            style={{ maxWidth: `${width}px` }}
          />
        </div>
      </div>
    </div>
  );
}
