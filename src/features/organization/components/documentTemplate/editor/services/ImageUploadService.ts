import { Canvas, FabricImage } from "fabric";

export class ImageUploadService {
  static async uploadImage(canvas: Canvas) {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";

    input.onchange = async () => {
      const file = input.files?.[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = async (e) => {
        const dataUrl = e.target?.result as string;
        if (!dataUrl) return;

        const image = await FabricImage.fromURL(dataUrl);
        const canvasW = canvas.width || 1056;
        const canvasH = canvas.height || 747;
        const imgW = image.width || 300;
        const imgH = image.height || 300;

        // Proportional scale to fit within canvas bounds (max 50% of canvas width or height)
        const maxW = canvasW * 0.5;
        const maxH = canvasH * 0.5;
        const scale = Math.min(maxW / imgW, maxH / imgH, 1);

        image.set({
          scaleX: scale,
          scaleY: scale,
          originX: "center",
          originY: "center",
          left: canvasW / 2,
          top: canvasH / 2,
        });

        canvas.add(image);
        canvas.setActiveObject(image);
        canvas.renderAll();
      };
      reader.readAsDataURL(file);
    };

    input.click();
  }

  static async uploadBackground(
    canvas: Canvas,
    onOrientationDetect?: (orientation: "landscape" | "portrait") => void
  ) {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";

    input.onchange = async () => {
      const file = input.files?.[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = async (e) => {
        const dataUrl = e.target?.result as string;
        if (!dataUrl) return;

        const image = await FabricImage.fromURL(dataUrl);

        const el = (image as any)._element || ((image as any).getElement && (image as any).getElement()) || image;
        const imgW = el?.naturalWidth || el?.width || image.width || 1;
        const imgH = el?.naturalHeight || el?.height || image.height || 1;

        // Auto detect orientation from natural image aspect ratio
        const detectedOrientation: "landscape" | "portrait" = imgH > imgW ? "portrait" : "landscape";

        if (onOrientationDetect) {
          onOrientationDetect(detectedOrientation);
        }

        const canvasWidth = detectedOrientation === "portrait" ? 747 : 1056;
        const canvasHeight = detectedOrientation === "portrait" ? 1056 : 747;

        canvas.setDimensions({ width: canvasWidth, height: canvasHeight });

        const scaleX = canvasWidth / imgW;
        const scaleY = canvasHeight / imgH;

        image.set({
          scaleX: scaleX,
          scaleY: scaleY,
          originX: "left",
          originY: "top",
          left: 0,
          top: 0,
        });

        canvas.backgroundImage = image;
        canvas.renderAll();
      };
      reader.readAsDataURL(file);
    };

    input.click();
  }
}