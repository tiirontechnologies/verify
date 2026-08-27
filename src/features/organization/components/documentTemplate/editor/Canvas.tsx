import { useEffect, useRef, useCallback } from "react";
import { Canvas as FabricCanvas } from "fabric";
import { useFabric } from "./FabricContext";
import { Layout, Layers, ZoomIn, ZoomOut } from "lucide-react";

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
  } = useFabric();

  // Standard A4 aspect ratio dimensions (1056 x 747)
  const isLandscape = orientation === "landscape";
  const width = isLandscape ? 1056 : 747;
  const height = isLandscape ? 747 : 1056;

  // Track previous dimensions for scale recalculation
  const prevDimensionsRef = useRef({ width, height });

  // Initialize Fabric canvas instance once
  useEffect(() => {
    if (!canvasRef.current) return;

    const fabricCanvas = new FabricCanvas(canvasRef.current, {
      width,
      height,
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
    const isMobile = window.innerWidth < 640;
    const paddingX = isMobile ? 16 : 48;
    const paddingY = isMobile ? 64 : 64; // Account for floating bottom control toolbar
    const parentW = containerRef.current.clientWidth - paddingX;
    const parentH = containerRef.current.clientHeight - paddingY;

    if (parentW > 0 && parentH > 0) {
      const zoomW = parentW / width;
      const zoomH = parentH / height;
      const autoZoom = Math.min(zoomW, zoomH);
      const minZoom = isMobile ? 0.25 : 0.35;
      const maxZoom = 1.25;
      const clampedZoom = Math.min(Math.max(autoZoom, minZoom), maxZoom);
      setZoomLevel(Number(clampedZoom.toFixed(2)));
    }
  }, [width, height, setZoomLevel]);

  useEffect(() => {
    calculateAutoZoom();
    window.addEventListener("resize", calculateAutoZoom);
    return () => window.removeEventListener("resize", calculateAutoZoom);
  }, [calculateAutoZoom]);

  // Update canvas size, scale background image, and adjust object positions on orientation change
  useEffect(() => {
    if (!canvas) return;

    const oldW = prevDimensionsRef.current.width;
    const oldH = prevDimensionsRef.current.height;

    canvas.setDimensions({ width, height });

    // 1. Re-scale Background Image smoothly using natural image dimensions
    if (canvas.backgroundImage) {
      const bg = canvas.backgroundImage as any;
      const el = bg._element || (bg.getElement && bg.getElement()) || bg;
      const naturalW = bg.width || el?.naturalWidth || el?.width;
      const naturalH = bg.height || el?.naturalHeight || el?.height;

      if (naturalW && naturalH) {
        bg.set({
          scaleX: width / naturalW,
          scaleY: height / naturalH,
          originX: "left",
          originY: "top",
          left: 0,
          top: 0,
        });
      }
    }

    // 2. Proportionally scale positions of objects if orientation dimensions changed
    if (oldW !== width || oldH !== height) {
      const scaleX = width / oldW;
      const scaleY = height / oldH;

      canvas.getObjects().forEach((obj) => {
        obj.set({
          left: (obj.left || 0) * scaleX,
          top: (obj.top || 0) * scaleY,
        });
        obj.setCoords();
      });
    }

    prevDimensionsRef.current = { width, height };
    canvas.renderAll();
    calculateAutoZoom();
  }, [canvas, orientation, width, height, calculateAutoZoom]);

  // Handle keyboard shortcuts (Backspace / Delete to remove selected object, Arrow keys to move)
  useEffect(() => {
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
      if (!canvas) return;

      const activeObj = canvas.getActiveObject();
      if (!activeObj) return;

      // DO NOT delete object or prevent default if text editing is active in Fabric
      const isEditingText =
        Boolean((activeObj as any).isEditing) ||
        Boolean((activeObj as any).inMode) ||
        ((activeObj.type === "i-text" || activeObj.type === "textbox") &&
          Boolean((activeObj as any).isEditing));

      if (isEditingText) return;

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
  }, [canvas, setActiveObject]);

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

    const targetW = targetOrientation === "portrait" ? 747 : 1056;
    const targetH = targetOrientation === "portrait" ? 1056 : 747;

    const loadCanvasData = async () => {
      try {
        canvas.setDimensions({ width: targetW, height: targetH });
        await canvas.loadFromJSON(template.design.data);

        if (canvas.backgroundImage) {
          const bg = canvas.backgroundImage as any;
          const el = bg._element || (bg.getElement && bg.getElement()) || bg;
          const naturalW = bg.width || el?.naturalWidth || el?.width;
          const naturalH = bg.height || el?.naturalHeight || el?.height;

          if (naturalW && naturalH) {
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

        canvas.renderAll();
      } catch (err) {
        console.error("Failed to load canvas JSON in editor:", err);
      }
    };

    loadCanvasData();
  }, [canvas, template, setOrientation]);

  return (
    <div
      ref={containerRef}
      className="flex h-full flex-1 items-center justify-center overflow-auto bg-slate-950 p-2 sm:p-6 select-none relative"
      style={{
        backgroundImage: "radial-gradient(rgba(255, 255, 255, 0.12) 1px, transparent 1px)",
        backgroundSize: "24px 24px",
      }}
    >
      {/* Outer Bounding Box sized matching Visual Scaled Canvas */}
      <div
        className="relative flex items-center justify-center shrink-0 my-auto mx-auto"
        style={{
          width: `${width * zoomLevel}px`,
          height: `${height * zoomLevel}px`,
        }}
      >
        {/* Unscaled Inner Canvas scaled from center via Transform */}
        <div
          className="absolute origin-center rounded-2xl border border-slate-700 bg-white shadow-[0_25px_80px_rgba(0,0,0,0.6)] transition-all duration-300 ease-out ring-1 ring-slate-800 overflow-hidden"
          style={{
            width: `${width}px`,
            height: `${height}px`,
            transform: `scale(${zoomLevel})`,
          }}
        >
          <canvas
            ref={canvasRef}
            width={width}
            height={height}
          />
        </div>
      </div>

      {/* Floating Canvas Controls Overlay (Landscape/Portrait & Zoom) */}
      <div className="absolute bottom-3 sm:bottom-5 left-1/2 -translate-x-1/2 z-30 flex items-center gap-1.5 sm:gap-2 rounded-2xl bg-slate-900/90 border border-slate-700/80 p-1.5 shadow-2xl backdrop-blur-md text-white text-xs">
        {/* Orientation Switcher */}
        <div className="flex items-center rounded-xl bg-slate-800/90 p-0.5 border border-slate-700/60">
          <button
            onClick={() => setOrientation("landscape")}
            className={`flex items-center gap-1 px-2 py-1 rounded-lg text-[11px] font-bold transition ${
              orientation === "landscape"
                ? "bg-red-600 text-white shadow-md"
                : "text-slate-400 hover:text-slate-200"
            }`}
            title="Switch to Landscape"
          >
            <Layout size={13} /> <span className="hidden sm:inline">Landscape</span><span className="sm:hidden">Land</span>
          </button>
          <button
            onClick={() => setOrientation("portrait")}
            className={`flex items-center gap-1 px-2 py-1 rounded-lg text-[11px] font-bold transition ${
              orientation === "portrait"
                ? "bg-red-600 text-white shadow-md"
                : "text-slate-400 hover:text-slate-200"
            }`}
            title="Switch to Portrait"
          >
            <Layers size={13} /> <span className="hidden sm:inline">Portrait</span><span className="sm:hidden">Port</span>
          </button>
        </div>

        <div className="h-4 w-[1px] bg-slate-700"></div>

        {/* Zoom Controls */}
        <div className="flex items-center gap-0.5 sm:gap-1">
          <button
            onClick={() => setZoomLevel((prev) => Math.max(0.2, Number((prev - 0.05).toFixed(2))))}
            className="p-1.5 rounded-lg text-slate-300 hover:bg-slate-800 hover:text-white transition"
            title="Zoom Out"
          >
            <ZoomOut size={14} />
          </button>

          <span className="font-mono text-[11px] font-bold px-1 text-slate-200 min-w-[36px] text-center">
            {Math.round(zoomLevel * 100)}%
          </span>

          <button
            onClick={() => setZoomLevel((prev) => Math.min(1.5, Number((prev + 0.05).toFixed(2))))}
            className="p-1.5 rounded-lg text-slate-300 hover:bg-slate-800 hover:text-white transition"
            title="Zoom In"
          >
            <ZoomIn size={14} />
          </button>

          <button
            onClick={calculateAutoZoom}
            className="px-2 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-[10px] font-bold transition border border-slate-700/60"
            title="Fit to Screen"
          >
            Fit
          </button>
        </div>
      </div>
    </div>
  );
}