interface OrganizationProfileCardProps {
  data: {
    companyName?: string;
    contactPerson?: string;
    email?: string;
    phone?: string;
    website?: string;
    industry?: string;
    city?: string;
    state?: string;
    country?: string;
    postalCode?: string;
    address?: string;
    description?: string;
  };
  onChange: (field: string, value: string) => void;
}

export default function OrganizationProfileCard({
  data,
  onChange,
}: OrganizationProfileCardProps) {
  return (
    <section className="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm">
      <h2 className="text-2xl font-bold text-gray-900">
        Organization Information
      </h2>

      <div className="mt-8 grid gap-6 md:grid-cols-2">
        <div>
          <label className="mb-2 block font-medium text-sm text-slate-700">
            Organization / Company Name *
          </label>
          <input
            className="w-full rounded-2xl border border-gray-200 p-3 text-sm outline-none focus:border-red-500 focus:ring-2 focus:ring-red-100"
            value={data.companyName || ""}
            onChange={(e) => onChange("companyName", e.target.value)}
            placeholder="e.g. Tiiron Technologies"
          />
        </div>

        <div>
          <label className="mb-2 block font-medium text-sm text-slate-700">
            Contact Person Name
          </label>
          <input
            className="w-full rounded-2xl border border-gray-200 p-3 text-sm outline-none focus:border-red-500 focus:ring-2 focus:ring-red-100"
            value={data.contactPerson || ""}
            onChange={(e) => onChange("contactPerson", e.target.value)}
            placeholder="e.g. John Doe"
          />
        </div>

        <div>
          <label className="mb-2 block font-medium text-sm text-slate-700">
            Email Address *
          </label>
          <input
            type="email"
            className="w-full rounded-2xl border border-gray-200 p-3 text-sm outline-none focus:border-red-500 focus:ring-2 focus:ring-red-100"
            value={data.email || ""}
            onChange={(e) => onChange("email", e.target.value)}
            placeholder="admin@organization.com"
          />
        </div>

        <div>
          <label className="mb-2 block font-medium text-sm text-slate-700">
            Contact Phone Number
          </label>
          <input
            type="tel"
            className="w-full rounded-2xl border border-gray-200 p-3 text-sm outline-none focus:border-red-500 focus:ring-2 focus:ring-red-100"
            value={data.phone || ""}
            onChange={(e) => onChange("phone", e.target.value)}
            placeholder="+91 9876543210"
          />
        </div>

        <div>
          <label className="mb-2 block font-medium text-sm text-slate-700">
            Website URL
          </label>
          <input
            type="url"
            className="w-full rounded-2xl border border-gray-200 p-3 text-sm outline-none focus:border-red-500 focus:ring-2 focus:ring-red-100"
            value={data.website || ""}
            onChange={(e) => onChange("website", e.target.value)}
            placeholder="https://tiiron.com"
          />
        </div>

        <div>
          <label className="mb-2 block font-medium text-sm text-slate-700">
            Industry / Domain
          </label>
          <input
            className="w-full rounded-2xl border border-gray-200 p-3 text-sm outline-none focus:border-red-500 focus:ring-2 focus:ring-red-100"
            value={data.industry || ""}
            onChange={(e) => onChange("industry", e.target.value)}
            placeholder="e.g. EdTech, Information Technology"
          />
        </div>

        <div className="md:col-span-2 grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div>
            <label className="mb-2 block font-medium text-xs text-slate-700">City</label>
            <input
              className="w-full rounded-2xl border border-gray-200 p-3 text-sm outline-none focus:border-red-500"
              value={data.city || ""}
              onChange={(e) => onChange("city", e.target.value)}
              placeholder="City"
            />
          </div>
          <div>
            <label className="mb-2 block font-medium text-xs text-slate-700">State / Region</label>
            <input
              className="w-full rounded-2xl border border-gray-200 p-3 text-sm outline-none focus:border-red-500"
              value={data.state || ""}
              onChange={(e) => onChange("state", e.target.value)}
              placeholder="State"
            />
          </div>
          <div>
            <label className="mb-2 block font-medium text-xs text-slate-700">Country</label>
            <input
              className="w-full rounded-2xl border border-gray-200 p-3 text-sm outline-none focus:border-red-500"
              value={data.country || ""}
              onChange={(e) => onChange("country", e.target.value)}
              placeholder="Country"
            />
          </div>
          <div>
            <label className="mb-2 block font-medium text-xs text-slate-700">Postal Code</label>
            <input
              className="w-full rounded-2xl border border-gray-200 p-3 text-sm outline-none focus:border-red-500"
              value={data.postalCode || ""}
              onChange={(e) => onChange("postalCode", e.target.value)}
              placeholder="Postal Code"
            />
          </div>
        </div>

        <div className="md:col-span-2">
          <label className="mb-2 block font-medium text-sm text-slate-700">
            Official Street Address
          </label>
          <textarea
            rows={3}
            className="w-full rounded-2xl border border-gray-200 p-3 text-sm outline-none focus:border-red-500 focus:ring-2 focus:ring-red-100"
            value={data.address || ""}
            onChange={(e) => onChange("address", e.target.value)}
            placeholder="Full office address..."
          />
        </div>

        <div className="md:col-span-2">
          <label className="mb-2 block font-medium text-sm text-slate-700">
            Organization Bio / Overview
          </label>
          <textarea
            rows={3}
            className="w-full rounded-2xl border border-gray-200 p-3 text-sm outline-none focus:border-red-500 focus:ring-2 focus:ring-red-100"
            value={data.description || ""}
            onChange={(e) => onChange("description", e.target.value)}
            placeholder="Short description of your organization..."
          />
        </div>
      </div>
    </section>
  );
}