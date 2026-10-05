import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { LockKeyhole } from "lucide-react";
import Sidebar from "../components/shared/Sidebar";
import Topbar from "../components/shared/Topbar";

type DashboardLayoutProps = {
  children: React.ReactNode;
};

export default function DashboardLayout({
  children,
}: DashboardLayoutProps) {
  const { pathname } = useLocation();
  const [subscriptionRequired, setSubscriptionRequired] = useState(
    () => localStorage.getItem("subscriptionRequired") === "true",
  );

  useEffect(() => {
    const syncSubscription = () => {
      setSubscriptionRequired(localStorage.getItem("subscriptionRequired") === "true");
    };
    window.addEventListener("storage", syncSubscription);
    window.addEventListener("subscription-status-change", syncSubscription);
    return () => {
      window.removeEventListener("storage", syncSubscription);
      window.removeEventListener("subscription-status-change", syncSubscription);
    };
  }, []);

  let user: { role?: string; roleId?: string } = {};
  try {
    user = JSON.parse(localStorage.getItem("user") || "{}");
  } catch {
    localStorage.removeItem("user");
  }
  const readOnlyAdmin =
    subscriptionRequired &&
    (user.role === "admin" || user.roleId === "admin") &&
    pathname !== "/organization/profile" &&
    pathname.toLowerCase() !== "/subscription";

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar />
      <div className="flex min-h-screen flex-col md:ml-72">
        <Topbar />
        <main className="flex-1 p-4 md:p-8">
          {readOnlyAdmin && (
            <div className="mb-5 flex flex-col gap-3 rounded-xl border border-amber-200 bg-amber-50 p-4 text-amber-950 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-start gap-3">
                <LockKeyhole size={19} className="mt-0.5 shrink-0 text-amber-700" />
                <div>
                  <p className="text-sm font-bold">Subscription required</p>
                  <p className="mt-1 text-xs leading-5 text-amber-800">You can view this workspace, but editing and management actions are locked until you subscribe.</p>
                </div>
              </div>
              <Link to="/Subscription" className="inline-flex shrink-0 items-center justify-center rounded-lg bg-amber-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-amber-800">View plans</Link>
            </div>
          )}
          <div inert={readOnlyAdmin || undefined}>
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}