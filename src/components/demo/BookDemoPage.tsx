import Navbar from "../../features/landing/components/Navbar";
import Footer from "../shared/Footer";
import DemoForm from "./DemoForm";

import {
  Check,
  Mail,
  Building2,
} from "lucide-react";

export default function BookDemoPage() {
  return (
    <>
      <Navbar />

      <section className="bg-slate-100 py-16 lg:py-20">
        <div
  className="
    w-[95%]
    lg:w-[92vw]
    max-w-[1650px]
    mx-auto
    bg-white
    rounded-2xl
    lg:rounded-[36px]
    border
    border-slate-200
    shadow-lg
    overflow-hidden
  "
>

          <div className="grid grid-cols-1 lg:grid-cols-[1.15fr_0.85fr]">

            {/* LEFT */}

            <div
  className="
p-6
sm:p-8
lg:p-14
xl:p-20
border-b
lg:border-b-0
lg:border-r
border-slate-200
"
>

              <p className="uppercase tracking-[0.25em] text-red-600 font-semibold text-sm">
                BOOK A DEMO
              </p>

              <h1 className="mt-5 text-3xl
sm:text-4xl
lg:text-5xl
xl:text-6xl font-bold leading-[1.05] text-slate-900">

                Book a

                <span className="text-red-600">
                  {" "}30-min Demo
                </span>

                <br />

                with our experts

              </h1>

              <p className="mt-8 max-w-2xl text-base
sm:text-lg
lg:text-xl leading-9 text-slate-600">

                Discover how Tiiron Verify helps organizations
                securely issue, manage and verify digital
                credentials at scale.

              </p>

              {/* Benefits */}

              <div className="mt-12 space-y-8">

                {[
                  "Live credential verification walkthrough",
                  "Organization onboarding guidance",
                  "API & LMS integration overview",
                  "Enterprise pricing discussion",
                ].map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-4"
                  >
                    <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                      <Check
                        size={18}
                        className="text-green-600"
                      />
                    </div>

                    <p className="text-lg text-slate-700">
                      {item}
                    </p>
                  </div>
                ))}

              </div>

              {/* Divider */}

              <div className="border-t border-slate-200 my-14"></div>

              {/* Contact */}

              <div>

                <h3 className="text-3xl font-bold text-slate-900">
                  Talk to our Team
                </h3>

                <div className="mt-6 flex items-center gap-4">

                  <Mail className="text-red-600" />

                  <span className="text-lg text-slate-700">
                    contact@tiirontechnologies.com
                  </span>

                </div>

              </div>

              {/* Testimonial */}

              <div className="mt-14 rounded-3xl bg-slate-50 border border-slate-200 p-8">

                <p className="italic text-lg leading-8 text-slate-600">

                  "This Verify portal significantly reduced manual
                  verification time while improving trust for
                  recruiters and institutions."

                </p>

                <div className="flex items-center gap-4 mt-8">

                  <div className="w-14 h-14 rounded-full bg-red-100 flex items-center justify-center">

                    <Building2 className="text-red-600" />

                  </div>

                  <div>

                    <h4 className="font-bold text-lg">
                      Enterprise Client
                    </h4>

                    <p className="text-slate-500">
                      Tiiron Technologies
                    </p>

                  </div>

                </div>

              </div>

              {/* Logos */}

              <div className="grid grid-cols-2
sm:grid-cols-4 gap-8 mt-16 opacity-60">

                {[
                  "Algo Junction",
                  "Tiiron Academy",
                  "Grettech",
                  "Inacademic",
                ].map((company) => (
                  <div
                    key={company}
                    className="text-center font-semibold text-slate-500"
                  >
                    {company}
                  </div>
                ))}

              </div>

            </div>

            {/* RIGHT */}

            <DemoForm />

          </div>

        </div>
      </section>

      <Footer />
    </>
  );
}