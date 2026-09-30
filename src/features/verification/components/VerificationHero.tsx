import { BadgeCheck } from "lucide-react";

type Props = {
  verificationId: string;
};

/* Saari animations page load pe ek baar chalti hain. Config me kuch add nahi karna. */
const styles = `
@keyframes vh-rise {
  from { opacity: 0; transform: translateY(10px); }
  to   { opacity: 1; transform: translateY(0); }
}
@keyframes vh-pop {
  0%   { opacity: 0; transform: scale(0.6); }
  70%  { opacity: 1; transform: scale(1.08); }
  100% { opacity: 1; transform: scale(1); }
}
@keyframes vh-draw {
  to { stroke-dashoffset: 0; }
}
@keyframes vh-ring {
  0%   { opacity: 0.5; transform: scale(1); }
  100% { opacity: 0; transform: scale(1.6); }
}
@keyframes vh-sweep {
  from { transform: translateX(-120%) skewX(-18deg); }
  to   { transform: translateX(420%) skewX(-18deg); }
}

.vh-rise   { opacity: 0; animation: vh-rise 0.55s ease-out forwards; }
.vh-pop    { opacity: 0; animation: vh-pop 0.5s cubic-bezier(.2,.8,.3,1) 0.1s forwards; }
.vh-ring   { animation: vh-ring 1.1s ease-out 0.6s 1 both; }
.vh-shield { stroke-dasharray: 80; stroke-dashoffset: 80; animation: vh-draw 0.65s ease-out 0.4s forwards; }
.vh-check  { stroke-dasharray: 12; stroke-dashoffset: 12; animation: vh-draw 0.3s ease-out 0.95s forwards; }
.vh-sweep  { animation: vh-sweep 1.3s ease-in-out 1.1s 1 both; }

@media (prefers-reduced-motion: reduce) {
  .vh-rise, .vh-pop { animation: none; opacity: 1; }
  .vh-ring, .vh-sweep { animation: none; opacity: 0; }
  .vh-shield, .vh-check { animation: none; stroke-dashoffset: 0; }
}
`;

export default function VerificationHero({ verificationId }: Props) {
  return (
    <section className="vh-rise relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#4A1B24] via-[#8E1C22] to-[#401720] shadow-xl ring-1 ring-white/10">
      <style>{styles}</style>

      {/* top highlight line */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent" />

      {/* one-time shine sweep */}
      <span className="vh-sweep pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="relative flex flex-col items-center gap-5 px-5 py-5 sm:px-7 sm:py-6 lg:flex-row lg:justify-between lg:px-8">
        {/* Left */}
        <div className="flex flex-col items-center gap-4 text-center sm:flex-row sm:gap-5 sm:text-left">
          {/* Shield */}
          <div className="relative h-16 w-16 shrink-0 sm:h-[72px] sm:w-[72px]">
            <span className="vh-ring absolute inset-0 rounded-full border border-white/40" />
            <div className="vh-pop flex h-full w-full items-center justify-center rounded-full border border-white/20 bg-white/10 backdrop-blur">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-white shadow-lg sm:h-12 sm:w-12">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#16a34a"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-6 w-6 sm:h-7 sm:w-7"
                  aria-hidden="true"
                >
                  <path
                    className="vh-shield"
                    d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"
                  />
                  <path className="vh-check" d="m9 12 2 2 4-4" />
                </svg>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="vh-rise" style={{ animationDelay: "0.3s" }}>
            <h1 className="text-xl font-bold text-white sm:text-2xl lg:text-3xl">
              Credential Verified
            </h1>
            <p className="mt-1.5 max-w-md text-sm leading-6 text-white/75">
              Successfully verified against Tiiron Technologies' official
              records.
            </p>
            <span className="mt-3 inline-flex items-center gap-1.5 rounded-full border border-green-300/30 bg-green-400/10 px-3 py-1 text-xs font-semibold text-green-200">
              <BadgeCheck size={14} />
              100% Authentic
            </span>
          </div>
        </div>

        {/* Verification ID */}
        <div
          className="vh-rise w-full max-w-sm rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-center backdrop-blur-xl sm:text-left lg:w-auto lg:min-w-[280px]"
          style={{ animationDelay: "0.5s" }}
        >
          <p className="text-xs font-medium text-red-200">Verification ID</p>
          <p className="mt-1 break-all font-mono text-sm font-semibold tracking-wide text-white sm:text-base">
            {verificationId}
          </p>
        </div>
      </div>
    </section>
  );
}