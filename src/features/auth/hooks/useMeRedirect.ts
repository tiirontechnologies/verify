import { useCallback } from "react";
import { useNavigate } from "react-router-dom";

type MeResponse = {
  success?: boolean;
  user?: {
    success?: boolean;
    user?: {
      role?: string;
      [key: string]: unknown;
    };
    role?: string;
    [key: string]: unknown;
  };
  role?: string;
};

export default function useMeRedirect() {
  const navigate = useNavigate();

  return useCallback(async () => {
    try {
      const baseUrl = import.meta.env.VITE_API_URL || "http://localhost:5000";

    //   console.log("Calling /auth/me with baseUrl:", baseUrl);

      const response = await fetch(`${baseUrl}/api/auth/me`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

    //   console.log("/auth/me response status:", response.status);

      const data = (await response.json().catch(() => ({}))) as MeResponse;
      const nestedUser = data?.user?.user;
      const role = nestedUser?.role || data?.user?.role || data?.role;
      const user = nestedUser || data?.user || { role };

    //   console.log("/auth/me parsed role:", role);

      if (!response.ok || !role) {
        if (response.status === 401 || response.status === 403 || !role) {
          localStorage.removeItem("token");
          localStorage.removeItem("user");
        //   navigate("/login", { replace: true });
          return false;
        }

        throw new Error(`Unexpected status ${response.status}`);
      }

      localStorage.setItem("user", JSON.stringify(user));

      if (role === "student") {
        navigate("/student/dashboard", { replace: true });
      } else if (role === "admin") {
        navigate("/organization/dashboard", { replace: true });
      } else {
        navigate("/login", { replace: true });
      }

      return true;
    } catch (error) {
      console.error("/auth/me fetch failed", error);
      return false;
    }
  }, [navigate]);
}
