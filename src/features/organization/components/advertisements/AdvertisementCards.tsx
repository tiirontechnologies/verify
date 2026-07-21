import { CalendarDays, ArrowRight } from "lucide-react";

const campaigns = [
  {
    title: "Summer Internship Drive",
    status: "Running",
    start: "01 Jul",
    end: "31 Jul",
  },
  {
    title: "Campus Recruitment",
    status: "Scheduled",
    start: "05 Aug",
    end: "20 Aug",
  },
  {
    title: "Certificate Week",
    status: "Draft",
    start: "--",
    end: "--",
  },
];

export default function AdvertisementCards() {
  return (
    <section className="rounded-3xl border border-gray-200 bg-white shadow-sm">
      <div className="border-b border-gray-100 p-6">
        <h2 className="text-2xl font-bold">
          Campaigns
        </h2>
      </div>

      <div className="grid gap-6 p-6 lg:grid-cols-3">
        {campaigns.map((campaign) => (
          <button
            key={campaign.title}
            className="rounded-2xl border border-gray-200 p-6 text-left transition hover:border-red-300 hover:shadow-lg"
          >
            <div className="flex items-center justify-between">
              <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">
                {campaign.status}
              </span>

              <ArrowRight size={18} />
            </div>

            <h3 className="mt-6 text-xl font-semibold">
              {campaign.title}
            </h3>

            <div className="mt-6 flex items-center gap-3 text-gray-500">
              <CalendarDays size={18} />

              <span>
                {campaign.start} - {campaign.end}
              </span>
            </div>
          </button>
        ))}
      </div>
    </section>
  );
}