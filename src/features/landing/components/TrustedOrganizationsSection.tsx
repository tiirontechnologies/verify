export default function TrustedOrganizationsSection() {
  const companies = [
    "Google",
    "Microsoft",
    "Amazon",
    "Infosys",
    "TCS",
    "Accenture",
    "Wipro",
    "Deloitte",
  ];

  return (
    <section className="py-20 md:py-32 bg-white">

      <div className="max-w-7xl mx-auto px-4 md:px-8">

        {/* Heading */}

        <div className="max-w-3xl mx-auto text-center">

          <p className="uppercase tracking-[0.3em] text-red-600 text-sm font-medium">
            TRUSTED WORLDWIDE
          </p>

          <h2 className="mt-4 text-3xl md:text-5xl font-bold text-slate-900">
            Trusted By Leading Organizations
          </h2>

          <p className="mt-6 text-gray-500 leading-8">
            Thousands of companies and institutions rely on Tiiron
            to securely issue and verify credentials.
          </p>

        </div>

        {/* Logos */}

        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-6">

          {companies.map((company) => (
            <div
              key={company}
              className="
                bg-slate-50
                border
                rounded-3xl
                h-28
                flex
                items-center
                justify-center
                text-lg
                font-semibold
                text-slate-700
                hover:shadow-xl
                hover:-translate-y-1
                transition
              "
            >
              {company}
            </div>
          ))}

        </div>

        {/* Bottom stats */}

        <div className="mt-20 bg-slate-900 rounded-[40px] p-8 md:p-14">

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-center">

            <div>

              <h2 className="text-4xl md:text-5xl font-bold text-white">
                500+
              </h2>

              <p className="mt-3 text-slate-400 uppercase tracking-wider text-sm">
                Enterprise Clients
              </p>

            </div>

            <div>

              <h2 className="text-4xl md:text-5xl font-bold text-white">
                50K+
              </h2>

              <p className="mt-3 text-slate-400 uppercase tracking-wider text-sm">
                Credentials Issued
              </p>

            </div>

            <div>

              <h2 className="text-4xl md:text-5xl font-bold text-white">
                99.9%
              </h2>

              <p className="mt-3 text-slate-400 uppercase tracking-wider text-sm">
                Verification Accuracy
              </p>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
}