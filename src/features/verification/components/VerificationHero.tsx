import {
  ShieldCheck,
  BadgeCheck,
} from "lucide-react";

type Props = {
  verificationId: string;
};

export default function VerificationHero({
  verificationId,
}: Props) {
  return (
    <section
      className="
      rounded-[32px]
      overflow-hidden
      bg-gradient-to-r
      from-[#4A1B24]
      via-[#8E1C22]
      to-[#401720]
      shadow-2xl
      "
    >
      <div className="px-10 lg:px-14 py-10 lg:py-12">

        <div className="flex flex-col lg:flex-row items-center justify-between gap-10">

          {/* Left */}

          <div className="flex items-center gap-8">

            {/* Shield */}

            <div className="relative">

              <div className="absolute inset-0 rounded-full border border-white/20 scale-125"></div>

              <div className="absolute inset-0 rounded-full border border-white/10 scale-150"></div>

              <div
                className="
                w-36
                h-36
                rounded-full
                bg-white/5
                backdrop-blur
                flex
                items-center
                justify-center
                border
                border-white/10
                "
              >
                <div
                  className="
                  w-24
                  h-24
                  rounded-full
                  bg-white
                  flex
                  items-center
                  justify-center
                  shadow-xl
                  "
                >
                  <ShieldCheck
                    size={54}
                    className="text-green-600"
                  />
                </div>
              </div>

            </div>

            {/* Content */}

            <div>

              <span
                className="
                inline-flex
                items-center
                px-4
                py-1.5
                rounded-full
                bg-white/10
                border
                border-white/20
                text-red-200
                uppercase
                tracking-[3px]
                text-xs
                font-semibold
                "
              >
                Verification Success
              </span>

              <h1 className="mt-5 text-5xl font-bold text-white">
                Credential Verified
              </h1>

              <p className="mt-4 text-gray-200 text-lg leading-8 max-w-xl">
                This credential has been successfully verified
                against Tiiron Technologies' official records.
              </p>

              <div
                className="
                mt-6
                inline-flex
                items-center
                gap-3
                bg-[#6A4B2D]
                px-5
                py-3
                rounded-xl
                "
              >
                <BadgeCheck
                  size={20}
                  className="text-green-300"
                />

                <span className="text-green-200 font-semibold">
                  100% Authentic
                </span>

              </div>

            </div>

          </div>

          {/* Verification Card */}

          <div
            className="
            min-w-[320px]
            bg-white/10
            backdrop-blur-xl
            border
            border-white/20
            rounded-2xl
            px-8
            py-5
            "
          >
            <div className="flex items-center justify-between">

              <span className="text-red-200 font-medium">
                Verification ID
              </span>

              <span className="text-gray-400">
                |
              </span>

              <span className="text-white font-bold tracking-wide">
                {verificationId}
              </span>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}