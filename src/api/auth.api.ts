import api from "./axios";

export const login = async (
  email: string,
  password: string,
  loginType: "student" | "admin"
) => {
  const response = await api.post(
    "/api/auth/login",
    {
      email,
      password,
      loginType,
    },
    {
      withCredentials: true,
    }
  );

  return response.data;
};

export const requestPasswordReset = async (email: string) => {
  const response = await api.post("/api/auth/forgot-password", { email });
  return response.data;
};

export const verifyPasswordResetOtp = async (email: string, otp: string) => {
  const response = await api.post("/api/auth/verify-otp", { email, otp });
  return response.data;
};

export const resetPassword = async (email: string, resetToken: string, newPassword: string) => {
  const response = await api.post("/api/auth/reset-password", {
    email,
    resetToken,
    newPassword,
  });
  return response.data;
};

export const resendPasswordResetOtp = async (email: string) => {
  const response = await api.post("/api/auth/resend-otp", { email });
  return response.data;
};

export const getCurrentUser = async () => {
  const response = await api.get("/api/auth/me");
  return response.data;
};

export const changePassword = async (
  currentPassword: string,
  newPassword: string,
) => {
  const response = await api.patch("/api/auth/change-password", {
    currentPassword,
    newPassword,
  });
  return response.data;
};