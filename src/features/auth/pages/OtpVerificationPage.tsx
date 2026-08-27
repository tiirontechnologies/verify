import AuthLayout from "../../../layouts/AuthLayout";
<<<<<<< Updated upstream
import { useNavigate } from "react-router-dom";
=======
import Navbar from "../../landing/components/Navbar";
import Footer from "../../../components/shared/Footer";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { ArrowLeft, Loader2, AlertCircle, RefreshCw, KeyRound } from "lucide-react";
import { verifyPasswordResetOtp, resendPasswordResetOtp } from "../../../api/auth.api";

>>>>>>> Stashed changes
export default function OtpVerificationPage() {
    const navigate = useNavigate();
  return (
<<<<<<< Updated upstream
    <AuthLayout>

      <div className="bg-white shadow-xl rounded-3xl p-8 md:p-10 w-full max-w-md">

        <h1 className="text-4xl font-bold">
          Verify OTP
        </h1>

        <p className="text-gray-500 mt-3">
          Enter the 6-digit code sent to your email.
        </p>

        <input
          className="w-full border rounded-2xl px-4 py-4 mt-8 text-center text-xl md:text-2xl tracking-[6px] md:tracking-[10px]"
          placeholder="000000"
        />

       <button
  onClick={() => navigate("/reset-password")}
  className="w-full bg-red-600 text-white py-4 rounded-2xl mt-8 hover:bg-red-700"
>
  Verify Code
</button>

      </div>

    </AuthLayout>
=======
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
      </main>

      <Footer />
    </div>
>>>>>>> Stashed changes
  );
}