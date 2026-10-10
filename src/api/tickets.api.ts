import api from "./axios";

export type TicketStatus = "open" | "in_progress" | "waiting_on_user" | "resolved";

export const ticketApi = {
  list: (params: { status?: TicketStatus | "all"; page?: number; limit?: number } = {}) =>
    api.get("/api/tickets", { params: { ...params, status: params.status === "all" ? undefined : params.status } }),
  get: (id: string) => api.get(`/api/tickets/${encodeURIComponent(id)}`),
  create: (data: { subject: string; category: string; description: string }) => api.post("/api/tickets", data),
  reply: (id: string, message: string) => api.post(`/api/tickets/${encodeURIComponent(id)}/messages`, { message }),
  setStatus: (id: string, status: TicketStatus, note?: string) => api.patch(`/api/tickets/${encodeURIComponent(id)}/status`, { status, note }),
};
