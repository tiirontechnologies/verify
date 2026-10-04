import { useState, type FormEvent } from "react";
import { KeyRound, Loader2, X } from "lucide-react";
import { changePassword } from "../../api/auth.api";

export default function ChangePasswordControl() {
  const [open, setOpen] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const close = () => {
    if (loading) return;
    setOpen(false);
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
    setMessage(null);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setMessage(null);
    if (newPassword.length < 8) {
      setMessage({ type: "error", text: "New password must be at least 8 characters." });
      return;
    }
    if (newPassword !== confirmPassword) {
      setMessage({ type: "error", text: "New password and confirmation do not match." });
      return;
    }

    try {
      setLoading(true);
      const response = await changePassword(currentPassword, newPassword);
      setMessage({
        type: "success",
        text: response?.message || "Password updated successfully.",
      });
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (error: any) {
      setMessage({
        type: "error",
        text: error?.response?.data?.message || "Unable to update password.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={() => {
          setMessage(null);
          setOpen(true);
        }}
        className="inline-flex items-center gap-2 rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-red-400 hover:text-red-700"
      >
        <KeyRound size={16} /> Change password
      </button>

      {open && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/55 p-4 backdrop-blur-sm"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) close();
          }}
        >
          <section
            role="dialog"
            aria-modal="true"
            aria-labelledby="change-password-title"
            className="relative w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl sm:p-8"
          >
            <button
              type="button"
              onClick={close}
              aria-label="Close change password dialog"
              className="absolute right-4 top-4 rounded-full p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
            >
              <X size={18} />
            </button>
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-red-50 text-red-700">
              <KeyRound size={20} />
            </div>
            <h2 id="change-password-title" className="mt-4 text-xl font-bold text-slate-900">
              Change password
            </h2>
            <p className="mt-1 text-sm text-slate-500">Confirm your current password to set a new one.</p>

            <form onSubmit={handleSubmit} className="mt-5 space-y-4">
              <label className="block text-xs font-semibold text-slate-700">
                Current password
                <input
                  autoComplete="current-password"
                  type="password"
                  required
                  value={currentPassword}
                  onChange={(event) => setCurrentPassword(event.target.value)}
                  className="mt-1.5 w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none focus:border-red-500 focus:ring-2 focus:ring-red-100"
                />
              </label>
              <label className="block text-xs font-semibold text-slate-700">
                New password
                <input
                  autoComplete="new-password"
                  type="password"
                  required
                  minLength={8}
                  value={newPassword}
                  onChange={(event) => setNewPassword(event.target.value)}
                  className="mt-1.5 w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none focus:border-red-500 focus:ring-2 focus:ring-red-100"
                />
              </label>
              <label className="block text-xs font-semibold text-slate-700">
                Confirm new password
                <input
                  autoComplete="new-password"
                  type="password"
                  required
                  value={confirmPassword}
                  onChange={(event) => setConfirmPassword(event.target.value)}
                  className="mt-1.5 w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none focus:border-red-500 focus:ring-2 focus:ring-red-100"
                />
              </label>
              {message && (
                <p role="status" className={`text-xs font-medium ${message.type === "success" ? "text-green-700" : "text-red-600"}`}>
                  {message.text}
                </p>
              )}
              <button
                type="submit"
                disabled={loading}
                className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-red-600 px-4 py-3 text-sm font-semibold text-white hover:bg-red-700 disabled:cursor-wait disabled:opacity-60"
              >
                {loading ? <Loader2 size={16} className="animate-spin" /> : <KeyRound size={16} />}
                {loading ? "Updating..." : "Update password"}
              </button>
            </form>
          </section>
        </div>
      )}
    </>
  );
}