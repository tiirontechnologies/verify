import logo from "../../../../assets/Tiiron_Technologies_Logo.png";
import type { CertificateData } from "../../../../types/certificate";
import demoqr from '../../../../assets/qrcode_inacademic.com.png'

type Props = {
  certificate: CertificateData;
};

export default function InternshipCertificate({
  certificate,
}: Props) {
  return (
    <div className="flex justify-center">

      <div
        id="certificate"
        className="relative w-[1200px] min-h-[900px] bg-[#FFFDF8] shadow-2xl overflow-hidden"
      >

        {/* Outer Border */}

        <div className="absolute inset-0 border-[14px] border-[#C7A73C]"></div>

        {/* Inner Border */}

        <div className="absolute inset-5 border-2 border-[#E2CB74]"></div>

        {/* Decorative Corners */}

        <div className="absolute top-0 left-0 w-44 h-44 bg-gradient-to-br from-[#133E7C] to-[#0A2B59] rounded-br-[130px]" />

        <div className="absolute bottom-0 right-0 w-44 h-44 bg-gradient-to-tl from-[#133E7C] to-[#0A2B59] rounded-tl-[130px]" />

        {/* Watermark */}

        <div className="absolute inset-0 flex justify-center items-center pointer-events-none">

          <img
            src={logo}
            className="w-[420px] opacity-[0.04]"
          />

        </div>

        {/* Content */}

        <div className="relative z-10 px-20 py-14">

          {/* Logo */}

          <div className="flex justify-center">

            <img
              src={logo}
              className="h-24 object-contain"
            />

          </div>

          {/* Certificate */}

          <div className="text-center mt-6">

            <h1 className="text-[70px] font-black tracking-[10px] text-[#216D39] leading-none">

              CERTIFICATE

            </h1>

            <div className="inline-block mt-5 bg-[#D4AF37] text-white px-10 py-3 rounded-full tracking-[5px] text-xl font-semibold">

              OF INTERNSHIP

            </div>

          </div>

          {/* Heading */}

          <div className="text-center mt-12">

            <p className="text-2xl text-gray-500">

              This is to certify that

            </p>

            <h2 className="mt-6 text-[62px] italic font-serif text-[#1E4D8F]">

              {certificate.studentName}

            </h2>

            {/* Decorative Divider */}

            <div className="flex justify-center mt-5">

              <div className="w-56 h-[2px] bg-[#D4AF37] rounded-full"></div>

            </div>

          </div>
                    {/* Certificate Body */}

          <div className="mt-12 px-10">

<p className="text-center text-[21px] leading-[44px] text-gray-700">
  has successfully completed the internship as a{" "}

  <span className="font-bold text-[#1E4D8F]">
    {certificate.role}
  </span>{" "}

  at{" "}

  <span className="font-bold text-[#216D39]">
    {certificate.organization}
  </span>{" "}

  from{" "}

  <span className="font-bold">
    {certificate.startDate}
  </span>{" "}

  to{" "}

  <span className="font-bold">
    {certificate.endDate}
  </span>.
</p>

            <p className="mt-10 text-center text-[20px] leading-[40px] text-gray-700">

              During the internship, the candidate demonstrated excellent
              technical knowledge, problem-solving ability and a professional
              attitude while contributing to real-world software development
              projects. Their dedication, willingness to learn and teamwork
              have been highly appreciated throughout the internship period.

            </p>

            <p className="mt-10 text-center text-[20px] leading-[40px] text-gray-700">

              We appreciate the sincere efforts and valuable contribution made
              during the internship and wish them continued success in their
              professional journey.

            </p>

          </div>

          {/* Certificate Details */}

          <div className="mt-14 flex justify-between items-center px-8">

            <div>

              <p className="uppercase tracking-[2px] text-xs text-gray-400">
                Certificate ID
              </p>

              <h3 className="mt-2 text-xl font-bold text-gray-800">
                {certificate.certificateId}
              </h3>

            </div>

            <div className="text-right">

              <p className="uppercase tracking-[2px] text-xs text-gray-400">
                Issue Date
              </p>

              <h3 className="mt-2 text-xl font-bold text-gray-800">
                {certificate.issueDate}
              </h3>

            </div>

          </div>
                    {/* Signature Section */}

          <div className="mt-20 flex items-end justify-between">

            {/* Technical Mentor */}

            <div className="w-72 text-center">

              <div className="border-t-2 border-gray-700"></div>

              <h3 className="mt-3 text-xl font-semibold text-gray-800">
                {certificate.mentor}
              </h3>

            </div>

            {/* QR Code */}

            <div className="flex flex-col items-center">

             <div className="w-28 h-28 rounded-xl overflow-hidden border bg-white flex items-center justify-center">
  <img
    src={demoqr}
    alt="QR Code"
    className="w-full h-full object-contain"
  />
</div>


              <p className="mt-3 text-sm text-gray-500">
                Scan to Verify
              </p>

            </div>

            {/* Director */}

            <div className="w-72 text-center">

              <div className="border-t-2 border-gray-700"></div>

              <h3 className="mt-3 text-xl font-semibold text-gray-800">
                {certificate.director}
              </h3>

            </div>

          </div>

          {/* Footer */}

          <div className="mt-16 pt-6 border-t border-gray-300">

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