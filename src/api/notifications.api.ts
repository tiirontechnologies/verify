import api, { baseURL } from "./axios";

export interface NotificationRecord {
  _id?: string;
  id?: string;
  notificationId?: string;
  title?: string;
  message?: string;
  body?: string;
  type?: string;
  createdAt?: string;
  read?: boolean;
  readAt?: string | null;
}

export const getNotifications = async () => {
  const response = await api.get("/api/notifications");
  return response.data;
};

export const markNotificationRead = async (notificationId: string) => {
  const response = await api.patch(
    `/api/notifications/${encodeURIComponent(notificationId)}/read`,
  );
  return response.data;
};

export const openNotificationStream = () =>
  new EventSource(
    `${baseURL.replace(/\/$/, "")}/api/notifications/stream`,
    { withCredentials: true },
  );