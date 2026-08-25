import React, { useState, useRef, useEffect } from "react";
import AuthLayout from "../../../layouts/AuthLayout";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { ArrowLeft, Loader2, AlertCircle, RefreshCw, KeyRound } from "lucide-react";
import { verifyPasswordResetOtp, resendPasswordResetOtp } from "../../../api/auth.api";

export default function OtpVerificationPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const emailFromState = (location.state as { email?: string })?.email || "";
  const [email] = useState<string>(emailFromState);

  const [otp, setOtp] = useState<string[]>(Array(6).fill(""));
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [timer, setTimer] = useState(60);

  useEffect(() => {
    if (!email) {
      navigate("/forgot-password");
    }
  }, [email, navigate]);

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [timer]);

  const handleChange = (index: number, value: string) => {
    if (isNaN(Number(value))) return;

    const newOtp = [...otp];
    newOtp[index] = value.substring(value.length - 1);
    setOtp(newOtp);
    setError("");

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").trim();
    if (/^\d{6}$/.test(pastedData)) {
      const digits = pastedData.split("");
      setOtp(digits);
      inputRefs.current[5]?.focus();
      setError("");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const fullOtp = otp.join("");

    if (fullOtp.length !== 6) {
      setError("Please enter the complete 6-digit verification code");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const response = await verifyPasswordResetOtp(email, fullOtp);

      if (response.success && response.resetToken) {
        navigate("/reset-password", {
          state: { email, resetToken: response.resetToken },
        });
      } else {
        setError(response.message || "Failed to verify code");
      }
    } catch (err: any) {
      setError(
        err.response?.data?.message ||
          err.message ||
          "Invalid code. Please check and try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    if (timer > 0 || resending) return;

    try {
      setResending(true);
      setError("");
      setSuccessMsg("");

      const response = await resendPasswordResetOtp(email);

      if (response.success) {
        setSuccessMsg("A new verification code has been sent to your email.");
        setTimer(60);
      } else {
        setError(response.message || "Failed to resend verification code");
      }
    } catch (err: any) {
      setError(
        err.response?.data?.message || err.message || "Failed to resend code"
      );
    } finally {
      setResending(false);
    }
  };

  return (
    <AuthLayout
      title="Verify Identity"
      subtitle="Enter the 6-digit verification code sent to your registered email address."
    >
      <div className="bg-white shadow-xl rounded-3xl p-6 sm:p-8 md:p-10 w-full max-w-md border border-slate-100">
        <Link
          to="/forgot-password"
          className="inline-flex items-center text-sm font-medium text-slate-500 hover:text-red-600 transition mb-6 group"
        >
          <ArrowLeft className="w-4 h-4 mr-1.5 transition-transform group-hover:-translate-x-1" />
          Change Email
        </Link>

        <div className="w-12 h-12 bg-red-50 text-red-600 rounded-2xl flex items-center justify-center mb-4">
          <KeyRound className="w-6 h-6" />
        </div>

        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">
          Verify OTP
        </h1>

        <p className="text-slate-500 mt-2 text-sm sm:text-base leading-relaxed">
          We sent a 6-digit code to{" "}
          <span className="font-semibold text-slate-800">{email || "your email"}</span>.
        </p>

        {error && (
          <div className="mt-6 p-3.5 bg-red-50 border border-red-200 rounded-2xl flex items-start gap-3 text-red-600 text-xs sm:text-sm">
            <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        {successMsg && (
          <div className="mt-6 p-3.5 bg-green-50 border border-green-200 rounded-2xl text-green-700 text-xs sm:text-sm">
            {successMsg}
          </div>
        )}

        <form onSubmit={handleSubmit} className="mt-8">
          <div className="grid grid-cols-6 gap-1.5 sm:gap-2">
            {otp.map((digit, index) => (
              <input
                key={index}
                type="text"
                maxLength={1}
                value={digit}
                ref={(el) => {
                  inputRefs.current[index] = el;
                }}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                onPaste={handlePaste}
                className="w-full h-11 sm:h-13 border border-slate-200 rounded-xl sm:rounded-2xl text-center text-lg sm:text-2xl font-bold text-slate-900 bg-slate-50 outline-none transition focus:bg-white focus:border-red-500 focus:ring-2 focus:ring-red-100 shadow-sm"
              />
            ))}
          </div>

          <button
            type="submit"
            disabled={loading || otp.join("").length !== 6}
            className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3.5 sm:py-4 rounded-2xl mt-8 transition flex items-center justify-center gap-2 shadow-lg shadow-red-500/20 disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer text-sm sm:text-base"
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Verifying...
              </>
            ) : (
              "Verify Code"
            )}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-xs sm:text-sm text-slate-500">
            Didn't receive the code?{" "}
            {timer > 0 ? (
              <span className="font-semibold text-slate-700">
                Resend in {timer}s
              </span>
            ) : (
              <button
                type="button"
                onClick={handleResend}
                disabled={resending}
                className="font-semibold text-red-600 hover:text-red-700 transition inline-flex items-center gap-1 cursor-pointer"
              >
                {resending && <RefreshCw className="w-3.5 h-3.5 animate-spin" />}
                Resend Code
              </button>
            )}
          </p>
        </div>
      </div>
    </AuthLayout>
  );
}