import React from "react";

type SelectProps = {
  name: string;
  value: string;
  onChange: (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => void;

  label: string;
  icon: React.ReactNode;
};

export default function Select({
  name,
  value,
  onChange,
  label,
  icon,
}: SelectProps) {
  return (
    <div>
      <label className="mb-2 block font-medium text-slate-700">
        {label}
      </label>

      <div className="relative">
        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
          {icon}
        </div>

        <select
          name={name}
          value={value}
          onChange={onChange}
          className="w-full rounded-2xl border border-slate-300 bg-white py-4 pl-12 pr-4 outline-none transition focus:border-red-500 focus:ring-4 focus:ring-red-100"
        >
          <option value="">Select Industry</option>
          <option value="Education">Education</option>
          <option value="Information Technology">
            Information Technology
          </option>
          <option value="Training Institute">
            Training Institute
          </option>
          <option value="Government">Government</option>
          <option value="Healthcare">Healthcare</option>
          <option value="Finance">Finance</option>
          <option value="Manufacturing">Manufacturing</option>
          <option value="Other">Other</option>
        </select>
      </div>
    </div>
  );
}