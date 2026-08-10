import {
  Users,
  FileBadge2,
  ShieldCheck,
  Ban,
  TrendingUp,
} from "lucide-react";

interface OrganizationStatsProps {
  totalStudents?: number;
  totalCertificates?: number;
  activeCount?: number;
  revokedCount?: number;
}

export default function OrganizationStats({
  totalStudents = 0,
  totalCertificates = 0,
  activeCount = 0,
  revokedCount = 0,
}: OrganizationStatsProps) {
  const stats = [
    {
      title: "Total Students",
      value: totalStudents.toLocaleString(),
      change: "Active records",
      icon: Users,
      iconBg: "bg-blue-50",
      iconColor: "text-blue-600",
      trendColor: "text-blue-600",
    },
    {
      title: "Certificates Issued",
      value: totalCertificates.toLocaleString(),
      change: "Total generated",
      icon: FileBadge2,
      iconBg: "bg-purple-50",
      iconColor: "text-purple-600",
      trendColor: "text-purple-600",
    },
    {
      title: "Active Verified",
      value: activeCount.toLocaleString(),
      change: "Verified credentials",
      icon: ShieldCheck,
      iconBg: "bg-green-50",
      iconColor: "text-green-600",
      trendColor: "text-green-600",
    },
    {
      title: "Revoked Certificates",
      value: revokedCount.toLocaleString(),
      change: "Invalidated",
      icon: Ban,
      iconBg: "bg-red-50",
      iconColor: "text-red-600",
      trendColor: "text-red-600",
    },
  ];

  return (
    <section className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
      {stats.map((stat) => {
        const Icon = stat.icon;

        return (
          <div
            key={stat.title}
            className="group rounded-3xl border border-gray-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">
                  {stat.title}
                </p>

                <h2 className="mt-3 text-3xl font-bold text-gray-900">
                  {stat.value}
                </h2>
              </div>

              <div
                className={`flex h-14 w-14 items-center justify-center rounded-2xl ${stat.iconBg}`}
              >
                <Icon className={`h-7 w-7 ${stat.iconColor}`} />
              </div>
            </div>

            <div className="mt-8 flex items-center justify-between border-t pt-4">
              <div className={`flex items-center gap-1.5 ${stat.trendColor}`}>
                <TrendingUp size={16} />
                <span className="text-sm font-semibold">
                  {stat.change}
                </span>
              </div>

              <span className="text-xs text-gray-400">
                Live DB
              </span>
            </div>
          </div>
        );
      })}
    </section>
  );
}