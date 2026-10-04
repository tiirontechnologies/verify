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

        const imgEl = new Image();
        imgEl.onload = async () => {
          const image = await FabricImage.fromURL(dataUrl);
          const canvasW = canvas.width || 1056;
          const canvasH = canvas.height || 747;
          
          const imgW = imgEl.naturalWidth || imgEl.width || image.width || 300;
          const imgH = imgEl.naturalHeight || imgEl.height || image.height || 300;

          // Proportional scale to fit within canvas bounds (max 35% of canvas width or height)
          const maxW = canvasW * 0.35;
          const maxH = canvasH * 0.35;
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
        imgEl.src = dataUrl;
      };
      reader.readAsDataURL(file);
    };

    input.click();
  }

  static async uploadBackground(
    canvas: Canvas,
    onOrientationDetect?: (orientation: "landscape" | "portrait", dimensions: { width: number; height: number }) => void
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

        const imgEl = new Image();
        imgEl.onload = async () => {
          const image = await FabricImage.fromURL(dataUrl);

          const imgW = imgEl.naturalWidth || imgEl.width || image.width || 1;
          const imgH = imgEl.naturalHeight || imgEl.height || image.height || 1;
          const imgRatio = imgW / imgH;

          // Auto detect orientation from natural image aspect ratio
          const detectedOrientation: "landscape" | "portrait" = imgH > imgW ? "portrait" : "landscape";

          // Dynamically compute canvas dimensions matching image aspect ratio precisely
          let canvasWidth = 1056;
          let canvasHeight = 747;

          if (detectedOrientation === "landscape") {
            canvasWidth = 1056;
            canvasHeight = Math.round(1056 / imgRatio);
          } else {
            canvasHeight = 1056;
            canvasWidth = Math.round(1056 * imgRatio);
          }

          if (onOrientationDetect) {
            onOrientationDetect(detectedOrientation, { width: canvasWidth, height: canvasHeight });
          }

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
        imgEl.src = dataUrl;
      };
      reader.readAsDataURL(file);
    };

    input.click();
  }
}