import { useEffect, useRef, useState } from "react";
import { useFabric } from "./FabricContext";
import { FabricToolService } from "./services/FabricToolService";
import {
  Bold,
  Italic,
  AlignLeft,
  AlignCenter,
  AlignRight,
  ArrowUp,
  ArrowDown,
  Trash2,
  ChevronDown,
  Plus,
} from "lucide-react";

const FONT_FAMILIES = [
  { label: "Great Vibes (Calligraphy)", value: "Great Vibes" },
  { label: "Alex Brush (Signature)", value: "Alex Brush" },
  { label: "Dancing Script (Handwritten)", value: "Dancing Script" },
  { label: "Parisienne (Cursive)", value: "Parisienne" },
  { label: "Allura (Classic Script)", value: "Allura" },
  { label: "Cinzel (Royal Serif)", value: "Cinzel" },
  { label: "Playfair Display (Premium)", value: "Playfair Display" },
  { label: "Cormorant Garamond", value: "Cormorant Garamond" },
  { label: "Georgia", value: "Georgia" },
  { label: "Times New Roman", value: "Times New Roman" },
  { label: "Montserrat (Clean)", value: "Montserrat" },
  { label: "Poppins (Geometric)", value: "Poppins" },
  { label: "Inter (Neutral)", value: "Inter" },
  { label: "Roboto", value: "Roboto" },
  { label: "Arial", value: "Arial" },
];

const PRESET_COLORS = [
  { name: "Navy", color: "#081F5C" },
  { name: "Red", color: "#ef4444" },
  { name: "Emerald", color: "#059669" },
  { name: "Gold", color: "#d97706" },
  { name: "Charcoal", color: "#1f2937" },
  { name: "Black", color: "#000000" },
];

const QUICK_VARS = [
  "{{startDate}}",
  "{{endDate}}",
  "{{studentName}}",
  "{{course}}",
  "{{organization}}",
  "{{certificateId}}",
];

export default function ContextToolbar() {
  const { canvas, activeObject } = useFabric();

  const [text, setText] = useState("");
  const [fontSize, setFontSize] = useState(24);
  const [fill, setFill] = useState("#000000");
  const [fontFamily, setFontFamily] = useState("Arial");
  const [fontWeight, setFontWeight] = useState("normal");
  const [fontStyle, setFontStyle] = useState("normal");
  const [textAlign, setTextAlign] = useState("left");
  const [boxWidth, setBoxWidth] = useState(400);
  const [opacity, setOpacity] = useState(1);
  const [varMenuOpen, setVarMenuOpen] = useState(false);
  const varMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!activeObject) return;

    const syncProps = () => {
      if ((activeObject as any).text !== undefined) {
        setText((activeObject as any).text || "");
        setFontSize((activeObject as any).fontSize || 24);
        setFontFamily((activeObject as any).fontFamily || "Arial");
        setFontWeight((activeObject as any).fontWeight || "normal");
        setFontStyle((activeObject as any).fontStyle || "normal");
        setTextAlign((activeObject as any).textAlign || "left");
        setBoxWidth((activeObject as any).width || 400);
      }
      if ((activeObject as any).fill) {
        setFill(typeof (activeObject as any).fill === "string" ? (activeObject as any).fill : "#000000");
      }
      setOpacity(activeObject.opacity ?? 1);
    };

    syncProps();

    if (canvas) {
      canvas.on("object:modified", syncProps);
      canvas.on("text:changed", syncProps);
      return () => {
        canvas.off("object:modified", syncProps);
        canvas.off("text:changed", syncProps);
      };
    }
  }, [activeObject, canvas]);

  // Close variable dropdown on outside click
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (varMenuRef.current && !varMenuRef.current.contains(e.target as Node)) {
        setVarMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  if (!activeObject) return null;

  const isText = activeObject.type === "i-text" || activeObject.type === "text" || (activeObject as any).text !== undefined;

  const updateProp = (key: string, value: any) => {
    if (!activeObject || !canvas) return;
    activeObject.set(key, value);
    if ((activeObject as any).initDimensions) (activeObject as any).initDimensions();
    if ((activeObject as any)._clearCache) (activeObject as any)._clearCache();
    canvas.renderAll();
  };

  const insertVariable = (varTag: string) => {
    if (!isText) return;
    const current = text || "";
    const padded = current && !current.endsWith(" ") ? ` ${varTag} ` : `${varTag} `;
    const updated = current + padded;
    setText(updated);
    updateProp("text", updated);
    setVarMenuOpen(false);
  };

  return (
    <div className="flex items-center gap-1.5 h-12 px-2 sm:px-3 border-b border-gray-200 bg-white overflow-x-auto no-scrollbar shrink-0 z-20 relative">
      {isText && (
        <>
          {/* Inline text edit */}
          <input
            value={text}
            onChange={(e) => {
              setText(e.target.value);
              updateProp("text", e.target.value);
            }}
            placeholder="Text…"
            className="w-28 sm:w-40 shrink-0 rounded-md border border-gray-200 px-2 py-1.5 text-xs focus:border-red-500 focus:ring-2 focus:ring-red-100 outline-none"
          />

          {/* Insert variable dropdown */}
          <div className="relative shrink-0" ref={varMenuRef}>
            <button
              onClick={() => setVarMenuOpen((v) => !v)}
              className="flex items-center gap-1 rounded-md border border-red-200 bg-red-50 text-red-700 px-2 py-1.5 text-[11px] font-bold hover:bg-red-100 transition"
              title="Insert variable"
            >
              <Plus size={12} /> Var <ChevronDown size={12} />
            </button>
            {varMenuOpen && (
              <div className="absolute left-0 top-full mt-1 w-48 rounded-lg border border-gray-200 bg-white shadow-xl p-1.5 z-30">
                {QUICK_VARS.map((v) => (
                  <button
                    key={v}
                    onClick={() => insertVariable(v)}
                    className="w-full text-left px-2 py-1.5 rounded-md hover:bg-red-50 text-[11px] font-mono font-bold text-red-700 transition"
                  >
                    {v}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="h-6 w-px bg-gray-200 shrink-0" />

          {/* Font family */}
          <select
            value={fontFamily}
            onChange={(e) => {
              setFontFamily(e.target.value);
              updateProp("fontFamily", e.target.value);
            }}
            className="shrink-0 w-28 sm:w-36 rounded-md border border-gray-200 px-2 py-1.5 text-xs focus:border-red-500 outline-none bg-white font-medium"
          >
            {FONT_FAMILIES.map((f) => (
              <option key={f.value} value={f.value}>
                {f.label}
              </option>
            ))}
          </select>

          {/* Font size */}
          <input
            type="number"
            min={8}
            max={140}
            value={fontSize}
            onChange={(e) => {
              const val = Number(e.target.value);
              setFontSize(val);
              updateProp("fontSize", val);
            }}
            className="shrink-0 w-14 rounded-md border border-gray-200 px-2 py-1.5 text-xs focus:border-red-500 outline-none font-bold"
          />

          <div className="h-6 w-px bg-gray-200 shrink-0" />

          {/* Style + align */}
          <div className="flex items-center rounded-md bg-gray-100 p-0.5 shrink-0">
            <button
              onClick={() => {
                const nw = fontWeight === "bold" ? "normal" : "bold";
                setFontWeight(nw);
                updateProp("fontWeight", nw);
              }}
              className={`p-1.5 rounded transition ${fontWeight === "bold" ? "bg-white text-red-600 shadow-sm" : "text-gray-500 hover:text-gray-900"}`}
              title="Bold"
            >
              <Bold size={14} />
            </button>
            <button
              onClick={() => {
                const ns = fontStyle === "italic" ? "normal" : "italic";
                setFontStyle(ns);
                updateProp("fontStyle", ns);
              }}
              className={`p-1.5 rounded transition ${fontStyle === "italic" ? "bg-white text-red-600 shadow-sm" : "text-gray-500 hover:text-gray-900"}`}
              title="Italic"
            >
              <Italic size={14} />
            </button>
            <div className="h-3.5 w-px bg-gray-300 mx-0.5" />
            <button
              onClick={() => {
                setTextAlign("left");
                updateProp("textAlign", "left");
              }}
              className={`p-1.5 rounded transition ${textAlign === "left" ? "bg-white text-red-600 shadow-sm" : "text-gray-500 hover:text-gray-900"}`}
              title="Align Left"
            >
              <AlignLeft size={14} />
            </button>
            <button
              onClick={() => {
                setTextAlign("center");
                updateProp("textAlign", "center");
              }}
              className={`p-1.5 rounded transition ${textAlign === "center" ? "bg-white text-red-600 shadow-sm" : "text-gray-500 hover:text-gray-900"}`}
              title="Align Center"
            >
              <AlignCenter size={14} />
            </button>
            <button
              onClick={() => {
                setTextAlign("right");
                updateProp("textAlign", "right");
              }}
              className={`p-1.5 rounded transition ${textAlign === "right" ? "bg-white text-red-600 shadow-sm" : "text-gray-500 hover:text-gray-900"}`}
              title="Align Right"
            >
              <AlignRight size={14} />
            </button>
          </div>

          <div className="h-6 w-px bg-gray-200 shrink-0" />

          {/* Box width */}
          <div className="hidden md:flex items-center gap-1.5 shrink-0" title="Text box width">
            <span className="text-[10px] font-bold text-gray-400 uppercase">Width</span>
            <input
              type="range"
              min={100}
              max={950}
              step={10}
              value={boxWidth}
              onChange={(e) => {
                const val = Number(e.target.value);
                setBoxWidth(val);
                updateProp("width", val);
              }}
              className="w-20 accent-red-600 cursor-pointer"
            />
          </div>

          <div className="h-6 w-px bg-gray-200 shrink-0" />
        </>
      )}

      {/* Color (text fill or shape fill) */}
      {(isText || activeObject.fill !== undefined) && (
        <div className="flex items-center gap-1.5 shrink-0">
          <input
            type="color"
            value={typeof fill === "string" ? fill : "#000000"}
            onChange={(e) => {
              setFill(e.target.value);
              updateProp("fill", e.target.value);
            }}
            className="h-7 w-7 cursor-pointer rounded-md border border-gray-200 p-0.5"
          />
          <div className="hidden sm:flex items-center gap-1">
            {PRESET_COLORS.map((c) => (
              <button
                key={c.color}
                onClick={() => {
                  setFill(c.color);
                  updateProp("fill", c.color);
                }}
                style={{ backgroundColor: c.color }}
                className="h-5 w-5 rounded-full border border-gray-200 shadow-sm transition hover:scale-110"
                title={c.name}
              />
            ))}
          </div>
        </div>
      )}

      <div className="h-6 w-px bg-gray-200 shrink-0" />

      {/* Opacity */}
      <div className="flex items-center gap-1.5 shrink-0">
        <span className="text-[10px] font-bold text-gray-400 uppercase">Opacity</span>
        <input
          type="range"
          min={0}
          max={1}
          step={0.05}
          value={opacity}
          onChange={(e) => {
            const val = parseFloat(e.target.value);
            setOpacity(val);
            updateProp("opacity", val);
          }}
          className="w-16 accent-red-600 cursor-pointer"
        />
        <span className="text-[10px] font-mono text-gray-500 w-8 shrink-0">{Math.round(opacity * 100)}%</span>
      </div>

      <div className="h-6 w-px bg-gray-200 shrink-0" />

      {/* Layer order */}
      <button
        onClick={() => canvas && FabricToolService.bringToFront(canvas)}
        className="p-2 rounded-md text-gray-600 hover:bg-gray-100 transition shrink-0"
        title="Bring to Front"
      >
        <ArrowUp size={15} />
      </button>
      <button
        onClick={() => canvas && FabricToolService.sendToBack(canvas)}
        className="p-2 rounded-md text-gray-600 hover:bg-gray-100 transition shrink-0"
        title="Send to Back"
      >
        <ArrowDown size={15} />
      </button>

      <div className="ml-auto" />

      {/* Delete */}
      <button
        onClick={() => canvas && FabricToolService.deleteSelected(canvas)}
        className="p-2 rounded-md text-red-600 hover:bg-red-50 transition shrink-0"
        title="Delete"
      >
        <Trash2 size={16} />
      </button>
    </div>
  );
}