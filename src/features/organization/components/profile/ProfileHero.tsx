import { Building2, Save, Loader2 } from "lucide-react";

interface ProfileHeroProps {
  organizationName?: string;
  saving?: boolean;
  onSave?: () => void;
}

export default function ProfileHero({
  organizationName,
  saving = false,
  onSave,
}: ProfileHeroProps) {
  return (
    <section className="rounded-3xl border border-gray-200 bg-white shadow-sm">
      <div className="flex flex-col gap-6 p-8 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full bg-red-50 px-4 py-2 text-sm font-medium text-red-600">
            <Building2 size={16} />
            Organization Profile
          </div>

          <h1 className="mt-5 text-4xl font-bold text-gray-900">
            {organizationName || "Profile Management"}
          </h1>

          <p className="mt-4 max-w-2xl leading-7 text-gray-500">
            Manage your organization's information, branding, signatories, and certificate settings from one place.
          </p>
        </div>

        <button
          onClick={onSave}
          disabled={saving}
          className="inline-flex items-center gap-2 rounded-2xl bg-red-600 px-6 py-3 font-medium text-white transition hover:bg-red-700 disabled:opacity-60 shadow-md shadow-red-200"
        >
          {saving ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
          {saving ? "Saving Changes..." : "Save Changes"}
        </button>
      </div>
    </section>
  );
}