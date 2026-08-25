import DashboardLayout from "../../../layouts/DashboardLayout";
import { Server, ArrowLeft, Clock, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function SelfHostedPlatformsPage() {
  const navigate = useNavigate();

  return (
    <DashboardLayout>
      <div className="flex min-h-[75vh] flex-col items-center justify-center p-4 text-center">
        <div className="mx-auto max-w-md space-y-6">
          {/* Animated Icon Badge */}
          <div className="relative mx-auto flex h-24 w-24 items-center justify-center rounded-3xl bg-red-50 text-red-600 shadow-lg shadow-red-500/10 border border-red-100">
            <Server size={44} />
            <div className="absolute -top-1 -right-1 flex h-7 w-7 items-center justify-center rounded-full bg-amber-500 text-white shadow-md">
              <Clock size={16} />
            </div>
          </div>

          {/* Badge */}
          <div className="inline-flex items-center gap-2 rounded-full bg-red-50 px-4 py-1.5 text-xs font-semibold text-red-600 border border-red-100">
            <Sparkles size={14} />
            Feature Under Development
          </div>

          {/* Headline & Description */}
          <div className="space-y-3">
            <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight sm:text-4xl">
              Self-Hosted Platform
            </h1>
            <p className="text-base text-gray-500 leading-relaxed">
              This page will be available soon. We are working hard to bring you the best self-hosted experience for your organization.
            </p>
          </div>

          {/* Action Button */}
          <div className="pt-2">
            <button
              onClick={() => navigate("/organization/dashboard")}
              className="inline-flex items-center gap-2 rounded-xl bg-red-600 px-6 py-3 text-sm font-bold text-white shadow-md transition-all hover:bg-red-700 hover:shadow-lg active:scale-95 cursor-pointer"
            >
              <ArrowLeft size={18} />
              Back to Dashboard
            </button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
