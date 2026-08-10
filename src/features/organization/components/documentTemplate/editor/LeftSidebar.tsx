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
  const { canvas, setOrientation } = useFabric();
  const [activeTab, setActiveTab] = useState<"placeholders" | "text" | "media" | "shapes">("placeholders");
  const [customVar, setCustomVar] = useState("");
  const [collapsed, setCollapsed] = useState(false);

  const handleAddCustomVar = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!customVar.trim() || !canvas) return;
    FabricToolService.addPlaceholder(canvas, customVar.trim());
    setCustomVar("");
  };

  return (
    <div className="relative flex h-full border-r border-slate-200 bg-white shadow-sm z-20 transition-all duration-300">
      {/* Icon Navigation Rail */}
      <div className="flex flex-col border-r border-slate-200 bg-slate-900 p-2 space-y-4 text-white">
        <button
          onClick={() => {
            setActiveTab("placeholders");
            setCollapsed(false);
          }}
          className={`p-3 rounded-2xl transition flex flex-col items-center gap-1 text-[11px] font-bold ${
            activeTab === "placeholders" && !collapsed
              ? "bg-red-600 text-white shadow-lg shadow-red-900/40"
              : "text-slate-400 hover:bg-slate-800 hover:text-white"
          }`}
          title="Dynamic Variables"
        >
          <Sparkles size={20} />
          <span>Variables</span>
        </button>

        <button
          onClick={() => {
            setActiveTab("text");
            setCollapsed(false);
          }}
          className={`p-3 rounded-2xl transition flex flex-col items-center gap-1 text-[11px] font-bold ${
            activeTab === "text" && !collapsed
              ? "bg-red-600 text-white shadow-lg shadow-red-900/40"
              : "text-slate-400 hover:bg-slate-800 hover:text-white"
          }`}
          title="Text Elements"
        >
          <Type size={20} />
          <span>Text</span>
        </button>

        <button
          onClick={() => {
            setActiveTab("media");
            setCollapsed(false);
          }}
          className={`p-3 rounded-2xl transition flex flex-col items-center gap-1 text-[11px] font-bold ${
            activeTab === "media" && !collapsed
              ? "bg-red-600 text-white shadow-lg shadow-red-900/40"
              : "text-slate-400 hover:bg-slate-800 hover:text-white"
          }`}
          title="Media & Background"
        >
          <ImageIcon size={20} />
          <span>Media</span>
        </button>

        <button
          onClick={() => {
            setActiveTab("shapes");
            setCollapsed(false);
          }}
          className={`p-3 rounded-2xl transition flex flex-col items-center gap-1 text-[11px] font-bold ${
            activeTab === "shapes" && !collapsed
              ? "bg-red-600 text-white shadow-lg shadow-red-900/40"
              : "text-slate-400 hover:bg-slate-800 hover:text-white"
          }`}
          title="Shapes & Lines"
        >
          <Square size={20} />
          <span>Shapes</span>
        </button>

        <div className="mt-auto pt-4 border-t border-slate-800">
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="p-2.5 rounded-xl text-slate-400 hover:bg-slate-800 hover:text-white transition w-full flex justify-center"
            title={collapsed ? "Expand Panel" : "Collapse Panel"}
          >
            {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
          </button>
        </div>
      </div>

      {/* Expanded Content Drawer Panel */}
      {!collapsed && (
        <div className="w-72 overflow-y-auto p-5 space-y-6 bg-slate-50/60 animate-in fade-in slide-in-from-left-4 duration-200">
          {/* Placeholders Tab */}
          {activeTab === "placeholders" && (
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                  <Sparkles size={16} className="text-red-600" /> Dynamic Variables
                </h3>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                  Single click to add variables. They automatically populate with student credentials.
                </p>
              </div>

              {/* Custom Variable Form */}
              <form onSubmit={handleAddCustomVar} className="rounded-2xl border border-red-200 bg-red-50/50 p-3 space-y-2">
                <label className="block text-[11px] font-bold text-slate-800 uppercase tracking-wider">
                  Add Custom Variable
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={customVar}
                    onChange={(e) => setCustomVar(e.target.value)}
                    placeholder="e.g. fatherName"
                    className="w-full rounded-xl border border-slate-200 px-3 py-1.5 text-xs outline-none focus:border-red-500 focus:ring-2 focus:ring-red-100 bg-white"
                  />
                  <button
                    type="submit"
                    disabled={!customVar.trim()}
                    className="shrink-0 rounded-xl bg-red-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-red-700 disabled:opacity-50 transition shadow-sm"
                  >
                    <Plus size={14} />
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
                    className="w-full flex items-center justify-between rounded-2xl border border-slate-200 bg-white p-3 text-left transition hover:border-red-500 hover:shadow-md group"
                  >
                    <span className="text-xs font-bold text-slate-800 group-hover:text-red-700">
                      {item.label}
                    </span>
                    <span className="text-[11px] font-mono font-bold text-red-600 bg-red-50 border border-red-100 px-2 py-0.5 rounded-lg">
                      {item.tag}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Text Tab */}
          {activeTab === "text" && (
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                  <Type size={16} className="text-red-600" /> Typography Presets
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  Add static titles, subtitles, cursive headings, or body descriptions.
                </p>
              </div>

              <div className="space-y-3">
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
                  className="w-full rounded-2xl border border-slate-200 bg-white p-3.5 text-left hover:border-red-500 hover:shadow-md transition group"
                >
                  <div className="text-base font-bold text-[#081F5C] group-hover:text-red-600 font-serif">
                    CERTIFICATE TITLE
                  </div>
                  <div className="text-[11px] text-slate-400 mt-1">Cinzel Royal Serif • 34px</div>
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
                  className="w-full rounded-2xl border border-slate-200 bg-white p-3.5 text-left hover:border-red-500 hover:shadow-md transition group"
                >
                  <div className="text-sm font-serif italic text-slate-700 group-hover:text-red-600">
                    This certificate is proudly presented to
                  </div>
                  <div className="text-[11px] text-slate-400 mt-1">Playfair Display Italic • 18px</div>
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
                  className="w-full rounded-2xl border border-slate-200 bg-white p-3.5 text-left hover:border-red-500 hover:shadow-md transition group"
                >
                  <div className="text-2xl text-[#081F5C] group-hover:text-red-600" style={{ fontFamily: "'Great Vibes', cursive" }}>
                    Student Name Calligraphy
                  </div>
                  <div className="text-[11px] text-slate-400 mt-1">Great Vibes Cursive • 42px</div>
                </button>

                <button
                  onClick={() => {
                    if (!canvas) return;
                    FabricToolService.addText(canvas, "For successfully completing the training program with outstanding performance.", {
                      fontSize: 15,
                      fontFamily: "'Poppins', sans-serif",
                      fill: "#374151",
                      textAlign: "center",
                    });
                  }}
                  className="w-full rounded-2xl border border-slate-200 bg-white p-3.5 text-left hover:border-red-500 hover:shadow-md transition group"
                >
                  <div className="text-xs font-normal text-slate-700 group-hover:text-red-600">
                    Standard Body Description Paragraph
                  </div>
                  <div className="text-[11px] text-slate-400 mt-1">Poppins Sans-Serif • 15px</div>
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
                  className="w-full rounded-2xl border border-slate-200 bg-white p-3.5 text-left hover:border-red-500 hover:shadow-md transition group"
                >
                  <div className="text-xl text-slate-800 group-hover:text-red-600" style={{ fontFamily: "'Alex Brush', cursive" }}>
                    Signature Script
                  </div>
                  <div className="text-[11px] text-slate-400 mt-1">Alex Brush Cursive • 22px</div>
                </button>
              </div>
            </div>
          )}

          {/* Media & Background Tab */}
          {activeTab === "media" && (
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                  <ImageIcon size={16} className="text-red-600" /> Media & Assets
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  Upload custom background templates, organization logos, or signature images.
                </p>
              </div>

              <div className="space-y-3">
                <button
                  onClick={() => {
                    if (!canvas) return;
                    ImageUploadService.uploadBackground(canvas, (detectedOrientation) => {
                      setOrientation(detectedOrientation);
                    });
                  }}
                  className="w-full flex items-center gap-3 rounded-2xl border-2 border-dashed border-red-200 bg-red-50/40 p-4 text-left hover:border-red-500 hover:bg-red-50 transition shadow-xs group"
                >
                  <Wallpaper className="text-red-600 shrink-0" size={24} />
                  <div>
                    <div className="text-xs font-bold text-slate-900 group-hover:text-red-700">Upload Background Image</div>
                    <div className="text-[11px] text-slate-500">Full certificate canvas template</div>
                  </div>
                </button>

                <button
                  onClick={() => {
                    if (!canvas) return;
                    ImageUploadService.uploadImage(canvas);
                  }}
                  className="w-full flex items-center gap-3 rounded-2xl border border-slate-200 bg-white p-3.5 text-left hover:border-red-500 hover:shadow-md transition group"
                >
                  <ImageIcon className="text-slate-600 shrink-0" size={20} />
                  <div>
                    <div className="text-xs font-bold text-slate-900 group-hover:text-red-700">Add Logo / Signature</div>
                    <div className="text-[11px] text-slate-500">Insert PNG graphics</div>
                  </div>
                </button>

                <button
                  onClick={() => {
                    if (!canvas) return;
                    canvas.set('backgroundImage', null);
                    canvas.renderAll();
                  }}
                  className="w-full rounded-2xl border border-slate-200 bg-white p-2.5 text-center text-xs font-semibold text-red-600 hover:bg-red-50 transition"
                >
                  Remove Background Image
                </button>
              </div>
            </div>
          )}

          {/* Shapes Tab */}
          {activeTab === "shapes" && (
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                  <Square size={16} className="text-red-600" /> Shapes & Dividers
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  Insert geometric frames, badges, or divider lines.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => {
                    if (!canvas) return;
                    FabricToolService.addRectangle(canvas);
                  }}
                  className="flex flex-col items-center justify-center rounded-2xl border border-slate-200 bg-white p-4 hover:border-red-500 hover:shadow-md transition"
                >
                  <div className="h-8 w-12 rounded bg-red-500 mb-2 shadow-xs"></div>
                  <span className="text-xs font-bold text-slate-800">Rectangle</span>
                </button>

                <button
                  onClick={() => {
                    if (!canvas) return;
                    FabricToolService.addCircle(canvas);
                  }}
                  className="flex flex-col items-center justify-center rounded-2xl border border-slate-200 bg-white p-4 hover:border-red-500 hover:shadow-md transition"
                >
                  <div className="h-8 w-8 rounded-full bg-blue-500 mb-2 shadow-xs"></div>
                  <span className="text-xs font-bold text-slate-800">Circle</span>
                </button>

                <button
                  onClick={() => {
                    if (!canvas) return;
                    FabricToolService.addLine(canvas);
                  }}
                  className="col-span-2 flex items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white p-3.5 hover:border-red-500 hover:shadow-md transition"
                >
                  <div className="h-0.5 w-16 bg-slate-900"></div>
                  <span className="text-xs font-bold text-slate-800">Divider Line</span>
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}