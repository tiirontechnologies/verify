import {
  ResponsiveContainer,
  AreaChart,
  Area,
  CartesianGrid,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

interface AnalyticsOverviewProps {
  certificates?: any[];
}

export default function AnalyticsOverview({
  certificates = [],
}: AnalyticsOverviewProps) {
  // Aggregate certificate generation counts for the last 7 days
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const last7DaysData = Array.from({ length: 7 }).map((_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (6 - i));
    const dayName = days[d.getDay()];

    // Count certificates created on this date
    const count = certificates.filter((cert) => {
      if (!cert.createdAt) return false;
      const certDate = new Date(cert.createdAt);
      return (
        certDate.getDate() === d.getDate() &&
        certDate.getMonth() === d.getMonth() &&
        certDate.getFullYear() === d.getFullYear()
      );
    }).length;

    return {
      day: dayName,
      uploads: count,
    };
  });

  const totalWeekly = last7DaysData.reduce((acc, curr) => acc + curr.uploads, 0);

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
            Real student uploads and certificate generations over the last 7 days.
          </p>
        </div>

        <div className="flex gap-8">
          <div>
            <p className="text-sm text-gray-500">
              Last 7 Days Total
            </p>

            <h3 className="mt-1 text-3xl font-bold text-slate-900">
              {totalWeekly}
            </h3>
          </div>

          <div>
            <p className="text-sm text-gray-500">
              Database Status
            </p>

            <h3 className="mt-1 text-3xl font-bold text-green-600">
              Active
            </h3>
          </div>
        </div>
      </div>

      <div className="h-[360px] p-6">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={last7DaysData}>
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
              allowDecimals={false}
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