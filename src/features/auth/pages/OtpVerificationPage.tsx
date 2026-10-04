import { useState, useRef, useEffect } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import {
  ArrowLeft,
  Loader2,
  AlertCircle,
  RefreshCw,
  KeyRound,
} from "lucide-react";

import Navbar from "../../landing/components/Navbar";
import Footer from "../../../components/shared/Footer";
import AuthLayout from "../../../layouts/AuthLayout";
import {
  verifyPasswordResetOtp,
  resendPasswordResetOtp,
} from "../../../api/auth.api";

export default function OtpVerificationPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const email = location.state?.email || "";
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [timer, setTimer] = useState(60);

  useEffect(() => {
    if (timer <= 0) return;
    const interval = setInterval(() => setTimer((p) => p - 1), 1000);
    return () => clearInterval(interval);
  }, [timer]);

  const handleChange = (index: number, value: string) => {
    if (!/^\d?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").trim().slice(0, 6);

    if (!/^\d+$/.test(pasted)) return;

    const digits = pasted.split("");
    const newOtp = [...otp];

    digits.forEach((d, i) => {
      if (i < 6) newOtp[i] = d;
    });

    setOtp(newOtp);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const code = otp.join("");

    if (code.length !== 6) {
      setError("Please enter the 6-digit OTP.");
      return;
    }

    try {
      setLoading(true);
      setError("");
await verifyPasswordResetOtp(email, code);

      navigate("/reset-password", {
        state: { email, token: code },
      });
    } catch (err: any) {
      setError(err?.response?.data?.message || "Invalid OTP.");
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    try {
      setResending(true);
      setError("");

      await resendPasswordResetOtp(email );

      setSuccessMsg("A new OTP has been sent to your email.");
      setTimer(60);
    } catch (err: any) {
      setError(err?.response?.data?.message || "Failed to resend OTP.");
    } finally {
      setResending(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar />

      <main className="flex-1 flex items-center justify-center py-6 sm:py-10">
        <AuthLayout
          title="Verify Identity"
          subtitle="Enter the 6-digit verification code sent to your registered email address."
        >
          <div className="w-full">
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
              <span className="font-semibold text-slate-800">
                {email || "your email"}
              </span>
              .
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
              <div className="grid grid-cols-6 gap-2">
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    ref={(el) => {
                      inputRefs.current[index] = el;
                    }}
                    type="text"
                    maxLength={1}
                    value={digit}
                    onChange={(e) =>
                      handleChange(index, e.target.value)
                    }
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    onPaste={handlePaste}
                    className="w-full h-12 border border-slate-200 rounded-xl text-center text-xl font-bold bg-slate-50 focus:bg-white focus:border-red-500 focus:ring-2 focus:ring-red-100 outline-none"
                  />
                ))}
              </div>

              <button
                type="submit"
                disabled={loading || otp.join("").length !== 6}
                className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3.5 rounded-2xl mt-8 flex items-center justify-center gap-2 disabled:opacity-60"
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
              <p className="text-sm text-slate-500">
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
                    className="font-semibold text-red-600 hover:text-red-700 inline-flex items-center gap-1"
                  >
                    {resending && (
                      <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                    )}
                    Resend Code
                  </button>
                )}
              </p>
            </div>
          </div>
        </AuthLayout>
      </main>

      <Footer />
    </div>
  );
}