import { useLocation, useNavigate } from "react-router-dom";

export default function VerificationFailedPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const message =
    (location.state as { message?: string } | null)?.message ||
    "The verification details provided do not match any certificate in our records.";

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_#fff7f7_0%,_#f8fafc_55%,_#f1f5f9_100%)] flex items-center justify-center px-6 py-16">
      <div className="relative w-full max-w-3xl overflow-hidden rounded-[32px] border border-slate-200 bg-white/90 p-10 shadow-[0_24px_80px_rgba(15,23,42,0.08)] backdrop-blur-sm text-center sm:p-14">
        <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-r from-red-500/10 via-red-400/5 to-transparent"></div>

        <div className="relative mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-red-50 to-red-100 shadow-inner">
          <svg viewBox="0 0 24 24" className="h-10 w-10 text-red-500" fill="none" stroke="currentColor" strokeWidth="1.8">
            <path d="M11 4a7 7 0 1 0 0 14 7 7 0 0 0 0-14Z" />
            <path d="m16 16 4 4" />
          </svg>
        </div>

        <h1 className="relative mt-8 text-4xl font-semibold text-slate-800 sm:text-5xl">
          Certificate Not Found
        </h1>

        <p className="relative mx-auto mt-5 max-w-2xl text-lg leading-8 text-slate-500">
          {message}
        </p>

        <div className="relative mt-8 rounded-2xl border border-slate-100 bg-slate-50 px-5 py-4 text-sm text-slate-500">
          Please verify the ID carefully, or contact the issuer for a fresh verification ID if needed.
        </div>

        <div className="relative mt-10 flex flex-col justify-center gap-4 sm:flex-row">
          <button
            onClick={() => navigate("/")}
            className="rounded-2xl bg-red-600  px-8 py-4 font-semibold text-white shadow-lg shadow-red-200 transition hover:bg-red-700"
          >
            Go Home
          </button>

          <button
            onClick={() => navigate("/")}
            className="rounded-2xl border border-red-200 bg-red-50 px-8 py-4 font-semibold text-red-600 transition hover:bg-red-100"
          >
            Verify Another ID
          </button>
        </div>
      </div>
    </div>
  );
}