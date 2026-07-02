type Props = {
  title?: string;
  subtitle?: string;
};

export default function CertificateHeader({
  title = "CERTIFICATE",
  subtitle = "OF INTERNSHIP",
}: Props) {
  return (
    <div className="text-center">

      <div className="w-24 h-24 rounded-full bg-red-600 mx-auto flex items-center justify-center text-white text-4xl font-bold">
        T
      </div>

      <h1 className="mt-8 text-[64px] font-black tracking-[10px] text-[#216D39]">
        {title}
      </h1>

      <h2 className="mt-2 text-[28px] font-semibold tracking-[8px] text-[#B58A1D]">
        {subtitle}
      </h2>

      <div className="w-44 h-1 bg-[#D4AF37] mx-auto mt-6 rounded-full"></div>

    </div>
  );
}