import {
  CheckCircle2,
  UploadCloud,
  FileBadge2,
  UserPlus,
  Clock3,
} from "lucide-react";

const activities = [
  {
    title: "Student data uploaded",
    description: "128 new student records were uploaded successfully.",
    time: "10 minutes ago",
    icon: UploadCloud,
    color: "bg-blue-100 text-blue-600",
  },
  {
    title: "Certificates generated",
    description: "86 internship certificates generated.",
    time: "35 minutes ago",
    icon: FileBadge2,
    color: "bg-red-100 text-red-600",
  },
  {
    title: "Verification completed",
    description: "42 certificates verified successfully.",
    time: "1 hour ago",
    icon: CheckCircle2,
    color: "bg-green-100 text-green-600",
  },
  {
    title: "New organization member",
    description: "Rahul Sharma joined the organization.",
    time: "Today",
    icon: UserPlus,
    color: "bg-purple-100 text-purple-600",
  },
];

export default function RecentActivity() {
  return (
    <section className="rounded-3xl border border-gray-200 bg-white shadow-sm">
      <div className="border-b border-gray-100 p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-red-600">
              Timeline
            </p>

            <h2 className="mt-2 text-2xl font-bold text-gray-900">
              Recent Activity
            </h2>
          </div>

          <Clock3 className="text-gray-400" />
        </div>
      </div>

      <div className="p-6">
        <div className="space-y-8">
          {activities.map((activity, index) => {
            const Icon = activity.icon;

            return (
              <div key={index} className="flex gap-5">
                <div
                  className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl ${activity.color}`}
                >
                  <Icon size={20} />
                </div>

                <div className="flex-1">
                  <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                    <h3 className="font-semibold text-gray-900">
                      {activity.title}
                    </h3>

                    <span className="text-sm text-gray-400">
                      {activity.time}
                    </span>
                  </div>

                  <p className="mt-2 text-sm leading-6 text-gray-500">
                    {activity.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        <button className="mt-8 w-full rounded-2xl border border-gray-200 py-3 font-medium transition hover:border-red-500 hover:bg-red-50">
          View Complete Activity
        </button>
      </div>
    </section>
  );
}