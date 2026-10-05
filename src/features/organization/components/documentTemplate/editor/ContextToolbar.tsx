import { useEffect, useRef, useState } from "react";
import { Shadow } from "fabric";
import { useFabric } from "./FabricContext";
import { FabricToolService } from "./services/FabricToolService";
import { ImageUploadService } from "./services/ImageUploadService";
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
  const [underline, setUnderline] = useState(false);
  const [linethrough, setLinethrough] = useState(false);
  const [textAlign, setTextAlign] = useState("left");
  const [boxWidth, setBoxWidth] = useState(400);
  const [opacity, setOpacity] = useState(1);
  const [charSpacing, setCharSpacing] = useState(0);
  const [lineHeight, setLineHeight] = useState(1.16);
  const [textBackground, setTextBackground] = useState("#ffffff");
  const [stroke, setStroke] = useState("#000000");
  const [strokeWidth, setStrokeWidth] = useState(0);
  const [cornerRadius, setCornerRadius] = useState(0);
  const [hasShadow, setHasShadow] = useState(false);
  const [crop, setCrop] = useState({ x: 0, y: 0, width: 0, height: 0 });
  const [geometry, setGeometry] = useState({ x: 0, y: 0, width: 0, height: 0, angle: 0 });
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
        setUnderline(Boolean((activeObject as any).underline));
        setLinethrough(Boolean((activeObject as any).linethrough));
        setTextAlign((activeObject as any).textAlign || "left");
        setBoxWidth((activeObject as any).width || 400);
        setCharSpacing((activeObject as any).charSpacing || 0);
        setLineHeight((activeObject as any).lineHeight || 1.16);
        setTextBackground((activeObject as any).textBackgroundColor || "#ffffff");
      }
      if ((activeObject as any).fill) {
        setFill(typeof (activeObject as any).fill === "string" ? (activeObject as any).fill : "#000000");
      }
      setOpacity(activeObject.opacity ?? 1);
      setStroke(typeof activeObject.stroke === "string" ? activeObject.stroke : "#000000");
      setStrokeWidth(activeObject.strokeWidth || 0);
      setCornerRadius(activeObject.rx || 0);
      setHasShadow(Boolean(activeObject.shadow));
      setGeometry({
        x: Math.round(activeObject.left || 0),
        y: Math.round(activeObject.top || 0),
        width: Math.round(activeObject.getScaledWidth?.() || 0),
        height: Math.round(activeObject.getScaledHeight?.() || 0),
        angle: Math.round(activeObject.angle || 0),
      });
      if (activeObject.type === "image") {
        setCrop({
          x: Math.round(activeObject.cropX || 0),
          y: Math.round(activeObject.cropY || 0),
          width: Math.round(activeObject.width || 0),
          height: Math.round(activeObject.height || 0),
        });
      }
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
    activeObject.setCoords();
    canvas.fire("object:modified", { target: activeObject });
    canvas.requestRenderAll();
  };

  const updateGeometry = (key: keyof typeof geometry, value: number) => {
    if (!canvas || !activeObject || !Number.isFinite(value)) return;
    setGeometry((current) => ({ ...current, [key]: value }));
    if (key === "width" && activeObject.width) {
      activeObject.set("scaleX", value / activeObject.width);
    } else if (key === "height" && activeObject.height) {
      activeObject.set("scaleY", value / activeObject.height);
    } else {
      activeObject.set(key === "angle" ? "angle" : key === "x" ? "left" : "top", value);
    }
    activeObject.setCoords();
    canvas.fire("object:modified", { target: activeObject });
    canvas.requestRenderAll();
  };

  const alignSelection = (alignment: "left" | "center" | "right" | "top" | "middle" | "bottom") => {
    if (!canvas) return;
    const objects = canvas.getActiveObjects();
    if (!objects.length) return;
    const bounds = objects.map((object) => object.getBoundingRect());
    const left = Math.min(...bounds.map((rect) => rect.left));
    const top = Math.min(...bounds.map((rect) => rect.top));
    const right = Math.max(...bounds.map((rect) => rect.left + rect.width));
    const bottom = Math.max(...bounds.map((rect) => rect.top + rect.height));
    const width = right - left;
    const height = bottom - top;
    const horizontal = alignment === "left" || alignment === "center" || alignment === "right";
    const delta = horizontal
      ? (alignment === "left" ? -left : alignment === "right" ? canvas.getWidth() - right : (canvas.getWidth() - width) / 2 - left)
      : (alignment === "top" ? -top : alignment === "bottom" ? canvas.getHeight() - bottom : (canvas.getHeight() - height) / 2 - top);

    objects.forEach((object) => {
      object.set(horizontal ? "left" : "top", ((horizontal ? object.left : object.top) || 0) + delta);
      object.setCoords();
      canvas.fire("object:modified", { target: object });
    });
    canvas.requestRenderAll();
  };

  const distributeSelection = (axis: "x" | "y") => {
    if (!canvas) return;
    const objects = canvas.getActiveObjects();
    if (objects.length < 3) return;
    const sorted = objects.map((object) => ({ object, bounds: object.getBoundingRect() }))
      .sort((a, b) => axis === "x" ? a.bounds.left - b.bounds.left : a.bounds.top - b.bounds.top);
    const first = sorted[0].bounds;
    const last = sorted[sorted.length - 1].bounds;
    const start = axis === "x" ? first.left : first.top;
    const end = axis === "x" ? last.left + last.width : last.top + last.height;
    const totalSize = sorted.reduce((sum, item) => sum + (axis === "x" ? item.bounds.width : item.bounds.height), 0);
    const gap = (end - start - totalSize) / (sorted.length - 1);
    let cursor = start;

    sorted.forEach(({ object, bounds }) => {
      const currentStart = axis === "x" ? bounds.left : bounds.top;
      const size = axis === "x" ? bounds.width : bounds.height;
      const delta = cursor - currentStart;
      object.set(axis === "x" ? "left" : "top", ((axis === "x" ? object.left : object.top) || 0) + delta);
      object.setCoords();
      canvas.fire("object:modified", { target: object });
      cursor += size + gap;
    });
    canvas.requestRenderAll();
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
            <button
              onClick={() => {
                const value = !underline;
                setUnderline(value);
                updateProp("underline", value);
              }}
              className={`px-1.5 py-1 rounded text-xs font-bold underline transition ${underline ? "bg-white text-red-600 shadow-sm" : "text-gray-500 hover:text-gray-900"}`}
              title="Underline"
              aria-label="Underline"
            >U</button>
            <button
              onClick={() => {
                const value = !linethrough;
                setLinethrough(value);
                updateProp("linethrough", value);
              }}
              className={`px-1.5 py-1 rounded text-xs font-bold line-through transition ${linethrough ? "bg-white text-red-600 shadow-sm" : "text-gray-500 hover:text-gray-900"}`}
              title="Strikethrough"
              aria-label="Strikethrough"
            >S</button>
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

          <label className="flex items-center gap-1 shrink-0 text-[10px] font-bold text-gray-400" title="Letter spacing">
            Spacing
            <input type="number" min={0} max={500} step={5} value={charSpacing} onChange={(event) => {
              const value = Number(event.target.value);
              setCharSpacing(value);
              updateProp("charSpacing", value);
            }} className="w-12 rounded border border-gray-200 px-1 py-1 text-[10px] font-medium text-gray-700" aria-label="Letter spacing" />
          </label>
          <label className="flex items-center gap-1 shrink-0 text-[10px] font-bold text-gray-400" title="Line height">
            Line
            <input type="number" min={0.5} max={4} step={0.1} value={lineHeight} onChange={(event) => {
              const value = Number(event.target.value);
              setLineHeight(value);
              updateProp("lineHeight", value);
            }} className="w-12 rounded border border-gray-200 px-1 py-1 text-[10px] font-medium text-gray-700" aria-label="Line height" />
          </label>
          <label className="flex items-center gap-1 shrink-0 text-[10px] font-bold text-gray-400" title="Text highlight">
            Highlight
            <input type="color" value={textBackground} onChange={(event) => {
              setTextBackground(event.target.value);
              updateProp("textBackgroundColor", event.target.value);
            }} className="h-7 w-7 rounded border border-gray-200 p-0.5" aria-label="Text highlight color" />
          </label>

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

      {(activeObject.fill !== undefined || activeObject.stroke !== undefined) && (
        <div className="flex items-center gap-1.5 shrink-0">
          <label className="flex items-center gap-1 text-[9px] font-bold text-gray-400" title="Border color">
            Border
            <input type="color" value={stroke} onChange={(event) => {
              setStroke(event.target.value);
              updateProp("stroke", event.target.value);
            }} className="h-7 w-7 rounded border border-gray-200 p-0.5" aria-label="Border color" />
          </label>
          <label className="flex items-center gap-1 text-[9px] font-bold text-gray-400" title="Border width">
            <input type="number" min={0} max={40} value={strokeWidth} onChange={(event) => {
              const value = Math.max(0, Number(event.target.value));
              setStrokeWidth(value);
              updateProp("strokeWidth", value);
            }} className="w-10 rounded border border-gray-200 px-1 py-1 text-[10px] text-gray-700" aria-label="Border width" />
          </label>
          {activeObject.type === "rect" && <label className="flex items-center gap-1 text-[9px] font-bold text-gray-400" title="Corner radius">
            Radius
            <input type="number" min={0} max={100} value={cornerRadius} onChange={(event) => {
              const value = Math.max(0, Number(event.target.value));
              setCornerRadius(value);
              updateProp("rx", value);
              updateProp("ry", value);
            }} className="w-10 rounded border border-gray-200 px-1 py-1 text-[10px] text-gray-700" aria-label="Corner radius" />
          </label>}
          <button type="button" onClick={() => {
            const enabled = !hasShadow;
            setHasShadow(enabled);
            updateProp("shadow", enabled ? new Shadow({ color: "rgba(15, 23, 42, 0.24)", blur: 10, offsetX: 2, offsetY: 3 }) : null);
          }} className={`rounded px-2 py-1.5 text-[10px] font-bold ${hasShadow ? "bg-red-50 text-red-700" : "text-gray-600 hover:bg-gray-100"}`} title="Toggle subtle shadow">Shadow</button>
        </div>
      )}

      <div className="h-6 w-px bg-gray-200 shrink-0" />

      <div className="flex items-center gap-0.5 shrink-0" aria-label="Align selection to page">
        {(["left", "center", "right", "top", "middle", "bottom"] as const).map((alignment) => (
          <button
            key={alignment}
            type="button"
            onClick={() => alignSelection(alignment)}
            className="rounded px-1.5 py-1.5 text-[9px] font-bold uppercase text-gray-600 hover:bg-gray-100 hover:text-red-600"
            title={`Align ${alignment} to page`}
            aria-label={`Align ${alignment} to page`}
          >
            {alignment === "center" ? "HC" : alignment === "middle" ? "VM" : alignment.slice(0, 1)}
          </button>
        ))}
      </div>

      <div className="flex items-center gap-0.5 shrink-0" aria-label="Distribute selection">
        <button type="button" onClick={() => distributeSelection("x")} className="rounded px-1.5 py-1.5 text-[9px] font-bold text-gray-600 hover:bg-gray-100 hover:text-red-600" title="Distribute horizontally" aria-label="Distribute horizontally">Spread X</button>
        <button type="button" onClick={() => distributeSelection("y")} className="rounded px-1.5 py-1.5 text-[9px] font-bold text-gray-600 hover:bg-gray-100 hover:text-red-600" title="Distribute vertically" aria-label="Distribute vertically">Spread Y</button>
      </div>

      <div className="h-6 w-px bg-gray-200 shrink-0" />

      {/* Position, size, and rotation */}
      <div className="flex items-center gap-1 shrink-0" aria-label="Selected object geometry">
        {([
          ["x", "X"],
          ["y", "Y"],
          ["width", "W"],
          ["height", "H"],
          ["angle", "°"],
        ] as const).map(([key, label]) => (
          <label key={key} className="flex items-center gap-1 text-[10px] font-bold text-gray-400" title={key === "angle" ? "Rotation" : key === "width" ? "Width" : key === "height" ? "Height" : key.toUpperCase()}>
            {label}
            <input
              type="number"
              value={geometry[key]}
              onChange={(event) => updateGeometry(key, Number(event.target.value))}
              className="w-12 rounded border border-gray-200 px-1 py-1 text-[10px] font-medium text-gray-700 outline-none focus:border-red-500 sm:w-14"
              aria-label={key === "angle" ? "Rotation" : key === "width" ? "Width" : key === "height" ? "Height" : key.toUpperCase()}
            />
          </label>
        ))}
      </div>

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

      {activeObject.type === "image" && (
        <div className="flex items-center gap-1 shrink-0">
          <button type="button" onClick={() => updateProp("flipX", !activeObject.flipX)} className={`rounded px-2 py-1.5 text-[10px] font-bold ${activeObject.flipX ? "bg-red-50 text-red-700" : "text-gray-600 hover:bg-gray-100"}`} title="Flip horizontally">Flip H</button>
          <button type="button" onClick={() => updateProp("flipY", !activeObject.flipY)} className={`rounded px-2 py-1.5 text-[10px] font-bold ${activeObject.flipY ? "bg-red-50 text-red-700" : "text-gray-600 hover:bg-gray-100"}`} title="Flip vertically">Flip V</button>
          <button type="button" onClick={() => updateProp("angle", ((activeObject.angle || 0) + 90) % 360)} className="rounded px-2 py-1.5 text-[10px] font-bold text-gray-600 hover:bg-gray-100" title="Rotate 90 degrees">Rotate 90</button>
          <button type="button" onClick={() => canvas && ImageUploadService.replaceImage(canvas, activeObject)} className="rounded px-2 py-1.5 text-[10px] font-bold text-gray-600 hover:bg-gray-100" title="Replace image">Replace</button>
          {(["x", "y", "width", "height"] as const).map((key) => (
            <label key={key} className="flex items-center gap-0.5 text-[9px] font-bold text-gray-400" title={`Crop ${key}`}>
              C{key === "width" ? "W" : key === "height" ? "H" : key.toUpperCase()}
              <input type="number" min={0} value={crop[key]} onChange={(event) => {
                const value = Math.max(0, Number(event.target.value));
                setCrop((current) => ({ ...current, [key]: value }));
                updateProp(key === "x" ? "cropX" : key === "y" ? "cropY" : key, value);
              }} className="w-11 rounded border border-gray-200 px-1 py-1 text-[9px] font-medium text-gray-700" aria-label={`Crop ${key}`} />
            </label>
          ))}
        </div>
      )}

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
