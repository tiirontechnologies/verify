export default function StatsSection() {
  return (
    <section className="bg-white border-y">

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3">

        {/* Credentials */}
        <div className="text-center py-10 md:py-14 border-b md:border-b-0 md:border-r">

          <h2 className="text-5xl md:text-6xl font-bold text-red-600">
            50,000+
          </h2>

          <p className="mt-4 text-xs md:text-sm tracking-[0.3em] uppercase text-gray-500">
            Credentials
          </p>

        </div>

        {/* Users */}
        <div className="text-center py-10 md:py-14 border-b md:border-b-0 md:border-r">

          <h2 className="text-5xl md:text-6xl font-bold text-slate-900">
            10,000+
          </h2>

          <p className="mt-4 text-xs md:text-sm tracking-[0.3em] uppercase text-gray-500">
            Verified Users
          </p>

        </div>

        {/* Organizations */}
        <div className="text-center py-10 md:py-14">

          <h2 className="text-5xl md:text-6xl font-bold text-slate-500">
            100+
          </h2>

          <p className="mt-4 text-xs md:text-sm tracking-[0.3em] uppercase text-gray-500">
            Organizations
          </p>

        </div>

      </div>

    </section>
  );
}