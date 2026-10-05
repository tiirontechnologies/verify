import { useEffect, useState } from "react";
import FabricEditor from "../../organization/components/documentTemplate/editor/FabricEditor";
import { Link, useNavigate } from "react-router-dom";
import { LockKeyhole } from "lucide-react";

function requiresSubscription() {
  try {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    return localStorage.getItem("subscriptionRequired") === "true" &&
      (user.role === "admin" || user.roleId === "admin");
  } catch {
    return false;
  }
}

export default function DocumentTemplateDesigner() {
  const navigate = useNavigate();
  const [readOnly, setReadOnly] = useState(requiresSubscription);

  useEffect(() => {
    const syncSubscription = () => setReadOnly(requiresSubscription());
    window.addEventListener("storage", syncSubscription);
    window.addEventListener("subscription-status-change", syncSubscription);
    return () => {
      window.removeEventListener("storage", syncSubscription);
      window.removeEventListener("subscription-status-change", syncSubscription);
    };
  }, []);

  return (
    <div className="relative h-screen overflow-hidden">
      <div className="h-full" inert={readOnly || undefined}>
        <FabricEditor onBack={() => navigate(-1)} />
      </div>
      {readOnly && (
        <div className="absolute inset-0 z-[100] flex items-center justify-center bg-slate-950/35 p-4">
          <section className="w-full max-w-md rounded-xl border border-slate-200 bg-white p-6 text-center shadow-2xl sm:p-8">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-amber-50 text-amber-700"><LockKeyhole size={22} /></div>
            <h1 className="mt-4 text-xl font-bold text-slate-900">Subscription required</h1>
            <p className="mt-2 text-sm leading-6 text-slate-600">You can preview the editor, but editing and saving are available after subscribing.</p>
            <Link to="/Subscription" className="mt-5 inline-flex items-center justify-center rounded-lg bg-red-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-red-700">View subscription plans</Link>
          </section>
        </div>
      )}
    </div>
  );
}