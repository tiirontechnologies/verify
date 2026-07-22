import React from "react";

type InputProps = {
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;

  label: string;
  placeholder: string;
  icon: React.ReactNode;
  type?: string;
};

export default function Input({
  name,
  value,
  onChange,
  label,
  placeholder,
  icon,
  type = "text",
}: InputProps) {
  return (
    <div>
      <label className="mb-2 block font-medium text-slate-700">
        {label}
      </label>

      <div className="relative">
        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
          {icon}
        </div>

        <input
          name={name}
          value={value}
          onChange={onChange}
          type={type}
          placeholder={placeholder}
          className="w-full rounded-2xl border border-slate-300 bg-white py-4 pl-12 pr-4 outline-none transition focus:border-red-500 focus:ring-4 focus:ring-red-100"
        />
      </div>
    </div>
  );
}