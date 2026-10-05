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
  userRedirect?: MeResponse["user"];
};

/**
 * redirectOnFail    -> fail par /login (ya /subscription) bhejna hai ya nahi
 * redirectOnSuccess -> success par role ke hisaab se dashboard bhejna hai ya nahi
 *                      (default = redirectOnFail, purana behavior same rahega)
 */
export default function useMeRedirect(
  redirectOnFail = true,
  redirectOnSuccess: boolean = redirectOnFail
) {
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

      const nestedUser = data?.user?.user || data?.userRedirect?.user || data?.userRedirect;

      const role = nestedUser?.role || data?.user?.role || data?.role || data?.userRedirect?.role;
      const roleId = nestedUser?.roleId || data?.user?.roleId || data?.roleId || data?.userRedirect?.roleId;

      // Admins without an active subscription may still view the dashboard.
      if (response.status === 403 && roleId === "admin") {
        const user = { ...(nestedUser || data?.user || {}), role: role || "admin", roleId };
        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("subscriptionRequired", "true");
        window.dispatchEvent(new Event("subscription-status-change"));
        if (redirectOnSuccess) navigate("/organization/dashboard", { replace: true });
        return true;
      }

      // Unauthorized / invalid user
      if (!response.ok || !role) {
        // Landing page: kuch mat karo
        if (!redirectOnFail) {
          return false;
        }

        if (response.status === 401 || response.status === 403 || !role) {
          localStorage.removeItem("token");
          localStorage.removeItem("user");

          navigate("/login", { replace: true });

          return false;
        }

        throw new Error(`Unexpected status ${response.status}`);
      }

      // Save user
      const user = nestedUser || data?.user || { role, roleId };

      localStorage.setItem("user", JSON.stringify(user));
      localStorage.removeItem("subscriptionRequired");
      window.dispatchEvent(new Event("subscription-status-change"));

      // Role based redirect (success)
      if (redirectOnSuccess) {
        if (role === "student") {
          navigate("/student/dashboard", { replace: true });
        } else if (role === "admin") {
          navigate("/organization/dashboard", { replace: true });
        } else if (redirectOnFail) {
          navigate("/login", { replace: true });
        }
        // else: unknown role + landing page => kuch nahi
      }

      return true;
    } catch (error) {
      console.error("/auth/me fetch failed:", error);
      return false;
    }
  }, [navigate, redirectOnFail, redirectOnSuccess]);
}