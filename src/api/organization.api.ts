import api from "./axios";

export const organizationApi = {
  signup: (data: any) =>
    api.post("/api/organization/signup", data),

  getProfile: () =>
    api.get("/api/organization/profile"),

  updateProfile: (data: any) =>
    api.put("/api/organization/profile", data),

  uploadStudents: (file: File) => {
    const formData = new FormData();
    formData.append("file", file);
    return api.post("/api/organization/upload-students", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },

  downloadSampleTemplate: () =>
    api.get("/api/organization/sample-template", {
      responseType: "blob",
    }),

  downloadSampleTemplateUrl: "/api/organization/sample-template",

  getRecentCertificates: () =>
    api.get("/api/organization/recent-certificates"),

  updateStudent: (id: string, data: any) =>
    api.put(`/api/organization/students/${id}`, data),

  deleteStudent: (id: string) =>
    api.delete(`/api/organization/students/${id}`),

  bulkDeleteStudents: (ids: string[]) =>
    api.post("/api/organization/students/bulk-delete", { ids }),

  bulkUpdateStatus: (ids: string[], status: "active" | "revoked") =>
    api.put("/api/organization/students/bulk-status", { ids, status }),
};