import { useCallback } from "react";
import { useNavigate } from "react-router-dom";

type MeResponse = {
  success?: boolean;

  roleId?: string;
  role?: string;

  user?: {
    success?: boolean;

    roleId?: string;
    role?: string;

    user?: {
      roleId?: string;
      role?: string;
      [key: string]: unknown;
    };

    [key: string]: unknown;
  };
};

export default function useMeRedirect() {
  const navigate = useNavigate();

  return useCallback(async () => {
    try {
      const baseUrl =
        import.meta.env.VITE_API_URL || "http://localhost:5001";

      const response = await fetch(`${baseUrl}/api/auth/me`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      const data = (await response.json().catch(() => ({}))) as MeResponse;

      console.log("ME RESPONSE:", data);
      console.log("STATUS:", response.status);

      const nestedUser = data?.user?.user;

      // Normal role
      const role =
        nestedUser?.role ||
        data?.user?.role ||
        data?.role;

      // Role ID
      const roleId =
        nestedUser?.roleId ||
        data?.user?.roleId ||
        data?.roleId;

      console.log("ROLE:", role);
      console.log("ROLE ID:", roleId);

      // =====================================================
      // 403 + roleId admin = subscription page
      // =====================================================
      if (response.status === 403 && roleId === "admin") {
        console.log(
          "403 + admin detected -> redirecting to subscription"
        );

        navigate("/subscription", {
          replace: true,
        });

        return false;
      }

      // =====================================================
      // Unauthorized / invalid user
      // =====================================================
      if (!response.ok || !role) {
        if (
          response.status === 401 ||
          response.status === 403 ||
          !role
        ) {
          localStorage.removeItem("token");
          localStorage.removeItem("user");

          navigate("/login", {
            replace: true,
          });

          return false;
        }

        throw new Error(
          `Unexpected status ${response.status}`
        );
      }

      // =====================================================
      // Save user
      // =====================================================
      const user =
        nestedUser ||
        data?.user || {
          role,
          roleId,
        };

      localStorage.setItem(
        "user",
        JSON.stringify(user)
      );

      // =====================================================
      // Role based redirect
      // =====================================================
      if (role === "student") {
        navigate("/student/dashboard", {
          replace: true,
        });
      } else if (role === "admin") {
        navigate("/organization/dashboard", {
          replace: true,
        });
      } else {
        navigate("/login", {
          replace: true,
        });
      }

      return true;
    } catch (error) {
      console.error(
        "/auth/me fetch failed:",
        error
      );

      return false;
    }
  }, [navigate]);
}
