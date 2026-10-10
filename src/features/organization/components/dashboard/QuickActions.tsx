import {
  ArrowRight,
  UploadCloud,
 Users,
  FileBadge2,
  UserCog,
  Megaphone,
  Server,
  LifeBuoy,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const actions = [
  {
    title: "Certificate Templates",
    description:
      "Create and manage certificate and document templates for your organization.",
    icon: FileBadge2,
    route: "/organization/templates",
    color: "bg-red-50 text-red-600",
  },
  {
    title: "Upload Student Data",
    description:
      "Import students using Excel or CSV and validate records before upload.",
    icon: UploadCloud,
    route: "/organization/student-upload",
    color: "bg-blue-50 text-blue-600",
  },
  {
    title: "Update Student Data",
    description:
      "Edit, search, filter and manage uploaded student information.",
    icon: Users,
    route: "/organization/update-student",
    color: "bg-green-50 text-green-600",
  },
  {
    title: "Profile Management",
    description:
      "Manage organization profile, members and account settings.",
    icon: UserCog,
    route: "/organization/profile",
    color: "bg-purple-50 text-purple-600",
  },
  {
    title: "Advertisements",
    description:
      "Manage banners, campaigns and promotional content.",
    icon: Megaphone,
    route: "/organization/ads",
    color: "bg-yellow-50 text-yellow-600",
  },
  {
    title: "Self Hosted Platforms",
    description:
      "Configure domains, integrations, APIs and self-hosted services.",
    icon: Server,
    route: "/organization/self-hosted",
    color: "bg-slate-100 text-slate-700",
  },
  {
    title: "Support Tickets",
    description: "Raise organization support requests and follow replies from the Tiiron support team.",
    icon: LifeBuoy,
    route: "/tickets",
    color: "bg-rose-50 text-rose-600",
  },
];

export default function QuickActions() {
  const navigate = useNavigate();

  return (
    <section className="rounded-3xl border border-gray-200 bg-white shadow-sm">
      <div className="border-b border-gray-100 p-6">
        <p className="text-sm font-medium text-red-600">
          Organization Modules
        </p>

        <h2 className="mt-2 text-2xl font-bold text-gray-900">
          Quick Actions
        </h2>

        <p className="mt-2 text-gray-500">
          Access the major modules of your organization from one place.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-5 p-6 md:grid-cols-2 xl:grid-cols-3">
        {actions.map((action) => {
          const Icon = action.icon;

          return (
            <button
              key={action.title}
              onClick={() => navigate(action.route)}
              className="group rounded-2xl border border-gray-200 p-6 text-left transition-all duration-300 hover:-translate-y-1 hover:border-red-300 hover:shadow-lg"
            >
              <div
                className={`flex h-14 w-14 items-center justify-center rounded-2xl ${action.color}`}
              >
                <Icon size={26} />
              </div>

              <h3 className="mt-6 text-lg font-semibold text-gray-900">
                {action.title}
              </h3>

              <p className="mt-3 text-sm leading-6 text-gray-500">
                {action.description}
              </p>

              <div className="mt-6 flex items-center justify-between">
                <span className="text-sm font-medium text-red-600">
                  Open Module
                </span>

                <ArrowRight
                  size={18}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
}
