import React, { useState, useEffect } from "react";
import AuthLayout from "../../../layouts/AuthLayout";
import { useNavigate, useLocation } from "react-router-dom";
import { Lock, Eye, EyeOff, Loader2, AlertCircle, CheckCircle2, ShieldCheck } from "lucide-react";
import { resetPassword } from "../../../api/auth.api";

export default function ResetPasswordPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const stateData = location.state as { email?: string; resetToken?: string } | null;
  const email = stateData?.email || "";
  const resetToken = stateData?.resetToken || "";

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!email || !resetToken) {
      navigate("/forgot-password");
    }
  }, [email, resetToken, navigate]);

  const hasMinLength = newPassword.length >= 8;
  const hasLetter = /[a-zA-Z]/.test(newPassword);
  const hasNumber = /[0-9]/.test(newPassword);
  const isMatch = newPassword.length > 0 && newPassword === confirmPassword;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!hasMinLength || !hasLetter || !hasNumber) {
      setError("Please ensure your password meets all requirements.");
      return;
    }

    if (!isMatch) {
      setError("Passwords do not match.");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const response = await resetPassword(email, resetToken, newPassword);

      if (response.success) {
        navigate("/password-reset-success");
      } else {
        setError(response.message || "Failed to reset password.");
      }
    } catch (err: any) {
      setError(
        err.response?.data?.message ||
          err.message ||
          "Failed to reset password. Please try requesting a new verification code."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Create New Password"
      subtitle="Choose a strong password to secure your Tiiron account."
    >
      <div className="bg-white shadow-xl rounded-3xl p-6 sm:p-8 md:p-10 w-full max-w-md border border-slate-100">
        <div className="w-12 h-12 bg-red-50 text-red-600 rounded-2xl flex items-center justify-center mb-4">
          <ShieldCheck className="w-6 h-6" />
        </div>

        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">
          Reset Password
        </h1>

        <p className="text-slate-500 mt-2 text-sm sm:text-base leading-relaxed">
          Create a new, strong password for <span className="font-semibold text-slate-800">{email}</span>.
        </p>

        {error && (
          <div className="mt-6 p-3.5 bg-red-50 border border-red-200 rounded-2xl flex items-start gap-3 text-red-600 text-xs sm:text-sm">
            <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="mt-6 space-y-5">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-2">
              New Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                <Lock className="w-5 h-5" />
              </div>
              <input
                type={showNewPassword ? "text" : "password"}
                value={newPassword}
                onChange={(e) => {
                  setNewPassword(e.target.value);
                  if (error) setError("");
                }}
                placeholder="Enter new password"
                className="w-full bg-slate-50 border border-slate-200 rounded-2xl pl-11 pr-12 py-3.5 text-sm sm:text-base text-slate-900 outline-none transition focus:bg-white focus:border-red-500 focus:ring-2 focus:ring-red-100"
                disabled={loading}
              />
              <button
                type="button"
                onClick={() => setShowNewPassword(!showNewPassword)}
                className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-slate-600 transition cursor-pointer"
              >
                {showNewPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-2">
              Confirm New Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                <Lock className="w-5 h-5" />
              </div>
              <input
                type={showConfirmPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                  if (error) setError("");
                }}
                placeholder="Re-enter new password"
                className="w-full bg-slate-50 border border-slate-200 rounded-2xl pl-11 pr-12 py-3.5 text-sm sm:text-base text-slate-900 outline-none transition focus:bg-white focus:border-red-500 focus:ring-2 focus:ring-red-100"
                disabled={loading}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-slate-600 transition cursor-pointer"
              >
                {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Requirements list */}
          <div className="p-4 bg-slate-50 rounded-2xl space-y-2 text-xs text-slate-600 border border-slate-100">
            <div className="font-semibold text-slate-700 mb-1">Password Requirements:</div>
            <div className={`flex items-center gap-2 ${hasMinLength ? "text-green-600 font-medium" : "text-slate-500"}`}>
              <CheckCircle2 className={`w-4 h-4 ${hasMinLength ? "text-green-600" : "text-slate-300"}`} />
              At least 8 characters
            </div>
            <div className={`flex items-center gap-2 ${hasLetter && hasNumber ? "text-green-600 font-medium" : "text-slate-500"}`}>
              <CheckCircle2 className={`w-4 h-4 ${hasLetter && hasNumber ? "text-green-600" : "text-slate-300"}`} />
              Contains letters and numbers
            </div>
            <div className={`flex items-center gap-2 ${isMatch ? "text-green-600 font-medium" : "text-slate-500"}`}>
              <CheckCircle2 className={`w-4 h-4 ${isMatch ? "text-green-600" : "text-slate-300"}`} />
              Passwords match
            </div>
          </div>

          <button
            type="submit"
            disabled={loading || !hasMinLength || !hasLetter || !hasNumber || !isMatch}
            className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3.5 sm:py-4 rounded-2xl mt-6 transition flex items-center justify-center gap-2 shadow-lg shadow-red-500/20 disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer text-sm sm:text-base"
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Resetting Password...
              </>
            ) : (
              "Reset Password"
            )}
          </button>
        </form>
      </div>
    </AuthLayout>
  );
}