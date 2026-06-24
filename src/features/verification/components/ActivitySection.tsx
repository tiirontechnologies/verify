export default function ActivitySection() {
  return (
    <div className="bg-white border border-red-100 rounded-2xl p-8 mt-8">

      <div className="flex items-center justify-between mb-8">

        <h2 className="text-2xl font-bold">
          Recent Verification Activity
        </h2>

        <button className="text-red-600 font-medium">
          View All
        </button>

      </div>

<div className="space-y-8">

  <div className="flex gap-5">

    <div className="flex flex-col items-center">

      <div className="w-3 h-3 rounded-full bg-green-500"></div>

      <div className="w-[2px] h-20 bg-gray-200"></div>

    </div>

    <div>
      <h3 className="font-semibold">
        Amazon Technologies
      </h3>

      <p className="text-gray-500">
        Verified Internship Certificate
      </p>

      <p className="text-gray-400 text-sm mt-1">
        2 hours ago
      </p>
    </div>

  </div>

  <div className="flex gap-5">

    <div className="flex flex-col items-center">

      <div className="w-3 h-3 rounded-full bg-blue-500"></div>

      <div className="w-[2px] h-20 bg-gray-200"></div>

    </div>

    <div>
      <h3 className="font-semibold">
        Microsoft
      </h3>

      <p className="text-gray-500">
        Viewed Recommendation Letter
      </p>

      <p className="text-gray-400 text-sm mt-1">
        Yesterday
      </p>
    </div>

  </div>

  <div className="flex gap-5">

    <div className="w-3 h-3 rounded-full bg-purple-500 mt-2"></div>

    <div>

      <h3 className="font-semibold">
        Infosys
      </h3>

      <p className="text-gray-500">
        Verified Completion Certificate
      </p>

      <p className="text-gray-400 text-sm mt-1">
        3 days ago
      </p>

    </div>

  </div>

</div>

    </div>
  );
}