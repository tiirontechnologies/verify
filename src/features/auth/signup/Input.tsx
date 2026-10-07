import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

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
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === "password";

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
          type={isPassword && showPassword ? "text" : type}
          placeholder={placeholder}
          autoComplete={isPassword ? "new-password" : undefined}
          className={`w-full rounded-2xl border border-slate-300 bg-white py-4 pl-12 ${isPassword ? "pr-12" : "pr-4"} outline-none transition focus:border-red-500 focus:ring-4 focus:ring-red-100`}
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword((visible) => !visible)}
            aria-label={showPassword ? `Hide ${label.toLowerCase()}` : `Show ${label.toLowerCase()}`}
            title={showPassword ? `Hide ${label.toLowerCase()}` : `Show ${label.toLowerCase()}`}
            className="absolute right-3 top-1/2 -translate-y-1/2 rounded p-1 text-slate-400 transition hover:text-slate-700"
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        )}
      </div>
    </div>
  );
}
