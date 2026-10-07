import { FileBadge2, Plus } from "lucide-react";

interface CertificateTemplateHeroProps {
  onCreateTemplate: () => void;
  onImportTemplate: () => void;
}

export default function CertificateTemplateHero({
  onCreateTemplate,
}: CertificateTemplateHeroProps) {
  return (
    <section className="rounded-3xl border border-gray-200 bg-white shadow-sm">
      <div className="flex flex-col gap-6 p-8 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full bg-red-50 px-4 py-2 text-sm font-medium text-red-600">
            <FileBadge2 size={16} />
            Certificate Management
          </div>

          <h1 className="mt-5 text-4xl font-bold tracking-tight text-gray-900">
            Certificate Templates
          </h1>

          <p className="mt-4 max-w-2xl leading-7 text-gray-500">
            Manage, import and customize certificate templates for
            your organization’s programs. Select a template
            before generating certificates for students.
          </p>
        </div>

        <div className="flex flex-wrap gap-4">
          
          <button
            onClick={onCreateTemplate}
            className="inline-flex items-center gap-2 rounded-2xl bg-red-600 px-6 py-3 font-medium text-white transition hover:bg-red-700"
          >
            <Plus size={18} />
            Create Template
          </button>
        </div>
      </div>
    </section>
  );
}
