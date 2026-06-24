export default function CTASection() {
  return (
    <section className="py-32 bg-[#fafafa]">

      <div className="max-w-7xl mx-auto px-8">

        <div className="relative overflow-hidden rounded-[40px] bg-gradient-to-br from-black via-zinc-900 to-zinc-800 p-20">

          {/* Blur Circle */}
          <div className="absolute -top-20 -right-20 h-80 w-80 rounded-full bg-red-600/20 blur-3xl"></div>

          <div className="relative z-10">

            <div className="max-w-3xl">

              <span className="bg-white/10 text-red-400 px-4 py-2 rounded-full text-sm">
                ENTERPRISE READY
              </span>

              <h2 className="mt-8 text-6xl font-bold text-white leading-tight">
                Ready to Transform
                <br />
                Credential Verification?
              </h2>

              <p className="mt-8 text-zinc-400 text-xl leading-9">
                Securely issue, manage and verify credentials
                with enterprise-grade infrastructure trusted by
                organizations worldwide.
              </p>

            </div>

            <div className="flex gap-5 mt-12">

              <button className="bg-red-600 hover:bg-red-700 transition px-8 py-4 rounded-2xl text-white font-semibold">
                Get Started
              </button>

              <button className="border border-zinc-700 text-white px-8 py-4 rounded-2xl hover:bg-zinc-900 transition">
                Schedule Demo
              </button>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
}