/* eslint-disable react-refresh/only-export-components */
import {
  createContext,
  useContext,
  useState,
} from "react";

import type { ReactNode } from "react";

import { Canvas } from "fabric";

interface FabricContextType {
  canvas: Canvas | null;
  setCanvas: (canvas: Canvas | null) => void;
  activeObject: any;
  setActiveObject: (obj: any) => void;
  orientation: "landscape" | "portrait";
  setOrientation: (orientation: "landscape" | "portrait") => void;
  zoomLevel: number;
  setZoomLevel: React.Dispatch<React.SetStateAction<number>>;
}

const FabricContext = createContext<FabricContextType | null>(null);

export function FabricProvider({
  children,
  initialOrientation = "landscape",
}: {
  children: ReactNode;
  initialOrientation?: "landscape" | "portrait";
}) {
  const [canvas, setCanvas] = useState<Canvas | null>(null);
  const [activeObject, setActiveObject] = useState<any>(null);
  const [orientation, setOrientation] = useState<"landscape" | "portrait">(
    initialOrientation
  );
  const [zoomLevel, setZoomLevel] = useState<number>(1.0);

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