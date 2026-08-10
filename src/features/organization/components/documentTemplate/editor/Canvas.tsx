import { useEffect, useRef, useCallback } from "react";
import { Canvas as FabricCanvas } from "fabric";
import { useFabric } from "./FabricContext";

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

  // Standard dimensions
  const isLandscape = orientation === "landscape";
  const width = isLandscape ? 1056 : 816;
  const height = isLandscape ? 816 : 1056;

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
    const parentW = containerRef.current.clientWidth - 80;
    const parentH = containerRef.current.clientHeight - 80;

    if (parentW > 0 && parentH > 0) {
      const zoomW = parentW / width;
      const zoomH = parentH / height;
      const autoZoom = Math.min(zoomW, zoomH, 1.15);
      setZoomLevel(Number(Math.max(0.45, autoZoom).toFixed(2)));
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
  }, [canvas, orientation, width, height]);

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
      className="flex h-full flex-1 items-center justify-center overflow-auto bg-slate-950 p-6 sm:p-12 select-none relative"
      style={{
        backgroundImage: "radial-gradient(rgba(255, 255, 255, 0.12) 1px, transparent 1px)",
        backgroundSize: "24px 24px",
      }}
    >
      <div
        className="rounded-2xl border border-slate-700 bg-white shadow-[0_25px_80px_rgba(0,0,0,0.6)] transition-all duration-300 ease-out origin-center ring-1 ring-slate-800 overflow-hidden"
        style={{
          transform: `scale(${zoomLevel})`,
          maxWidth: "100%",
        }}
      >
        <canvas
          ref={canvasRef}
          width={width}
          height={height}
        />
      </div>
    </div>
  );
}