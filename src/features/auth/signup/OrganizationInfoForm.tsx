import {
  Building2,
  Globe,
  Phone,
  Briefcase,
} from "lucide-react";
import Input from "../signup/Input";
import Select from "./Select";

type OrganizationInfoFormProps = {
  formData: {
    companyName: string;
    industry: string;
    website: string;
    phone: string;
  };

  handleChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
};

export default function OrganizationInfoForm({
  formData,
  handleChange,
}: OrganizationInfoFormProps) {
  return (
    <section className="rounded-3xl border border-slate-200 bg-white shadow-sm">
      <div className="border-b border-slate-100 px-8 py-6">
        <div className="flex items-center gap-4">
          <div className="rounded-2xl bg-red-100 p-3">
            <Building2 className="text-red-600" />
          </div>

          <div>
            <h2 className="text-2xl font-bold text-slate-900">
              Organization Information
            </h2>

            <p className="mt-1 text-slate-500">
              Tell us about your organization.
            </p>
          </div>
        </div>
      </div>

      <div className="grid gap-6 p-8 md:grid-cols-2">
        <Input
          icon={<Building2 size={18} />}
          name="companyName"
          value={formData.companyName}
          onChange={handleChange}
          label="Organization Name"
          placeholder="Tiiron Technologies Pvt Ltd"
        />

        <Select
          icon={<Briefcase size={18} />}
          name="industry"
          value={formData.industry}
          onChange={handleChange}
          label="Industry"
        />

        <Input
          icon={<Globe size={18} />}
          name="website"
          value={formData.website}
          onChange={handleChange}
          label="Website"
          placeholder="https://company.com"
        />

        <Input
          icon={<Phone size={18} />}
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          label="Phone Number"
          placeholder="+91 9876543210"
        />
      </div>
    </section>
  );
}