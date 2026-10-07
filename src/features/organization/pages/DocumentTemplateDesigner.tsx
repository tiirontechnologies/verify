import { useEffect, useState } from "react";
import FabricEditor from "../../organization/components/documentTemplate/editor/FabricEditor";
import { Link, useNavigate, useParams } from "react-router-dom";
import { LockKeyhole } from "lucide-react";
import { documentTemplateApi } from "../../../api/documentTemplateApi";

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
  const { id } = useParams();
  const [template, setTemplate] = useState<any>(null);
  const [templateLoading, setTemplateLoading] = useState(Boolean(id));
  const [templateError, setTemplateError] = useState("");
  const [readOnly, setReadOnly] = useState(requiresSubscription);

  useEffect(() => {
    if (!id) return;
    let active = true;
    setTemplateLoading(true);
    documentTemplateApi.getTemplateById(id)
      .then(({ data }) => {
        if (!active) return;
        const fullTemplate = data.template || data;
        if (!fullTemplate?.design?.data) {
          setTemplateError("This template has no saved canvas data, so it cannot be edited yet.");
          return;
        }
        setTemplate(fullTemplate);
      })
      .catch((error) => {
        console.error("Failed to load template for editing:", error);
        if (active) setTemplateError("Could not load this template's saved design. Please go back and try again.");
      })
      .finally(() => { if (active) setTemplateLoading(false); });
    return () => { active = false; };
  }, [id]);

  useEffect(() => {
    const syncSubscription = () => setReadOnly(requiresSubscription());
    window.addEventListener("storage", syncSubscription);
    window.addEventListener("subscription-status-change", syncSubscription);
    return () => {
      window.removeEventListener("storage", syncSubscription);
      window.removeEventListener("subscription-status-change", syncSubscription);
    };
  }, []);

  if (templateLoading || templateError) {
    return <div className="flex min-h-screen items-center justify-center bg-slate-50 p-6"><div className="max-w-md rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-sm">{templateLoading ? <p className="text-sm font-medium text-slate-600">Loading saved template…</p> : <><p className="text-sm text-slate-700">{templateError}</p><button onClick={() => navigate(-1)} className="mt-4 rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white">Back to templates</button></>}</div></div>;
  }

  return (
    <div className="relative h-screen overflow-hidden">
      <div className="h-full" inert={readOnly || undefined}>
        <FabricEditor template={template || undefined} onBack={() => navigate(-1)} />
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
