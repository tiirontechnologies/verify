import {
  FabricObject,
  Canvas,
  Textbox,
  Rect,
  Circle,
  Ellipse,
  Line,
  Polygon,
  Triangle,
} from "fabric";

for (const property of ["isCertificateVariable", "isPageBackground", "backgroundScaleMode", "backgroundScale"]) {
  if (!FabricObject.customProperties.includes(property)) {
    FabricObject.customProperties = [...FabricObject.customProperties, property];
  }
}

export class FabricToolService {
  static addText(canvas: Canvas, textContent = "Double Click to Edit", options: any = {}) {
    const text = new Textbox(textContent, {
      left: canvas.width ? canvas.width / 2 - 200 : 150,
      top: canvas.height ? canvas.height / 2 - 20 : 150,
      width: options.width || 400,
      fontSize: options.fontSize || 24,
      fill: options.fill || "#1e293b",
      fontFamily: options.fontFamily || "Arial",
      fontWeight: options.fontWeight || "normal",
      fontStyle: options.fontStyle || "normal",
      textAlign: options.textAlign || "left",
      editable: true,
      cursorColor: "#2563eb",
      cursorWidth: 2,
      cursorDelay: 250,
      cursorDuration: 600,
      selectionColor: "rgba(37, 99, 235, 0.25)",
      editingBorderColor: "#2563eb",
      splitByGrapheme: false,
      ...options,
    });

    canvas.add(text);
    canvas.setActiveObject(text);
    canvas.renderAll();
  }

  static addPlaceholder(canvas: Canvas, tag: string) {
    let cleanTag = tag.trim();
    if (!cleanTag.startsWith("{{")) {
      cleanTag = "{{" + cleanTag;
    }
    if (!cleanTag.endsWith("}}")) {
      cleanTag = cleanTag + "}}";
    }

    const active = canvas.getActiveObject();

    // If a text object is currently selected or editing, insert the variable tag inline inside that text box
    if (active && (active.type === "textbox" || active.type === "i-text" || (active as any).text !== undefined)) {
      const textObj = active as any;
      const currentText = textObj.text || "";
      let newText = "";
      let newCursorPos = 0;

      if (textObj.isEditing && textObj.selectionStart !== undefined && textObj.selectionEnd !== undefined) {
        const start = textObj.selectionStart;
        const end = textObj.selectionEnd;
        // Insert with space padding if needed for natural typing flow
        const tagWithSpace = cleanTag + " ";
        newText = currentText.slice(0, start) + tagWithSpace + currentText.slice(end);
        newCursorPos = start + tagWithSpace.length;
      } else {
        const tagWithSpace = currentText && !currentText.endsWith(" ") ? ` ${cleanTag} ` : `${cleanTag} `;
        newText = currentText ? `${currentText}${tagWithSpace}` : tagWithSpace;
        newCursorPos = newText.length;
      }

      textObj.set("text", newText);
      if (typeof textObj.initDimensions === "function") {
        textObj.initDimensions();
      }

      // Enter editing mode if not already editing
      if (typeof textObj.enterEditing === "function" && !textObj.isEditing) {
        textObj.enterEditing();
      }

      // Sync selection cursor positions
      textObj.selectionStart = newCursorPos;
      textObj.selectionEnd = newCursorPos;

      // Sync Fabric's internal hidden textarea element
      if (textObj.hiddenTextarea) {
        textObj.hiddenTextarea.value = newText;
        textObj.hiddenTextarea.focus();
        try {
          textObj.hiddenTextarea.setSelectionRange(newCursorPos, newCursorPos);
        } catch (e) {
          // ignore setSelectionRange errors on unsupported devices
        }
      }

      canvas.renderAll();
      return;
    }

    // Otherwise create a new Textbox containing the tag with space padding
    const text = new Textbox(`${cleanTag} `, {
      left: canvas.width ? canvas.width / 2 - 140 : 150,
      top: canvas.height ? canvas.height / 2 - 20 : 150,
      width: 320,
      fontSize: 22,
      fill: "#081F5C",
      fontFamily: "Arial",
      fontWeight: "bold",
      editable: true,
      cursorColor: "#2563eb",
      cursorWidth: 2,
      cursorDelay: 250,
      cursorDuration: 600,
      selectionColor: "rgba(37, 99, 235, 0.25)",
      editingBorderColor: "#2563eb",
      splitByGrapheme: false,
    });

    canvas.add(text);
    canvas.setActiveObject(text);

    if (typeof text.enterEditing === "function") {
      text.enterEditing();
      const endPos = text.text.length;
      text.selectionStart = endPos;
      text.selectionEnd = endPos;
      if (text.hiddenTextarea) {
        text.hiddenTextarea.value = text.text;
        text.hiddenTextarea.focus();
      }
    }

    canvas.renderAll();
  }

  static addVariable(canvas: Canvas, tag: string) {
    const cleanTag = tag.startsWith("{{") && tag.endsWith("}}") ? tag : `{{${tag.replace(/^\{\{|\}\}$/g, "")}}}`;
    const variableCount = canvas.getObjects().filter((object: any) => object.isCertificateVariable).length;
    const pageWidth = canvas.getWidth() || 1056;
    const pageHeight = canvas.getHeight() || 747;
    const boxWidth = Math.min(320, pageWidth - 48);
    const rowHeight = 42;
    const maxRows = Math.max(1, Math.floor((pageHeight - 100) / rowHeight));
    const column = Math.floor(variableCount / maxRows);
    const row = variableCount % maxRows;
    const left = Math.min(24 + column * (boxWidth + 16), Math.max(24, pageWidth - boxWidth - 24));
    const top = Math.min(72 + row * rowHeight, Math.max(24, pageHeight - 48));
    const text = new Textbox(cleanTag, {
      left,
      top,
      width: boxWidth,
      fontSize: 22,
      fill: "#081f5c",
      fontFamily: "Arial",
      fontWeight: "bold",
      editable: true,
      splitByGrapheme: false,
      name: `Variable ${cleanTag}`,
      isCertificateVariable: true,
    } as any);
    canvas.add(text);
    canvas.setActiveObject(text);
    canvas.requestRenderAll();
  }

  static addRectangle(canvas: Canvas) {
    const rect = new Rect({
      left: canvas.width ? canvas.width / 2 - 100 : 150,
      top: canvas.height ? canvas.height / 2 - 60 : 150,
      width: 200,
      height: 120,
      fill: "#ef4444",
      stroke: "#dc2626",
      strokeWidth: 0,
      name: "Rectangle" as any,
    });

    canvas.add(rect);
    canvas.setActiveObject(rect);
    canvas.renderAll();
  }

  static addRoundedRectangle(canvas: Canvas) {
    const rect = new Rect({
      left: (canvas.width || 1056) / 2 - 100,
      top: (canvas.height || 747) / 2 - 60,
      width: 200,
      height: 120,
      rx: 18,
      ry: 18,
      fill: "#0f766e",
      stroke: "#115e59",
      strokeWidth: 0,
      name: "Rounded rectangle" as any,
    });
    canvas.add(rect);
    canvas.setActiveObject(rect);
    canvas.requestRenderAll();
  }

  private static addPolygon(canvas: Canvas, label: string, sides: number, innerRadiusRatio = 1) {
    const radius = 64;
    const center = radius;
    const points = Array.from({ length: innerRadiusRatio < 1 ? sides * 2 : sides }, (_, index) => {
      const angle = -Math.PI / 2 + index * Math.PI / sides;
      const pointRadius = innerRadiusRatio < 1 && index % 2 === 1 ? radius * innerRadiusRatio : radius;
      return { x: center + Math.cos(angle) * pointRadius, y: center + Math.sin(angle) * pointRadius };
    });
    const polygon = new Polygon(points, {
      left: (canvas.width || 1056) / 2 - radius,
      top: (canvas.height || 747) / 2 - radius,
      fill: "#2563eb",
      stroke: "#1d4ed8",
      strokeWidth: 1,
      name: label,
    } as any);
    canvas.add(polygon);
    canvas.setActiveObject(polygon);
    canvas.requestRenderAll();
  }

  static addPentagon(canvas: Canvas) {
    this.addPolygon(canvas, "Pentagon", 5);
  }

  static addHexagon(canvas: Canvas) {
    this.addPolygon(canvas, "Hexagon", 6);
  }

  static addDiamond(canvas: Canvas) {
    this.addPolygon(canvas, "Diamond", 4);
  }

  static addCertificateBadge(canvas: Canvas) {
    this.addPolygon(canvas, "Certificate badge", 12, 0.78);
  }

  static addCircle(canvas: Canvas) {
    const circle = new Circle({
      left: canvas.width ? canvas.width / 2 - 60 : 150,
      top: canvas.height ? canvas.height / 2 - 60 : 150,
      radius: 60,
      fill: "#3b82f6",
      name: "Circle" as any,
    });

    canvas.add(circle);
    canvas.setActiveObject(circle);
    canvas.renderAll();
  }

  static addEllipse(canvas: Canvas) {
    const ellipse = new Ellipse({
      left: (canvas.width || 1056) / 2 - 90,
      top: (canvas.height || 747) / 2 - 55,
      rx: 90,
      ry: 55,
      fill: "#0f766e",
      name: "Ellipse" as any,
    });
    canvas.add(ellipse);
    canvas.setActiveObject(ellipse);
    canvas.requestRenderAll();
  }

  static addTriangle(canvas: Canvas) {
    const triangle = new Triangle({
      left: (canvas.width || 1056) / 2 - 70,
      top: (canvas.height || 747) / 2 - 60,
      width: 140,
      height: 120,
      fill: "#f59e0b",
      name: "Triangle" as any,
    });
    canvas.add(triangle);
    canvas.setActiveObject(triangle);
    canvas.requestRenderAll();
  }

  static addStar(canvas: Canvas) {
    const center = 60;
    const points = Array.from({ length: 10 }, (_, index) => {
      const angle = -Math.PI / 2 + index * Math.PI / 5;
      const radius = index % 2 === 0 ? 60 : 27;
      return { x: center + Math.cos(angle) * radius, y: center + Math.sin(angle) * radius };
    });
    const star = new Polygon(points, {
      left: (canvas.width || 1056) / 2 - center,
      top: (canvas.height || 747) / 2 - center,
      fill: "#eab308",
      stroke: "#ca8a04",
      strokeWidth: 1,
      name: "Star" as any,
    });
    canvas.add(star);
    canvas.setActiveObject(star);
    canvas.requestRenderAll();
  }

  static addArrow(canvas: Canvas) {
    const arrow = new Polygon(
      [{ x: 0, y: 12 }, { x: 76, y: 12 }, { x: 76, y: 0 }, { x: 110, y: 24 }, { x: 76, y: 48 }, { x: 76, y: 36 }, { x: 0, y: 36 }],
      {
        left: (canvas.width || 1056) / 2 - 55,
        top: (canvas.height || 747) / 2 - 24,
        fill: "#2563eb",
        name: "Arrow",
      },
    );
    canvas.add(arrow);
    canvas.setActiveObject(arrow);
    canvas.requestRenderAll();
  }

  static addFrame(canvas: Canvas) {
    const frame = new Rect({
      left: (canvas.width || 1056) / 2 - 180,
      top: (canvas.height || 747) / 2 - 110,
      width: 360,
      height: 220,
      fill: "rgba(255,255,255,0)",
      stroke: "#b45309",
      strokeWidth: 8,
      name: "Certificate frame" as any,
    });
    canvas.add(frame);
    canvas.setActiveObject(frame);
    canvas.requestRenderAll();
  }

  static addLine(canvas: Canvas) {
    const line = new Line([50, 100, 350, 100], {
      left: canvas.width ? canvas.width / 2 - 150 : 150,
      top: canvas.height ? canvas.height / 2 : 150,
      stroke: "#000000",
      strokeWidth: 2,
      name: "Divider line" as any,
    });

    canvas.add(line);
    canvas.setActiveObject(line);
    canvas.renderAll();
  }

  static deleteSelected(canvas: Canvas) {
    const active = canvas.getActiveObject();
    if (!active) return;

    canvas.remove(active);
    canvas.discardActiveObject();
    canvas.renderAll();
  }

  static bringToFront(canvas: Canvas) {
    const active = canvas.getActiveObject();
    if (!active) return;

    canvas.bringObjectToFront(active);
    canvas.renderAll();
  }

  static sendToBack(canvas: Canvas) {
    const active = canvas.getActiveObject();
    if (!active) return;

    canvas.sendObjectToBack(active);
    canvas.renderAll();
  }

  static clearCanvas(canvas: Canvas) {
    canvas.clear();
    canvas.backgroundColor = "#ffffff";
    canvas.renderAll();
  }
}