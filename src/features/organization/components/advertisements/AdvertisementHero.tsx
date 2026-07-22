import { Megaphone, Plus } from "lucide-react";

export default function AdvertisementHero() {
  return (
    <section className="rounded-3xl border border-gray-200 bg-white shadow-sm">
      <div className="flex flex-col gap-6 p-8 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full bg-red-50 px-4 py-2 text-sm font-medium text-red-600">
            <Megaphone size={16} />
            Advertisement Manager
          </div>

          <h1 className="mt-5 text-4xl font-bold text-gray-900">
            Advertisements
          </h1>

          <p className="mt-4 max-w-2xl leading-7 text-gray-500">
            Create, manage and schedule promotional banners displayed across
            your verification portal and dashboard.
          </p>
        </div>

        <button className="inline-flex items-center gap-2 rounded-2xl bg-red-600 px-6 py-3 font-medium text-white hover:bg-red-700">
          <Plus size={18} />
          New Campaign
        </button>
      </div>
    </section>
  );
}