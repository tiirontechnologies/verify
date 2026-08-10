import { Bell, ShieldCheck } from "lucide-react";

interface AccountSettingsProps {
  emailNotifications?: boolean;
  verificationPreferences?: string;
  onChange: (field: string, value: any) => void;
}

export default function AccountSettings({
  emailNotifications = true,
  verificationPreferences = "auto-verify",
  onChange,
}: AccountSettingsProps) {
  return (
    <section className="rounded-3xl border border-gray-200 bg-white shadow-sm overflow-hidden">
      <div className="border-b border-gray-100 p-6 bg-slate-50/50">
        <h2 className="text-2xl font-bold text-gray-900">
          Account & Verification Preferences
        </h2>
      </div>

      <div className="grid gap-6 p-6 md:grid-cols-2">
        {/* Email Notifications Toggle */}
        <div className="rounded-2xl border border-gray-200 p-6 flex items-start justify-between bg-white shadow-sm">
          <div className="flex gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-red-50 text-red-600">
              <Bell size={22} />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-slate-900">Email Notifications</h3>
              <p className="mt-1 text-sm text-slate-500">
                Receive instant email alerts on student certificate verifications and status changes.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => onChange("emailNotifications", !emailNotifications)}
            className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
              emailNotifications ? "bg-red-600" : "bg-slate-300"
            }`}
          >
            <span
              className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                emailNotifications ? "translate-x-5" : "translate-x-0"
              }`}
            />
          </button>
        </div>

        {/* Verification Behavior */}
        <div className="rounded-2xl border border-gray-200 p-6 flex flex-col justify-between bg-white shadow-sm">
          <div className="flex gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-red-50 text-red-600">
              <ShieldCheck size={22} />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-slate-900">Verification Mode</h3>
              <p className="mt-1 text-sm text-slate-500">
                Determine how public verification requests are handled for issued certificates.
              </p>
            </div>
          </div>
          <select
            value={verificationPreferences}
            onChange={(e) => onChange("verificationPreferences", e.target.value)}
            className="mt-4 w-full rounded-xl border border-slate-200 p-2.5 text-sm font-semibold text-slate-800 bg-slate-50 outline-none focus:border-red-500"
          >
            <option value="auto-verify">Instant Public Verification (Recommended)</option>
            <option value="strict-verify">Strict Verification Mode</option>
          </select>
        </div>
      </div>
    </section>
  );
}