import { QrCode } from "lucide-react";
import qrImage from "../../../assets/qrcode_inacademic.com.png";

export default function QRCodeCTA() {
  return (
    <section className="py-12 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">

        <div
          className="
          rounded-3xl
          bg-gradient-to-r
          from-[#111827]
          via-[#16213A]
          to-[#0F172A]
          px-8
          lg:px-12
          py-8
          flex
          flex-col
          lg:flex-row
          items-center
          justify-between
          gap-8
          shadow-xl
          "
        >

          {/* Left */}

          <div className="flex items-center gap-6">

            <div
              className="
              w-28
              h-28
              rounded-2xl
              bg-white/10
              flex
              items-center
              justify-center
              "
            >
              <img
                src={qrImage}
                alt="QR Code"
                className="w-20 h-20 object-contain"
              />
            </div>

            <div>

              <h2 className="text-3xl font-bold text-white">
                Have a QR Code?
              </h2>

              <p className="mt-3 text-slate-300 leading-7 max-w-md">
                Scan the QR code printed on the certificate
                to instantly verify its authenticity.
              </p>

            </div>

          </div>

          {/* Button */}

          <button
            className="
            bg-white
            hover:bg-gray-100
            text-red-600
            font-semibold
            px-8
            py-4
            rounded-2xl
            transition
            flex
            items-center
            gap-3
            "
          >
            <QrCode size={22} />
            Scan QR Code
          </button>

        </div>

      </div>
    </section>
  );
}