import { useState, FormEvent, ReactNode } from "react";
import DashboardLayout from "../layouts/DashboardLayout";

interface ComingSoonProps {
  featureName?: string;
  description?: string;
  icon?: ReactNode;
}

const defaultIcon = (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 00-2.91-.09z" />
    <path d="M12 15l-3-3a22 22 0 012-3.95A12.88 12.88 0 0122 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 01-4 2z" />
    <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
    <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
  </svg>
);

export default function ComingSoon({
  featureName = "This feature",
  description = "We're working on it behind the scenes to make sure it's worth the wait. The moment it's ready, we'll let you know.",
  icon = defaultIcon,
}: ComingSoonProps) {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (!isValid) {
      setError("Enter a valid email address.");
      return;
    }
    setError("");
    setSubmitted(true);
  };

  return (
    <DashboardLayout>
      <div className="space-y-8 pb-10 min-h-[75vh] flex items-center justify-center">
        <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-8 sm:p-12 max-w-2xl w-full text-center flex flex-col items-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-red-50 text-red-600 text-sm font-medium px-4 py-1.5 rounded-full mb-8">
            {icon}
            Coming Soon
          </div>

          {/* Heading */}
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-700 leading-tight mb-4">
            We're working on it
          </h1>

          <p className="text-gray-500 text-base leading-relaxed max-w-xl mb-10">
            <span className="font-medium text-gray-600">{featureName}</span> isn't quite ready yet. {description}
          </p>

          {/* Notify form */}
          {submitted ? (
            <div className="bg-red-50 border border-red-100 text-sm text-gray-700 rounded-xl px-5 py-4">
              You're all set! We'll drop a note at <span className="font-semibold text-red-600">{email}</span> the moment {featureName.toLowerCase()} is ready — no spam, just one good email.
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate className="w-full flex flex-col items-center">
              <div className="flex flex-col sm:flex-row gap-3 max-w-xl w-full justify-center">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  aria-label="Email address"
                  className="flex-1 border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-600 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-red-600/40 focus:border-red-600 transition-colors"
                />
                <button
                  type="submit"
                  className="inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold bg-red-600 text-white hover:bg-red-700 active:bg-red-800 transition-colors"
                >
                  Keep me posted
                </button>
              </div>
              {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
            </form>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}