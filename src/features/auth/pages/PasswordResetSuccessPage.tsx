import AuthLayout from "../../../layouts/AuthLayout";
<<<<<<< Updated upstream
import { CircleCheckBig } from "lucide-react";
=======
import Navbar from "../../landing/components/Navbar";
import Footer from "../../../components/shared/Footer";
import { CheckCircle2, ArrowRight } from "lucide-react";
>>>>>>> Stashed changes
import { useNavigate } from "react-router-dom";

export default function PasswordResetSuccessPage() {
    const navigate = useNavigate();
  return (
<<<<<<< Updated upstream
    <AuthLayout>

      <div className="bg-white shadow-xl rounded-3xl p-10 w-full max-w-md text-center">

        <CircleCheckBig
          className="mx-auto text-green-500"
          size={80}
        />

        <h1 className="text-4xl font-bold mt-8">
          Password Updated
        </h1>

        <p className="text-gray-500 mt-4 leading-7">
          Your password has been reset successfully.
        </p>

      <button
  onClick={() => navigate("/login")}
  className="w-full bg-red-600 text-white py-4 rounded-2xl mt-8"
>
  Back To Login
</button>

      </div>

    </AuthLayout>
=======
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar />

      <main className="flex-1 flex items-center justify-center py-6 sm:py-10">
        <AuthLayout
          title="All Done!"
          subtitle="Your password has been reset. You can now log into your account."
        >
          <div className="w-full text-center">
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
      </main>

      <Footer />
    </div>
>>>>>>> Stashed changes
  );
}