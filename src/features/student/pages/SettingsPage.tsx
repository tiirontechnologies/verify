import { useEffect, useState } from "react";
import DashboardLayout from "../../../layouts/DashboardLayout";
import ChangePasswordControl from "../../../components/shared/ChangePasswordControl";
import { Bell, Check, Globe2, LockKeyhole, Moon, ShieldCheck, Sun } from "lucide-react";

const THEME_KEY = "verify-theme";
const NOTIFICATIONS_KEY = "verify-notifications";

export default function SettingsPage() {
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem(THEME_KEY) === "dark");
  const [notifications, setNotifications] = useState(() => localStorage.getItem(NOTIFICATIONS_KEY) !== "off");

  useEffect(() => {
    document.documentElement.classList.toggle("theme-dark", darkMode);
    localStorage.setItem(THEME_KEY, darkMode ? "dark" : "light");
  }, [darkMode]);

  useEffect(() => {
    localStorage.setItem(NOTIFICATIONS_KEY, notifications ? "on" : "off");
  }, [notifications]);

  return (
    <DashboardLayout>
      <div className="mx-auto max-w-5xl space-y-7 pb-10">
        <header className="overflow-hidden rounded-2xl bg-[#15191f] text-white">
          <div className="flex flex-col gap-6 p-6 sm:flex-row sm:items-end sm:justify-between sm:p-9">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.14em] text-red-300">Account control</p>
              <h1 className="mt-2 text-3xl font-bold sm:text-4xl">Settings</h1>
              <p className="mt-2 max-w-xl text-sm leading-6 text-slate-300">Manage the security and appearance of your verification workspace.</p>
            </div>
            <div className="flex items-center gap-2 self-start rounded-lg border border-white/15 bg-white/5 px-3 py-2 text-xs font-semibold text-slate-200 sm:self-auto">
              <ShieldCheck size={16} className="text-emerald-400" /> Verification portal
            </div>
          </div>
          <div className="h-1 bg-gradient-to-r from-red-500 via-orange-400 to-transparent" />
        </header>

        <section className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-100 px-5 py-4 sm:px-6">
            <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Preferences</p>
            <h2 className="mt-1 text-lg font-bold text-slate-900">Workspace experience</h2>
          </div>
          <div className="divide-y divide-slate-100">
            <div className="flex flex-col gap-4 px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-6">
              <div className="flex items-start gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-slate-700">{darkMode ? <Moon size={19} /> : <Sun size={19} />}</span>
                <div><h3 className="font-semibold text-slate-900">Appearance</h3><p className="mt-1 text-sm text-slate-500">Choose a bright workspace or a deep, low-glare theme.</p></div>
              </div>
              <div className="inline-flex w-fit rounded-lg border border-slate-200 bg-slate-50 p-1" role="group" aria-label="Appearance">
                <button type="button" onClick={() => setDarkMode(false)} aria-pressed={!darkMode} className={`inline-flex items-center gap-2 rounded-md px-3 py-2 text-sm font-semibold ${!darkMode ? "bg-white text-slate-900 shadow-sm" : "text-slate-500"}`}><Sun size={15} /> Light</button>
                <button type="button" onClick={() => setDarkMode(true)} aria-pressed={darkMode} className={`inline-flex items-center gap-2 rounded-md px-3 py-2 text-sm font-semibold ${darkMode ? "bg-slate-900 text-white shadow-sm" : "text-slate-500"}`}><Moon size={15} /> Dark</button>
              </div>
            </div>
            <div className="flex flex-col gap-4 px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-6">
              <div className="flex items-start gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-red-50 text-red-600"><Bell size={19} /></span>
                <div><h3 className="font-semibold text-slate-900">Notifications</h3><p className="mt-1 text-sm text-slate-500">Receive account and verification activity updates.</p></div>
              </div>
              <button type="button" role="switch" aria-checked={notifications} aria-label="Toggle notifications" onClick={() => setNotifications((value) => !value)} className={`relative inline-flex h-6 w-11 shrink-0 rounded-full transition ${notifications ? "bg-red-600" : "bg-slate-300"}`}><span className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition ${notifications ? "left-[22px]" : "left-0.5"}`} /></button>
            </div>
            <div className="flex flex-col gap-4 px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-6">
              <div className="flex items-start gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-emerald-50 text-emerald-700"><Globe2 size={19} /></span>
                <div><h3 className="font-semibold text-slate-900">Language</h3><p className="mt-1 text-sm text-slate-500">Portal language</p></div>
              </div>
              <div className="flex min-w-40 items-center justify-between gap-4 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm font-semibold text-slate-700"><span>English</span><Check size={16} className="text-emerald-600" /></div>
            </div>
          </div>
        </section>

        <section className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-100 px-5 py-4 sm:px-6">
            <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Security</p>
            <h2 className="mt-1 text-lg font-bold text-slate-900">Protect your account</h2>
          </div>
          <div className="flex flex-col gap-4 px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-6">
            <div className="flex items-start gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-amber-50 text-amber-700"><LockKeyhole size={19} /></span>
              <div><h3 className="font-semibold text-slate-900">Password</h3><p className="mt-1 text-sm text-slate-500">Update your password using your current credentials.</p></div>
            </div>
            <ChangePasswordControl />
          </div>
        </section>
      </div>
    </DashboardLayout>
  );
}