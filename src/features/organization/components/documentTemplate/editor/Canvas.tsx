import { useEffect, useRef, useCallback, useMemo } from "react";
import { Canvas as FabricCanvas, ActiveSelection } from "fabric";
import { useFabric } from "./FabricContext";
import { ZoomIn, ZoomOut, Maximize2 } from "lucide-react";

function cleanFontFamily(font: string): string {
  if (!font) return "Arial";
  const first = font.split(",")[0].replace(/['"]/g, "").trim();
  return first || "Arial";
}

// Dispose hone ke baad fabric `lower` hata deta hai
const isAlive = (c: any) => Boolean(c && c.lower && c.lower.el);

// Canvas size SIRF orientation se tay hota hai (bg image se kabhi nahi)
function getDims(orientation: "landscape" | "portrait") {
  return orientation === "portrait"
    ? { w: 747, h: 1056 }
    : { w: 1056, h: 747 };
}

function getBgNaturalSize(bg: any) {
  if (!bg) return { natW: undefined, natH: undefined };
  const el = bg._element || (bg.getElement && bg.getElement()) || bg;
  return {
    natW: bg.width || el?.naturalWidth || el?.width,
    natH: bg.height || el?.naturalHeight || el?.height,
  };
}

// Bg ko canvas ke poore size par fit karo
function fitBackground(canvas: any, w: number, h: number) {
  const bg = canvas.backgroundImage as any;
  if (!bg) return;
  const { natW, natH } = getBgNaturalSize(bg);
  if (!natW || !natH) return;
  bg.set({
    scaleX: w / natW,
    scaleY: h / natH,
    originX: "left",
    originY: "top",
    left: 0,
    top: 0,
  });
}

// Module-level clipboard: page/component change hone par bhi paste chalega
let clipboardObject: any = null;

interface CanvasProps {
  template?: any;
}

export default function Canvas({ template }: CanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const {
    canvas,
    setCanvas,
    setActiveObject,
    orientation,
    setOrientation,
    zoomLevel,
    setZoomLevel,
    setCanvasDimensions,
    undo,
    redo,
  } = useFabric();

  const orient: "landscape" | "portrait" =
    orientation === "portrait" ? "portrait" : "landscape";

  // Canvas ka size sirf orientation se (context ke canvasDimensions pe depend nahi)
  const dims = useMemo(() => getDims(orient), [orient]);

  // Context ke functions ko ref mein rakho taaki effects unke change par re-run na hon
  const setCanvasDimensionsRef = useRef(setCanvasDimensions);
  setCanvasDimensionsRef.current = setCanvasDimensions;
  const setOrientationRef = useRef(setOrientation);
  setOrientationRef.current = setOrientation;

  // Template sirf ek baar (canvas + templateKey pair ke liye) load hoga
  const loadedRef = useRef<{ canvas: any; key: string } | null>(null);
  const templateRef = useRef(template);
  templateRef.current = template;
  const templateKey: string =
    template?._id || template?.id || template?.name || "new";

  // Initialize Fabric canvas instance once
  useEffect(() => {
    if (!canvasRef.current) return;

    const fabricCanvas = new FabricCanvas(canvasRef.current, {
      width: dims.w,
      height: dims.h,
      backgroundColor: "#ffffff",
      preserveObjectStacking: true,
    });

    setCanvas(fabricCanvas);

    fabricCanvas.on("selection:created", (e) => {
      setActiveObject(e.selected?.[0] || null);
    });

    fabricCanvas.on("selection:updated", (e) => {
      setActiveObject(e.selected?.[0] || null);
    });

    fabricCanvas.on("selection:cleared", () => {
      setActiveObject(null);
    });

    fabricCanvas.on("object:added", (e: any) => {
      const obj = e.target;
      if (
        obj &&
        (obj.type === "textbox" || obj.type === "i-text" || obj.type === "text")
      ) {
        const clean = cleanFontFamily(obj.fontFamily);
        obj.set({
          fontFamily: clean,
          editable: true,
          cursorColor: "#2563eb",
          cursorWidth: 2,
          cursorDelay: 250,
          cursorDuration: 600,
          selectionColor: "rgba(37, 99, 235, 0.25)",
          editingBorderColor: "#2563eb",
        });
        if (obj.initDimensions) obj.initDimensions();
        if (obj._clearCache) obj._clearCache();
      }
    });

    fabricCanvas.on("text:changed", (e: any) => {
      if (!isAlive(fabricCanvas)) return;
      if (e.target && e.target.initDimensions) {
        e.target.initDimensions();
        if (e.target._clearCache) e.target._clearCache();
        fabricCanvas.renderAll();
      }
    });

    fabricCanvas.renderAll();

    return () => {
      void fabricCanvas.dispose();
      setCanvas(null);
      setActiveObject(null);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Auto zoom: canvas screen mein fit ho
  const calculateAutoZoom = useCallback(() => {
    if (!containerRef.current) return;
    const parentW = containerRef.current.clientWidth - 48;
    const parentH = containerRef.current.clientHeight - 48;

    if (parentW > 0 && parentH > 0) {
      const zoomW = parentW / dims.w;
      const zoomH = parentH / dims.h;
      const autoZoom = Math.min(zoomW, zoomH, 1.1);
      setZoomLevel(Number(Math.max(0.35, autoZoom).toFixed(2)));
    }
  }, [dims.w, dims.h, setZoomLevel]);

  const autoZoomRef = useRef(calculateAutoZoom);
  autoZoomRef.current = calculateAutoZoom;

  useEffect(() => {
    calculateAutoZoom();
    window.addEventListener("resize", calculateAutoZoom);
    return () => window.removeEventListener("resize", calculateAutoZoom);
  }, [calculateAutoZoom]);

  // Orientation change: canvas resize + bg fit + objects reposition
  useEffect(() => {
    if (!canvas || !isAlive(canvas)) return;

    const { w, h } = dims;
    const oldW = canvas.getWidth();
    const oldH = canvas.getHeight();

    if (oldW !== w || oldH !== h) {
      canvas.setDimensions({ width: w, height: h });

      const sx = w / oldW;
      const sy = h / oldH;
      canvas.getObjects().forEach((obj) => {
        obj.set({
          left: (obj.left || 0) * sx,
          top: (obj.top || 0) * sy,
        });
        obj.setCoords();
      });
    }

    fitBackground(canvas, w, h);
    setCanvasDimensionsRef.current({ width: w, height: h });
    canvas.renderAll();
    autoZoomRef.current();
  }, [canvas, dims]);

  // Keyboard shortcuts (Undo / Redo, Copy / Paste, Delete, Arrow keys)
  useEffect(() => {
    const copyActiveObject = async () => {
      if (!canvas || !isAlive(canvas)) return;
      const active = canvas.getActiveObject();
      if (!active) return;
      try {
        clipboardObject = await active.clone();
      } catch (err) {
        console.error("Copy failed:", err);
      }
    };

    const pasteFromClipboard = async () => {
      if (!canvas || !isAlive(canvas) || !clipboardObject) return;
      try {
        const cloned: any = await clipboardObject.clone();
        if (!isAlive(canvas)) return;

        canvas.discardActiveObject();

        cloned.set({
          left: (cloned.left || 0) + 20,
          top: (cloned.top || 0) + 20,
          evented: true,
        });

        if (cloned instanceof ActiveSelection) {
          cloned.canvas = canvas;
          cloned.forEachObject((obj: any) => {
            canvas.add(obj);
          });
          cloned.setCoords();
        } else {
          canvas.add(cloned);
        }

        clipboardObject.set({
          left: (clipboardObject.left || 0) + 20,
          top: (clipboardObject.top || 0) + 20,
        });

        canvas.setActiveObject(cloned);
        canvas.requestRenderAll();
      } catch (err) {
        console.error("Paste failed:", err);
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      const activeEl = document.activeElement;

      const isFormInput =
        activeEl &&
        (activeEl.tagName === "INPUT" ||
          activeEl.tagName === "TEXTAREA" ||
          activeEl.tagName === "SELECT" ||
          (activeEl as HTMLElement).isContentEditable ||
          activeEl.classList.contains("fabric-hidden-textarea"));

      if (isFormInput) return;
      if (!canvas || !isAlive(canvas)) return;

      const activeObj = canvas.getActiveObject();

      const isTextObj =
        activeObj &&
        (activeObj.type === "textbox" ||
          activeObj.type === "i-text" ||
          activeObj.type === "text");

      if (activeObj && (activeObj as any).isEditing) return;

      const isMac = navigator.platform.toUpperCase().indexOf("MAC") >= 0;
      const cmdOrCtrl = isMac ? e.metaKey : e.ctrlKey;

      if (cmdOrCtrl) {
        const key = e.key.toLowerCase();
        if (key === "z") {
          e.preventDefault();
          if (e.shiftKey) {
            redo();
          } else {
            undo();
          }
          return;
        } else if (key === "y") {
          e.preventDefault();
          redo();
          return;
        } else if (key === "c") {
          if (!activeObj) return;
          e.preventDefault();
          copyActiveObject();
          return;
        } else if (key === "v") {
          if (!clipboardObject) return;
          e.preventDefault();
          pasteFromClipboard();
          return;
        }
      }

      if (!activeObj) return;
      if (isTextObj) return;

      const step = e.shiftKey ? 10 : 1;

      if (e.key === "Backspace" || e.key === "Delete") {
        e.preventDefault();
        canvas.remove(activeObj);
        canvas.discardActiveObject();
        setActiveObject(null);
        canvas.renderAll();
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        activeObj.set("left", (activeObj.left || 0) - step);
        activeObj.setCoords();
        canvas.renderAll();
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        activeObj.set("left", (activeObj.left || 0) + step);
        activeObj.setCoords();
        canvas.renderAll();
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        activeObj.set("top", (activeObj.top || 0) - step);
        activeObj.setCoords();
        canvas.renderAll();
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        activeObj.set("top", (activeObj.top || 0) + step);
        activeObj.setCoords();
        canvas.renderAll();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [canvas, setActiveObject, undo, redo]);

  // Template ko SIRF EK BAAR load karo (canvas + templateKey ke hisaab se)
  useEffect(() => {
    const tpl = templateRef.current;
    if (!canvas || !tpl?.design?.data) return;
    if (!isAlive(canvas)) return;

    if (
      loadedRef.current?.canvas === canvas &&
      loadedRef.current?.key === templateKey
    ) {
      return;
    }
    loadedRef.current = { canvas, key: templateKey };

    const targetOrientation: "landscape" | "portrait" =
      (tpl.design.orientation || tpl.design.data?.orientation) === "portrait"
        ? "portrait"
        : "landscape";

    setOrientationRef.current(targetOrientation);

    const loadCanvasData = async () => {
      try {
        await canvas.loadFromJSON(tpl.design.data);
        if (!isAlive(canvas)) return; // dispose ho chuka

        const { w, h } = getDims(targetOrientation);

        // Template jis size par save hua tha (bg ka displayed size)
        const bg = canvas.backgroundImage as any;
        const { natW, natH } = getBgNaturalSize(bg);
        const savedW = natW ? natW * (bg?.scaleX || 1) : w;
        const savedH = natH ? natH * (bg?.scaleY || 1) : h;

        canvas.setDimensions({ width: w, height: h });

        // Purane template ka size alag tha to objects ko naye size par scale karo
        const sx = w / savedW;
        const sy = h / savedH;
        if (Math.abs(sx - 1) > 0.01 || Math.abs(sy - 1) > 0.01) {
          canvas.getObjects().forEach((obj) => {
            obj.set({
              left: (obj.left || 0) * sx,
              top: (obj.top || 0) * sy,
            });
            obj.setCoords();
          });
        }

        fitBackground(canvas, w, h);
        setCanvasDimensionsRef.current({ width: w, height: h });
        canvas.renderAll();
        autoZoomRef.current();
      } catch (err) {
        console.error("Failed to load canvas JSON in editor:", err);
      }
    };

    loadCanvasData();
  }, [canvas, templateKey]);

  return (
    <div
      ref={containerRef}
      className="flex h-full flex-1 items-center justify-center overflow-auto bg-[#e9e9ee] p-3 sm:p-8 relative min-h-0"
      style={{
        backgroundImage:
          "radial-gradient(rgba(0, 0, 0, 0.06) 1px, transparent 1px)",
        backgroundSize: "20px 20px",
      }}
    >
      <div
        className="rounded-lg border border-gray-200 bg-white shadow-[0_10px_40px_rgba(0,0,0,0.14)] transition-transform duration-200 ease-out origin-center shrink-0"
        style={{
          width: dims.w,
          height: dims.h,
          transform: `scale(${zoomLevel})`,
        }}
      >
        <canvas ref={canvasRef} width={dims.w} height={dims.h} />
      </div>

      {/* Floating Zoom Bar */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-40 flex items-center gap-0.5 rounded-full bg-white/95 border border-gray-200 p-1 shadow-lg text-gray-800 backdrop-blur-md">
        <button
          onClick={() =>
            setZoomLevel((prev) =>
              Math.max(0.35, Number((prev - 0.1).toFixed(1)))
            )
          }
          className="p-1.5 rounded-full text-gray-600 hover:bg-gray-100"
          title="Zoom Out"
        >
          <ZoomOut size={14} />
        </button>
        <span className="px-1.5 font-mono text-[11px] font-bold min-w-[38px] text-center select-none">
          {Math.round(zoomLevel * 100)}%
        </span>
        <button
          onClick={() =>
            setZoomLevel((prev) =>
              Math.min(1.5, Number((prev + 0.1).toFixed(1)))
            )
          }
          className="p-1.5 rounded-full text-gray-600 hover:bg-gray-100"
          title="Zoom In"
        >
          <ZoomIn size={14} />
        </button>
        <div className="h-4 w-px bg-gray-200 mx-0.5" />
        <button
          onClick={() => setZoomLevel(0.75)}
          className="p-1.5 rounded-full text-red-600 hover:bg-red-50"
          title="Reset Zoom"
        >
          <Maximize2 size={14} />
        </button>
      </div>
    </div>
  );
}