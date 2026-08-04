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
} from "lucide-react";

const DYNAMIC_PLACEHOLDERS = [
  { tag: "{{studentName}}", label: "Student Name" },
  { tag: "{{course}}", label: "Course Name" },
  { tag: "{{role}}", label: "Role / Position" },
  { tag: "{{certificateId}}", label: "Certificate ID" },
  { tag: "{{issueDate}}", label: "Issue Date" },
  { tag: "{{startDate}}", label: "Start Date" },
  { tag: "{{endDate}}", label: "End Date" },
  { tag: "{{organization}}", label: "Organization Name" },
  { tag: "{{mentor}}", label: "Mentor Name" },
  { tag: "{{director}}", label: "Director Name" },
];

export default function LeftSidebar() {
  const { canvas } = useFabric();
  const [activeTab, setActiveTab] = useState<"text" | "placeholders" | "media" | "shapes">("placeholders");
  const [customVar, setCustomVar] = useState("");

  const handleAddCustomVar = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!customVar.trim() || !canvas) return;
    FabricToolService.addPlaceholder(canvas, customVar.trim());
    setCustomVar("");
  };

  return (
    <div className="flex h-full w-80 border-r bg-white">
      {/* Navigation Icons Bar */}
      <div className="flex flex-col border-r bg-gray-50 p-2 space-y-4">
        <button
          onClick={() => setActiveTab("placeholders")}
          className={`p-3 rounded-xl transition flex flex-col items-center gap-1 text-xs font-medium ${
            activeTab === "placeholders"
              ? "bg-red-600 text-white shadow-md"
              : "text-gray-600 hover:bg-gray-200"
          }`}
          title="Dynamic Variables"
        >
          <Sparkles size={20} />
          <span>Variables</span>
        </button>

        <button
          onClick={() => setActiveTab("text")}
          className={`p-3 rounded-xl transition flex flex-col items-center gap-1 text-xs font-medium ${
            activeTab === "text"
              ? "bg-red-600 text-white shadow-md"
              : "text-gray-600 hover:bg-gray-200"
          }`}
          title="Text Elements"
        >
          <Type size={20} />
          <span>Text</span>
        </button>

        <button
          onClick={() => setActiveTab("media")}
          className={`p-3 rounded-xl transition flex flex-col items-center gap-1 text-xs font-medium ${
            activeTab === "media"
              ? "bg-red-600 text-white shadow-md"
              : "text-gray-600 hover:bg-gray-200"
          }`}
          title="Media & Background"
        >
          <ImageIcon size={20} />
          <span>Media</span>
        </button>

        <button
          onClick={() => setActiveTab("shapes")}
          className={`p-3 rounded-xl transition flex flex-col items-center gap-1 text-xs font-medium ${
            activeTab === "shapes"
              ? "bg-red-600 text-white shadow-md"
              : "text-gray-600 hover:bg-gray-200"
          }`}
          title="Shapes & Lines"
        >
          <Square size={20} />
          <span>Shapes</span>
        </button>
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-y-auto p-4">
        {/* Dynamic Placeholders */}
        {activeTab === "placeholders" && (
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-bold text-gray-900 flex items-center gap-2">
                <Sparkles size={16} className="text-red-600" /> Dynamic Student Fields
              </h3>
              <p className="text-xs text-gray-500 mt-1">
                Click to insert variables. They will automatically be replaced with student data. Press Backspace or Delete to remove any selected variable on canvas.
              </p>
            </div>

            {/* Custom Variable Form */}
            <form onSubmit={handleAddCustomVar} className="rounded-xl border border-red-200 bg-red-50/40 p-3 space-y-2">
              <label className="block text-xs font-bold text-gray-800">Add Custom Variable</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={customVar}
                  onChange={(e) => setCustomVar(e.target.value)}
                  placeholder="e.g. fatherName"
                  className="w-full rounded-lg border border-gray-300 px-2.5 py-1.5 text-xs outline-none focus:border-red-500 bg-white"
                />
                <button
                  type="submit"
                  disabled={!customVar.trim()}
                  className="shrink-0 rounded-lg bg-red-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-red-700 disabled:opacity-50 transition"
                >
                  Add
                </button>
              </div>
            </form>

            <div className="space-y-2">
              {DYNAMIC_PLACEHOLDERS.map((item) => (
                <button
                  key={item.tag}
                  onClick={() => {
                    if (!canvas) return;
                    FabricToolService.addPlaceholder(canvas, item.tag);
                  }}
                  className="w-full flex items-center justify-between rounded-xl border border-gray-200 bg-gray-50 p-2.5 text-left transition hover:border-red-500 hover:bg-red-50/50 group"
                >
                  <span className="text-xs font-semibold text-gray-800 group-hover:text-red-700">
                    {item.label}
                  </span>
                  <span className="text-[11px] font-mono text-red-600 bg-red-100/60 px-2 py-0.5 rounded-md">
                    {item.tag}
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Text Elements */}
        {activeTab === "text" && (
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-bold text-gray-900 flex items-center gap-2">
                <Type size={16} className="text-red-600" /> Text Elements & Styles
              </h3>
              <p className="text-xs text-gray-500 mt-1">
                Add static headers, signatures, or decorative text to your certificate template.
              </p>
            </div>

            <div className="space-y-2.5">
              <button
                onClick={() => {
                  if (!canvas) return;
                  FabricToolService.addText(canvas, "CERTIFICATE OF COMPLETION", {
                    fontSize: 34,
                    fontWeight: "bold",
                    fontFamily: "'Cinzel', serif",
                    fill: "#081F5C",
                    textAlign: "center",
                  });
                }}
                className="w-full rounded-xl border border-gray-200 bg-white p-3 text-left hover:border-red-500 hover:bg-red-50 transition shadow-xs group"
              >
                <div className="text-base font-bold text-[#081F5C] group-hover:text-red-600 font-serif">
                  CERTIFICATE TITLE
                </div>
                <div className="text-[11px] text-gray-400">Cinzel Royal Serif • 34px</div>
              </button>

              <button
                onClick={() => {
                  if (!canvas) return;
                  FabricToolService.addText(canvas, "This certificate is proudly presented to", {
                    fontSize: 18,
                    fontFamily: "'Playfair Display', serif",
                    fontStyle: "italic",
                    fill: "#4b5563",
                    textAlign: "center",
                  });
                }}
                className="w-full rounded-xl border border-gray-200 bg-white p-3 text-left hover:border-red-500 hover:bg-red-50 transition shadow-xs group"
              >
                <div className="text-sm font-serif italic text-gray-700 group-hover:text-red-600">
                  This certificate is proudly presented to
                </div>
                <div className="text-[11px] text-gray-400">Playfair Display Italic • 18px</div>
              </button>

              <button
                onClick={() => {
                  if (!canvas) return;
                  FabricToolService.addText(canvas, "{{studentName}}", {
                    fontSize: 42,
                    fontWeight: "bold",
                    fontFamily: "'Great Vibes', cursive",
                    fill: "#081F5C",
                    textAlign: "center",
                  });
                }}
                className="w-full rounded-xl border border-gray-200 bg-white p-3 text-left hover:border-red-500 hover:bg-red-50 transition shadow-xs group"
              >
                <div className="text-xl text-[#081F5C] group-hover:text-red-600 font-serif" style={{ fontFamily: "'Great Vibes', cursive" }}>
                  Student Name Calligraphy
                </div>
                <div className="text-[11px] text-gray-400">Great Vibes Cursive • 42px</div>
              </button>

              <button
                onClick={() => {
                  if (!canvas) return;
                  FabricToolService.addText(canvas, "For successfully completing the program with outstanding performance.", {
                    fontSize: 15,
                    fontFamily: "'Poppins', sans-serif",
                    fill: "#374151",
                    textAlign: "center",
                  });
                }}
                className="w-full rounded-xl border border-gray-200 bg-white p-3 text-left hover:border-red-500 hover:bg-red-50 transition shadow-xs group"
              >
                <div className="text-xs font-normal text-gray-700 group-hover:text-red-600">
                  Standard Body Description Paragraph
                </div>
                <div className="text-[11px] text-gray-400">Poppins Sans-Serif • 15px</div>
              </button>

              <button
                onClick={() => {
                  if (!canvas) return;
                  FabricToolService.addText(canvas, "Authorized Director", {
                    fontSize: 22,
                    fontFamily: "'Alex Brush', cursive",
                    fill: "#1f2937",
                    textAlign: "center",
                  });
                }}
                className="w-full rounded-xl border border-gray-200 bg-white p-3 text-left hover:border-red-500 hover:bg-red-50 transition shadow-xs group"
              >
                <div className="text-lg text-gray-800 group-hover:text-red-600" style={{ fontFamily: "'Alex Brush', cursive" }}>
                  Signature Style
                </div>
                <div className="text-[11px] text-gray-400">Alex Brush Script • 22px</div>
              </button>
            </div>
          </div>
        )}

        {/* Media & Background */}
        {activeTab === "media" && (
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-bold text-gray-900 flex items-center gap-2">
                <ImageIcon size={16} className="text-red-600" /> Media & Background
              </h3>
              <p className="text-xs text-gray-500 mt-1">
                Upload background design, organization logos, or signature images.
              </p>
            </div>

            <div className="space-y-3">
              <button
                onClick={() => {
                  if (!canvas) return;
                  ImageUploadService.uploadBackground(canvas);
                }}
                className="w-full flex items-center gap-3 rounded-xl border-2 border-dashed border-red-200 bg-red-50/30 p-4 text-left hover:border-red-500 hover:bg-red-50 transition"
              >
                <Wallpaper className="text-red-600 shrink-0" size={24} />
                <div>
                  <div className="text-xs font-bold text-gray-900">Upload Background Image</div>
                  <div className="text-[11px] text-gray-500">Full certificate template image</div>
                </div>
              </button>

              <button
                onClick={() => {
                  if (!canvas) return;
                  ImageUploadService.uploadImage(canvas);
                }}
                className="w-full flex items-center gap-3 rounded-xl border border-gray-200 bg-white p-3 text-left hover:border-red-500 hover:bg-red-50 transition"
              >
                <ImageIcon className="text-gray-600 shrink-0" size={20} />
                <div>
                  <div className="text-xs font-bold text-gray-900">Add Image / Logo / Signature</div>
                  <div className="text-[11px] text-gray-500">Insert custom graphics</div>
                </div>
              </button>

              <button
                onClick={() => {
                  if (!canvas) return;
                  canvas.backgroundImage = undefined;
                  canvas.renderAll();
                }}
                className="w-full rounded-xl border border-gray-200 p-2.5 text-center text-xs text-red-600 hover:bg-red-50 transition"
              >
                Remove Background Image
              </button>
            </div>
          </div>
        )}

        {/* Shapes & Lines */}
        {activeTab === "shapes" && (
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-bold text-gray-900 flex items-center gap-2">
                <Square size={16} className="text-red-600" /> Shapes & Dividers
              </h3>
              <p className="text-xs text-gray-500 mt-1">
                Insert decorative elements into your layout.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => {
                  if (!canvas) return;
                  FabricToolService.addRectangle(canvas);
                }}
                className="flex flex-col items-center justify-center rounded-xl border border-gray-200 p-4 hover:border-red-500 hover:bg-red-50 transition"
              >
                <div className="h-8 w-12 rounded bg-red-500 mb-2"></div>
                <span className="text-xs font-medium text-gray-700">Rectangle</span>
              </button>

              <button
                onClick={() => {
                  if (!canvas) return;
                  FabricToolService.addCircle(canvas);
                }}
                className="flex flex-col items-center justify-center rounded-xl border border-gray-200 p-4 hover:border-red-500 hover:bg-red-50 transition"
              >
                <div className="h-8 w-8 rounded-full bg-blue-500 mb-2"></div>
                <span className="text-xs font-medium text-gray-700">Circle</span>
              </button>

              <button
                onClick={() => {
                  if (!canvas) return;
                  FabricToolService.addLine(canvas);
                }}
                className="col-span-2 flex items-center justify-center gap-2 rounded-xl border border-gray-200 p-3 hover:border-red-500 hover:bg-red-50 transition"
              >
                <div className="h-0.5 w-16 bg-gray-900"></div>
                <span className="text-xs font-medium text-gray-700">Divider Line</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}