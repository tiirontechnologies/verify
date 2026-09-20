// /* eslint-disable react-refresh/only-export-components */
// import {
//   createContext,
//   useContext,
//   useState,
//   useRef,
//   useCallback,
//   useEffect,
// } from "react";
// import type { ReactNode } from "react";
// import { Canvas } from "fabric";

// interface CanvasDimensions {
//   width: number;
//   height: number;
// }

// interface FabricContextType {
//   canvas: Canvas | null;
//   setCanvas: (canvas: Canvas | null) => void;
//   activeObject: any;
//   setActiveObject: (obj: any) => void;
//   orientation: "landscape" | "portrait";
//   setOrientation: (orientation: "landscape" | "portrait") => void;
//   zoomLevel: number;
//   setZoomLevel: React.Dispatch<React.SetStateAction<number>>;
//   canvasDimensions: CanvasDimensions;
//   setCanvasDimensions: React.Dispatch<React.SetStateAction<CanvasDimensions>>;
//   canUndo: boolean;
//   canRedo: boolean;
//   undo: () => void;
//   redo: () => void;
//   saveHistory: () => void;
// }

// const FabricContext = createContext<FabricContextType | null>(null);

// export function FabricProvider({
//   children,
//   initialOrientation = "landscape",
// }: {
//   children: ReactNode;
//   initialOrientation?: "landscape" | "portrait";
// }) {
//   const [canvas, setCanvasState] = useState<Canvas | null>(null);
//   const [activeObject, setActiveObject] = useState<any>(null);
//   const [orientation, setOrientation] = useState<"landscape" | "portrait">(
//     initialOrientation
//   );
//   const [zoomLevel, setZoomLevel] = useState<number>(1.0);
//   const [canvasDimensions, setCanvasDimensions] = useState<CanvasDimensions>({
//     width: initialOrientation === "portrait" ? 747 : 1056,
//     height: initialOrientation === "portrait" ? 1056 : 747,
//   });

//   // Undo / Redo history management
//   const undoStackRef = useRef<string[]>([]);
//   const redoStackRef = useRef<string[]>([]);
//   const isProcessingHistoryRef = useRef<boolean>(false);

//   const [canUndo, setCanUndo] = useState(false);
//   const [canRedo, setCanRedo] = useState(false);

//   const updateHistoryState = () => {
//     setCanUndo(undoStackRef.current.length > 1);
//     setCanRedo(redoStackRef.current.length > 0);
//   };

//   const saveHistory = useCallback(() => {
//     if (!canvas || isProcessingHistoryRef.current) return;
//     try {
//       const json = JSON.stringify(canvas.toJSON());
//       const currentStack = undoStackRef.current;

//       if (currentStack.length > 0 && currentStack[currentStack.length - 1] === json) {
//         return;
//       }

//       undoStackRef.current.push(json);
//       if (undoStackRef.current.length > 35) {
//         undoStackRef.current.shift();
//       }
//       redoStackRef.current = [];
//       updateHistoryState();
//     } catch (e) {
//       console.error("Failed to save canvas history snapshot:", e);
//     }
//   }, [canvas]);

//   const undo = useCallback(async () => {
//     if (!canvas || undoStackRef.current.length <= 1 || isProcessingHistoryRef.current) return;
//     try {
//       isProcessingHistoryRef.current = true;
//       const currentState = undoStackRef.current.pop();
//       if (currentState) {
//         redoStackRef.current.push(currentState);
//       }
//       const previousState = undoStackRef.current[undoStackRef.current.length - 1];
//       if (previousState) {
//         await canvas.loadFromJSON(JSON.parse(previousState));
//         canvas.renderAll();
//       }
//       updateHistoryState();
//     } catch (e) {
//       console.error("Failed to execute undo:", e);
//     } finally {
//       isProcessingHistoryRef.current = false;
//     }
//   }, [canvas]);

//   const redo = useCallback(async () => {
//     if (!canvas || redoStackRef.current.length === 0 || isProcessingHistoryRef.current) return;
//     try {
//       isProcessingHistoryRef.current = true;
//       const nextState = redoStackRef.current.pop();
//       if (nextState) {
//         undoStackRef.current.push(nextState);
//         await canvas.loadFromJSON(JSON.parse(nextState));
//         canvas.renderAll();
//       }
//       updateHistoryState();
//     } catch (e) {
//       console.error("Failed to execute redo:", e);
//     } finally {
//       isProcessingHistoryRef.current = false;
//     }
//   }, [canvas]);

//   const setCanvas = useCallback((newCanvas: Canvas | null) => {
//     setCanvasState(newCanvas);
//     if (!newCanvas) {
//       undoStackRef.current = [];
//       redoStackRef.current = [];
//       setCanUndo(false);
//       setCanRedo(false);
//     }
//   }, []);

//   // Listen for canvas modifications to auto-save history states
//   useEffect(() => {
//     if (!canvas) return;

//     const initialJson = JSON.stringify(canvas.toJSON());
//     if (undoStackRef.current.length === 0) {
//       undoStackRef.current = [initialJson];
//       updateHistoryState();
//     }

//     const handleCanvasChange = () => {
//       saveHistory();
//     };

//     canvas.on("object:added", handleCanvasChange);
//     canvas.on("object:modified", handleCanvasChange);
//     canvas.on("object:removed", handleCanvasChange);
//     canvas.on("path:created", handleCanvasChange);

//     return () => {
//       canvas.off("object:added", handleCanvasChange);
//       canvas.off("object:modified", handleCanvasChange);
//       canvas.off("object:removed", handleCanvasChange);
//       canvas.off("path:created", handleCanvasChange);
//     };
//   }, [canvas, saveHistory]);

//   return (
//     <FabricContext.Provider
//       value={{
//         canvas,
//         setCanvas,
//         activeObject,
//         setActiveObject,
//         orientation,
//         setOrientation,
//         zoomLevel,
//         setZoomLevel,
//         canvasDimensions,
//         setCanvasDimensions,
//         canUndo,
//         canRedo,
//         undo,
//         redo,
//         saveHistory,
//       }}
//     >
//       {children}
//     </FabricContext.Provider>
//   );
// }

// export function useFabric() {
//   const context = useContext(FabricContext);

//   if (!context) {
//     throw new Error(
//       "useFabric must be used inside FabricProvider"
//     );
//   }

//   return context;
// }



/* eslint-disable react-refresh/only-export-components */
import {
  createContext,
  useContext,
  useState,
  useRef,
  useCallback,
  useEffect,
} from "react";
import type { ReactNode } from "react";
import { Canvas } from "fabric";

interface CanvasDimensions {
  width: number;
  height: number;
}

export interface PageData {
  id: string;
  name: string;
  json: any | null;
  orientation: "landscape" | "portrait";
  thumbnail: string | null;
}

interface FabricContextType {
  canvas: Canvas | null;
  setCanvas: (canvas: Canvas | null) => void;
  activeObject: any;
  setActiveObject: (obj: any) => void;
  orientation: "landscape" | "portrait";
  setOrientation: (orientation: "landscape" | "portrait") => void;
  zoomLevel: number;
  setZoomLevel: React.Dispatch<React.SetStateAction<number>>;
  canvasDimensions: CanvasDimensions;
  setCanvasDimensions: React.Dispatch<React.SetStateAction<CanvasDimensions>>;
  canUndo: boolean;
  canRedo: boolean;
  undo: () => void;
  redo: () => void;
  saveHistory: () => void;
  // Multi-page (Canva-style) management
  pages: PageData[];
  activePageId: string;
  addPage: () => void;
  switchPage: (pageId: string) => void;
  duplicatePage: (pageId: string) => void;
  deletePage: (pageId: string) => void;
}

const FabricContext = createContext<FabricContextType | null>(null);

export function FabricProvider({
  children,
  initialOrientation = "landscape",
}: {
  children: ReactNode;
  initialOrientation?: "landscape" | "portrait";
}) {
  const [canvas, setCanvasState] = useState<Canvas | null>(null);
  const [activeObject, setActiveObject] = useState<any>(null);
  const [orientation, setOrientation] = useState<"landscape" | "portrait">(
    initialOrientation
  );
  const [zoomLevel, setZoomLevel] = useState<number>(1.0);
  const [canvasDimensions, setCanvasDimensions] = useState<CanvasDimensions>({
    width: initialOrientation === "portrait" ? 747 : 1056,
    height: initialOrientation === "portrait" ? 1056 : 747,
  });

  // Undo / Redo history management
  const undoStackRef = useRef<string[]>([]);
  const redoStackRef = useRef<string[]>([]);
  const isProcessingHistoryRef = useRef<boolean>(false);

  const [canUndo, setCanUndo] = useState(false);
  const [canRedo, setCanRedo] = useState(false);

  const updateHistoryState = () => {
    setCanUndo(undoStackRef.current.length > 1);
    setCanRedo(redoStackRef.current.length > 0);
  };

  const resetHistory = () => {
    undoStackRef.current = [];
    redoStackRef.current = [];
    setCanUndo(false);
    setCanRedo(false);
  };

  const saveHistory = useCallback(() => {
    if (!canvas || isProcessingHistoryRef.current) return;
    try {
      const json = JSON.stringify(canvas.toJSON());
      const currentStack = undoStackRef.current;

      if (currentStack.length > 0 && currentStack[currentStack.length - 1] === json) {
        return;
      }

      undoStackRef.current.push(json);
      if (undoStackRef.current.length > 35) {
        undoStackRef.current.shift();
      }
      redoStackRef.current = [];
      updateHistoryState();
    } catch (e) {
      console.error("Failed to save canvas history snapshot:", e);
    }
  }, [canvas]);

  const undo = useCallback(async () => {
    if (!canvas || undoStackRef.current.length <= 1 || isProcessingHistoryRef.current) return;
    try {
      isProcessingHistoryRef.current = true;
      const currentState = undoStackRef.current.pop();
      if (currentState) {
        redoStackRef.current.push(currentState);
      }
      const previousState = undoStackRef.current[undoStackRef.current.length - 1];
      if (previousState) {
        await canvas.loadFromJSON(JSON.parse(previousState));
        canvas.renderAll();
      }
      updateHistoryState();
    } catch (e) {
      console.error("Failed to execute undo:", e);
    } finally {
      isProcessingHistoryRef.current = false;
    }
  }, [canvas]);

  const redo = useCallback(async () => {
    if (!canvas || redoStackRef.current.length === 0 || isProcessingHistoryRef.current) return;
    try {
      isProcessingHistoryRef.current = true;
      const nextState = redoStackRef.current.pop();
      if (nextState) {
        undoStackRef.current.push(nextState);
        await canvas.loadFromJSON(JSON.parse(nextState));
        canvas.renderAll();
      }
      updateHistoryState();
    } catch (e) {
      console.error("Failed to execute redo:", e);
    } finally {
      isProcessingHistoryRef.current = false;
    }
  }, [canvas]);

  const setCanvas = useCallback((newCanvas: Canvas | null) => {
    setCanvasState(newCanvas);
    if (!newCanvas) {
      undoStackRef.current = [];
      redoStackRef.current = [];
      setCanUndo(false);
      setCanRedo(false);
    }
  }, []);

  // Listen for canvas modifications to auto-save history states
  useEffect(() => {
    if (!canvas) return;

    const initialJson = JSON.stringify(canvas.toJSON());
    if (undoStackRef.current.length === 0) {
      undoStackRef.current = [initialJson];
      updateHistoryState();
    }

    const handleCanvasChange = () => {
      saveHistory();
    };

    canvas.on("object:added", handleCanvasChange);
    canvas.on("object:modified", handleCanvasChange);
    canvas.on("object:removed", handleCanvasChange);
    canvas.on("path:created", handleCanvasChange);

    return () => {
      canvas.off("object:added", handleCanvasChange);
      canvas.off("object:modified", handleCanvasChange);
      canvas.off("object:removed", handleCanvasChange);
      canvas.off("path:created", handleCanvasChange);
    };
  }, [canvas, saveHistory]);

  // ---------------------------------------------------------------------
  // Multi-page (Canva-style) management
  // ---------------------------------------------------------------------
  const [pages, setPages] = useState<PageData[]>([
    { id: "page-1", name: "Page 1", json: null, orientation: initialOrientation, thumbnail: null },
  ]);
  const [activePageId, setActivePageId] = useState<string>("page-1");

  const captureThumbnail = (c: Canvas): string | null => {
    try {
      return c.toDataURL({ format: "png", multiplier: 0.15 });
    } catch {
      return null;
    }
  };

  const addPage = useCallback(() => {
    if (canvas) {
      const currentJson = canvas.toJSON();
      const currentThumb = captureThumbnail(canvas);
      setPages((prev) =>
        prev.map((p) => (p.id === activePageId ? { ...p, json: currentJson, orientation, thumbnail: currentThumb } : p))
      );
      canvas.clear();
      canvas.backgroundColor = "#ffffff";
      canvas.renderAll();
    }

    const newId = `page-${Date.now()}`;
    setPages((prev) => [
      ...prev,
      { id: newId, name: `Page ${prev.length + 1}`, json: null, orientation: "landscape", thumbnail: null },
    ]);
    setActivePageId(newId);
    // setOrientation("landscape");
    setActiveObject(null);
    resetHistory();
  }, [canvas, activePageId, orientation]);

  const switchPage = useCallback(
    (pageId: string) => {
      if (!canvas || pageId === activePageId) return;

      const currentJson = canvas.toJSON();
      const currentThumb = captureThumbnail(canvas);
      const targetPage = pages.find((p) => p.id === pageId);

      setPages((prev) =>
        prev.map((p) => (p.id === activePageId ? { ...p, json: currentJson, orientation, thumbnail: currentThumb } : p))
      );
      setActivePageId(pageId);
      setActiveObject(null);

      if (targetPage) {
        setOrientation(targetPage.orientation);
        if (targetPage.json) {
          canvas.loadFromJSON(targetPage.json).then(() => canvas.renderAll());
        } else {
          canvas.clear();
          canvas.backgroundColor = "#ffffff";
          canvas.renderAll();
        }
      }

      resetHistory();
    },
    [canvas, activePageId, orientation, pages]
  );

  const duplicatePage = useCallback(
    (pageId: string) => {
      const source = pages.find((p) => p.id === pageId);
      if (!source) return;

      let sourceJson = source.json;
      let sourceThumb = source.thumbnail;
      if (pageId === activePageId && canvas) {
        sourceJson = canvas.toJSON();
        sourceThumb = captureThumbnail(canvas);
      }

      const newId = `page-${Date.now()}`;
      const idx = pages.findIndex((p) => p.id === pageId);

      setPages((prev) => {
        const next = [...prev];
        next.splice(idx + 1, 0, {
          id: newId,
          name: `${source.name} copy`,
          json: sourceJson,
          orientation: source.orientation,
          thumbnail: sourceThumb,
        });
        return next;
      });

      switchPage(newId);
    },
    [pages, activePageId, canvas, switchPage]
  );

  const deletePage = useCallback(
    (pageId: string) => {
      if (pages.length <= 1) return;
      const idx = pages.findIndex((p) => p.id === pageId);
      if (idx === -1) return;

      if (pageId === activePageId) {
        const fallback = pages[idx - 1] || pages[idx + 1];
        if (fallback) switchPage(fallback.id);
      }

      setPages((prev) => prev.filter((p) => p.id !== pageId));
    },
    [pages, activePageId, switchPage]
  );

  return (
    <FabricContext.Provider
      value={{
        canvas,
        setCanvas,
        activeObject,
        setActiveObject,
        orientation,
        setOrientation,
        zoomLevel,
        setZoomLevel,
        canvasDimensions,
        setCanvasDimensions,
        canUndo,
        canRedo,
        undo,
        redo,
        saveHistory,
        pages,
        activePageId,
        addPage,
        switchPage,
        duplicatePage,
        deletePage,
      }}
    >
      {children}
    </FabricContext.Provider>
  );
}

export function useFabric() {
  const context = useContext(FabricContext);

  if (!context) {
    throw new Error(
      "useFabric must be used inside FabricProvider"
    );
  }

  return context;
}