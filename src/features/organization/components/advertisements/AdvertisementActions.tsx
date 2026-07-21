import {
  Pencil,
  Eye,
  Trash2,
  Copy,
  CalendarDays,
  PlayCircle,
} from "lucide-react";

const actions = [
  {
    title: "Preview",
    icon: Eye,
  },
  {
    title: "Edit",
    icon: Pencil,
  },
  {
    title: "Duplicate",
    icon: Copy,
  },
  {
    title: "Schedule",
    icon: CalendarDays,
  },
  {
    title: "Publish",
    icon: PlayCircle,
  },
  {
    title: "Delete",
    icon: Trash2,
  },
];

export default function AdvertisementActions() {
  return (
    <section className="rounded-3xl border border-gray-200 bg-white shadow-sm">
      <div className="border-b border-gray-100 p-6">
        <h2 className="text-2xl font-bold">
          Campaign Actions
        </h2>
      </div>

      <div className="grid gap-6 p-6 md:grid-cols-2 xl:grid-cols-3">
        {actions.map((item) => {
          const Icon = item.icon;

          return (
            <button
              key={item.title}
              className="rounded-2xl border border-gray-200 p-6 text-left transition hover:border-red-300 hover:shadow-lg"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-50 text-red-600">
                <Icon />
              </div>

              <h3 className="mt-5 text-lg font-semibold">
                {item.title}
              </h3>
            </button>
          );
        })}
      </div>
    </section>
  );
}