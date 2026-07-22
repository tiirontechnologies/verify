import {
  ResponsiveContainer,
  AreaChart,
  Area,
  CartesianGrid,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const analyticsData = [
  { day: "Mon", uploads: 22 },
  { day: "Tue", uploads: 38 },
  { day: "Wed", uploads: 31 },
  { day: "Thu", uploads: 52 },
  { day: "Fri", uploads: 61 },
  { day: "Sat", uploads: 46 },
  { day: "Sun", uploads: 74 },
];

export default function AnalyticsOverview() {
  return (
    <section className="rounded-3xl border border-gray-200 bg-white shadow-sm">
      <div className="flex flex-col gap-6 border-b border-gray-100 p-6 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="text-sm font-medium text-red-600">
            Analytics
          </p>

          <h2 className="mt-2 text-2xl font-bold text-gray-900">
            Certificate Activity
          </h2>

          <p className="mt-2 text-gray-500">
            Student uploads and certificate generation during the
            last 7 days.
          </p>
        </div>

        <div className="flex gap-8">
          <div>
            <p className="text-sm text-gray-500">
              This Week
            </p>

            <h3 className="mt-1 text-3xl font-bold">
              324
            </h3>
          </div>

          <div>
            <p className="text-sm text-gray-500">
              Growth
            </p>

            <h3 className="mt-1 text-3xl font-bold text-green-600">
              +18%
            </h3>
          </div>
        </div>
      </div>

      <div className="h-[360px] p-6">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={analyticsData}>
            <defs>
              <linearGradient
                id="uploadGradient"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop
                  offset="5%"
                  stopColor="#dc2626"
                  stopOpacity={0.35}
                />

                <stop
                  offset="95%"
                  stopColor="#dc2626"
                  stopOpacity={0}
                />
              </linearGradient>
            </defs>

            <CartesianGrid
              vertical={false}
              strokeDasharray="3 3"
            />

            <XAxis
              dataKey="day"
              tickLine={false}
              axisLine={false}
            />

            <YAxis
              tickLine={false}
              axisLine={false}
            />

            <Tooltip />

            <Area
              type="monotone"
              dataKey="uploads"
              stroke="#dc2626"
              strokeWidth={3}
              fill="url(#uploadGradient)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}