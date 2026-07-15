import illustration from "../../../assets/login img-Photoroom.png";

export default function HeroIllustration() {
  return (
    <div className="flex justify-center">
      <img
        src={illustration}
        alt="Authentication"
        className="w-full max-w-[620px]"
      />
    </div>
  );
}