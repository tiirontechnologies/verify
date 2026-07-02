type AuthLayoutProps = {
  children: React.ReactNode;
};
import TiironLogo from "../assets/Tiiron_Technologies_DARK.png";
export default function AuthLayout({
  children,
}: AuthLayoutProps) {
  return (
    <div className="min-h-screen bg-[#fafafa] flex">

      {/* Left Side */}

      <div className="hidden lg:flex lg:w-1/2 bg-[#0B1120] text-white p-12 xl:p-16 flex-col justify-between relative overflow-hidden">

        {/* Top */}

<div className="flex items-center">

<img
  src={TiironLogo}
  alt="Tiiron Technologies"
  className="
    h-10
    sm:h-12
    md:h-14
    lg:h-16
    xl:h-20
    w-auto
    object-contain
    rounded-2xl
  "
/>

</div>
{/* <div className="flex items-center">

  <div className="w-44 h-44 rounded-full bg-white shadow-2xl flex items-center justify-center overflow-hidden border-4 border-white">

    <img
      src={TiironLogo}
      alt="Tiiron Technologies"
      className="w-32 h-32 object-contain"
    />

  </div>

</div> */}

        {/* Center */}

        <div>

          <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 text-sm text-gray-300 mb-8">
            Trusted by 10+ Organizations
          </div>

          <h2 className="text-6xl font-bold leading-tight">

            Secure Digital

            <br />

            Trust for the

            <br />

            Modern Workforce

          </h2>

          <p className="mt-10 text-xl text-gray-400 leading-9 max-w-xl">

            Issue, manage and verify credentials trusted
            by institutions and enterprises worldwide.

          </p>

        </div>

        {/* Bottom */}

        <div className="flex gap-16">

          <div>

            <h2 className="text-5xl font-bold text-red-500">
              1000+
            </h2>

            <p className="mt-2 text-gray-400">
              Credentials Issued
            </p>

          </div>

          <div>

            <h2 className="text-5xl font-bold text-red-500">
              10+
            </h2>

            <p className="mt-2 text-gray-400">
              Organizations
            </p>

          </div>

        </div>

        {/* Decorative circles */}

        <div className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full bg-red-600/10 blur-3xl"></div>

        <div className="absolute top-20 right-20 w-40 h-40 rounded-full bg-red-500/10 blur-3xl"></div>

      </div>

      {/* Right Side */}

      <div className="flex-1 flex justify-center items-center px-4 sm:px-8 py-8">
        {children}
      </div>

    </div>
  );
}