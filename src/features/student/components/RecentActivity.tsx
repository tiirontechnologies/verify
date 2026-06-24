import {
  CheckCircle,
  Download,
  Share2,
  PlusCircle,
} from "lucide-react";

export default function RecentActivity() {
  return (
    <div className="bg-white rounded-3xl border p-8 shadow-sm">

      <h2 className="text-2xl font-bold mb-8">
        Recent Activity
      </h2>

      <div className="space-y-6">

        <div className="flex items-center gap-4">
          <CheckCircle className="text-green-500" />
          <p>Credential verified successfully.</p>
        </div>

        <div className="flex items-center gap-4">
          <Share2 className="text-blue-500" />
          <p>Shared Python Certification.</p>
        </div>

        <div className="flex items-center gap-4">
          <Download className="text-orange-500" />
          <p>Downloaded AWS Certificate.</p>
        </div>

        <div className="flex items-center gap-4">
          <PlusCircle className="text-purple-500" />
          <p>New credential added.</p>
        </div>

      </div>

    </div>
  );
}