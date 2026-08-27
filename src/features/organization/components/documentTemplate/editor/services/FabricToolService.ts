import {
  Canvas,
  Textbox,
  Rect,
  Circle,
  Line,
} from "fabric";

export class FabricToolService {
  static addText(canvas: Canvas, textContent = "Double Click to Edit", options: any = {}) {
    const text = new Textbox(textContent, {
      left: canvas.width ? canvas.width / 2 - 200 : 150,
      top: canvas.height ? canvas.height / 2 - 20 : 150,
      width: options.width || 400,
      fontSize: options.fontSize || 24,
      fill: options.fill || "#000000",
      fontFamily: options.fontFamily || "Arial",
      fontWeight: options.fontWeight || "normal",
      fontStyle: options.fontStyle || "normal",
      textAlign: options.textAlign || "left",
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

  static addRectangle(canvas: Canvas) {
    const rect = new Rect({
      left: canvas.width ? canvas.width / 2 - 100 : 150,
      top: canvas.height ? canvas.height / 2 - 60 : 150,
      width: 200,
      height: 120,
      fill: "#ef4444",
      stroke: "#dc2626",
      strokeWidth: 0,
    });

    canvas.add(rect);
    canvas.setActiveObject(rect);
    canvas.renderAll();
  }

  static addCircle(canvas: Canvas) {
    const circle = new Circle({
      left: canvas.width ? canvas.width / 2 - 60 : 150,
      top: canvas.height ? canvas.height / 2 - 60 : 150,
      radius: 60,
      fill: "#3b82f6",
    });

    canvas.add(circle);
    canvas.setActiveObject(circle);
    canvas.renderAll();
  }

  static addLine(canvas: Canvas) {
    const line = new Line([50, 100, 350, 100], {
      left: canvas.width ? canvas.width / 2 - 150 : 150,
      top: canvas.height ? canvas.height / 2 : 150,
      stroke: "#000000",
      strokeWidth: 2,
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