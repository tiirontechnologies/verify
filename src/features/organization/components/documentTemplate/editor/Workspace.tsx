import { useState, useEffect } from "react";
import Header from "./Header";
import LeftSidebar from "./LeftSidebar";
import Canvas from "./Canvas";
import RightSidebar from "./RightSidebar";
import { useFabric } from "./FabricContext";
import {
  Sparkles,
  Sliders,
  CheckCircle2,
  X,
  LayoutGrid,
  ArrowRight,
} from "lucide-react";

interface WorkspaceProps {
  template?: any;
  onBack: () => void;
}

export default function Workspace({
  template,
  onBack,
}: WorkspaceProps) {
  const { activeObject } = useFabric();
  const [currentTemplate, setCurrentTemplate] = useState<any>(template);
  const [mobileTab, setMobileTab] = useState<"canvas" | "tools" | "inspector">("canvas");
  const [snackbar, setSnackbar] = useState<{
    show: boolean;
    message: string;
    type: "success" | "error";
  }>({
    show: false,
    message: "",
    type: "success",
  });

  // Auto switch to Inspector bottom drawer when an object is selected on mobile
  useEffect(() => {
    if (activeObject && window.innerWidth < 1024) {
      setMobileTab("inspector");
    }
  }, [activeObject]);

  const showSnackbar = (message: string, type: "success" | "error" = "success") => {
    setSnackbar({ show: true, message, type });
  };

  return (
    <div className="flex h-screen flex-col bg-slate-900 overflow-hidden relative">
      {/* Studio Header Bar */}
      <Header
        template={currentTemplate}
        onBack={onBack}
        onSaveSuccess={(msg) => showSnackbar(msg, "success")}
        onTemplateUpdate={(updatedTpl) => setCurrentTemplate(updatedTpl)}
      />

      {/* Floating Snackbar Toast Banner */}
      {snackbar.show && (
        <div className="fixed top-16 left-1/2 -translate-x-1/2 z-50 w-[92%] max-w-xl animate-in slide-in-from-top-6 duration-300">
          <div
            className={`flex items-center justify-between gap-3 rounded-2xl p-4 shadow-2xl backdrop-blur-xl border ${
              snackbar.type === "success"
                ? "bg-slate-900/95 border-emerald-500/40 text-emerald-300 ring-1 ring-emerald-500/20"
                : "bg-slate-900/95 border-red-500/40 text-red-300 ring-1 ring-red-500/20"
            }`}
          >
            <div className="flex items-center gap-3 min-w-0">
              <div className="h-9 w-9 shrink-0 rounded-xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                <CheckCircle2 size={20} />
              </div>
              <div className="min-w-0">
                <h4 className="text-xs font-bold text-slate-100 uppercase tracking-wider">
                  Template Saved
                </h4>
                <p className="text-xs text-slate-300 mt-0.5 truncate leading-relaxed">
                  {snackbar.message}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={onBack}
                className="flex items-center gap-1 text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white px-3 py-1.5 rounded-xl transition shadow-md"
              >
                Back to Dashboard <ArrowRight size={14} />
              </button>
              <button
                onClick={() => setSnackbar((prev) => ({ ...prev, show: false }))}
                className="p-1.5 text-slate-400 hover:text-white rounded-lg transition"
              >
                <X size={18} />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Studio Viewport Area */}
      <div className="flex flex-1 overflow-hidden relative">
        {/* Desktop Left Sidebar Panel */}
        <div className="hidden lg:block h-full shrink-0">
          <LeftSidebar />
        </div>

        {/* Canvas Center Area */}
        <div className="flex-1 h-full relative min-w-0 overflow-hidden">
          <Canvas template={currentTemplate} />
        </div>

        {/* Desktop Right Sidebar Inspector */}
        <div className="hidden lg:block h-full shrink-0 w-80">
          <RightSidebar />
        </div>

        {/* MOBILE / TABLET: Slide-Up Bottom Drawer for Tools */}
        {mobileTab === "tools" && (
          <div className="lg:hidden fixed inset-0 z-40 flex flex-col justify-end bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
            <div className="w-full bg-white rounded-t-3xl max-h-[75vh] flex flex-col shadow-2xl border-t border-slate-200 overflow-hidden animate-in slide-in-from-bottom duration-300">
              <div className="flex items-center justify-between px-5 py-3 border-b border-slate-200 bg-slate-50">
                <div className="flex items-center gap-2">
                  <Sparkles size={18} className="text-red-600" />
                  <span className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                    Variables & Template Tools
                  </span>
                </div>
                <button
                  onClick={() => setMobileTab("canvas")}
                  className="p-1.5 rounded-full bg-slate-200 text-slate-700 hover:bg-slate-300"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto">
                <LeftSidebar />
              </div>
            </div>
          </div>
        )}

        {/* MOBILE / TABLET: Slide-Up Bottom Drawer for Inspector */}
        {mobileTab === "inspector" && (
          <div className="lg:hidden fixed inset-0 z-40 flex flex-col justify-end bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
            <div className="w-full bg-white rounded-t-3xl max-h-[75vh] flex flex-col shadow-2xl border-t border-slate-200 overflow-hidden animate-in slide-in-from-bottom duration-300">
              <div className="flex items-center justify-between px-5 py-3 border-b border-slate-200 bg-slate-50">
                <div className="flex items-center gap-2">
                  <Sliders size={18} className="text-red-600" />
                  <span className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                    Element Inspector & Styling
                  </span>
                </div>
                <button
                  onClick={() => setMobileTab("canvas")}
                  className="p-1.5 rounded-full bg-slate-200 text-slate-700 hover:bg-slate-300"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto">
                <RightSidebar />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* MOBILE BOTTOM NAVIGATION TAB BAR */}
      <div className="lg:hidden border-t border-slate-800 bg-slate-950 px-4 py-2.5 flex items-center justify-around z-30 shadow-2xl">
        <button
          onClick={() => setMobileTab("canvas")}
          className={`flex flex-col items-center gap-1 text-[11px] font-bold px-4 py-1.5 rounded-xl transition ${
            mobileTab === "canvas"
              ? "bg-red-600 text-white shadow-md"
              : "text-slate-400 hover:text-slate-200"
          }`}
        >
          <LayoutGrid size={18} />
          <span>Canvas View</span>
        </button>

        <button
          onClick={() => setMobileTab("tools")}
          className={`flex flex-col items-center gap-1 text-[11px] font-bold px-4 py-1.5 rounded-xl transition ${
            mobileTab === "tools"
              ? "bg-red-600 text-white shadow-md"
              : "text-slate-400 hover:text-slate-200"
          }`}
        >
          <Sparkles size={18} />
          <span>Variables & Tools</span>
        </button>

        <button
          onClick={() => setMobileTab("inspector")}
          className={`flex flex-col items-center gap-1 text-[11px] font-bold px-4 py-1.5 rounded-xl transition relative ${
            mobileTab === "inspector"
              ? "bg-red-600 text-white shadow-md"
              : "text-slate-400 hover:text-slate-200"
          }`}
        >
          <Sliders size={18} />
          <span>Inspector</span>
          {activeObject && (
            <span className="absolute top-1 right-2 h-2 w-2 rounded-full bg-red-400 animate-ping"></span>
          )}
        </button>
      </div>
    </div>
  );
}