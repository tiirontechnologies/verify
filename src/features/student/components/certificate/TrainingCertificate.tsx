import logo from "../../../../assets/Tiiron_Technologies_Logo.png";

import type { CertificateData } from "../../../../types/certificate";

type Props = {
  certificate: CertificateData;
};

export default function TrainingCertificate({
  certificate,
}: Props) {
  return (
    <div className="flex justify-center">

      <div
        id="certificate"
        className="relative w-[1200px] min-h-[900px] bg-[#FFFDF8] shadow-2xl overflow-hidden"
      >

        {/* Gold Borders */}

        <div className="absolute inset-0 border-[14px] border-[#D6B13E]"></div>

        <div className="absolute inset-5 border-2 border-[#E8D27D]"></div>

        {/* Blue Corner Decorations */}

        <div className="absolute top-0 left-0 w-44 h-24 bg-[#1E4D8F]"></div>

        <div className="absolute top-0 left-32 w-24 h-24 bg-[#2C63B4] skew-x-[-35deg]"></div>

        <div className="absolute top-0 right-0">

          <div className="w-52 h-28 bg-[#1E4D8F] rounded-bl-[140px]"></div>

          <div className="absolute top-3 right-8 w-40 h-20 border-t-4 border-[#D6B13E] rounded-bl-[120px]"></div>

        </div>

        <div className="absolute bottom-0 left-0">

          <div className="w-52 h-28 bg-[#1E4D8F] rounded-tr-[140px]"></div>

          <div className="absolute bottom-3 left-8 w-40 h-20 border-b-4 border-[#D6B13E] rounded-tr-[120px]"></div>

        </div>

        <div className="absolute bottom-0 right-0">

          <div className="w-52 h-28 bg-[#1E4D8F] rounded-tl-[140px]"></div>

          <div className="absolute bottom-3 right-8 w-40 h-20 border-b-4 border-[#D6B13E] rounded-tl-[120px]"></div>

        </div>

        {/* Watermark */}

        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">

          <img
            src={logo}
            className="w-[420px] opacity-[0.04]"
          />

        </div>

        {/* Content */}

        <div className="relative z-10 px-20 py-14">

          {/* Top */}

          <div className="flex justify-center items-center gap-8">

            <img
              src={logo}
              className="h-24 object-contain"
            />

            <div className="w-20 h-20 rounded-full border-[5px] border-[#203A72] flex items-center justify-center">

              ⭐

            </div>

          </div>

          {/* Title */}

          <div className="text-center mt-8">

            <h1 className="text-[72px] font-black tracking-[8px] text-[#3D7B2F]">

              CERTIFICATE

            </h1>

            <h2 className="mt-3 text-[28px] tracking-[8px] font-semibold text-[#2E2E2E]">

              OF ACHIEVEMENT

            </h2>

          </div>

          {/* Presented */}

          <div className="text-center mt-12">

            <p className="text-[22px] text-gray-500">

              This certificate is presented to

            </p>

            <h2 className="mt-6 text-[64px] italic font-serif text-[#223C85]">

              {certificate.studentName}

            </h2>

            <div className="flex justify-center mt-5">

              <div className="w-[520px] border-b-2 border-gray-300 relative">

                <div className="absolute left-1/2 -translate-x-1/2 -top-2 text-3xl text-gray-300">

                  ❦

                </div>

              </div>

            </div>

          </div>
                    {/* Certificate Body */}

          <div className="mt-12 px-8">

            <p className="text-center text-[22px] leading-[42px] text-gray-700">

              This certificate is proudly awarded for successfully completing the

              <span className="font-bold">
                {" "}
                {certificate.course}
              </span>

              {" "}offered by

              <span className="font-bold text-[#1F4C8D]">
                {" "}
                Tiiron Technologies Pvt. Ltd.
              </span>

              {" "}The participant demonstrated strong technical skills,
              practical implementation ability, consistency and dedication
              throughout the learning journey.

            </p>

            <p className="mt-10 text-center text-[20px] leading-[38px] text-gray-700">

              During the training program, the learner successfully completed
              hands-on projects covering Frontend Development, Backend
              Development, Database Design, REST APIs, Authentication,
              Deployment and AI Integration.

            </p>

          </div>

          {/* Achievement Box */}

          <div className="mt-12 bg-[#F5F9FF] border border-[#D9E6FF] rounded-2xl px-10 py-8">

            <h3 className="text-center text-[30px] font-bold text-[#1E4D8F]">

              Outstanding Performance

            </h3>

            <p className="mt-5 text-center text-[18px] leading-9 text-gray-700">

              Successfully completed all practical assessments, live
              development projects and technical evaluations while
              maintaining excellent performance throughout the program.

            </p>

          </div>

          {/* Certificate Details */}

          <div className="mt-12 flex justify-between items-center">

            <div>

              <p className="uppercase tracking-[3px] text-gray-400 text-xs">

                Certificate ID

              </p>

              <h3 className="mt-2 text-2xl font-bold">

                {certificate.certificateId}

              </h3>

            </div>

            <div className="text-right">

              <p className="uppercase tracking-[3px] text-gray-400 text-xs">

                Issue Date

              </p>

              <h3 className="mt-2 text-2xl font-bold">

                {certificate.issueDate}

              </h3>

            </div>

          </div>
                    {/* Signature Section */}

          <div className="mt-16 flex items-end justify-between">

            {/* Technical Mentor */}

            <div className="w-[320px] text-center">

              <div className="border-t-2 border-gray-700"></div>

              <h3 className="mt-3 text-xl font-semibold">

    {certificate.mentor}

</h3>

<p className="text-sm text-gray-500">

    Technical Mentor

</p>

            </div>

            {/* QR */}

            <div className="flex flex-col items-center">

              <div className="w-28 h-28 rounded-xl border-2 border-dashed border-gray-400 bg-white flex items-center justify-center">

                <span className="text-sm text-gray-500">
                  <img
    src={certificate.qrCode}
    alt="QR"
    className="w-28 h-28 object-contain"
/>
                </span>

              </div>

              <p className="mt-3 text-sm text-gray-500">
                Scan to Verify
              </p>

            </div>

            {/* Director */}

            <div className="w-[320px] text-center">

              <div className="border-t-2 border-gray-700"></div>

              <h3 className="mt-3 text-xl font-semibold">

    {certificate.director}

</h3>

<p className="text-sm text-gray-500">

    Director

</p>
            </div>

          </div>

          {/* Footer */}

          <div className="mt-14 border-t border-gray-300 pt-6">

            <div className="flex justify-between items-center text-gray-500 text-sm">

              <span>
                © 2026 Tiiron Technologies Pvt. Ltd.
              </span>

              <span>
                www.tiirontechnologies.com
              </span>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}