export default function SignatureSection() {
  return (
    <div className="mt-10">

      <div className="flex items-end justify-between">

        {/* Left */}

        <div className="w-72 text-center">

          <div className="border-t-2 border-gray-700"></div>

          <h3 className="mt-3 text-lg font-semibold">
            Technical Mentor
          </h3>

        </div>

        {/* QR */}

        <div className="flex flex-col items-center">

          <div className="w-24 h-24 border-2 border-dashed border-gray-500 rounded-xl flex items-center justify-center text-gray-600 text-sm">

            QR

          </div>

        </div>

        {/* Right */}

        <div className="w-72 text-center">

          <div className="border-t-2 border-gray-700"></div>

          <h3 className="mt-3 text-lg font-semibold">
            Director
          </h3>

        </div>

      </div>

    </div>
  );
}