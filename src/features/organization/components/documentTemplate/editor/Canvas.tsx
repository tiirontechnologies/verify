import { useEffect, useRef } from "react";
import { Canvas as FabricCanvas } from "fabric";

import { useFabric } from "./FabricContext";

interface CanvasProps {
  template?: any;
}

export default function Canvas({
  template,
}: CanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const {
    canvas,
    setCanvas,
    setActiveObject,
    orientation,
    setOrientation,
    zoomLevel,
  } = useFabric();

  const width = orientation === "landscape" ? 1056 : 747;
  const height = orientation === "landscape" ? 747 : 1056;

  const prevDimensionsRef = useRef({ width, height });

  useEffect(() => {
    if (!canvasRef.current) return;

    const fabricCanvas = new FabricCanvas(canvasRef.current, {
      width,
      height,
      backgroundColor: "#ffffff",
      preserveObjectStacking: true,
      selection: true,
    });

    setCanvas(fabricCanvas);

    fabricCanvas.on("selection:created", (e) => {
      setActiveObject(e.selected?.[0] ?? null);
    });

    fabricCanvas.on("selection:updated", (e) => {
      setActiveObject(e.selected?.[0] ?? null);
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
  }, []);

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
      const naturalW = el?.naturalWidth || el?.width || bg.width;
      const naturalH = el?.naturalHeight || el?.height || bg.height;

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
      const isInput =
        activeEl &&
        (activeEl.tagName === "INPUT" ||
          activeEl.tagName === "TEXTAREA" ||
          activeEl.tagName === "SELECT" ||
          (activeEl as HTMLElement).isContentEditable);

      if (isInput) return;
      if (!canvas) return;

      const activeObj = canvas.getActiveObject();
      if (!activeObj) return;

      if ((activeObj as any).isEditing) return;

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
          const naturalW = el?.naturalWidth || el?.width || bg.width;
          const naturalH = el?.naturalHeight || el?.height || bg.height;

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
    <div className="flex h-full flex-1 items-center justify-center overflow-auto bg-gray-100/90 p-8 select-none">
      <div
        className="rounded-2xl border border-gray-300 bg-white shadow-2xl transition-all duration-300 ease-out origin-center"
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