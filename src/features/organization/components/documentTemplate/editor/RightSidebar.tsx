import { useEffect, useState } from "react";
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
  Sliders,
} from "lucide-react";

const FONT_FAMILIES = [
  // Calligraphy & Script Fonts
  { label: "Great Vibes (Calligraphy)", value: "Great Vibes" },
  { label: "Alex Brush (Signature)", value: "Alex Brush" },
  { label: "Dancing Script (Handwritten)", value: "Dancing Script" },
  { label: "Parisienne (Cursive)", value: "Parisienne" },
  { label: "Allura (Classic Script)", value: "Allura" },

  // Classic Serif Fonts
  { label: "Cinzel (Royal Serif)", value: "Cinzel" },
  { label: "Playfair Display (Premium)", value: "Playfair Display" },
  { label: "Cormorant Garamond", value: "Cormorant Garamond" },
  { label: "Georgia", value: "Georgia" },
  { label: "Times New Roman", value: "Times New Roman" },

  // Modern Sans-Serif Fonts
  { label: "Montserrat (Clean)", value: "Montserrat" },
  { label: "Poppins (Geometric)", value: "Poppins" },
  { label: "Inter (Neutral)", value: "Inter" },
  { label: "Roboto", value: "Roboto" },
  { label: "Arial", value: "Arial" },
];

export default function RightSidebar() {
  const { canvas, activeObject } = useFabric();

  // Local state reflecting active object properties
  const [text, setText] = useState("");
  const [fontSize, setFontSize] = useState(24);
  const [fill, setFill] = useState("#000000");
  const [fontFamily, setFontFamily] = useState("Arial");
  const [fontWeight, setFontWeight] = useState("normal");
  const [fontStyle, setFontStyle] = useState("normal");
  const [textAlign, setTextAlign] = useState("left");
  const [boxWidth, setBoxWidth] = useState(400);
  const [opacity, setOpacity] = useState(1);

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

  if (!activeObject) {
    return (
      <div className="w-80 border-l border-slate-200 bg-white p-6 text-center text-slate-400 flex flex-col items-center justify-center space-y-3 z-20">
        <div className="h-14 w-14 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-300">
          <Sliders size={28} />
        </div>
        <div>
          <h3 className="text-sm font-bold text-slate-700">Studio Element Inspector</h3>
          <p className="text-xs text-slate-400 mt-1 leading-relaxed">
            Click any text, variable, image, or shape on the canvas to inspect and edit its typography, color, size, and layer ordering.
          </p>
        </div>
      </div>
    );
  }

  const isText = activeObject.type === "i-text" || activeObject.type === "text" || (activeObject as any).text !== undefined;

  const updateProp = (key: string, value: any) => {
    if (!activeObject || !canvas) return;
    activeObject.set(key, value);
    if ((activeObject as any).initDimensions) {
      (activeObject as any).initDimensions();
    }
    if ((activeObject as any)._clearCache) {
      (activeObject as any)._clearCache();
    }
    canvas.renderAll();
  };

  return (
    <div className="w-80 border-l border-slate-200 bg-white p-5 overflow-y-auto space-y-6 z-20 shadow-sm">
      {/* Header Bar */}
      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
        <div className="flex items-center gap-2">
          <Sliders size={16} className="text-red-600" />
          <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
            {isText ? "Text Inspector" : "Object Inspector"}
          </h2>
        </div>
        <button
          onClick={() => {
            if (!canvas) return;
            FabricToolService.deleteSelected(canvas);
          }}
          className="text-red-600 hover:text-red-800 p-1.5 rounded-xl hover:bg-red-50 transition"
          title="Delete Object"
        >
          <Trash2 size={16} />
        </button>
      </div>

      {/* Text Editing Controls */}
      {isText && (
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Text Content
            </label>
            <input
              type="text"
              value={text}
              onChange={(e) => {
                setText(e.target.value);
                updateProp("text", e.target.value);
              }}
              className="w-full rounded-xl border border-slate-200 px-3.5 py-2 text-xs focus:border-red-500 focus:ring-2 focus:ring-red-100 outline-none font-medium"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Font Family
            </label>
            <select
              value={fontFamily}
              onChange={(e) => {
                setFontFamily(e.target.value);
                updateProp("fontFamily", e.target.value);
              }}
              className="w-full rounded-xl border border-slate-200 px-3.5 py-2 text-xs focus:border-red-500 focus:ring-2 focus:ring-red-100 outline-none bg-white font-medium"
            >
              {FONT_FAMILIES.map((f) => (
                <option key={f.value} value={f.value}>
                  {f.label}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Font Size (px)
              </label>
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
                className="w-full rounded-xl border border-slate-200 px-3.5 py-2 text-xs focus:border-red-500 outline-none font-bold"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Text Color
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={fill}
                  onChange={(e) => {
                    setFill(e.target.value);
                    updateProp("fill", e.target.value);
                  }}
                  className="h-8 w-8 cursor-pointer rounded-xl border border-slate-200 p-0.5"
                />
                <span className="text-xs font-mono font-bold uppercase text-slate-700">{fill}</span>
              </div>
            </div>
          </div>

          {/* Quick Color Palette */}
          <div>
            <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2">
              Preset Palette
            </label>
            <div className="flex items-center gap-2">
              {[
                { name: "Navy", color: "#081F5C" },
                { name: "Red", color: "#ef4444" },
                { name: "Emerald", color: "#059669" },
                { name: "Gold", color: "#d97706" },
                { name: "Charcoal", color: "#1f2937" },
                { name: "Black", color: "#000000" },
              ].map((c) => (
                <button
                  key={c.color}
                  onClick={() => {
                    setFill(c.color);
                    updateProp("fill", c.color);
                  }}
                  style={{ backgroundColor: c.color }}
                  className="h-6 w-6 rounded-full border border-slate-200 shadow-sm transition hover:scale-110"
                  title={c.name}
                />
              ))}
            </div>
          </div>

          {/* Word Wrap / Box Width */}
          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="text-xs font-bold text-slate-700">Text Box Width</label>
              <span className="text-[11px] font-mono text-slate-500">{Math.round(boxWidth)}px</span>
            </div>
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
              className="w-full accent-red-600 cursor-pointer"
            />
          </div>

          {/* Formatting Toggles */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">Style & Alignment</label>
            <div className="flex items-center justify-between border border-slate-200 rounded-xl p-1 bg-slate-50">
              <button
                onClick={() => {
                  const newWeight = fontWeight === "bold" ? "normal" : "bold";
                  setFontWeight(newWeight);
                  updateProp("fontWeight", newWeight);
                }}
                className={`p-2 rounded-lg transition ${
                  fontWeight === "bold" ? "bg-white text-red-600 shadow-sm font-bold" : "text-slate-600 hover:text-slate-900"
                }`}
                title="Bold"
              >
                <Bold size={16} />
              </button>

              <button
                onClick={() => {
                  const newStyle = fontStyle === "italic" ? "normal" : "italic";
                  setFontStyle(newStyle);
                  updateProp("fontStyle", newStyle);
                }}
                className={`p-2 rounded-lg transition ${
                  fontStyle === "italic" ? "bg-white text-red-600 shadow-sm" : "text-slate-600 hover:text-slate-900"
                }`}
                title="Italic"
              >
                <Italic size={16} />
              </button>

              <div className="h-4 w-[1px] bg-slate-300"></div>

              <button
                onClick={() => {
                  setTextAlign("left");
                  updateProp("textAlign", "left");
                }}
                className={`p-2 rounded-lg transition ${
                  textAlign === "left" ? "bg-white text-red-600 shadow-sm" : "text-slate-600 hover:text-slate-900"
                }`}
                title="Align Left"
              >
                <AlignLeft size={16} />
              </button>

              <button
                onClick={() => {
                  setTextAlign("center");
                  updateProp("textAlign", "center");
                }}
                className={`p-2 rounded-lg transition ${
                  textAlign === "center" ? "bg-white text-red-600 shadow-sm" : "text-slate-600 hover:text-slate-900"
                }`}
                title="Align Center"
              >
                <AlignCenter size={16} />
              </button>

              <button
                onClick={() => {
                  setTextAlign("right");
                  updateProp("textAlign", "right");
                }}
                className={`p-2 rounded-lg transition ${
                  textAlign === "right" ? "bg-white text-red-600 shadow-sm" : "text-slate-600 hover:text-slate-900"
                }`}
                title="Align Right"
              >
                <AlignRight size={16} />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Non-text Color Control */}
      {!isText && activeObject.fill !== undefined && (
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">Fill Color</label>
          <div className="flex items-center gap-2">
            <input
              type="color"
              value={typeof fill === "string" ? fill : "#000000"}
              onChange={(e) => {
                setFill(e.target.value);
                updateProp("fill", e.target.value);
              }}
              className="h-8 w-8 cursor-pointer rounded-xl border border-slate-200 p-0.5"
            />
            <span className="text-xs font-mono font-bold uppercase text-slate-700">{fill}</span>
          </div>
        </div>
      )}

      {/* Opacity */}
      <div>
        <div className="flex justify-between items-center mb-1">
          <label className="text-xs font-bold text-slate-700">Opacity</label>
          <span className="text-[11px] font-mono text-slate-500">{Math.round(opacity * 100)}%</span>
        </div>
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
          className="w-full accent-red-600 cursor-pointer"
        />
      </div>

      {/* Layer Position */}
      <div>
        <label className="block text-xs font-bold text-slate-700 mb-2">Layer Ordering</label>
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={() => {
              if (!canvas) return;
              FabricToolService.bringToFront(canvas);
            }}
            className="flex items-center justify-center gap-1.5 rounded-xl border border-slate-200 py-2.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition"
          >
            <ArrowUp size={14} /> Bring Front
          </button>

          <button
            onClick={() => {
              if (!canvas) return;
              FabricToolService.sendToBack(canvas);
            }}
            className="flex items-center justify-center gap-1.5 rounded-xl border border-slate-200 py-2.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition"
          >
            <ArrowDown size={14} /> Send Back
          </button>
        </div>
      </div>
    </div>
  );
}