
import { useNavigate } from "react-router-dom";

export default function CTASection() {
  const navigate= useNavigate();
  
  return (
    <section className="py-14 bg-[#f8fafc]">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="relative overflow-hidden rounded-[40px] bg-white px-6 py-10 shadow-sm sm:px-12 sm:py-16">
          <div className="pointer-events-none absolute -top-20 -right-20 h-60 w-60 rounded-full bg-red-100 blur-4xl" />
          <div className="pointer-events-none absolute -bottom-20 left-0 lg:h-43 lg:w-43 rounded-full bg-blue-100 blur-4xl" style={{ marginLeft: "-50px" }} />

          <div className="relative z-10 grid gap-10 lg:grid-cols-[1.45fr_0.9fr] lg:items-center">
            <div>
              <span className="inline-flex rounded-full bg-red-50 px-4 py-2 text-sm font-semibold uppercase tracking-[0.22em] text-red-600">
                Enterprise Ready
              </span>

              <h2 className="mt-8 text-4xl font-bold tracking-[-0.04em] text-slate-900 sm:text-5xl lg:text-6xl">
                Transform credential verification with premium security.
              </h2>

              <p className="mt-6 max-w-xl text-lg leading-8 text-slate-600 sm:text-xl">
                Issue, verify, and manage credentials with confidence using a secure platform built for institutions, recruiters, and compliance-driven teams.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
              <button onClick={()=>navigate('/signup')} className="inline-flex w-full items-center justify-center rounded-2xl bg-red-600 px-8 py-4 text-base font-semibold text-white transition hover:bg-red-700">
                Get Started
              </button>
              <button 
              onClick={()=>navigate("/book-demo")}
              className="inline-flex w-full items-center justify-center rounded-2xl border border-slate-300 bg-slate-50 px-8 py-4 text-base font-semibold text-slate-900 transition hover:border-slate-400 hover:bg-slate-100">
                Schedule Demo
              </button>
            </div>
          </div>

          <div className="mt-12 grid gap-4 sm:grid-cols-3">
            {[
              { label: "Enterprise-grade", value: "Built for scale" },
              { label: "Trusted", value: "By global teams" },
              { label: "Instant", value: "Secure verification" },
            ].map((item) => (
              <div key={item.label} className="rounded-[28px] border border-slate-200 bg-slate-50 p-5 text-slate-900 shadow-sm">
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">
                  {item.label}
                </p>
                <p className="mt-3 text-lg font-semibold text-slate-900">{item.value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
