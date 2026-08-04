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
  } = useFabric();

  const width = orientation === "landscape" ? 1056 : 747;
  const height = orientation === "landscape" ? 747 : 1056;

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

  // Update canvas size when orientation changes
  useEffect(() => {
    if (!canvas) return;
    canvas.setDimensions({ width, height });
    canvas.renderAll();
  }, [canvas, orientation, width, height]);

  // Handle keyboard shortcuts (Backspace / Delete to remove selected object, Arrow keys to move)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Do not delete object if user is typing in standard form input/textarea/select
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

      // Do not delete object if user is inside Fabric inline text editing mode
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
      template.design.orientation || template.design.data?.orientation;
    if (
      targetOrientation === "portrait" ||
      targetOrientation === "landscape"
    ) {
      setOrientation(targetOrientation);
    }

    const loadCanvasData = async () => {
      try {
        await canvas.loadFromJSON(template.design.data);
        canvas.renderAll();
      } catch (err) {
        console.error("Failed to load canvas JSON in editor:", err);
      }
    };

    loadCanvasData();
  }, [canvas, template, setOrientation]);

  return (
    <div className="flex h-full flex-1 items-center justify-center overflow-auto bg-gray-100 p-6">
      <div className="rounded-xl border border-gray-300 bg-white shadow-2xl transition-all duration-300">
        <canvas
          ref={canvasRef}
          width={width}
          height={height}
        />
      </div>
    </div>
  );
}