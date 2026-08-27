import { useEffect, useRef, useCallback } from "react";
import { Canvas as FabricCanvas } from "fabric";
import { useFabric } from "./FabricContext";
import { ZoomIn, ZoomOut, Maximize2 } from "lucide-react";

function cleanFontFamily(font: string): string {
  if (!font) return "Arial";
  const first = font.split(",")[0].replace(/['"]/g, "").trim();
  return first || "Arial";
}

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
    canvasDimensions,
    setCanvasDimensions,
    undo,
    redo,
  } = useFabric();

  // Track previous dimensions for scale recalculation
  const prevDimensionsRef = useRef({ width: canvasDimensions.width, height: canvasDimensions.height });

  // Initialize Fabric canvas instance once
  useEffect(() => {
    if (!canvasRef.current) return;

    const fabricCanvas = new FabricCanvas(canvasRef.current, {
      width: canvasDimensions.width,
      height: canvasDimensions.height,
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
      if (obj && (obj.type === "textbox" || obj.type === "i-text" || obj.type === "text")) {
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
      if (e.target && e.target.initDimensions) {
        e.target.initDimensions();
        if (e.target._clearCache) e.target._clearCache();
        fabricCanvas.renderAll();
      }
    });

    fabricCanvas.renderAll();

    return () => {
      fabricCanvas.dispose();
      setCanvas(null);
      setActiveObject(null);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Auto calculate optimal zoom to maximize canvas space in current screen container
  const calculateAutoZoom = useCallback(() => {
    if (!containerRef.current) return;
    const parentW = containerRef.current.clientWidth - 48;
    const parentH = containerRef.current.clientHeight - 48;

    if (parentW > 0 && parentH > 0) {
      const zoomW = parentW / canvasDimensions.width;
      const zoomH = parentH / canvasDimensions.height;
      const autoZoom = Math.min(zoomW, zoomH, 1.1);
      setZoomLevel(Number(Math.max(0.35, autoZoom).toFixed(2)));
    }
  }, [canvasDimensions.width, canvasDimensions.height, setZoomLevel]);

  useEffect(() => {
    calculateAutoZoom();
    window.addEventListener("resize", calculateAutoZoom);
    return () => window.removeEventListener("resize", calculateAutoZoom);
  }, [calculateAutoZoom]);

  // Update canvas size, scale background image, and adjust object positions on orientation change
  useEffect(() => {
    if (!canvas) return;

    let targetW = orientation === "landscape" ? 1056 : 747;
    let targetH = orientation === "landscape" ? 747 : 1056;

    // 1. Re-scale Background Image smoothly preserving natural aspect ratio
    if (canvas.backgroundImage) {
      const bg = canvas.backgroundImage as any;
      const el = bg._element || (bg.getElement && bg.getElement()) || bg;
      const naturalW = bg.width || el?.naturalWidth || el?.width;
      const naturalH = bg.height || el?.naturalHeight || el?.height;

      if (naturalW && naturalH) {
        const imgRatio = naturalW / naturalH;
        if (orientation === "landscape") {
          targetW = 1056;
          targetH = Math.round(1056 / imgRatio);
        } else {
          targetH = 1056;
          targetW = Math.round(1056 * imgRatio);
        }

        bg.set({
          scaleX: targetW / naturalW,
          scaleY: targetH / naturalH,
          originX: "left",
          originY: "top",
          left: 0,
          top: 0,
        });
      }
    }

    setCanvasDimensions({ width: targetW, height: targetH });

    const oldW = prevDimensionsRef.current.width;
    const oldH = prevDimensionsRef.current.height;

    canvas.setDimensions({ width: targetW, height: targetH });

    // 2. Proportionally scale positions of objects if orientation dimensions changed
    if (oldW !== targetW || oldH !== targetH) {
      const scaleX = targetW / oldW;
      const scaleY = targetH / oldH;

      canvas.getObjects().forEach((obj) => {
        obj.set({
          left: (obj.left || 0) * scaleX,
          top: (obj.top || 0) * scaleY,
        });
        obj.setCoords();
      });
    }

    prevDimensionsRef.current = { width: targetW, height: targetH };
    canvas.renderAll();
    calculateAutoZoom();
  }, [canvas, orientation, setCanvasDimensions, calculateAutoZoom]);

  // Handle keyboard shortcuts (Undo / Redo, Backspace / Delete, Arrow keys)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const activeEl = document.activeElement;
      
      // 1. Check if user is typing in ANY HTML input or textarea
      const isFormInput =
        activeEl &&
        (activeEl.tagName === "INPUT" ||
          activeEl.tagName === "TEXTAREA" ||
          activeEl.tagName === "SELECT" ||
          (activeEl as HTMLElement).isContentEditable ||
          activeEl.classList.contains("fabric-hidden-textarea"));

      if (isFormInput) return;
      if (!canvas) return;

      const activeObj = canvas.getActiveObject();

      // 2. CRITICAL: IF ANY FABRIC TEXT OBJECT IS CURRENTLY BEING EDITED (text cursor active), DO NOT INTERFERE!
      const isTextObj =
        activeObj &&
        (activeObj.type === "textbox" || activeObj.type === "i-text" || activeObj.type === "text");

      const isEditingText =
        Boolean((canvas as any).isEditing) ||
        Boolean((activeObj as any)?.isEditing) ||
        Boolean((activeObj as any)?.inMode) ||
        isTextObj;

      if (isEditingText) {
        if (activeObj && (activeObj as any).isEditing) return;
      }

      const isMac = navigator.platform.toUpperCase().indexOf("MAC") >= 0;
      const cmdOrCtrl = isMac ? e.metaKey : e.ctrlKey;

      // Handle Undo (Ctrl+Z) & Redo (Ctrl+Y or Ctrl+Shift+Z)
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
        }
      }

      if (!activeObj) return;

      if (isTextObj) return;

      if (e.key === "Backspace" || e.key === "Delete") {
        e.preventDefault();
        canvas.remove(activeObj);
        canvas.discardActiveObject();
        setActiveObject(null);
        canvas.renderAll();
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        const step = e.shiftKey ? 10 : 1;
        activeObj.set("left", (activeObj.left || 0) - step);
        activeObj.setCoords();
        canvas.renderAll();
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        const step = e.shiftKey ? 10 : 1;
        activeObj.set("left", (activeObj.left || 0) + step);
        activeObj.setCoords();
        canvas.renderAll();
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        const step = e.shiftKey ? 10 : 1;
        activeObj.set("top", (activeObj.top || 0) - step);
        activeObj.setCoords();
        canvas.renderAll();
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        const step = e.shiftKey ? 10 : 1;
        activeObj.set("top", (activeObj.top || 0) + step);
        activeObj.setCoords();
        canvas.renderAll();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [canvas, setActiveObject, undo, redo]);

  // Load existing template design JSON into Fabric canvas
  useEffect(() => {
    if (!canvas || !template?.design?.data) return;

    const targetOrientation =
      template.design.orientation || template.design.data?.orientation || "landscape";

    if (
      targetOrientation === "portrait" ||
      targetOrientation === "landscape"
    ) {
      setOrientation(targetOrientation);
    }

    const loadCanvasData = async () => {
      try {
        await canvas.loadFromJSON(template.design.data);

        if (canvas.backgroundImage) {
          const bg = canvas.backgroundImage as any;
          const el = bg._element || (bg.getElement && bg.getElement()) || bg;
          const naturalW = bg.width || el?.naturalWidth || el?.width;
          const naturalH = bg.height || el?.naturalHeight || el?.height;

          if (naturalW && naturalH) {
            const imgRatio = naturalW / naturalH;
            const fitW = targetOrientation === "portrait" ? Math.round(1056 * imgRatio) : 1056;
            const fitH = targetOrientation === "portrait" ? 1056 : Math.round(1056 / imgRatio);

            canvas.setDimensions({ width: fitW, height: fitH });

            bg.set({
              scaleX: fitW / naturalW,
              scaleY: fitH / naturalH,
              originX: "left",
              originY: "top",
              left: 0,
              top: 0,
            });
          }
        }

        canvas.renderAll();
        calculateAutoZoom();
      } catch (err) {
        console.error("Failed to load canvas JSON in editor:", err);
      }
    };

    loadCanvasData();
  }, [canvas, template, setOrientation, calculateAutoZoom]);

  return (
    <div
      ref={containerRef}
      className="flex h-full flex-1 items-center justify-center overflow-auto bg-slate-100 p-4 sm:p-12 relative min-h-0"
      style={{
        backgroundImage: "radial-gradient(rgba(0, 0, 0, 0.08) 1px, transparent 1px)",
        backgroundSize: "24px 24px",
      }}
    >
      {/* Outer Bounding Box sized matching Visual Scaled Canvas */}
      <div
        className="rounded-2xl border border-gray-200 bg-white shadow-[0_20px_60px_rgba(0,0,0,0.12)] transition-transform duration-300 ease-out origin-center ring-1 ring-gray-200/60 shrink-0"
        style={{
          width: canvasDimensions.width,
          height: canvasDimensions.height,
          transform: `scale(${zoomLevel})`,
        }}
      >
        <canvas
          ref={canvasRef}
          width={canvasDimensions.width}
          height={canvasDimensions.height}
        />
      </div>

      {/* Quick Floating Zoom Bar for Mobile / Touch screens */}
      <div className="md:hidden fixed bottom-16 right-4 z-40 flex items-center gap-1 rounded-2xl bg-white/95 border border-gray-200 p-1.5 shadow-xl text-gray-800 backdrop-blur-md">
        <button
          onClick={() => setZoomLevel((prev) => Math.max(0.35, Number((prev - 0.1).toFixed(1))))}
          className="p-2 rounded-xl bg-gray-100 text-gray-700 hover:bg-gray-200"
          title="Zoom Out"
        >
          <ZoomOut size={16} />
        </button>
        <span className="px-2 font-mono text-xs font-bold min-w-[42px] text-center">
          {Math.round(zoomLevel * 100)}%
        </span>
        <button
          onClick={() => setZoomLevel((prev) => Math.min(1.5, Number((prev + 0.1).toFixed(1))))}
          className="p-2 rounded-xl bg-gray-100 text-gray-700 hover:bg-gray-200"
          title="Zoom In"
        >
          <ZoomIn size={16} />
        </button>
        <button
          onClick={() => setZoomLevel(0.75)}
          className="p-2 rounded-xl bg-red-50 text-red-600 hover:bg-red-100 font-bold"
          title="Reset Zoom"
        >
          <Maximize2 size={16} />
        </button>
      </div>
    </div>
  );
}