import {
  Megaphone,
  Eye,
  MousePointerClick,
  Clock3,
} from "lucide-react";

const stats = [
  {
    title: "Active Ads",
    value: "08",
    icon: Megaphone,
  },
  {
    title: "Total Views",
    value: "18.4K",
    icon: Eye,
  },
  {
    title: "Clicks",
    value: "2.9K",
    icon: MousePointerClick,
  },
  {
    title: "Scheduled",
    value: "03",
    icon: Clock3,
  },
];

export default function AdvertisementStats() {
  return (
    <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
      {stats.map((item) => {
        const Icon = item.icon;

        return (
          <div
            key={item.title}
            className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm"
          >
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-red-50 text-red-600">
              <Icon />
            </div>

            <h2 className="mt-6 text-3xl font-bold">
              {item.value}
            </h2>

            <p className="mt-2 text-gray-500">
              {item.title}
            </p>
          </div>
        );
      })}
    </section>
  );
}