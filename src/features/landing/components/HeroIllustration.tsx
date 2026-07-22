import heroImage from "../../../assets/VERIFY_HERO_IMAGE.png";

export default function HeroIllustration() {
  return (
    <div className="relative flex items-center justify-center w-full">
      {/* Soft Background Glow */}

      <div className="absolute inset-0 flex items-center justify-center -z-10">
        <div className="w-[620px] h-[620px] rounded-full bg-blue-100/40 blur-[120px]" />
      </div>

      {/* Main Illustration */}
      <div
      >
        <img
          src={heroImage}
          alt="Credential Verification"
          className="
          hero-float
          w-[100%]
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
