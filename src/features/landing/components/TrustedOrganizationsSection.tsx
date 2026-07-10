import {
  Building2,
  ShieldCheck,
  Globe2,
  Zap,
  CheckCircle2,
} from "lucide-react";

export default function TrustedOrganizationsSection() {
  const companies = [
    {
      name: "Google",
      desc: "Hiring Partner",
      color: "bg-red-50 text-red-600",
    },
    {
      name: "Microsoft",
      desc: "Enterprise Client",
      color: "bg-blue-50 text-blue-600",
    },
    {
      name: "Amazon",
      desc: "Recruitment Partner",
      color: "bg-orange-50 text-orange-600",
    },
    {
      name: "Infosys",
      desc: "Training Partner",
      color: "bg-green-50 text-green-600",
    },
    {
      name: "TCS",
      desc: "Enterprise Client",
      color: "bg-purple-50 text-purple-600",
    },
    {
      name: "Accenture",
      desc: "Technology Partner",
      color: "bg-pink-50 text-pink-600",
    },
    {
      name: "Wipro",
      desc: "Trusted Organization",
      color: "bg-cyan-50 text-cyan-600",
    },
    {
      name: "Deloitte",
      desc: "Verification Partner",
      color: "bg-yellow-50 text-yellow-600",
    },
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-white via-slate-50 to-white">

      <div className="max-w-7xl mx-auto px-6 lg:px-8">

        {/* Heading */}

        <div className="max-w-3xl mx-auto text-center">

          <span className="inline-flex items-center px-5 py-2 rounded-full bg-red-50 text-red-600 font-semibold text-sm tracking-wide">
            TRUSTED WORLDWIDE
          </span>

          <h2 className="mt-6 text-4xl lg:text-5xl font-bold text-slate-900 leading-tight">
            Trusted By Leading
            <span className="text-red-600"> Organizations</span>
          </h2>

          <p className="mt-6 text-lg leading-8 text-slate-500">
            Thousands of enterprises, educational institutions and recruiters
            rely on Tiiron to securely issue, manage and verify digital
            credentials.
          </p>

        </div>

        {/* Organization Cards */}

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-7 mt-20">

          {companies.map((company) => (

            <div
              key={company.name}
              className="
              group
              bg-white
              border
              rounded-3xl
              p-8
              hover:shadow-2xl
              hover:-translate-y-2
              transition-all
              duration-300
              "
            >

              <div
                className={`
                w-16
                h-16
                rounded-2xl
                flex
                items-center
                justify-center
                ${company.color}
                `}
              >

                <Building2 size={34} />

              </div>

              <h3 className="mt-7 text-2xl font-bold text-slate-900">
                {company.name}
              </h3>

              <p className="mt-2 text-slate-500">
                {company.desc}
              </p>

            </div>

          ))}

        </div>

        {/* Why Organizations Choose Tiiron */}

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mt-24">

          <div className="text-center">

            <div className="w-16 h-16 rounded-2xl bg-red-50 flex items-center justify-center mx-auto">
              <ShieldCheck
                size={32}
                className="text-red-600"
              />
            </div>

            <h3 className="mt-5 text-xl font-bold">
              Enterprise Security
            </h3>

            <p className="mt-3 text-slate-500 leading-7">
              End-to-end encryption and digitally signed credentials.
            </p>

          </div>

          <div className="text-center">

            <div className="w-16 h-16 rounded-2xl bg-blue-50 flex items-center justify-center mx-auto">
              <Zap
                size={32}
                className="text-blue-600"
              />
            </div>

            <h3 className="mt-5 text-xl font-bold">
              Instant Verification
            </h3>

            <p className="mt-3 text-slate-500 leading-7">
              Verify credentials within seconds from anywhere.
            </p>

          </div>

          <div className="text-center">

            <div className="w-16 h-16 rounded-2xl bg-green-50 flex items-center justify-center mx-auto">
              <CheckCircle2
                size={32}
                className="text-green-600"
              />
            </div>

            <h3 className="mt-5 text-xl font-bold">
              Trusted Records
            </h3>

            <p className="mt-3 text-slate-500 leading-7">
              Every certificate is validated from official records.
            </p>

          </div>

          <div className="text-center">

            <div className="w-16 h-16 rounded-2xl bg-purple-50 flex items-center justify-center mx-auto">
              <Globe2
                size={32}
                className="text-purple-600"
              />
            </div>

            <h3 className="mt-5 text-xl font-bold">
              Global Access
            </h3>

            <p className="mt-3 text-slate-500 leading-7">
              Accessible worldwide for recruiters and institutions.
            </p>

          </div>

        </div>
                {/* Statistics */}

        <div className="mt-24">

          <div className="bg-white border rounded-[36px] shadow-sm p-10 lg:p-14">

            <div className="text-center">

              <h2 className="text-4xl font-bold text-slate-900">
                Trusted by Thousands
              </h2>

              <p className="mt-4 text-lg text-slate-500">
                Growing every day with organizations, institutions and recruiters.
              </p>

            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mt-14">

              {/* Card 1 */}

              <div className="border rounded-3xl p-8 text-center hover:shadow-xl transition">

                <div className="w-16 h-16 rounded-2xl bg-red-50 flex items-center justify-center mx-auto">

                  <Building2
                    size={34}
                    className="text-red-600"
                  />

                </div>

                <h3 className="mt-6 text-4xl font-bold text-red-600">
                  10+
                </h3>

                <p className="mt-3 text-slate-500">
                  Enterprise Clients
                </p>

              </div>

              {/* Card 2 */}

              <div className="border rounded-3xl p-8 text-center hover:shadow-xl transition">

                <div className="w-16 h-16 rounded-2xl bg-blue-50 flex items-center justify-center mx-auto">

                  <ShieldCheck
                    size={34}
                    className="text-blue-600"
                  />

                </div>

                <h3 className="mt-6 text-4xl font-bold text-blue-600">
                  1000+
                </h3>

                <p className="mt-3 text-slate-500">
                  Credentials Issued
                </p>

              </div>

              {/* Card 3 */}

              <div className="border rounded-3xl p-8 text-center hover:shadow-xl transition">

                <div className="w-16 h-16 rounded-2xl bg-green-50 flex items-center justify-center mx-auto">

                  <CheckCircle2
                    size={34}
                    className="text-green-600"
                  />

                </div>

                <h3 className="mt-6 text-4xl font-bold text-green-600">
                  10K+
                </h3>

                <p className="mt-3 text-slate-500">
                  Verified Users
                </p>

              </div>

              {/* Card 4 */}

              <div className="border rounded-3xl p-8 text-center hover:shadow-xl transition">

                <div className="w-16 h-16 rounded-2xl bg-purple-50 flex items-center justify-center mx-auto">

                  <Globe2
                    size={34}
                    className="text-purple-600"
                  />

                </div>

                <h3 className="mt-6 text-4xl font-bold text-purple-600">
                  99.9%
                </h3>

                <p className="mt-3 text-slate-500">
                  Verification Accuracy
                </p>

              </div>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
}