import { useState } from "react";
import { useFabric } from "./FabricContext";
import { FabricToolService } from "./services/FabricToolService";
import { ImageUploadService } from "./services/ImageUploadService";
import {
  Type,
  Image as ImageIcon,
  Square,
  Sparkles,
  Wallpaper,
  ChevronLeft,
  ChevronRight,
  Plus,
} from "lucide-react";

const DYNAMIC_PLACEHOLDERS = [
  { tag: "{{studentName}}", label: "Student Name", category: "Student" },
  { tag: "{{email}}", label: "Student Email", category: "Student" },
  { tag: "{{course}}", label: "Course Name", category: "Program" },
  { tag: "{{role}}", label: "Role / Position", category: "Program" },
  { tag: "{{certificateId}}", label: "Certificate ID", category: "Credential" },
  { tag: "{{issueDate}}", label: "Issue Date", category: "Credential" },
  { tag: "{{startDate}}", label: "Start Date", category: "Credential" },
  { tag: "{{endDate}}", label: "End Date", category: "Credential" },
  { tag: "{{organization}}", label: "Organization Name", category: "Company" },
  { tag: "{{mentor}}", label: "Mentor Name", category: "Signatory" },
  { tag: "{{director}}", label: "Director Name", category: "Signatory" },
];

export default function LeftSidebar() {
  const {
    canvas,
    orientation,
    setOrientation,
    setCanvasDimensions,
  } = useFabric();

  const [activeTab, setActiveTab] = useState<
    "placeholders" | "text" | "media" | "shapes"
  >("placeholders");

  const [customVar, setCustomVar] = useState("");
  const [collapsed, setCollapsed] = useState(false);

  const handleAddCustomVar = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!customVar.trim() || !canvas) return;

    FabricToolService.addPlaceholder(canvas, customVar.trim());
    setCustomVar("");
  };

  return (
    <div className="relative flex h-full border-r border-slate-200 bg-white shadow-sm z-20 transition-all duration-300 w-full lg:w-auto shrink-0">
      {/* Icon Navigation Rail */}
      <div className="flex flex-col border-r border-slate-200 bg-slate-900 p-2 space-y-3 sm:space-y-4 text-white shrink-0">
        <button
          onClick={() => {
            setActiveTab("placeholders");
            setCollapsed(false);
          }}
          className={`p-2.5 sm:p-3 rounded-2xl transition flex flex-col items-center gap-1 text-[10px] sm:text-[11px] font-bold ${
            activeTab === "placeholders" && !collapsed
              ? "bg-red-600 text-white shadow-lg shadow-red-900/40"
              : "text-slate-400 hover:bg-slate-800 hover:text-white"
          }`}
        >
          <Sparkles size={18} />
          <span>Variables</span>
        </button>

        <button
          onClick={() => {
            setActiveTab("text");
            setCollapsed(false);
          }}
          className={`p-2.5 sm:p-3 rounded-2xl transition flex flex-col items-center gap-1 text-[10px] sm:text-[11px] font-bold ${
            activeTab === "text" && !collapsed
              ? "bg-red-600 text-white shadow-lg shadow-red-900/40"
              : "text-slate-400 hover:bg-slate-800 hover:text-white"
          }`}
        >
          <Type size={18} />
          <span>Text</span>
        </button>

        <button
          onClick={() => {
            setActiveTab("media");
            setCollapsed(false);
          }}
          className={`p-2.5 sm:p-3 rounded-2xl transition flex flex-col items-center gap-1 text-[10px] sm:text-[11px] font-bold ${
            activeTab === "media" && !collapsed
              ? "bg-red-600 text-white shadow-lg shadow-red-900/40"
              : "text-slate-400 hover:bg-slate-800 hover:text-white"
          }`}
        >
          <ImageIcon size={18} />
          <span>Media</span>
        </button>

        <button
          onClick={() => {
            setActiveTab("shapes");
            setCollapsed(false);
          }}
          className={`p-2.5 sm:p-3 rounded-2xl transition flex flex-col items-center gap-1 text-[10px] sm:text-[11px] font-bold ${
            activeTab === "shapes" && !collapsed
              ? "bg-red-600 text-white shadow-lg shadow-red-900/40"
              : "text-slate-400 hover:bg-slate-800 hover:text-white"
          }`}
        >
          <Square size={18} />
          <span>Shapes</span>
        </button>

        <div className="mt-auto pt-4 border-t border-slate-800 hidden sm:block">
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="p-2.5 rounded-xl text-slate-400 hover:bg-slate-800 hover:text-white transition w-full flex justify-center"
          >
            {collapsed ? (
              <ChevronRight size={18} />
            ) : (
              <ChevronLeft size={18} />
            )}
          </button>
        </div>
      </div>

      {!collapsed && (
        <div className="flex-1 lg:w-72 overflow-y-auto p-4 sm:p-5 space-y-6 bg-slate-50/60">
          {activeTab === "placeholders" && (
            <div className="space-y-4">
              {/* Orientation */}
              <div className="rounded-2xl border border-slate-200 bg-white p-3 space-y-2">
                <div className="flex justify-between text-[11px] font-bold">
                  <span>Canvas Orientation</span>
                  <span>{orientation}</span>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setOrientation("landscape")}
                    className={`rounded-xl py-2 text-xs font-bold ${
                      orientation === "landscape"
                        ? "bg-red-600 text-white"
                        : "bg-slate-100 text-slate-700"
                    }`}
                  >
                    Landscape
                  </button>

                  <button
                    type="button"
                    onClick={() => setOrientation("portrait")}
                    className={`rounded-xl py-2 text-xs font-bold ${
                      orientation === "portrait"
                        ? "bg-red-600 text-white"
                        : "bg-slate-100 text-slate-700"
                    }`}
                  >
                    Portrait
                  </button>
                </div>
              </div>

              {/* Custom Variable */}
              <form onSubmit={handleAddCustomVar} className="space-y-2">
                <input
                  value={customVar}
                  onChange={(e) => setCustomVar(e.target.value)}
                  className="w-full border rounded-xl px-3 py-2 text-sm"
                  placeholder="fatherName"
                />
                <button className="w-full rounded-xl bg-red-600 text-white py-2 text-sm font-semibold">
                  Add Variable
                </button>
              </form>

              {DYNAMIC_PLACEHOLDERS.map((item) => (
                <button
                  key={item.tag}
                  onClick={() =>
                    canvas &&
                    FabricToolService.addPlaceholder(canvas, item.tag)
                  }
                  className="w-full rounded-xl border bg-white p-3 text-left"
                >
                  <div className="text-xs font-bold">{item.label}</div>
                  <div className="text-[11px] text-red-600 font-mono">
                    {item.tag}
                  </div>
                </button>
              ))}
            </div>
          )}

          {activeTab === "media" && (
            <div className="space-y-3">
              <button
                onClick={() => {
                  if (!canvas) return;

                  ImageUploadService.uploadBackground(
                    canvas,
                    (detectedOrientation, dims) => {
                      setOrientation(detectedOrientation);
                      setCanvasDimensions(dims);
                    }
                  );
                }}
                className="w-full rounded-xl border p-4 bg-white"
              >
                Upload Background
              </button>

              <button
                onClick={() => canvas && ImageUploadService.uploadImage(canvas)}
                className="w-full rounded-xl border p-4 bg-white"
              >
                Upload Logo
              </button>
            </div>
          )}

          {activeTab === "shapes" && (
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() =>
                  canvas && FabricToolService.addRectangle(canvas)
                }
                className="border rounded-xl p-4 bg-white"
              >
                Rectangle
              </button>

              <button
                onClick={() => canvas && FabricToolService.addCircle(canvas)}
                className="border rounded-xl p-4 bg-white"
              >
                Circle
              </button>

              <button
                onClick={() => canvas && FabricToolService.addLine(canvas)}
                className="col-span-2 border rounded-xl p-4 bg-white"
              >
                Divider Line
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}