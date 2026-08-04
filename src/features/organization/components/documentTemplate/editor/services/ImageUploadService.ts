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
        image.set({
          left: canvas.width ? canvas.width / 2 - 100 : 150,
          top: canvas.height ? canvas.height / 2 - 100 : 150,
          scaleX: 0.35,
          scaleY: 0.35,
        });

        canvas.add(image);
        canvas.setActiveObject(image);
        canvas.renderAll();
      };
      reader.readAsDataURL(file);
    };

    input.click();
  }

  static async uploadBackground(canvas: Canvas) {
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

        // Scale background image to fit canvas
        const canvasWidth = canvas.width || 1056;
        const canvasHeight = canvas.height || 747;

        const scaleX = canvasWidth / (image.width || canvasWidth);
        const scaleY = canvasHeight / (image.height || canvasHeight);

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