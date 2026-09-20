// import { useState } from "react";
// import { useFabric } from "./FabricContext";
// import { FabricToolService } from "./services/FabricToolService";
// import { ImageUploadService } from "./services/ImageUploadService";
// import {
//   Type,
//   Image as ImageIcon,
//   Square,
//   Sparkles,
//   // Wallpaper,
//   ChevronLeft,
//   ChevronRight,
//   // Plus,
// } from "lucide-react";

// const DYNAMIC_PLACEHOLDERS = [
//   { tag: "{{studentName}}", label: "Student Name", category: "Student" },
//   { tag: "{{email}}", label: "Student Email", category: "Student" },
//   { tag: "{{course}}", label: "Course Name", category: "Program" },
//   { tag: "{{role}}", label: "Role / Position", category: "Program" },
//   { tag: "{{certificateId}}", label: "Certificate ID", category: "Credential" },
//   { tag: "{{issueDate}}", label: "Issue Date", category: "Credential" },
//   { tag: "{{startDate}}", label: "Start Date", category: "Credential" },
//   { tag: "{{endDate}}", label: "End Date", category: "Credential" },
//   { tag: "{{organization}}", label: "Organization Name", category: "Company" },
//   { tag: "{{mentor}}", label: "Mentor Name", category: "Signatory" },
//   { tag: "{{director}}", label: "Director Name", category: "Signatory" },
// ];

// export default function LeftSidebar() {
//   const {
//     canvas,
//     orientation,
//     setOrientation,
//     setCanvasDimensions,
//   } = useFabric();

//   const [activeTab, setActiveTab] = useState<
//     "placeholders" | "text" | "media" | "shapes"
//   >("placeholders");

//   const [customVar, setCustomVar] = useState("");
//   const [collapsed, setCollapsed] = useState(false);

//   const handleAddCustomVar = (e?: React.FormEvent) => {
//     if (e) e.preventDefault();
//     if (!customVar.trim() || !canvas) return;

//     FabricToolService.addPlaceholder(canvas, customVar.trim());
//     setCustomVar("");
//   };

//   return (
//     <div className="relative flex h-full border-r border-slate-200 bg-white shadow-sm z-20 transition-all duration-300 w-full lg:w-auto shrink-0">
//       {/* Icon Navigation Rail */}
//       <div className="flex flex-col border-r border-slate-200 bg-slate-900 p-2 space-y-3 sm:space-y-4 text-white shrink-0">
//         <button
//           onClick={() => {
//             setActiveTab("placeholders");
//             setCollapsed(false);
//           }}
//           className={`p-2.5 sm:p-3 rounded-2xl transition flex flex-col items-center gap-1 text-[10px] sm:text-[11px] font-bold ${
//             activeTab === "placeholders" && !collapsed
//               ? "bg-red-600 text-white shadow-lg shadow-red-900/40"
//               : "text-slate-400 hover:bg-slate-800 hover:text-white"
//           }`}
//         >
//           <Sparkles size={18} />
//           <span>Variables</span>
//         </button>

//         <button
//           onClick={() => {
//             setActiveTab("text");
//             setCollapsed(false);
//           }}
//           className={`p-2.5 sm:p-3 rounded-2xl transition flex flex-col items-center gap-1 text-[10px] sm:text-[11px] font-bold ${
//             activeTab === "text" && !collapsed
//               ? "bg-red-600 text-white shadow-lg shadow-red-900/40"
//               : "text-slate-400 hover:bg-slate-800 hover:text-white"
//           }`}
//         >
//           <Type size={18} />
//           <span>Text</span>
//         </button>

//         <button
//           onClick={() => {
//             setActiveTab("media");
//             setCollapsed(false);
//           }}
//           className={`p-2.5 sm:p-3 rounded-2xl transition flex flex-col items-center gap-1 text-[10px] sm:text-[11px] font-bold ${
//             activeTab === "media" && !collapsed
//               ? "bg-red-600 text-white shadow-lg shadow-red-900/40"
//               : "text-slate-400 hover:bg-slate-800 hover:text-white"
//           }`}
//         >
//           <ImageIcon size={18} />
//           <span>Media</span>
//         </button>

//         <button
//           onClick={() => {
//             setActiveTab("shapes");
//             setCollapsed(false);
//           }}
//           className={`p-2.5 sm:p-3 rounded-2xl transition flex flex-col items-center gap-1 text-[10px] sm:text-[11px] font-bold ${
//             activeTab === "shapes" && !collapsed
//               ? "bg-red-600 text-white shadow-lg shadow-red-900/40"
//               : "text-slate-400 hover:bg-slate-800 hover:text-white"
//           }`}
//         >
//           <Square size={18} />
//           <span>Shapes</span>
//         </button>

//         <div className="mt-auto pt-4 border-t border-slate-800 hidden sm:block">
//           <button
//             onClick={() => setCollapsed(!collapsed)}
//             className="p-2.5 rounded-xl text-slate-400 hover:bg-slate-800 hover:text-white transition w-full flex justify-center"
//           >
//             {collapsed ? (
//               <ChevronRight size={18} />
//             ) : (
//               <ChevronLeft size={18} />
//             )}
//           </button>
//         </div>
//       </div>

//       {!collapsed && (
//         <div className="flex-1 lg:w-72 overflow-y-auto p-4 sm:p-5 space-y-6 bg-slate-50/60">
//           {activeTab === "placeholders" && (
//             <div className="space-y-4">
//               {/* Orientation */}
//               <div className="rounded-2xl border border-slate-200 bg-white p-3 space-y-2">
//                 <div className="flex justify-between text-[11px] font-bold">
//                   <span>Canvas Orientation</span>
//                   <span>{orientation}</span>
//                 </div>

//                 <div className="grid grid-cols-2 gap-2">
//                   <button
//                     type="button"
//                     onClick={() => setOrientation("landscape")}
//                     className={`rounded-xl py-2 text-xs font-bold ${
//                       orientation === "landscape"
//                         ? "bg-red-600 text-white"
//                         : "bg-slate-100 text-slate-700"
//                     }`}
//                   >
//                     Landscape
//                   </button>

//                   <button
//                     type="button"
//                     onClick={() => setOrientation("portrait")}
//                     className={`rounded-xl py-2 text-xs font-bold ${
//                       orientation === "portrait"
//                         ? "bg-red-600 text-white"
//                         : "bg-slate-100 text-slate-700"
//                     }`}
//                   >
//                     Portrait
//                   </button>
//                 </div>
//               </div>

//               {/* Custom Variable */}
//               <form onSubmit={handleAddCustomVar} className="space-y-2">
//                 <input
//                   value={customVar}
//                   onChange={(e) => setCustomVar(e.target.value)}
//                   className="w-full border rounded-xl px-3 py-2 text-sm"
//                   placeholder="fatherName"
//                 />
//                 <button className="w-full rounded-xl bg-red-600 text-white py-2 text-sm font-semibold">
//                   Add Variable
//                 </button>
//               </form>

//               {DYNAMIC_PLACEHOLDERS.map((item) => (
//                 <button
//                   key={item.tag}
//                   onClick={() =>
//                     canvas &&
//                     FabricToolService.addPlaceholder(canvas, item.tag)
//                   }
//                   className="w-full rounded-xl border bg-white p-3 text-left"
//                 >
//                   <div className="text-xs font-bold">{item.label}</div>
//                   <div className="text-[11px] text-red-600 font-mono">
//                     {item.tag}
//                   </div>
//                 </button>
//               ))}
//             </div>
//           )}

//           {activeTab === "media" && (
//             <div className="space-y-3">
//               <button
//                 onClick={() => {
//                   if (!canvas) return;

//                   ImageUploadService.uploadBackground(
//                     canvas,
//                     (detectedOrientation, dims) => {
//                       setOrientation(detectedOrientation);
//                       setCanvasDimensions(dims);
//                     }
//                   );
//                 }}
//                 className="w-full rounded-xl border p-4 bg-white"
//               >
//                 Upload Background
//               </button>

//               <button
//                 onClick={() => canvas && ImageUploadService.uploadImage(canvas)}
//                 className="w-full rounded-xl border p-4 bg-white"
//               >
//                 Upload Logo
//               </button>
//             </div>
//           )}

//           {activeTab === "shapes" && (
//             <div className="grid grid-cols-2 gap-3">
//               <button
//                 onClick={() =>
//                   canvas && FabricToolService.addRectangle(canvas)
//                 }
//                 className="border rounded-xl p-4 bg-white"
//               >
//                 Rectangle
//               </button>

//               <button
//                 onClick={() => canvas && FabricToolService.addCircle(canvas)}
//                 className="border rounded-xl p-4 bg-white"
//               >
//                 Circle
//               </button>

//               <button
//                 onClick={() => canvas && FabricToolService.addLine(canvas)}
//                 className="col-span-2 border rounded-xl p-4 bg-white"
//               >
//                 Divider Line
//               </button>
//             </div>
//           )}
//         </div>
//       )}
//     </div>
//   );
// }


import { useState } from "react";
import { useFabric } from "./FabricContext";
import { FabricToolService } from "./services/FabricToolService";
import { ImageUploadService } from "./services/ImageUploadService";
import {
  Type,
  Image as ImageIcon,
  Square,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  Circle,
  Minus,
  Upload,
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

const NAV_ITEMS = [
  { id: "placeholders", label: "Variables", icon: Sparkles },
  { id: "text", label: "Text", icon: Type },
  { id: "media", label: "Media", icon: ImageIcon },
  { id: "shapes", label: "Shapes", icon: Square },
] as const;

export default function LeftSidebar() {
  const { canvas, orientation, setOrientation, setCanvasDimensions } = useFabric();

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
    <div className="relative flex h-full border-r border-gray-200 bg-white z-20 w-full lg:w-auto shrink-0">
      {/* Slim Icon Rail — Canva style */}
      <div className="flex flex-col items-center border-r border-gray-100 bg-white py-2.5 px-1.5 gap-1 shrink-0 w-[64px]">
        {NAV_ITEMS.map(({ id, label, icon: Icon }) => {
          const active = activeTab === id && !collapsed;
          return (
            <button
              key={id}
              onClick={() => {
                setActiveTab(id);
                setCollapsed(false);
              }}
              className={`w-full py-2 rounded-xl flex flex-col items-center gap-0.5 text-[9.5px] font-bold transition ${
                active
                  ? "bg-red-50 text-red-600"
                  : "text-gray-500 hover:bg-gray-50 hover:text-gray-800"
              }`}
            >
              <Icon size={18} strokeWidth={active ? 2.4 : 2} />
              <span>{label}</span>
            </button>
          );
        })}

        <div className="mt-auto pt-2 border-t border-gray-100 hidden sm:block w-full">
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="p-2 rounded-lg text-gray-400 hover:bg-gray-100 hover:text-gray-700 transition w-full flex justify-center"
            title={collapsed ? "Expand panel" : "Collapse panel"}
          >
            {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
          </button>
        </div>
      </div>

      {/* Sliding Panel */}
      {!collapsed && (
        <div className="flex-1 lg:w-64 overflow-y-auto p-3 space-y-4 bg-white">
          {activeTab === "placeholders" && (
            <div className="space-y-3">
              {/* Orientation */}
              <div className="rounded-xl border border-gray-200 bg-gray-50 p-2.5 space-y-2">
                <div className="flex justify-between items-center text-[10px] font-bold text-gray-500 uppercase tracking-wide">
                  <span>Orientation</span>
                </div>
                <div className="grid grid-cols-2 gap-1.5">
                  <button
                    type="button"
                    onClick={() => setOrientation("landscape")}
                    className={`rounded-lg py-1.5 text-[11px] font-bold transition ${
                      orientation === "landscape" ? "bg-red-600 text-white" : "bg-white text-gray-600 border border-gray-200"
                    }`}
                  >
                    Landscape
                  </button>
                  <button
                    type="button"
                    onClick={() => setOrientation("portrait")}
                    className={`rounded-lg py-1.5 text-[11px] font-bold transition ${
                      orientation === "portrait" ? "bg-red-600 text-white" : "bg-white text-gray-600 border border-gray-200"
                    }`}
                  >
                    Portrait
                  </button>
                </div>
              </div>

              {/* Custom Variable */}
              <form onSubmit={handleAddCustomVar} className="flex gap-1.5">
                <input
                  value={customVar}
                  onChange={(e) => setCustomVar(e.target.value)}
                  className="flex-1 min-w-0 border border-gray-200 rounded-lg px-2.5 py-1.5 text-xs focus:border-red-500 focus:ring-2 focus:ring-red-100 outline-none"
                  placeholder="fatherName"
                />
                <button className="shrink-0 rounded-lg bg-red-600 text-white px-2.5 hover:bg-red-700 transition" title="Add variable">
                  <Plus size={14} />
                </button>
              </form>

              <div className="space-y-1.5">
                {DYNAMIC_PLACEHOLDERS.map((item) => (
                  <button
                    key={item.tag}
                    onClick={() => canvas && FabricToolService.addPlaceholder(canvas, item.tag)}
                    className="w-full rounded-lg border border-gray-200 bg-white hover:border-red-200 hover:bg-red-50/60 p-2 text-left transition group"
                  >
                    <div className="text-[11px] font-bold text-gray-800 group-hover:text-red-700">{item.label}</div>
                    <div className="text-[10px] text-red-600 font-mono">{item.tag}</div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {activeTab === "text" && (
            <div className="space-y-2">
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wide px-0.5">Add text</p>
              <button
                onClick={() => canvas && FabricToolService.addPlaceholder(canvas, "Heading")}
                className="w-full rounded-lg border border-gray-200 bg-white hover:bg-gray-50 p-3 text-left text-lg font-extrabold text-gray-800 transition"
              >
                Add a heading
              </button>
              <button
                onClick={() => canvas && FabricToolService.addPlaceholder(canvas, "Subheading")}
                className="w-full rounded-lg border border-gray-200 bg-white hover:bg-gray-50 p-3 text-left text-sm font-bold text-gray-700 transition"
              >
                Add a subheading
              </button>
              <button
                onClick={() => canvas && FabricToolService.addPlaceholder(canvas, "Body text")}
                className="w-full rounded-lg border border-gray-200 bg-white hover:bg-gray-50 p-3 text-left text-xs text-gray-600 transition"
              >
                Add body text
              </button>
            </div>
          )}

          {activeTab === "media" && (
            <div className="space-y-2">
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wide px-0.5">Upload</p>
              <button
                onClick={() => {
                  if (!canvas) return;
                  ImageUploadService.uploadBackground(canvas, (detectedOrientation, dims) => {
                    setOrientation(detectedOrientation);
                    setCanvasDimensions(dims);
                  });
                }}
                className="w-full flex flex-col items-center justify-center gap-1.5 rounded-xl border-2 border-dashed border-gray-200 hover:border-red-300 hover:bg-red-50/40 p-5 transition text-gray-500 hover:text-red-600"
              >
                <Upload size={20} />
                <span className="text-[11px] font-bold">Upload Background</span>
              </button>

              <button
                onClick={() => canvas && ImageUploadService.uploadImage(canvas)}
                className="w-full flex flex-col items-center justify-center gap-1.5 rounded-xl border-2 border-dashed border-gray-200 hover:border-red-300 hover:bg-red-50/40 p-5 transition text-gray-500 hover:text-red-600"
              >
                <ImageIcon size={20} />
                <span className="text-[11px] font-bold">Upload Logo / Image</span>
              </button>
            </div>
          )}

          {activeTab === "shapes" && (
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => canvas && FabricToolService.addRectangle(canvas)}
                className="flex flex-col items-center justify-center gap-1.5 border border-gray-200 rounded-xl py-4 bg-white hover:bg-gray-50 hover:border-red-200 transition"
              >
                <Square size={22} className="text-gray-700" />
                <span className="text-[10px] font-bold text-gray-600">Rectangle</span>
              </button>

              <button
                onClick={() => canvas && FabricToolService.addCircle(canvas)}
                className="flex flex-col items-center justify-center gap-1.5 border border-gray-200 rounded-xl py-4 bg-white hover:bg-gray-50 hover:border-red-200 transition"
              >
                <Circle size={22} className="text-gray-700" />
                <span className="text-[10px] font-bold text-gray-600">Circle</span>
              </button>

              <button
                onClick={() => canvas && FabricToolService.addLine(canvas)}
                className="col-span-2 flex items-center justify-center gap-2 border border-gray-200 rounded-xl py-3 bg-white hover:bg-gray-50 hover:border-red-200 transition"
              >
                <Minus size={18} className="text-gray-700" />
                <span className="text-[11px] font-bold text-gray-600">Divider Line</span>
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}