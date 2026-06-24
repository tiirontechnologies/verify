import { ShieldCheck, Lock, BadgeCheck } from "lucide-react";

export default function FeaturesSection() {
  return (
    <section className="py-20 md:py-28 bg-[#fafafa]">

      <div className="max-w-7xl mx-auto px-4 md:px-8">

        {/* Heading */}

        <div className="text-center max-w-3xl mx-auto">

          <p className="text-red-600 font-medium uppercase tracking-[0.3em]">
            Features
          </p>

          <h2 className="mt-4 text-3xl md:text-5xl font-bold text-slate-900">
            Why Verify with Tiiron?
          </h2>

          <p className="mt-6 text-gray-500 leading-8">
            Secure, trusted and tamper-proof credential verification
            designed for organizations and recruiters worldwide.
          </p>

        </div>

        {/* Cards */}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">

          {/* Card 1 */}

          <div className="bg-white rounded-3xl border p-8 md:p-10 shadow-sm hover:shadow-xl transition">

            <div className="w-16 h-16 rounded-2xl bg-red-50 flex items-center justify-center">

              <ShieldCheck className="text-red-600" size={32} />

            </div>

            <h3 className="mt-8 text-2xl font-bold text-slate-900">
              Authentic
            </h3>

            <p className="mt-5 text-gray-500 leading-8">
              Every credential is digitally signed by issuing authorities,
              ensuring authenticity and trust.
            </p>

          </div>

          {/* Card 2 */}

          <div className="bg-white rounded-3xl border p-8 md:p-10 shadow-sm hover:shadow-xl transition">

            <div className="w-16 h-16 rounded-2xl bg-blue-50 flex items-center justify-center">

              <Lock className="text-blue-600" size={32} />

            </div>

            <h3 className="mt-8 text-2xl font-bold text-slate-900">
              Tamper Proof
            </h3>

            <p className="mt-5 text-gray-500 leading-8">
              Unauthorized modifications invalidate credentials,
              preventing fraud and ensuring integrity.
            </p>

          </div>

          {/* Card 3 */}

          <div className="bg-white rounded-3xl border p-8 md:p-10 shadow-sm hover:shadow-xl transition">

            <div className="w-16 h-16 rounded-2xl bg-green-50 flex items-center justify-center">

              <BadgeCheck className="text-green-600" size={32} />

            </div>

            <h3 className="mt-8 text-2xl font-bold text-slate-900">
              Trusted
            </h3>

            <p className="mt-5 text-gray-500 leading-8">
              Recruiters and organizations rely on Tiiron as
              the source of truth for digital credentials.
            </p>

          </div>

        </div>

      </div>

    </section>
  );
}