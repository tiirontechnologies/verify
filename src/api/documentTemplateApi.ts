import api from "./axios";

export interface CreateTemplateRequest {
  name: string;
  documentType:
    | "internship"
    | "training"
    | "offer-letter"
    | "evaluation-letter"
    | "experience-letter"
    | "appreciation-letter"
    | "custom";
  status: "active" | "inactive";
}

export interface UpdateTemplateRequest {
  name?: string;
  description?: string;
  documentType?:
    | "internship"
    | "training"
    | "offer-letter"
    | "evaluation-letter"
    | "experience-letter"
    | "appreciation-letter"
    | "custom";
  status?: "active" | "inactive";
}

export const documentTemplateApi = {
  // ==========================================
  // Import Template
  // ==========================================
  createTemplate: (
    data: CreateTemplateRequest,
    file: File
  ) => {
    const formData = new FormData();

    formData.append("name", data.name);
    formData.append("documentType", data.documentType);
    formData.append("status", data.status);

    // Multer field name
    formData.append("template", file);

    return api.post(
      "/api/document-template",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
  },

  // ==========================================
  // Get All Templates
  // ==========================================
  getTemplates: () => {
    return api.get("/api/document-template");
  },

  // ==========================================
  // Get Template By Id
  // ==========================================
  getTemplateById: (
    templateId: string
  ) => {
    return api.get(
      `/api/document-template/${templateId}`
    );
  },

  // ==========================================
  // Save Canvas JSON Template
  // ==========================================
  saveCanvasTemplate: (data: {
    name: string;
    documentType: string;
    status?: "active" | "inactive";
    design: {
      editor: "fabric";
      version?: string;
      orientation?: "landscape" | "portrait";
      data: any;
    };
  }) => {
    return api.post("/api/document-template", data);
  },

  // ==========================================
  // Update Canvas JSON Template
  // ==========================================
  updateCanvasTemplate: (
    templateId: string,
    data: {
      name?: string;
      documentType?: string;
      status?: "active" | "inactive";
      design?: {
        editor: "fabric";
        version?: string;
        orientation?: "landscape" | "portrait";
        data: any;
      };
    }
  ) => {
    return api.put(`/api/document-template/${templateId}`, data);
  },

  // ==========================================
  // Update Template Metadata
  // ==========================================
  updateTemplate: (
    templateId: string,
    data: UpdateTemplateRequest
  ) => {
    return api.put(
      `/api/document-template/${templateId}`,
      data
    );
  },


  // ==========================================
  // Delete Template
  // ==========================================
  deleteTemplate: (
    templateId: string
  ) => {
    return api.delete(
      `/api/document-template/${templateId}`
    );
  },

  // ==========================================
  // Set Default Template
  // ==========================================
  setDefaultTemplate: (
    templateId: string
  ) => {
    return api.patch(
      `/api/document-template/${templateId}/default`
    );
  },
};