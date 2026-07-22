// import { Building2, Globe, Mail, Phone } from "lucide-react";

export default function OrganizationProfileCard() {
  return (
    <section className="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm">
      <h2 className="text-2xl font-bold text-gray-900">
        Organization Information
      </h2>

      <div className="mt-8 grid gap-6 md:grid-cols-2">
        <div>
          <label className="mb-2 block font-medium">
            Organization Name
          </label>

          <input
            className="w-full rounded-2xl border border-gray-200 p-3 outline-none focus:border-red-500"
            defaultValue="Tiiron Technologies"
          />
        </div>

        <div>
          <label className="mb-2 block font-medium">
            Email Address
          </label>

          <input
            className="w-full rounded-2xl border border-gray-200 p-3 outline-none focus:border-red-500"
            defaultValue="admin@tiiron.com"
          />
        </div>

        <div>
          <label className="mb-2 block font-medium">
            Website
          </label>

          <input
            className="w-full rounded-2xl border border-gray-200 p-3 outline-none focus:border-red-500"
            defaultValue="https://tiiron.com"
          />
        </div>

        <div>
          <label className="mb-2 block font-medium">
            Contact Number
          </label>

          <input
            className="w-full rounded-2xl border border-gray-200 p-3 outline-none focus:border-red-500"
            defaultValue="+91 9876543210"
          />
        </div>

        <div className="md:col-span-2">
          <label className="mb-2 block font-medium">
            Address
          </label>

          <textarea
            rows={4}
            className="w-full rounded-2xl border border-gray-200 p-3 outline-none focus:border-red-500"
            defaultValue="Noida, Uttar Pradesh"
          />
        </div>
      </div>
    </section>
  );
}