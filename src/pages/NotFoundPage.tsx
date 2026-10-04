import { useNavigate, Link } from "react-router-dom";
import { ArrowLeft, Home, Compass, ShieldCheck, LifeBuoy, FileText } from "lucide-react";
import Navbar from "../features/landing/components/Navbar";
import Footer from "../components/shared/Footer";

export default function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 overflow-hidden font-sans">
      <Navbar />

      <main className="flex-1 flex items-center justify-center p-4 sm:p-6 lg:p-12 relative">
        {/* Background Decorative Glow Circles */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-red-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-10 right-10 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 w-full max-w-3xl bg-white/90 backdrop-blur-xl rounded-3xl border border-slate-200 shadow-[0_20px_60px_rgba(15,23,42,0.08)] p-6 sm:p-10 lg:p-14 text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-50 border border-red-100 text-red-600 text-xs sm:text-sm font-semibold mb-6">
            <Compass size={16} className="animate-spin" style={{ animationDuration: "12s" }} />
            <span>404 Error • Page Not Found</span>
          </div>

          {/* Glowing 404 Text */}
          <div className="relative my-2 select-none">
            <h1 className="text-8xl sm:text-9xl lg:text-[140px] font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-red-600 via-red-500 to-amber-500 leading-none">
              404
            </h1>
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-10">
              <span className="text-9xl font-black text-red-900 blur-sm">404</span>
            </div>
          </div>

          {/* Main Headline */}
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-4">
            Oops! Looks Like You're Lost
          </h2>

          <p className="text-slate-500 text-sm sm:text-base max-w-lg mx-auto mt-3 leading-relaxed">
            The page you are looking for doesn't exist, has been moved, or the link you clicked might be broken.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mt-8">
            <button
              onClick={() => navigate(-1)}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-2xl border border-slate-200 bg-white text-slate-700 font-semibold text-sm hover:bg-slate-50 hover:border-slate-300 transition shadow-sm cursor-pointer group"
            >
              <ArrowLeft size={18} className="transition-transform group-hover:-translate-x-1" />
              Go Back
            </button>

            <Link
              to="/"
              className="inline-flex items-center justify-center gap-2 px-7 py-3 rounded-2xl bg-red-600 hover:bg-red-700 text-white font-semibold text-sm shadow-lg shadow-red-500/20 transition cursor-pointer"
            >
              <Home size={18} />
              Return Home
            </Link>
          </div>

          {/* Quick Links Footer Box */}
          <div className="mt-10 pt-8 border-t border-slate-100">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-4">
              Here are some helpful links instead:
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 max-w-xl mx-auto">
              <Link
                to="https://tiirontechnologies.com/products"
                className="flex items-center gap-2 p-3 rounded-xl bg-slate-50 hover:bg-red-50 hover:text-red-600 text-slate-700 text-xs font-semibold transition border border-slate-100"
              >
                <ShieldCheck size={16} className="text-red-500" />
                <span>Our Products </span>
              </Link>

              <Link
                to="https://tiirontechnologies.com/services"
                className="flex items-center gap-2 p-3 rounded-xl bg-slate-50 hover:bg-red-50 hover:text-red-600 text-slate-700 text-xs font-semibold transition border border-slate-100"
              >
                <FileText size={16} className="text-blue-500" />
                <span>Services Offered</span>
              </Link>

              <a
                href="https://tiirontechnologies.com/help"
                className="flex items-center gap-2 p-3 rounded-xl bg-slate-50 hover:bg-red-50 hover:text-red-600 text-slate-700 text-xs font-semibold transition border border-slate-100 col-span-2 sm:col-span-1"
              >
                <LifeBuoy size={16} className="text-amber-500" />
                <span>Help & Support</span>
              </a>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
