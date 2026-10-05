// import { useState, useEffect } from "react";
// import Header from "./Header";
// import LeftSidebar from "./LeftSidebar";
// import Canvas from "./Canvas";
// import RightSidebar from "./RightSidebar";
// import { Monitor, ArrowLeft, Eye, AlertTriangle, Layers, Sliders, Layout } from "lucide-react";

// interface WorkspaceProps {
//   template?: any;
//   onBack: () => void;
// }

// export default function Workspace({
//   template,
//   onBack,
// }: WorkspaceProps) {
//   const [showMobileNotice, setShowMobileNotice] = useState(false);
//   const [mobileTab, setMobileTab] = useState<"canvas" | "sidebar" | "inspector">("canvas");

//   useEffect(() => {
//     const checkMobile = () => {
//       if (window.innerWidth < 768) {
//         setShowMobileNotice(true);
//       }
//     };
//     checkMobile();
//   }, []);

//   return (
//     <div className="flex h-screen flex-col bg-gray-50 overflow-hidden relative">
//       <Header template={template} onBack={onBack} />

//       <div className="flex flex-1 overflow-hidden relative">
//         {/* Left Sidebar (Desktop fixed, Mobile conditional) */}
//         <div className={`md:flex ${mobileTab === "sidebar" ? "fixed inset-x-0 top-16 bottom-14 z-30 flex bg-white" : "hidden"}`}>
//           <LeftSidebar />
//         </div>

//         {/* Canvas Workspace */}
//         <div className={`flex-1 flex flex-col h-full min-w-0 ${mobileTab === "canvas" ? "flex" : "hidden md:flex"}`}>
//           <Canvas template={template} />
//         </div>

//         {/* Right Sidebar Inspector (Desktop fixed, Mobile conditional) */}
//         <div className={`lg:flex ${mobileTab === "inspector" ? "fixed inset-x-0 top-16 bottom-14 z-30 flex bg-white" : "hidden"}`}>
//           <RightSidebar />
//         </div>
//       </div>

//       {/* Mobile Bottom Navigation Rail */}
//       <div className="md:hidden flex items-center justify-around h-14 bg-white border-t border-gray-200 text-gray-700 z-40 px-2 shrink-0 shadow-lg">
//         <button
//           onClick={() => setMobileTab("sidebar")}
//           className={`flex flex-col items-center gap-1 text-[10px] font-semibold py-1 px-3 rounded-xl transition ${
//             mobileTab === "sidebar" ? "text-red-600 bg-red-50 font-bold" : "text-gray-500"
//           }`}
//         >
//           <Layers size={18} />
//           <span>Elements</span>
//         </button>

//         <button
//           onClick={() => setMobileTab("canvas")}
//           className={`flex flex-col items-center gap-1 text-[10px] font-semibold py-1 px-4 rounded-xl transition ${
//             mobileTab === "canvas" ? "text-red-600 bg-red-50 font-bold" : "text-gray-500"
//           }`}
//         >
//           <Layout size={18} />
//           <span>Canvas View</span>
//         </button>

//         <button
//           onClick={() => setMobileTab("inspector")}
//           className={`flex flex-col items-center gap-1 text-[10px] font-semibold py-1 px-3 rounded-xl transition ${
//             mobileTab === "inspector" ? "text-red-600 bg-red-50 font-bold" : "text-gray-500"
//           }`}
//         >
//           <Sliders size={18} />
//           <span>Inspector</span>
//         </button>
//       </div>

//       {/* Mobile Screen Experience Recommendation Notice */}
//       {showMobileNotice && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-md">
//           <div className="w-full max-w-md overflow-hidden rounded-3xl bg-white border border-gray-200 p-6 shadow-2xl text-gray-900 space-y-5 animate-in fade-in zoom-in duration-200">
//             <div className="flex items-center gap-3">
//               <div className="h-12 w-12 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-600 shrink-0">
//                 <AlertTriangle size={24} />
//               </div>
//               <div>
//                 <h2 className="text-base font-bold text-gray-900">Desktop Recommended</h2>
//                 <p className="text-xs text-amber-700 font-semibold">Studio Designer Engine</p>
//               </div>
//             </div>

//             <div className="space-y-3 bg-gray-50 p-4 rounded-2xl border border-gray-200 text-xs text-gray-600 leading-relaxed">
//               <p>
//                 Creating and editing certificate layouts with precise drag-and-drop elements, font formatting, and variable alignment is optimized for desktop & laptop displays.
//               </p>
//               <div className="flex items-center gap-2 text-gray-500 pt-1 font-mono text-[11px]">
//                 <Monitor size={14} className="text-red-600" />
//                 <span>Best experienced on screens &ge; 1024px</span>
//               </div>
//             </div>

//             <div className="flex flex-col sm:flex-row items-center gap-2.5 pt-1">
//               <button
//                 onClick={onBack}
//                 className="w-full flex items-center justify-center gap-2 rounded-xl bg-gray-100 border border-gray-200 px-4 py-2.5 text-xs font-semibold text-gray-700 hover:bg-gray-200 transition"
//               >
//                 <ArrowLeft size={15} /> Back to Templates
//               </button>
//               <button
//                 onClick={() => setShowMobileNotice(false)}
//                 className="w-full flex items-center justify-center gap-2 rounded-xl bg-red-600 px-4 py-2.5 text-xs font-bold text-white hover:bg-red-700 transition shadow-md shadow-red-200"
//               >
//                 <Eye size={15} /> Continue View
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }



import { useState, useEffect } from "react";
import Header from "./Header";
import LeftSidebar from "./LeftSidebar";
import Canvas from "./Canvas";
import ContextToolbar from "./ContextToolbar";
import PageBar from "./PageBar";
import { useFabric } from "./FabricContext";
import { Monitor, ArrowLeft, Eye, AlertTriangle, Layers, Layout, ChevronLeft, ChevronRight, X } from "lucide-react";

interface WorkspaceProps {
  template?: any;
  onBack: () => void;
}

export default function Workspace({
  template,
  onBack,
}: WorkspaceProps) {
  const { activeObject, pages, activePageId, switchPage, previewMode, setPreviewMode } = useFabric();
  const [showMobileNotice, setShowMobileNotice] = useState(false);
  const [mobileTab, setMobileTab] = useState<"canvas" | "sidebar">("canvas");

  useEffect(() => {
    const checkMobile = () => {
      if (window.innerWidth < 768) {
        setShowMobileNotice(true);
      }
    };
    checkMobile();
  }, []);

  if (previewMode) {
    const activePageIndex = pages.findIndex((page) => page.id === activePageId);
    return (
      <div className="fixed inset-0 z-[100] flex flex-col bg-[#e9e9ee]">
        <header className="flex h-12 shrink-0 items-center justify-between border-b border-slate-200 bg-white px-3 sm:px-5">
          <div className="min-w-0">
            <p className="text-[10px] font-bold uppercase tracking-wider text-red-600">Preview</p>
            <h1 className="truncate text-sm font-semibold text-slate-900">{template?.name || "Untitled design"}</h1>
          </div>
          <div className="flex items-center gap-2">
            <button type="button" onClick={() => activePageIndex > 0 && switchPage(pages[activePageIndex - 1].id)} disabled={activePageIndex <= 0} aria-label="Previous page" className="rounded-lg border border-slate-200 p-2 text-slate-700 hover:bg-slate-50 disabled:opacity-40"><ChevronLeft size={17} /></button>
            <span className="min-w-16 text-center text-xs font-semibold text-slate-600">{Math.max(activePageIndex + 1, 1)} / {pages.length}</span>
            <button type="button" onClick={() => activePageIndex < pages.length - 1 && switchPage(pages[activePageIndex + 1].id)} disabled={activePageIndex >= pages.length - 1} aria-label="Next page" className="rounded-lg border border-slate-200 p-2 text-slate-700 hover:bg-slate-50 disabled:opacity-40"><ChevronRight size={17} /></button>
            <button type="button" onClick={() => setPreviewMode(false)} className="ml-1 inline-flex items-center gap-1.5 rounded-lg bg-slate-900 px-3 py-2 text-xs font-semibold text-white hover:bg-slate-700"><X size={15} /> Exit</button>
          </div>
        </header>
        <main className="flex min-h-0 flex-1">
          <Canvas template={template} previewMode />
        </main>
      </div>
    );
  }

  return (
    <div className="flex h-screen flex-col bg-gray-50 overflow-hidden relative">
      <Header template={template} onBack={onBack} />

      {/* Contextual properties bar — only appears when an element is selected (Canva-style) */}
      {activeObject && <ContextToolbar />}

      <div className="flex flex-1 overflow-hidden relative min-h-0">
        {/* Left Sidebar only — one side, Desktop fixed / Mobile drawer */}
        <div className={`md:flex ${mobileTab === "sidebar" ? "fixed inset-x-0 top-12 sm:top-14 bottom-0 z-30 flex bg-white" : "hidden"}`}>
          <LeftSidebar />
        </div>

        {/* Canvas Workspace + bottom page strip */}
        <div className={`flex-1 flex-col h-full min-w-0 ${mobileTab === "canvas" ? "flex" : "hidden md:flex"}`}>
          <div className="flex-1 min-h-0">
            <Canvas template={template} />
          </div>
          <PageBar />
        </div>
      </div>

      {/* Mobile Bottom Navigation Rail — compact, two tabs only */}
      <div className="md:hidden flex items-center justify-around h-12 bg-white border-t border-gray-200 text-gray-700 z-40 px-2 shrink-0 shadow-[0_-2px_10px_rgba(0,0,0,0.04)]">
        <button
          onClick={() => setMobileTab("sidebar")}
          className={`flex flex-col items-center gap-0.5 text-[9.5px] font-semibold py-1 px-6 rounded-lg transition ${
            mobileTab === "sidebar" ? "text-red-600 bg-red-50 font-bold" : "text-gray-500"
          }`}
        >
          <Layers size={16} />
          <span>Elements</span>
        </button>

        <button
          onClick={() => setMobileTab("canvas")}
          className={`flex flex-col items-center gap-0.5 text-[9.5px] font-semibold py-1 px-6 rounded-lg transition ${
            mobileTab === "canvas" ? "text-red-600 bg-red-50 font-bold" : "text-gray-500"
          }`}
        >
          <Layout size={16} />
          <span>Canvas</span>
        </button>
      </div>

      {/* Mobile Screen Experience Recommendation Notice */}
      {showMobileNotice && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-md">
          <div className="w-full max-w-sm overflow-hidden rounded-2xl bg-white border border-gray-200 p-5 shadow-2xl text-gray-900 space-y-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-600 shrink-0">
                <AlertTriangle size={20} />
              </div>
              <div>
                <h2 className="text-sm font-bold text-gray-900">Desktop Recommended</h2>
                <p className="text-[11px] text-amber-700 font-semibold">Studio Designer Engine</p>
              </div>
            </div>

            <div className="space-y-2.5 bg-gray-50 p-3 rounded-xl border border-gray-200 text-[11px] text-gray-600 leading-relaxed">
              <p>
                Editing certificate layouts with precise drag-and-drop, fonts, and variables works best on desktop.
              </p>
              <div className="flex items-center gap-1.5 text-gray-500 pt-0.5 font-mono text-[10px]">
                <Monitor size={13} className="text-red-600" />
                <span>Best on screens &ge; 1024px</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-2 pt-0.5">
              <button
                onClick={onBack}
                className="w-full flex items-center justify-center gap-1.5 rounded-lg bg-gray-100 border border-gray-200 px-4 py-2 text-xs font-semibold text-gray-700 hover:bg-gray-200 transition"
              >
                <ArrowLeft size={14} /> Back
              </button>
              <button
                onClick={() => setShowMobileNotice(false)}
                className="w-full flex items-center justify-center gap-1.5 rounded-lg bg-red-600 px-4 py-2 text-xs font-bold text-white hover:bg-red-700 transition shadow-sm"
              >
                <Eye size={14} /> Continue
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}