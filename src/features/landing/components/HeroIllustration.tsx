import heroImage from "../../../assets/Hero right side img .png";

export default function HeroIllustration() {
  return (
    <div className="relative flex items-center justify-center w-full">

      {/* Soft Background Glow */}

      <div className="absolute inset-0 flex items-center justify-center -z-10">

        <div className="w-[620px] h-[620px] rounded-full bg-blue-100/40 blur-[120px]" />

      </div>

      {/* Top Left Blue Dots */}

      <div className="absolute top-6 left-4 hidden lg:block opacity-70">

        <div className="grid grid-cols-4 gap-2">

          {Array.from({ length: 16 }).map((_, index) => (
            <span
              key={index}
              className="w-1.5 h-1.5 rounded-full bg-blue-400"
            />
          ))}

        </div>

      </div>

      {/* Top Right Grey Dots */}

      <div className="absolute -top-2 right-16 hidden xl:block opacity-30">

        <div className="grid grid-cols-5 gap-2">

          {Array.from({ length: 25 }).map((_, index) => (
            <span
              key={index}
              className="w-1 h-1 rounded-full bg-gray-400"
            />
          ))}

        </div>

      </div>

      {/* Bottom Right Red Dots */}

      <div className="absolute bottom-8 right-4 hidden lg:block opacity-70">

        <div className="grid grid-cols-5 gap-2">

          {Array.from({ length: 25 }).map((_, index) => (
            <span
              key={index}
              className="w-1 h-1 rounded-full bg-red-400"
            />
          ))}

        </div>

      </div>

      {/* Main Illustration */}
<div
  className="
  rounded-[40px]
  bg-white
  shadow-2xl
  border
  border-gray-100
  p-8
"
>
      <img
        src={heroImage}
        alt="Credential Verification"
        className="
          hero-float
w-[115%]
max-w-[850px]
xl:max-w-[950px]
2xl:max-w-[1000px]
object-contain
drop-shadow-2xl
          select-none
          pointer-events-none
        "
        draggable={false}
      />
</div>
      {/* Extra Glow Bottom */}

      <div className="absolute bottom-10 left-10 w-40 h-40 rounded-full bg-red-100 blur-[90px] -z-10" />

      {/* Extra Glow Top */}

      <div className="absolute top-10 right-10 w-44 h-44 rounded-full bg-blue-100 blur-[100px] -z-10" />

    </div>
  );
}