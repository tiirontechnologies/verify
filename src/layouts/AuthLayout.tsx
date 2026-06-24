type AuthLayoutProps = {
  children: React.ReactNode;
};

export default function AuthLayout({
  children,
}: AuthLayoutProps) {
  return (
    <div className="min-h-screen bg-[#fafafa] flex">

      {/* Left Side */}

      <div className="hidden lg:flex lg:w-1/2 bg-[#0B1120] text-white p-12 xl:p-16 flex-col justify-between relative overflow-hidden">

        {/* Top */}

        <div>

          <h1 className="text-4xl font-bold">
            Tiiron Verify
          </h1>

          <p className="mt-4 text-gray-400 text-lg">
            Decentralized Credential Verification Platform
          </p>

        </div>

        {/* Center */}

        <div>

          <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 text-sm text-gray-300 mb-8">
            Trusted by 100+ Organizations
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
              50K+
            </h2>

            <p className="mt-2 text-gray-400">
              Credentials Issued
            </p>

          </div>

          <div>

            <h2 className="text-5xl font-bold text-red-500">
              100+
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