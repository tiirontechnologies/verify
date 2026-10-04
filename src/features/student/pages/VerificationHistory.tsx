import DashboardLayout from "../../../layouts/DashboardLayout";
import { Clock } from "lucide-react";

export default function VerificationHistory() {
  return (
    <DashboardLayout>
      <div className="flex min-h-[70vh] items-center justify-center px-4">
        <div className="w-full max-w-md rounded-2xl border border-gray-200 bg-white px-8 py-12 text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-red-200 bg-red-50">
            <Clock size={26} strokeWidth={2} className="text-red-600" />
          </div>

          <span className="mt-6 inline-block rounded-full border border-red-200 bg-white px-3 py-0.5 text-xs font-medium text-red-600">
            Coming soon
          </span>

          <h2 className="mt-4 text-xl font-semibold text-gray-900">
            Verification History
          </h2>

          <p className="mt-2 text-sm leading-6 text-gray-500">
            Exciting updates are on the way. Thank you for waiting!
          </p>
        </div>
      </div>
    </DashboardLayout>
  );
}