import {
  Copy,
  Download,
  Eye,
  FileOutput,
  Pencil,
  Trash2,
} from "lucide-react";

interface Props {
  template: any;
  refreshTemplates: () => void;

  onPreview: (template: any) => void;
  onEdit: (template: any) => void;
  onDelete: (template: any) => void;
}

const actions = [
  {
    title: "Preview Template",
    description: "View certificate in full screen.",
    icon: Eye,
    color: "bg-blue-50 text-blue-600",
    enabled: true,
  },
  {
    title: "Edit Template",
    description: "Modify layout, fonts and variables.",
    icon: Pencil,
    color: "bg-yellow-50 text-yellow-600",
    enabled: true,
  },
  {
    title: "Duplicate",
    description: "Coming Soon",
    icon: Copy,
    color: "bg-green-50 text-green-600",
    enabled: false,
  },
  {
    title: "Export PDF",
    description: "Coming Soon",
    icon: Download,
    color: "bg-purple-50 text-purple-600",
    enabled: false,
  },
  {
    title: "Generate Sample",
    description: "Coming Soon",
    icon: FileOutput,
    color: "bg-indigo-50 text-indigo-600",
    enabled: false,
  },
  {
    title: "Delete Template",
    description: "Remove this template permanently.",
    icon: Trash2,
    color: "bg-red-50 text-red-600",
    enabled: true,
  },
];

export default function TemplateActions({
  template,
  onPreview,
  onEdit,
  onDelete,
}: Props) {

  const handleAction = (title: string) => {
  if (!template) return;

  switch (title) {
    case "Preview Template":
      onPreview(template);
      break;

    case "Edit Template":
      onEdit(template);
      break;

    case "Delete Template":
      onDelete(template);
      break;

    default:
      break;
  }
};

  return (
    <section className="rounded-3xl border border-gray-200 bg-white shadow-sm">
      <div className="border-b border-gray-100 p-6">
        <h2 className="text-2xl font-bold text-gray-900">
          Template Actions
        </h2>

        <p className="mt-2 text-gray-500">
          {template
            ? `Manage "${template.name}"`
            : "Select a template first."}
        </p>
      </div>

      <div className="grid gap-6 p-6 md:grid-cols-2 xl:grid-cols-3">
        {actions.map((action) => {
          const Icon = action.icon;

          return (
            <button
    onClick={() => handleAction(action.title)}
              key={action.title}
              disabled={!template || !action.enabled}
              className={`rounded-2xl border border-gray-200 p-6 text-left transition-all
                ${
                  !template || !action.enabled
                    ? "cursor-not-allowed opacity-50"
                    : "hover:-translate-y-1 hover:border-red-300 hover:shadow-lg"
                }`}
            >
              <div
                className={`flex h-14 w-14 items-center justify-center rounded-2xl ${action.color}`}
              >
                <Icon size={24} />
              </div>

              <h3 className="mt-6 text-lg font-semibold text-gray-900">
                {action.title}
              </h3>

              <p className="mt-2 text-sm leading-6 text-gray-500">
                {action.description}
              </p>
            </button>
          );
        })}
      </div>
    </section>
  );
}