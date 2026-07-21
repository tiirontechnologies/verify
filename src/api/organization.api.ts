import api from "./axios";

export const organizationApi = {
  signup: (data: any) =>
    api.post("/api/organization/signup", data),

  getProfile: () =>
    api.get("/api/organization/profile"),

  updateProfile: (data: any) =>
    api.put("/api/organization/profile", data),
};