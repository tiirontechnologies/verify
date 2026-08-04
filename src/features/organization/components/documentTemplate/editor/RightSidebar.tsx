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
  { label: "Great Vibes (Calligraphy)", value: "'Great Vibes', cursive" },
  { label: "Alex Brush (Signature)", value: "'Alex Brush', cursive" },
  { label: "Dancing Script (Handwritten)", value: "'Dancing Script', cursive" },
  { label: "Parisienne (Elegant Cursive)", value: "'Parisienne', cursive" },
  { label: "Allura (Classic Script)", value: "'Allura', cursive" },

  // Classic Serif Fonts
  { label: "Cinzel (Royal Serif)", value: "'Cinzel', serif" },
  { label: "Playfair Display (Premium Serif)", value: "'Playfair Display', serif" },
  { label: "Cormorant Garamond (Editorial)", value: "'Cormorant Garamond', serif" },
  { label: "Georgia (Traditional)", value: "Georgia, serif" },
  { label: "Times New Roman", value: "'Times New Roman', serif" },

  // Modern Sans-Serif Fonts
  { label: "Montserrat (Modern Clean)", value: "'Montserrat', sans-serif" },
  { label: "Poppins (Geometric Sans)", value: "'Poppins', sans-serif" },
  { label: "Inter (Neutral Clean)", value: "'Inter', sans-serif" },
  { label: "Roboto (Standard Sans)", value: "'Roboto', sans-serif" },
  { label: "Arial", value: "Arial, sans-serif" },
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

    if (activeObject.text !== undefined) {
      setText(activeObject.text || "");
      setFontSize(activeObject.fontSize || 24);
      setFontFamily(activeObject.fontFamily || "Arial");
      setFontWeight(activeObject.fontWeight || "normal");
      setFontStyle(activeObject.fontStyle || "normal");
      setTextAlign(activeObject.textAlign || "left");
      setBoxWidth(activeObject.width || 400);
    }

    if (activeObject.fill) {
      setFill(typeof activeObject.fill === "string" ? activeObject.fill : "#000000");
    }

    setOpacity(activeObject.opacity ?? 1);
  }, [activeObject]);

  if (!activeObject) {
    return (
      <div className="w-72 border-l bg-white p-6 text-center text-gray-400 flex flex-col items-center justify-center space-y-3">
        <Sliders size={32} className="text-gray-300" />
        <div>
          <h3 className="text-sm font-semibold text-gray-700">No Object Selected</h3>
          <p className="text-xs text-gray-400 mt-1">
            Click any element or dynamic variable on the canvas to customize its appearance.
          </p>
        </div>
      </div>
    );
  }

  const isText = activeObject.type === "i-text" || activeObject.type === "text" || activeObject.text !== undefined;

  const updateProp = (key: string, value: any) => {
    if (!activeObject || !canvas) return;
    activeObject.set(key, value);
    canvas.renderAll();
  };

  return (
    <div className="w-72 border-l bg-white p-5 overflow-y-auto space-y-6">
      <div className="flex items-center justify-between border-b pb-3">
        <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wide">
          {isText ? "Text Properties" : "Object Properties"}
        </h2>
        <button
          onClick={() => {
            if (!canvas) return;
            FabricToolService.deleteSelected(canvas);
          }}
          className="text-red-600 hover:text-red-800 p-1.5 rounded-lg hover:bg-red-50 transition"
          title="Delete Object"
        >
          <Trash2 size={18} />
        </button>
      </div>

      {/* Text Editing Controls */}
      {isText && (
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">Text Content</label>
            <input
              type="text"
              value={text}
              onChange={(e) => {
                setText(e.target.value);
                updateProp("text", e.target.value);
              }}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-xs focus:border-red-500 focus:ring-1 focus:ring-red-500 outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">Font Family</label>
            <select
              value={fontFamily}
              onChange={(e) => {
                setFontFamily(e.target.value);
                updateProp("fontFamily", e.target.value);
              }}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-xs focus:border-red-500 focus:ring-1 focus:ring-red-500 outline-none bg-white"
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
              <label className="block text-xs font-medium text-gray-600 mb-1">Font Size</label>
              <input
                type="number"
                min={8}
                max={120}
                value={fontSize}
                onChange={(e) => {
                  const val = Number(e.target.value);
                  setFontSize(val);
                  updateProp("fontSize", val);
                }}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-xs focus:border-red-500 outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Text Color</label>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={fill}
                  onChange={(e) => {
                    setFill(e.target.value);
                    updateProp("fill", e.target.value);
                  }}
                  className="h-8 w-8 cursor-pointer rounded-md border border-gray-300 p-0.5"
                />
                <span className="text-xs font-mono uppercase text-gray-600">{fill}</span>
              </div>
            </div>
          </div>

          {/* Quick Color Palette */}
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1.5">Preset Color Palette</label>
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
                  className="h-6 w-6 rounded-full border border-gray-300 shadow-sm transition hover:scale-110"
                  title={c.name}
                />
              ))}
            </div>
          </div>

          {/* Word Wrap / Box Width */}
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">
              Text Box Width / Word Wrap ({Math.round(boxWidth)}px)
            </label>
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
              className="w-full accent-red-600"
            />
          </div>

          {/* Formatting Toggles */}
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">Style & Alignment</label>
            <div className="flex items-center justify-between border rounded-lg p-1 bg-gray-50">
              <button
                onClick={() => {
                  const newWeight = fontWeight === "bold" ? "normal" : "bold";
                  setFontWeight(newWeight);
                  updateProp("fontWeight", newWeight);
                }}
                className={`p-2 rounded-md ${
                  fontWeight === "bold" ? "bg-white text-red-600 shadow-sm" : "text-gray-600"
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
                className={`p-2 rounded-md ${
                  fontStyle === "italic" ? "bg-white text-red-600 shadow-sm" : "text-gray-600"
                }`}
                title="Italic"
              >
                <Italic size={16} />
              </button>

              <div className="h-4 w-[1px] bg-gray-300"></div>

              <button
                onClick={() => {
                  setTextAlign("left");
                  updateProp("textAlign", "left");
                }}
                className={`p-2 rounded-md ${
                  textAlign === "left" ? "bg-white text-red-600 shadow-sm" : "text-gray-600"
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
                className={`p-2 rounded-md ${
                  textAlign === "center" ? "bg-white text-red-600 shadow-sm" : "text-gray-600"
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
                className={`p-2 rounded-md ${
                  textAlign === "right" ? "bg-white text-red-600 shadow-sm" : "text-gray-600"
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
          <label className="block text-xs font-medium text-gray-600 mb-1">Fill Color</label>
          <div className="flex items-center gap-2">
            <input
              type="color"
              value={typeof fill === "string" ? fill : "#000000"}
              onChange={(e) => {
                setFill(e.target.value);
                updateProp("fill", e.target.value);
              }}
              className="h-8 w-8 cursor-pointer rounded-md border border-gray-300 p-0.5"
            />
            <span className="text-xs font-mono uppercase text-gray-600">{fill}</span>
          </div>
        </div>
      )}

      {/* Opacity */}
      <div>
        <label className="block text-xs font-medium text-gray-600 mb-1">
          Opacity ({Math.round(opacity * 100)}%)
        </label>
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
          className="w-full accent-red-600"
        />
      </div>

      {/* Layer Position */}
      <div>
        <label className="block text-xs font-medium text-gray-600 mb-1">Layer Ordering</label>
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={() => {
              if (!canvas) return;
              FabricToolService.bringToFront(canvas);
            }}
            className="flex items-center justify-center gap-1.5 rounded-lg border border-gray-200 py-2 text-xs text-gray-700 hover:bg-gray-50 transition"
          >
            <ArrowUp size={14} /> Bring Front
          </button>

          <button
            onClick={() => {
              if (!canvas) return;
              FabricToolService.sendToBack(canvas);
            }}
            className="flex items-center justify-center gap-1.5 rounded-lg border border-gray-200 py-2 text-xs text-gray-700 hover:bg-gray-50 transition"
          >
            <ArrowDown size={14} /> Send Back
          </button>
        </div>
      </div>
    </div>
  );
}