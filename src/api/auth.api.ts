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