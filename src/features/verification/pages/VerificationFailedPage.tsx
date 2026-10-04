import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Search } from "lucide-react";

export default function VerificationFailedPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [verificationId, setVerificationId] = useState("");
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
          Certificate Not Found. 
        </h1>

        <p className="relative mx-auto mt-5 max-w-2xl text-lg leading-8 text-slate-500">
          {message}
        </p>

        <div className="relative mt-8 rounded-2xl border border-slate-100 bg-slate-50 px-5 py-4 text-sm text-slate-500">
          Please verify the ID carefully, or contact the issuer for a fresh verification ID if needed.
        </div>

        <form
          className="relative mx-auto mt-8 flex w-full max-w-xl flex-col gap-3 sm:flex-row"
          onSubmit={(event) => {
            event.preventDefault();
            const id = verificationId.trim();
            if (id) navigate(`/verification/${encodeURIComponent(id)}`);
          }}
        >
          <label className="flex min-w-0 flex-1 items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3 text-left">
            <Search size={18} className="shrink-0 text-slate-400" />
            <input
              value={verificationId}
              onChange={(event) => setVerificationId(event.target.value)}
              placeholder="Enter another verification ID"
              aria-label="Another verification ID"
              className="min-w-0 flex-1 bg-transparent text-sm text-slate-900 outline-none placeholder:text-slate-400"
            />
          </label>
          <button
            type="submit"
            disabled={!verificationId.trim()}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-red-600 px-6 py-3 font-semibold text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <Search size={17} /> Verify ID
          </button>
        </form>

        <div className="relative mt-5 flex justify-center">
          <button
            onClick={() => navigate("/")}
            className="rounded-xl border border-slate-200 bg-white px-6 py-3 font-semibold text-slate-700 transition hover:bg-slate-50"
          >
            Go Home
          </button>
        </div>
      </div>
    </div>
  );
}