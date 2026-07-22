import {
  Users,
  FileBadge2,
  ShieldCheck,
  Clock3,
  TrendingUp,
} from "lucide-react";

const stats = [
  {
    title: "Total Students",
    value: "1,248",
    change: "+12%",
    icon: Users,
    iconBg: "bg-blue-50",
    iconColor: "text-blue-600",
  },
  {
    title: "Certificates Issued",
    value: "5,842",
    change: "+18%",
    icon: FileBadge2,
    iconBg: "bg-red-50",
    iconColor: "text-red-600",
  },
  {
    title: "Verification Success",
    value: "98.7%",
    change: "+1.4%",
    icon: ShieldCheck,
    iconBg: "bg-green-50",
    iconColor: "text-green-600",
  },
  {
    title: "Pending Requests",
    value: "24",
    change: "-8%",
    icon: Clock3,
    iconBg: "bg-yellow-50",
    iconColor: "text-yellow-600",
  },
];

export default function OrganizationStats() {
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
              <div className="flex items-center gap-2 text-green-600">
                <TrendingUp size={16} />

                <span className="text-sm font-semibold">
                  {stat.change}
                </span>
              </div>

              <span className="text-xs text-gray-400">
                vs last month
              </span>
            </div>
          </div>
        );
      })}
    </section>
  );
}