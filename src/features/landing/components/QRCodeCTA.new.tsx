import { QrCode } from "lucide-react";
import qrImage from "../../../assets/qrcode_inacademic.com.png";

export default function QRCodeCTA() {
  return (
    <section className="py-20 px-4 md:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="relative overflow-hidden rounded-[40px] bg-gradient-to-r from-slate-950 via-[#111827] to-[#0f172a] px-6 py-10 shadow-2xl sm:px-10 sm:py-14">
          <div className="pointer-events-none absolute -top-10 -right-10 h-56 w-56 rounded-full bg-red-600/20 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-12 left-8 h-44 w-44 rounded-full bg-blue-500/10 blur-3xl" />

          <div className="relative z-10 grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div className="flex items-start gap-6">
              <div className="flex h-28 w-28 items-center justify-center rounded-3xl bg-white/10 ring-1 ring-white/10">
                <img src={qrImage} alt="QR Code" className="h-20 w-20 object-contain" />
              </div>

              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.24em] text-red-300">
                  QR Verification
                </p>
                <h2 className="mt-4 text-3xl font-bold text-white sm:text-4xl">
                  Scan to verify credentials instantly.
                </h2>
                <p className="mt-4 max-w-xl text-slate-300 leading-8">
                  Use the QR code on issued certificates to confirm authenticity, view credential details, and generate verification reports in seconds.
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-5 rounded-[32px] border border-white/10 bg-white/5 p-6 backdrop-blur-xl sm:p-8">
              <div className="flex items-center gap-4 rounded-3xl bg-slate-900/70 px-4 py-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 text-white">
                  <QrCode size={20} />
                </div>
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-300">
                    Quick access
                  </p>
                  <p className="mt-1 text-base font-semibold text-white">Instant verification from a certificate QR code.</p>
                </div>
              </div>

              <div className="space-y-4">
                {[
                  "Trust the original issuer without manual checks.",
                  "View credential status and details securely.",
                  "Share verified results with organizations instantly.",
                ].map((text) => (
                  <div key={text} className="flex items-start gap-3 text-slate-300">
                    <span className="mt-1 inline-flex h-2.5 w-2.5 rounded-full bg-red-500" />
                    <p className="text-sm leading-6">{text}</p>
                  </div>
                ))}
              </div>

              <button className="inline-flex w-full items-center justify-center gap-3 rounded-2xl bg-white px-6 py-4 text-base font-semibold text-red-600 transition hover:bg-slate-100">
                <QrCode size={20} />
                Scan QR Code
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
