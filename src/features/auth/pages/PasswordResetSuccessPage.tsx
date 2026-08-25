import AuthLayout from "../../../layouts/AuthLayout";
import { CheckCircle2, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function PasswordResetSuccessPage() {
  const navigate = useNavigate();

  return (
    <AuthLayout
      title="All Done!"
      subtitle="Your password has been reset. You can now log into your account."
    >
      <div className="bg-white shadow-xl rounded-3xl p-8 md:p-10 w-full max-w-md text-center border border-slate-100">
        <div className="w-20 h-20 bg-green-50 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner">
          <CheckCircle2 size={48} className="stroke-[2.5]" />
        </div>

        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">
          Password Updated!
        </h1>

        <p className="text-slate-500 mt-3 text-sm sm:text-base leading-relaxed">
          Your password has been reset successfully. You can now log in to your account with your new credentials.
        </p>

        <button
          onClick={() => navigate("/login")}
          className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3.5 sm:py-4 rounded-2xl mt-8 transition flex items-center justify-center gap-2 shadow-lg shadow-red-500/20 cursor-pointer text-sm sm:text-base group"
        >
          <span>Back to Login</span>
          <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
        </button>
      </div>
    </AuthLayout>
  );
}