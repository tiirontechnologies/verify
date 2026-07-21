import { Bell, Lock, ShieldCheck } from "lucide-react";

const settings = [
  {
    title: "Email Notifications",
    description: "Receive certificate and verification updates.",
    icon: Bell,
  },
  {
    title: "Security Settings",
    description: "Manage password and account security.",
    icon: Lock,
  },
  {
    title: "Verification Preferences",
    description: "Configure default verification behaviour.",
    icon: ShieldCheck,
  },
];

export default function AccountSettings() {
  return (
    <section className="rounded-3xl border border-gray-200 bg-white shadow-sm">
      <div className="border-b border-gray-100 p-6">
        <h2 className="text-2xl font-bold text-gray-900">
          Account Settings
        </h2>
      </div>

      <div className="grid gap-6 p-6 md:grid-cols-3">
        {settings.map((item) => {
          const Icon = item.icon;

          return (
            <button
              key={item.title}
              className="rounded-2xl border border-gray-200 p-6 text-left transition hover:border-red-300 hover:shadow-lg"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-50 text-red-600">
                <Icon size={22} />
              </div>

              <h3 className="mt-5 text-lg font-semibold">
                {item.title}
              </h3>

              <p className="mt-2 text-sm leading-6 text-gray-500">
                {item.description}
              </p>
            </button>
          );
        })}
      </div>
    </section>
  );
}