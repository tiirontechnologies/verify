export default function StatsSection() {
  return (
    <div className="grid md:grid-cols-2 gap-6">

      <div className="bg-white rounded-3xl p-8 shadow-sm">
        <h3 className="text-gray-500">
          Credentials
        </h3>

        <p className="text-5xl font-bold mt-3">
          12
        </p>
      </div>

      <div className="bg-white rounded-3xl p-8 shadow-sm">
        <h3 className="text-gray-500">
          Verifications
        </h3>

        <p className="text-5xl font-bold mt-3">
          64
        </p>
      </div>

      <div className="bg-white rounded-3xl p-8 shadow-sm">
        <h3 className="text-gray-500">
          Achievements
        </h3>

        <p className="text-5xl font-bold mt-3">
          8
        </p>
      </div>

      <div className="bg-white rounded-3xl p-8 shadow-sm">
        <h3 className="text-gray-500">
          Access Requests
        </h3>

        <p className="text-5xl font-bold mt-3">
          32
        </p>
      </div>

    </div>
  );
}