// import { useState } from "react";
// import { useNavigate, Link } from "react-router-dom";
// import {
//   Mail,
//   ArrowLeft,
//   Loader2,
//   AlertCircle,
// } from "lucide-react";

// import Navbar from "../../landing/components/Navbar";
// import Footer from "../../../components/shared/Footer";
// import AuthLayout from "../../../layouts/AuthLayout";
// import { requestPasswordReset } from "../../../api/auth.api";

// export default function ForgotPasswordPage() {
//   const navigate = useNavigate();

//   const [email, setEmail] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     if (!email) {
//       setError("Please enter your email address.");
//       return;
//     }

//     try {
//       setLoading(true);
//       setError("");

//       await requestPasswordReset(email);

//       navigate("/verify-otp", {
//         state: { email },
//       });
//     } catch (err: any) {
//       setError(
//         err?.response?.data?.message ||
//           "Failed to send verification code."
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex flex-col bg-slate-50">
//       <Navbar />

//       <main className="flex-1 flex items-center justify-center py-6 sm:py-10">
//         <AuthLayout
//           title="Reset Your Password"
//           subtitle="Follow the simple steps to securely recover access to your Tiiron account."
//         >
//           <div className="w-full">
//             <Link
//               to="/login"
//               className="inline-flex items-center text-sm font-medium text-slate-500 hover:text-red-600 transition mb-6 group"
//             >
//               <ArrowLeft className="w-4 h-4 mr-1.5 transition-transform group-hover:-translate-x-1" />
//               Back to Login
//             </Link>

//             <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">
//               Forgot Password?
//             </h1>

//             <p className="text-slate-500 mt-2 text-sm sm:text-base leading-relaxed">
//               Enter your registered email address and we'll send you a 6-digit
//               verification code.
//             </p>

//             {error && (
//               <div className="mt-6 p-3.5 bg-red-50 border border-red-200 rounded-2xl flex items-start gap-3 text-red-600 text-xs sm:text-sm">
//                 <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
//                 <span>{error}</span>
//               </div>
//             )}

//             <form onSubmit={handleSubmit} className="mt-6">
//               <div>
//                 <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-2">
//                   Email Address
//                 </label>

//                 <div className="relative">
//                   <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
//                     <Mail className="w-5 h-5" />
//                   </div>

//                   <input
//                     type="email"
//                     value={email}
//                     onChange={(e) => {
//                       setEmail(e.target.value);
//                       if (error) setError("");
//                     }}
//                     placeholder="name@example.com"
//                     disabled={loading}
//                     className="w-full bg-slate-50 border border-slate-200 rounded-2xl pl-11 pr-4 py-3.5 text-sm sm:text-base outline-none transition focus:bg-white focus:border-red-500 focus:ring-2 focus:ring-red-100"
//                   />
//                 </div>
//               </div>

//               <button
//                 type="submit"
//                 disabled={loading}
//                 className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3.5 sm:py-4 rounded-2xl mt-8 transition flex items-center justify-center gap-2 shadow-lg shadow-red-500/20 disabled:opacity-60"
//               >
//                 {loading ? (
//                   <>
//                     <Loader2 className="w-5 h-5 animate-spin" />
//                     Sending Code...
//                   </>
//                 ) : (
//                   "Send Verification Code"
//                 )}
//               </button>
//             </form>
//           </div>
//         </AuthLayout>
//       </main>

//       <Footer />
//     </div>
//   );
// }

import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  Mail,
  ArrowLeft,
  Loader2,
  AlertCircle,
} from "lucide-react";

import Navbar from "../../landing/components/Navbar";
import Footer from "../../../components/shared/Footer";
import AuthLayout from "../../../layouts/AuthLayout";
import { requestPasswordReset } from "../../../api/auth.api";

export default function ForgotPasswordPage() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) {
      setError("Please enter your email address.");
      return;
    }

    try {
      setLoading(true);
      setError("");

      await requestPasswordReset(email);

      navigate("/verify-otp", {
        state: { email },
      });
    } catch (err: any) {
      setError(
        err?.response?.data?.message ||
          "Failed to send verification code."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar />

      <main className="flex-1 flex items-center justify-center py-6 sm:py-10">
        <AuthLayout
          title="Reset Your Password"
          subtitle="Follow the simple steps to securely recover access to your Tiiron account."
        >
          <div className="w-full">
            <Link
              to="/login"
              className="inline-flex items-center text-sm font-medium text-slate-500 hover:text-red-600 transition mb-6 group"
            >
              <ArrowLeft className="w-4 h-4 mr-1.5 transition-transform group-hover:-translate-x-1" />
              Back to Login
            </Link>

            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">
              Forgot Password?
            </h1>

            <p className="text-slate-500 mt-2 text-sm sm:text-base leading-relaxed">
              Enter your registered email address and we'll send you a 6-digit
              verification code.
            </p>

            {error && (
              <div className="mt-6 p-3.5 bg-red-50 border border-red-200 rounded-2xl flex items-start gap-3 text-red-600 text-xs sm:text-sm">
                <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="mt-6">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-2">
                  Email Address
                </label>

                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                    <Mail className="w-5 h-5" />
                  </div>

                  <input
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (error) setError("");
                    }}
                    placeholder="name@example.com"
                    disabled={loading}
                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl pl-11 pr-4 py-3.5 text-sm sm:text-base outline-none transition focus:bg-white focus:border-red-500 focus:ring-2 focus:ring-red-100"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3.5 sm:py-4 rounded-2xl mt-8 transition flex items-center justify-center gap-2 shadow-lg shadow-red-500/20 disabled:opacity-60"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Sending Code...
                  </>
                ) : (
                  "Send Verification Code"
                )}
              </button>
            </form>
          </div>
        </AuthLayout>
      </main>

      <Footer />
    </div>
  );
}