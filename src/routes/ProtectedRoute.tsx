// import { useEffect, useState } from "react";
// import { Navigate } from "react-router-dom";

// type ProtectedRouteProps = {
//   children: React.ReactNode;
// };

// export default function ProtectedRoute({
//   children,
// }: ProtectedRouteProps) {

//   const [status, setStatus] = useState<"loading" | "authenticated" | "unauthenticated">("loading");

//   useEffect(() => {
//     const verifyAuth = async () => {
//       const baseUrl = import.meta.env.VITE_API_URL || "http://localhost:5001";

//       try {
//         const response = await fetch(`${baseUrl}/api/auth/me`, {
//           method: "GET",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           credentials: "include",
//         });

//         if (!response.ok) {
//           setStatus("unauthenticated");
//           return;
//         }

//         const data = (await response.json().catch(() => ({}))) as {
//           user?: { user?: { role?: string }; role?: string };
//           role?: string;
//         };

//         const nestedUser = data?.user?.user;
//         const role = nestedUser?.role || data?.user?.role || data?.role;

//         if (!role) {
//           setStatus("unauthenticated");
//           return;
//         }

//         localStorage.setItem("user", JSON.stringify(nestedUser || data?.user || { role }));
//         setStatus("authenticated");
//       } catch {
//         setStatus("unauthenticated");
//       }
//     };

//     verifyAuth();
//   }, []);

//   if (status === "loading") {
//     return null;
//   }

//   if (status === "unauthenticated") {
//     return <Navigate to="/login" replace />;
//   }

//   return children;
// }


import { useEffect, useState } from "react";
import useMeRedirect from "../features/auth/hooks/useMeRedirect"; // apne actual hooks folder path se adjust kar lena

type ProtectedRouteProps = {
  children: React.ReactNode;
};

export default function ProtectedRoute({
  children,
}: ProtectedRouteProps) {
  const [status, setStatus] = useState<"loading" | "authenticated" | "unauthenticated">("loading");
  const meRedirect = useMeRedirect();

  useEffect(() => {
    const verifyAuth = async () => {
      const ok = await meRedirect();
      setStatus(ok ? "authenticated" : "unauthenticated");
    };

    verifyAuth();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (status === "loading") {
    return null;
  }

  if (status === "unauthenticated") {
    return null;
  }

  return <>{children}</>;
}