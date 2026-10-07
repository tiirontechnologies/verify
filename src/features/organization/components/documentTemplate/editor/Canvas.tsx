import { useEffect, useLayoutEffect, useRef, useCallback, useMemo, useState } from "react";
import { Canvas as FabricCanvas, ActiveSelection, Group } from "fabric";
import { useFabric } from "./FabricContext";
import { ImageUploadService } from "./services/ImageUploadService";
import { ZoomIn, ZoomOut, Maximize2 } from "lucide-react";

function cleanFontFamily(font: string): string {
  if (!font) return "Arial";
  const first = font.split(",")[0].replace(/['"]/g, "").trim();
  return first || "Arial";
}

// Fabric 7 exposes the element as `lowerCanvasEl` (older versions used
// `lower.el`). Check disposal flags as well so async loads don't touch a dead canvas.
const isAlive = (c: any) => Boolean(
  c && !c.disposed && !c.destroyed && (c.lowerCanvasEl || c.elements?.lower?.el),
);

// Canvas size SIRF orientation se tay hota hai (bg image se kabhi nahi)
function getDims(orientation: "landscape" | "portrait", pageSize: "A4" | "A3" | "Letter") {
  const sizes = { A4: { w: 1056, h: 747 }, A3: { w: 1497, h: 1056 }, Letter: { w: 1056, h: 816 } };
  const size = sizes[pageSize];
  return orientation === "portrait" ? { w: size.h, h: size.w } : size;
}

function getBgNaturalSize(bg: any) {
  if (!bg) return { natW: undefined, natH: undefined };
  const el = bg._element || (bg.getElement && bg.getElement()) || bg;
  return {
    natW: bg.width || el?.naturalWidth || el?.width,
    natH: bg.height || el?.naturalHeight || el?.height,
  };
}

// Keep the complete background visible without changing its aspect ratio.
function fitBackground(canvas: any, w: number, h: number) {
  const bg = (canvas.backgroundImage || canvas.getObjects().find((object: any) => object.isPageBackground)) as any;
  if (!bg) return;
  const { natW, natH } = getBgNaturalSize(bg);
  if (!natW || !natH) return;
  const mode = bg.backgroundScaleMode || "contain";
  const multiplier = bg.backgroundScale || 1;
  const scale = mode === "cover" ? Math.max(w / natW, h / natH) : Math.min(w / natW, h / natH);
  bg.set({
    scaleX: (mode === "stretch" ? w / natW : scale) * multiplier,
    scaleY: (mode === "stretch" ? h / natH : scale) * multiplier,
    originX: "center",
    originY: "center",
    left: w / 2,
    top: h / 2,
  });
}

function fitObjects(canvas: any, oldW: number, oldH: number, w: number, h: number) {
  if (!oldW || !oldH || !w || !h) return;

  const scaleX = w / oldW;
  const scaleY = h / oldH;

  canvas.getObjects().forEach((obj: any) => {
    if (obj.isPageBackground) return;

    const isText = obj.type === "textbox" || obj.type === "i-text" || obj.type === "text";
    if (isText && Math.abs((obj.scaleX || 1) - (obj.scaleY || 1)) > 0.01) {
      const uniformScale = Math.sqrt((obj.scaleX || 1) * (obj.scaleY || 1));
      obj.set({ scaleX: uniformScale, scaleY: uniformScale });
    }

    obj.set({
      left: (obj.left || 0) * scaleX,
      top: (obj.top || 0) * scaleY,
    });
    obj.setCoords();

    const bounds = obj.getBoundingRect();
    const padding = 8;

    const correctionX = bounds.left < 0
      ? -bounds.left + padding
      : bounds.left + bounds.width > w ? w - bounds.left - bounds.width - padding : 0;
    const correctionY = bounds.top < 0
      ? -bounds.top + padding
      : bounds.top + bounds.height > h ? h - bounds.top - bounds.height - padding : 0;

    if (correctionX || correctionY) {
      obj.set({
        left: (obj.left || 0) + correctionX,
        top: (obj.top || 0) + correctionY,
      });
      obj.setCoords();
    }

    const finalBounds = obj.getBoundingRect();
    const finalLeft = finalBounds.left < 0 ? -finalBounds.left : finalBounds.left + finalBounds.width > w ? w - finalBounds.left - finalBounds.width : 0;
    const finalTop = finalBounds.top < 0 ? -finalBounds.top : finalBounds.top + finalBounds.height > h ? h - finalBounds.top - finalBounds.height : 0;

    if (finalLeft || finalTop) {
      obj.set({
        left: (obj.left || 0) + finalLeft,
        top: (obj.top || 0) + finalTop,
      });
      obj.setCoords();
    }
  });
}

// Module-level clipboard: page/component change hone par bhi paste chalega
let clipboardObject: any = null;
let clipboardPasteCount = 0;
let clipboardPromise: Promise<void> | null = null;

interface CanvasProps {
  template?: any;
  previewMode?: boolean;
}

export default function Canvas({ template, previewMode = false }: CanvasProps) {
  const canvasHostRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const guidesRef = useRef<HTMLDivElement>(null);
  const verticalGuideRef = useRef<HTMLSpanElement>(null);
  const horizontalGuideRef = useRef<HTMLSpanElement>(null);
  const [snapEnabled, setSnapEnabled] = useState(true);
  const [gridEnabled, setGridEnabled] = useState(false);
  const snapEnabledRef = useRef(snapEnabled);
  const gridEnabledRef = useRef(gridEnabled);
  snapEnabledRef.current = snapEnabled;
  gridEnabledRef.current = gridEnabled;

  const {
    canvas,
    setCanvas,
    setActiveObject,
    orientation,
    setOrientation,
    pageSize,
    zoomLevel,
    setZoomLevel,
    setCanvasDimensions,
    undo,
    redo,
    previewMode: contextPreviewMode,
    activePageId,
  } = useFabric();
  const isPreview = previewMode || contextPreviewMode;
  const previewTextRef = useRef(new Map<any, string>());

  const orient: "landscape" | "portrait" =
    orientation === "portrait" ? "portrait" : "landscape";
  const zoomLevelRef = useRef(zoomLevel);
  zoomLevelRef.current = zoomLevel;
  const panRef = useRef({ x: 0, y: 0 });

  // Canvas ka size sirf orientation se (context ke canvasDimensions pe depend nahi)
  const dims = useMemo(() => getDims(orient, pageSize), [orient, pageSize]);

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
    if (!canvasHostRef.current) return;

    // Fabric wraps and reparents the canvas element. Keep that DOM mutation
    // inside an opaque React-owned host so React never removes a moved child.
    const canvasElement = document.createElement("canvas");
    canvasHostRef.current.appendChild(canvasElement);

    const fabricCanvas = new FabricCanvas(canvasElement, {
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

    const hideGuides = () => {
      if (guidesRef.current) guidesRef.current.style.display = "none";
    };
    const onObjectMoving = (event: any) => {
      const target = event.target;
      if (!target) {
        hideGuides();
        return;
      }

      const bounds = target.getBoundingRect();
      const anchorsX = [bounds.left, bounds.left + bounds.width / 2, bounds.left + bounds.width];
      const anchorsY = [bounds.top, bounds.top + bounds.height / 2, bounds.top + bounds.height];
      const candidatesX = [0, fabricCanvas.getWidth() / 2, fabricCanvas.getWidth()];
      const candidatesY = [0, fabricCanvas.getHeight() / 2, fabricCanvas.getHeight()];

      if (snapEnabledRef.current) {
        fabricCanvas.getObjects().forEach((object: any) => {
          if (object === target || object.visible === false) return;
          const peer = object.getBoundingRect();
          candidatesX.push(peer.left, peer.left + peer.width / 2, peer.left + peer.width);
          candidatesY.push(peer.top, peer.top + peer.height / 2, peer.top + peer.height);
        });
      }

      const nearest = (anchors: number[], candidates: number[]) => {
        const matches: Array<{ delta: number; position: number }> = [];
        anchors.forEach((anchor) => candidates.forEach((position) => {
          const delta = position - anchor;
          if (Math.abs(delta) <= 8) matches.push({ delta, position });
        }));
        matches.sort((left, right) => Math.abs(left.delta) - Math.abs(right.delta));
        return matches[0] || null;
      };

      const xMatch = snapEnabledRef.current ? nearest(anchorsX, candidatesX) : null;
      const yMatch = snapEnabledRef.current ? nearest(anchorsY, candidatesY) : null;
      let deltaX = xMatch?.delta || 0;
      let deltaY = yMatch?.delta || 0;

      if (gridEnabledRef.current && !xMatch) deltaX = Math.round((target.left || 0) / 20) * 20 - (target.left || 0);
      if (gridEnabledRef.current && !yMatch) deltaY = Math.round((target.top || 0) / 20) * 20 - (target.top || 0);

      target.set({ left: (target.left || 0) + deltaX, top: (target.top || 0) + deltaY });
      target.setCoords();
      if (!(target as any).isPageBackground) {
        const movedBounds = target.getBoundingRect();
        const edgeInset = 10;
        const correctionX = movedBounds.left < edgeInset
          ? edgeInset - movedBounds.left
          : movedBounds.left + movedBounds.width > fabricCanvas.getWidth() - edgeInset
            ? fabricCanvas.getWidth() - edgeInset - movedBounds.left - movedBounds.width
            : 0;
        const correctionY = movedBounds.top < edgeInset
          ? edgeInset - movedBounds.top
          : movedBounds.top + movedBounds.height > fabricCanvas.getHeight() - edgeInset
            ? fabricCanvas.getHeight() - edgeInset - movedBounds.top - movedBounds.height
            : 0;
        if (correctionX || correctionY) {
          target.set({ left: (target.left || 0) + correctionX, top: (target.top || 0) + correctionY });
          target.setCoords();
        }
      }

      if (guidesRef.current && (xMatch || yMatch)) {
        guidesRef.current.style.display = "block";
        if (verticalGuideRef.current) {
          verticalGuideRef.current.style.display = xMatch ? "block" : "none";
          if (xMatch) verticalGuideRef.current.style.left = `${xMatch.position}px`;
        }
        if (horizontalGuideRef.current) {
          horizontalGuideRef.current.style.display = yMatch ? "block" : "none";
          if (yMatch) horizontalGuideRef.current.style.top = `${yMatch.position}px`;
        }
      } else {
        hideGuides();
      }
    };

    fabricCanvas.on("object:moving", onObjectMoving);
    fabricCanvas.on("mouse:up", hideGuides);

    fabricCanvas.renderAll();

    return () => {
      void fabricCanvas.dispose().catch((error) => {
        console.error("Failed to dispose Fabric canvas:", error);
      }).finally(() => canvasElement.remove());
      setCanvas(null);
      setActiveObject(null);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Auto zoom: canvas screen mein fit ho
  const calculateAutoZoom = useCallback(() => {
    if (!containerRef.current) return;
    const styles = window.getComputedStyle(containerRef.current);
    const paddingX = Number.parseFloat(styles.paddingLeft) + Number.parseFloat(styles.paddingRight);
    const paddingY = Number.parseFloat(styles.paddingTop) + Number.parseFloat(styles.paddingBottom);
    const parentW = containerRef.current.clientWidth - paddingX - 24;
    const parentH = containerRef.current.clientHeight - paddingY - 24;

    if (parentW > 0 && parentH > 0) {
      const zoomW = parentW / dims.w;
      const zoomH = parentH / dims.h;
      const autoZoom = Math.min(zoomW, zoomH, 1.1);
      setZoomLevel(Number(Math.max(0.15, autoZoom).toFixed(2)));
    }
  }, [dims.w, dims.h, setZoomLevel]);

  const autoZoomRef = useRef(calculateAutoZoom);
  autoZoomRef.current = calculateAutoZoom;

  useEffect(() => {
    calculateAutoZoom();
    window.addEventListener("resize", calculateAutoZoom);
    const observer = containerRef.current ? new ResizeObserver(calculateAutoZoom) : null;
    if (containerRef.current) observer?.observe(containerRef.current);
    return () => {
      window.removeEventListener("resize", calculateAutoZoom);
      observer?.disconnect();
    };
  }, [calculateAutoZoom]);

  useEffect(() => {
    if (!canvas || !isAlive(canvas)) return;
    const upperCanvasEl = canvas.upperCanvasEl;
    if (!upperCanvasEl) return;
    const originalSelection = canvas.selection;
    const originalSkipTargetFind = canvas.skipTargetFind;
    const originalPointerEvents = upperCanvasEl.style.pointerEvents;

    if (isPreview) {
      canvas.discardActiveObject();
      setActiveObject(null);
      canvas.selection = false;
      canvas.skipTargetFind = true;
      upperCanvasEl.style.pointerEvents = "none";
    }
    canvas.requestRenderAll();

    return () => {
      if (!isAlive(canvas)) return;
      canvas.selection = originalSelection;
      canvas.skipTargetFind = originalSkipTargetFind;
      upperCanvasEl.style.pointerEvents = originalPointerEvents;
    };
  }, [canvas, isPreview, setActiveObject]);

  useEffect(() => {
    if (!canvas || !isPreview || !isAlive(canvas)) return;
    canvas.getObjects().forEach((object: any) => {
      if (typeof object.text !== "string") return;
      previewTextRef.current.set(object, object.text);
      object.set("text", object.text.replace(/\{\{\s*[\w]+\s*\}\}/g, ""));
      object.initDimensions?.();
      object.setCoords();
    });
    canvas.requestRenderAll();

    return () => {
      if (!isAlive(canvas)) {
        previewTextRef.current.clear();
        return;
      }
      previewTextRef.current.forEach((text, object) => {
        object.set("text", text);
        object.initDimensions?.();
        object.setCoords();
      });
      previewTextRef.current.clear();
      canvas.requestRenderAll();
    };
  }, [canvas, isPreview, activePageId]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let pendingZoom: number | null = null;
    let zoomFrame = 0;
    let spaceHeld = false;
    let activePointer: number | null = null;

    const isTyping = (target: EventTarget | null) =>
      target instanceof HTMLElement &&
      (target.isContentEditable || ["INPUT", "TEXTAREA", "SELECT"].includes(target.tagName));

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.code !== "Space" || isTyping(event.target)) return;
      event.preventDefault();
      spaceHeld = true;
      container.style.cursor = "grab";
    };
    const onKeyUp = (event: KeyboardEvent) => {
      if (event.code !== "Space") return;
      spaceHeld = false;
      if (activePointer === null) container.style.cursor = "";
    };
    const onWheel = (event: WheelEvent) => {
      event.preventDefault();
      const current = pendingZoom ?? zoomLevelRef.current;
      pendingZoom = Math.max(0.15, Math.min(1.5, current + (event.deltaY < 0 ? 0.08 : -0.08)));
      if (!zoomFrame) {
        zoomFrame = window.requestAnimationFrame(() => {
          if (pendingZoom !== null) setZoomLevel(Number(pendingZoom.toFixed(2)));
          pendingZoom = null;
          zoomFrame = 0;
        });
      }
    };
    const onPointerDown = (event: PointerEvent) => {
      if (!spaceHeld || event.button !== 0) return;
      event.preventDefault();
      activePointer = event.pointerId;
      container.setPointerCapture(event.pointerId);
      container.style.cursor = "grabbing";
    };
    const onPointerMove = (event: PointerEvent) => {
      if (activePointer !== event.pointerId || !wrapperRef.current) return;
      panRef.current.x += event.movementX;
      panRef.current.y += event.movementY;
      wrapperRef.current.style.setProperty("--pan-x", `${panRef.current.x}px`);
      wrapperRef.current.style.setProperty("--pan-y", `${panRef.current.y}px`);
    };
    const onPointerUp = (event: PointerEvent) => {
      if (activePointer !== event.pointerId) return;
      activePointer = null;
      if (container.hasPointerCapture(event.pointerId)) container.releasePointerCapture(event.pointerId);
      container.style.cursor = spaceHeld ? "grab" : "";
    };
    const onWindowBlur = () => {
      spaceHeld = false;
      activePointer = null;
      container.style.cursor = "";
    };

    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup", onKeyUp);
    window.addEventListener("blur", onWindowBlur);
    container.addEventListener("wheel", onWheel, { passive: false });
    container.addEventListener("pointerdown", onPointerDown);
    container.addEventListener("pointermove", onPointerMove);
    container.addEventListener("pointerup", onPointerUp);
    container.addEventListener("pointercancel", onPointerUp);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("keyup", onKeyUp);
      window.removeEventListener("blur", onWindowBlur);
      container.removeEventListener("wheel", onWheel);
      container.removeEventListener("pointerdown", onPointerDown);
      container.removeEventListener("pointermove", onPointerMove);
      container.removeEventListener("pointerup", onPointerUp);
      container.removeEventListener("pointercancel", onPointerUp);
      if (zoomFrame) window.cancelAnimationFrame(zoomFrame);
    };
  }, [setZoomLevel]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || !canvas || isPreview) return;
    const onDragOver = (event: DragEvent) => {
      if (Array.from(event.dataTransfer?.items || []).some((item) => item.type.startsWith("image/"))) {
        event.preventDefault();
      }
    };
    const onDrop = (event: DragEvent) => {
      const file = Array.from(event.dataTransfer?.files || []).find((item) => item.type.startsWith("image/"));
      if (!file) return;
      event.preventDefault();
      void ImageUploadService.addImageFile(canvas, file);
    };
    container.addEventListener("dragover", onDragOver);
    container.addEventListener("drop", onDrop);
    return () => {
      container.removeEventListener("dragover", onDragOver);
      container.removeEventListener("drop", onDrop);
    };
  }, [canvas, isPreview]);

  // Apply page-size changes before paint so canvas and artboard never disagree for a frame.
  useLayoutEffect(() => {
    if (!canvas || !isAlive(canvas)) return;

    const { w, h } = dims;
    const oldW = canvas.getWidth();
    const oldH = canvas.getHeight();

    if (oldW !== w || oldH !== h) {
      canvas.setDimensions({ width: w, height: h });
      fitObjects(canvas, oldW, oldH, w, h);
    }

    fitBackground(canvas, w, h);
    setCanvasDimensionsRef.current({ width: w, height: h });
    panRef.current = { x: 0, y: 0 };
    wrapperRef.current?.style.setProperty("--pan-x", "0px");
    wrapperRef.current?.style.setProperty("--pan-y", "0px");
    canvas.renderAll();
    autoZoomRef.current();
  }, [canvas, dims, activePageId]);

  // Keyboard shortcuts (Undo / Redo, Copy / Paste, Delete, Arrow keys)
  useEffect(() => {
    const copyActiveObject = async () => {
      if (!canvas || !isAlive(canvas)) return;
      const selected = canvas.getActiveObjects();
      if (!selected.length) return;
      try {
        clipboardPromise = Promise.all(selected.map((object) => object.clone())).then((objects) => {
          clipboardObject = { type: objects.length > 1 ? "multi-selection" : "single", objects };
        });
        await clipboardPromise;
        clipboardPasteCount = 0;
      } catch (err) {
        console.error("Copy failed:", err);
      } finally {
        clipboardPromise = null;
      }
    };

    const pasteFromClipboard = async () => {
      if (!canvas || !isAlive(canvas)) return;
      try {
        if (clipboardPromise) await clipboardPromise;
        if (!clipboardObject) return;
        const clonedObjects: any[] = await Promise.all(clipboardObject.objects.map((object: any) => object.clone()));
        if (!isAlive(canvas)) return;

        canvas.discardActiveObject();

        const offset = 20 * (clipboardPasteCount + 1);
        clonedObjects.forEach((cloned) => {
          cloned.set({
            left: (cloned.left || 0) + offset,
            top: (cloned.top || 0) + offset,
            evented: true,
          });
          canvas.add(cloned);
        });

        if (clonedObjects.length > 1) {
          canvas.setActiveObject(new ActiveSelection(clonedObjects, { canvas }));
        } else {
          canvas.setActiveObject(clonedObjects[0]);
        }

        clonedObjects.forEach((cloned) => cloned.setCoords());
        clipboardPasteCount += 1;
        canvas.requestRenderAll();
      } catch (err) {
        console.error("Paste failed:", err);
      }
    };

    const removeSelection = () => {
      const selected = canvas?.getActiveObjects() || [];
      if (!canvas || selected.length === 0) return;
      canvas.discardActiveObject();
      canvas.remove(...selected);
      setActiveObject(null);
      canvas.requestRenderAll();
    };

    const cutSelection = async () => {
      if (!canvas || canvas.getActiveObjects().length === 0) return;
      await copyActiveObject();
      removeSelection();
    };

    const duplicateSelection = async () => {
      if (!canvas || canvas.getActiveObjects().length === 0) return;
      await copyActiveObject();
      await pasteFromClipboard();
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      const activeEl = document.activeElement;
      const activeObj = canvas?.getActiveObject();
      if ((activeObj as any)?.isEditing) return;

      const isFormInput =
        activeEl &&
        (activeEl.tagName === "INPUT" ||
          activeEl.tagName === "TEXTAREA" ||
          activeEl.tagName === "SELECT" ||
          (activeEl as HTMLElement).isContentEditable) &&
        !(activeEl instanceof HTMLElement && activeEl.classList.contains("fabric-hidden-textarea"));

      if (isFormInput) return;
      if (!canvas || !isAlive(canvas) || isPreview) return;
      if (canvas.upperCanvasEl.closest("[inert]")) return;

      const isMac = /Mac|iPhone|iPad/i.test(navigator.platform);
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
          void copyActiveObject();
          return;
        } else if (key === "x") {
          if (!activeObj) return;
          e.preventDefault();
          void cutSelection();
          return;
        } else if (key === "v") {
          if (!clipboardObject && !clipboardPromise) return;
          e.preventDefault();
          void pasteFromClipboard();
          return;
        } else if (key === "d") {
          if (!activeObj) return;
          e.preventDefault();
          void duplicateSelection();
          return;
        } else if (key === "a") {
          e.preventDefault();
          const objects = canvas.getObjects().filter((object: any) =>
            object.selectable !== false || object.isPageBackground === true,
          );
          canvas.discardActiveObject();
          if (objects.length) canvas.setActiveObject(new ActiveSelection(objects, { canvas }));
          canvas.requestRenderAll();
          return;
        } else if (key === "s") {
          e.preventDefault();
          window.dispatchEvent(new Event("fabric-editor-save"));
          return;
        } else if (key === "g" && e.shiftKey) {
          if (activeObj?.type !== "group") return;
          e.preventDefault();
          const group = activeObj as Group;
          const objects = group.removeAll();
          canvas.remove(group);
          canvas.add(...objects);
          if (objects.length > 1) {
            canvas.setActiveObject(new ActiveSelection(objects, { canvas }));
          } else if (objects[0]) {
            canvas.setActiveObject(objects[0]);
          }
          canvas.requestRenderAll();
          return;
        } else if (key === "g") {
          if (!(activeObj instanceof ActiveSelection)) return;
          e.preventDefault();
          const objects = activeObj.getObjects();
          canvas.discardActiveObject();
          const group = new Group(objects);
          canvas.remove(...objects);
          canvas.add(group);
          canvas.setActiveObject(group);
          canvas.requestRenderAll();
          return;
        }
      }

      if (e.key === "Escape") {
        canvas.discardActiveObject();
        setActiveObject(null);
        canvas.requestRenderAll();
        return;
      }

      if (!activeObj) return;

      const step = e.shiftKey ? 10 : 1;

      if (e.key === "Backspace" || e.key === "Delete") {
        e.preventDefault();
        removeSelection();
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        activeObj.set("left", (activeObj.left || 0) - step);
        activeObj.setCoords();
        canvas.fire("object:modified", { target: activeObj });
        canvas.requestRenderAll();
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        activeObj.set("left", (activeObj.left || 0) + step);
        activeObj.setCoords();
        canvas.fire("object:modified", { target: activeObj });
        canvas.requestRenderAll();
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        activeObj.set("top", (activeObj.top || 0) - step);
        activeObj.setCoords();
        canvas.fire("object:modified", { target: activeObj });
        canvas.requestRenderAll();
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        activeObj.set("top", (activeObj.top || 0) + step);
        activeObj.setCoords();
        canvas.fire("object:modified", { target: activeObj });
        canvas.requestRenderAll();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [canvas, setActiveObject, undo, redo, isPreview]);

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
    const savedData = tpl.design.data;
    const activeSavedPage = Array.isArray(savedData.pages)
      ? savedData.pages.find((page: any) => page.id === savedData.activePageId)
      : null;
    const pageJson = activeSavedPage?.json;
    // Multi-page saves include both the active canvas snapshot and per-page
    // snapshots. Prefer the active page when it has content; older saves may
    // only have content in the root snapshot.
    const pageHasContent = Array.isArray(pageJson?.objects) && pageJson.objects.length > 0;
    const rootHasContent = Array.isArray(savedData.objects) && savedData.objects.length > 0;
    const canvasData = pageHasContent || !rootHasContent ? pageJson || savedData : savedData;
    const targetOrientation: "landscape" | "portrait" =
      (activeSavedPage?.orientation || tpl.design.orientation || savedData.orientation) === "portrait"
        ? "portrait"
        : "landscape";

    const loadCanvasData = async () => {
      (canvas as any).__isHydratingTemplate = true;
      try {
        await canvas.loadFromJSON(canvasData);
        if (!isAlive(canvas)) return; // dispose ho chuka

        const { w, h } = getDims(targetOrientation, pageSize);

        const savedW = Number(canvasData.width) || w;
        const savedH = Number(canvasData.height) || h;

        canvas.setDimensions({ width: w, height: h });
        if (savedW !== w || savedH !== h) fitObjects(canvas, savedW, savedH, w, h);

        fitBackground(canvas, w, h);
        setCanvasDimensionsRef.current({ width: w, height: h });
        setOrientationRef.current(targetOrientation);
        loadedRef.current = { canvas, key: templateKey };
        canvas.renderAll();
        autoZoomRef.current();
        (canvas as any).__isHydratingTemplate = false;
        (canvas as any).fire("template:loaded");
      } catch (err) {
        console.error("Failed to load canvas JSON in editor:", err);
      } finally {
        (canvas as any).__isHydratingTemplate = false;
      }
    };

    loadCanvasData();
  }, [canvas, templateKey, pageSize]);

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
        ref={wrapperRef}
        className="relative overflow-hidden rounded-lg border border-gray-200 bg-white shadow-[0_10px_40px_rgba(0,0,0,0.14)] origin-center shrink-0"
        style={{
          width: dims.w * zoomLevel,
          height: dims.h * zoomLevel,
          transform: "translate(var(--pan-x, 0px), var(--pan-y, 0px))",
        }}
      >
        <div
          className="absolute left-0 top-0 origin-top-left"
          style={{ width: dims.w, height: dims.h, transform: `scale(${zoomLevel})` }}
        >
          <div
            ref={canvasHostRef}
            className="absolute left-0 top-0"
            style={{ width: dims.w, height: dims.h }}
          />
          <div ref={guidesRef} className="pointer-events-none absolute inset-0 z-20 hidden overflow-hidden">
            <span ref={verticalGuideRef} className="absolute inset-y-0 hidden border-l border-dashed border-red-500" />
            <span ref={horizontalGuideRef} className="absolute inset-x-0 hidden border-t border-dashed border-red-500" />
          </div>
        </div>
      </div>

      {/* Floating Zoom Bar */}
      {!isPreview && <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-40 flex items-center gap-0.5 rounded-full bg-white/95 border border-gray-200 p-1 shadow-lg text-gray-800 backdrop-blur-md">
        <button
          onClick={() =>
            setZoomLevel((prev) =>
              Math.max(0.15, Number((prev - 0.1).toFixed(1)))
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
          onClick={() => {
            panRef.current = { x: 0, y: 0 };
            wrapperRef.current?.style.setProperty("--pan-x", "0px");
            wrapperRef.current?.style.setProperty("--pan-y", "0px");
            autoZoomRef.current();
          }}
          className="p-1.5 rounded-full text-red-600 hover:bg-red-50"
          title="Fit page to workspace"
        >
          <Maximize2 size={14} />
        </button>
        <div className="h-4 w-px bg-gray-200 mx-0.5" />
        <button
          type="button"
          aria-pressed={snapEnabled}
          onClick={() => setSnapEnabled((value) => !value)}
          className={`rounded-full px-2 py-1 text-[10px] font-bold ${snapEnabled ? "bg-red-50 text-red-700" : "text-gray-500 hover:bg-gray-100"}`}
          title="Toggle smart guides and snapping"
        >Snap</button>
        <button
          type="button"
          aria-pressed={gridEnabled}
          onClick={() => setGridEnabled((value) => !value)}
          className={`rounded-full px-2 py-1 text-[10px] font-bold ${gridEnabled ? "bg-red-50 text-red-700" : "text-gray-500 hover:bg-gray-100"}`}
          title="Toggle 20-pixel grid snapping"
        >Grid</button>
      </div>}
    </div>
  );
}
