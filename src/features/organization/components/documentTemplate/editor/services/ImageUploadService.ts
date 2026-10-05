import { Canvas, FabricImage } from "fabric";

export type BackgroundScaleMode = "contain" | "cover" | "stretch";

export class ImageUploadService {
  private static readImageFile(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => typeof reader.result === "string" ? resolve(reader.result) : reject(new Error("Invalid image file"));
      reader.onerror = () => reject(reader.error || new Error("Image upload failed"));
      reader.readAsDataURL(file);
    });
  }

  static async addImageFile(canvas: Canvas, file: File) {
    if (!file.type.startsWith("image/")) return;
    const image = await FabricImage.fromURL(await this.readImageFile(file));
    const canvasW = canvas.getWidth() || 1056;
    const canvasH = canvas.getHeight() || 747;
    const imageW = image.width || 1;
    const imageH = image.height || 1;
    const scale = Math.min((canvasW * 0.7) / imageW, (canvasH * 0.7) / imageH, 1);

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
    canvas.requestRenderAll();
  }

  static async replaceImageFile(canvas: Canvas, target: FabricImage, file: File) {
    if (!file.type.startsWith("image/")) return;
    const index = canvas.getObjects().indexOf(target);
    if (index < 0) return;

    const image = await FabricImage.fromURL(await this.readImageFile(file));
    const center = target.getCenterPoint();
    image.set({
      scaleX: target.getScaledWidth() / (image.width || 1),
      scaleY: target.getScaledHeight() / (image.height || 1),
      angle: target.angle,
      opacity: target.opacity,
      flipX: target.flipX,
      flipY: target.flipY,
      originX: "center",
      originY: "center",
    });
    image.setPositionByOrigin(center, "center", "center");
    canvas.remove(target);
    canvas.insertAt(index, image);
    canvas.setActiveObject(image);
    canvas.requestRenderAll();
  }

  static replaceImage(canvas: Canvas, target: FabricImage) {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/png,image/jpeg,image/webp,image/svg+xml";
    input.onchange = () => {
      const file = input.files?.[0];
      if (file) void this.replaceImageFile(canvas, target, file);
    };
    input.click();
  }

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

  static applyBackgroundSize(
    canvas: Canvas,
    mode?: BackgroundScaleMode,
    scaleMultiplier?: number,
  ) {
    const background = (canvas.backgroundImage || canvas.getObjects().find((object: any) => object.isPageBackground)) as any;
    if (!background) return;
    const imageElement = background._element || background.getElement?.() || background;
    const imageWidth = background.width || imageElement?.naturalWidth || imageElement?.width;
    const imageHeight = background.height || imageElement?.naturalHeight || imageElement?.height;
    if (!imageWidth || !imageHeight) return;

    const scaleMode: BackgroundScaleMode = mode || background.backgroundScaleMode || "contain";
    const multiplier = scaleMultiplier ?? background.backgroundScale ?? 1;
    const pageWidth = canvas.getWidth() || 1056;
    const pageHeight = canvas.getHeight() || 747;
    const fitScale = scaleMode === "cover"
      ? Math.max(pageWidth / imageWidth, pageHeight / imageHeight)
      : Math.min(pageWidth / imageWidth, pageHeight / imageHeight);

    background.set({
      scaleX: (scaleMode === "stretch" ? pageWidth / imageWidth : fitScale) * multiplier,
      scaleY: (scaleMode === "stretch" ? pageHeight / imageHeight : fitScale) * multiplier,
      originX: "center",
      originY: "center",
      left: pageWidth / 2,
      top: pageHeight / 2,
      backgroundScaleMode: scaleMode,
      backgroundScale: multiplier,
    });
    background.setCoords();
    canvas.requestRenderAll();
    canvas.fire("object:modified", { target: background });
  }

  static async uploadBackground(
    canvas: Canvas,
    mode: BackgroundScaleMode = "contain",
    scaleMultiplier = 1,
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

          image.set({
            backgroundScaleMode: mode,
            backgroundScale: scaleMultiplier,
            isPageBackground: true,
            name: "Page background",
            selectable: true,
            evented: true,
            hasControls: true,
            originX: "center",
            originY: "center",
          } as any);
          const previousBackground = canvas.getObjects().find((object: any) => object.isPageBackground);
          if (previousBackground) canvas.remove(previousBackground);
          canvas.add(image);
          canvas.sendObjectToBack(image);
          this.applyBackgroundSize(canvas, mode, scaleMultiplier);
          canvas.setActiveObject(image);
          canvas.requestRenderAll();
        };
        imgEl.src = dataUrl;
      };
      reader.readAsDataURL(file);
    };

    input.click();
  }
}