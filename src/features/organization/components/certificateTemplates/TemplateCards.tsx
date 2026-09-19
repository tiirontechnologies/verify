// import { useState } from "react";
// import {
//   FileBadge2,
//   CheckCircle2,
//   Eye,
//   Edit3,
//   Trash2,
//   Star,
// } from "lucide-react";

// interface TemplateCardProps {
//   templates: any[];
//   selectedTemplate: any;
//   onSelect: (template: any) => void;
//   onPreview: (template: any) => void;
//   onEdit: (template: any) => void;
//   onDelete: (template: any) => void;
//   onSetDefault: (template: any) => void;
//   loading: boolean;
// }

// const CATEGORIES = [
//   { id: "all", label: "All Templates" },
//   { id: "internship", label: "Internship" },
//   { id: "training", label: "Training" },
//   { id: "offer-letter", label: "Offer Letter" },
//   { id: "appreciation-letter", label: "Appreciation" },
//   { id: "custom", label: "Custom" },
// ];

// export default function TemplateCards({
//   templates,
//   selectedTemplate,
//   onSelect,
//   onPreview,
//   onEdit,
//   onDelete,
//   onSetDefault,
//   loading,
// }: TemplateCardProps) {
//   const [activeCategory, setActiveCategory] = useState("all");

//   const filteredTemplates = templates.filter((t) => {
//     if (activeCategory === "all") return true;
//     return t.documentType === activeCategory;
//   });

//   if (loading) {
//     return (
//       <section className="rounded-3xl border border-gray-200 bg-white shadow-sm">
//         <div className="border-b border-gray-100 p-6">
//           <h2 className="text-2xl font-bold text-gray-900">
//             Available Templates
//           </h2>
//           <p className="mt-2 text-gray-500">Loading templates...</p>
//         </div>

//         <div className="grid gap-6 p-6 md:grid-cols-2 xl:grid-cols-3">
//           {[1, 2, 3].map((item) => (
//             <div
//               key={item}
//               className="h-64 animate-pulse rounded-2xl bg-gray-100"
//             />
//           ))}
//         </div>
//       </section>
//     );
//   }

//   return (
//     <section className="rounded-3xl border border-gray-200 bg-white shadow-sm overflow-hidden">
//       <div className="border-b border-gray-100 p-4 sm:p-6 space-y-4">
//         <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
//           <div>
//             <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
//               Available Templates ({filteredTemplates.length})
//             </h2>
//             <p className="mt-1 text-xs sm:text-sm text-gray-500">
//               Bifurcated by Document Type. Select the active default template for students.
//             </p>
//           </div>
//         </div>

//         {/* Category Bifurcation Tabs */}
//         <div className="flex items-center gap-2 pt-2 overflow-x-auto no-scrollbar flex-nowrap sm:flex-wrap pb-1">
//           {CATEGORIES.map((cat) => {
//             const count =
//               cat.id === "all"
//                 ? templates.length
//                 : templates.filter((t) => t.documentType === cat.id).length;

//             return (
//               <button
//                 key={cat.id}
//                 onClick={() => setActiveCategory(cat.id)}
//                 className={`flex items-center gap-2 rounded-xl px-3.5 py-2 text-xs font-semibold shrink-0 transition ${
//                   activeCategory === cat.id
//                     ? "bg-red-600 text-white shadow-md font-bold"
//                     : "bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-gray-900"
//                 }`}
//               >
//                 {cat.label}
//                 <span
//                   className={`rounded-full px-2 py-0.5 text-[10px] ${
//                     activeCategory === cat.id
//                       ? "bg-red-700 text-white"
//                       : "bg-gray-200 text-gray-700"
//                   }`}
//                 >
//                   {count}
//                 </span>
//               </button>
//             );
//           })}
//         </div>
//       </div>

//       {!filteredTemplates.length ? (
//         <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
//           <FileBadge2 size={50} className="text-gray-300 sm:size-[60px]" />
//           <h3 className="mt-4 text-lg sm:text-xl font-semibold text-gray-800">
//             No Templates Found for {activeCategory}
//           </h3>
//           <p className="mt-2 text-gray-500 text-xs sm:text-sm max-w-sm">
//             Create a new template for this document type to get started.
//           </p>
//         </div>
//       ) : (
//         <div className="grid gap-4 sm:gap-6 p-4 sm:p-6 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
//           {filteredTemplates.map((template) => {
//             const isSelected = selectedTemplate?._id === template._id;

//             return (
//               <div
//                 key={template._id}
//                 onClick={() => onSelect(template)}
//                 className={`group flex flex-col justify-between rounded-2xl border p-4 sm:p-6 transition-all duration-200 bg-white hover:-translate-y-1 hover:shadow-xl cursor-pointer ${
//                   isSelected
//                     ? "border-red-500 ring-2 ring-red-100 shadow-md"
//                     : "border-gray-200 hover:border-red-300"
//                 }`}
//               >
//                 <div>
//                   {/* Header */}
//                   <div className="flex items-center justify-between gap-2 flex-wrap sm:flex-nowrap">
//                     <div className="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-2xl bg-red-50 text-red-600 shrink-0">
//                       <FileBadge2 size={22} />
//                     </div>

//                     <div className="flex items-center gap-2">
//                       {template.isDefault ? (
//                         <span className="inline-flex items-center gap-1 rounded-full bg-green-100 px-2.5 py-1 text-[11px] sm:text-xs font-bold text-green-700 border border-green-200 shadow-sm">
//                           <CheckCircle2 size={13} /> Active Default
//                         </span>
//                       ) : (
//                         <button
//                           onClick={(e) => {
//                             e.stopPropagation();
//                             onSetDefault(template);
//                           }}
//                           className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-2.5 py-1 text-[11px] sm:text-xs font-semibold text-amber-700 hover:bg-amber-100 border border-amber-200 transition"
//                           title="Set as active template for this document type"
//                         >
//                           <Star size={13} /> Set Default
//                         </button>
//                       )}
//                     </div>
//                   </div>

//                   {/* Title & Document Type */}
//                   <h3 className="mt-4 sm:mt-5 text-base sm:text-lg font-bold text-gray-900 group-hover:text-red-600 transition break-words">
//                     {template.name}
//                   </h3>
//                   <span className="mt-1 inline-block uppercase text-[10px] sm:text-[11px] font-bold tracking-wider text-red-600 bg-red-50 px-2.5 py-0.5 rounded-md">
//                     {template.documentType}
//                   </span>

//                   {/* Metadata */}
//                   <div className="mt-4 rounded-xl bg-gray-50 p-3 text-[11px] sm:text-xs text-gray-500 flex justify-between">
//                     <span>Engine: {template.design?.editor || "Fabric.js"}</span>
//                     <span>
//                       {new Date(template.updatedAt).toLocaleDateString("en-US", {
//                         month: "short",
//                         day: "numeric",
//                         year: "numeric",
//                       })}
//                     </span>
//                   </div>
//                 </div>

//                 {/* Action Buttons inside Card */}
//                 <div className="mt-5 sm:mt-6 flex items-center gap-2 border-t pt-4">
//                   <button
//                     onClick={(e) => {
//                       e.stopPropagation();
//                       onPreview(template);
//                     }}
//                     className="flex-1 flex items-center justify-center gap-1.5 rounded-xl border border-gray-200 bg-gray-50 px-2.5 py-2 text-xs font-semibold text-gray-700 hover:bg-gray-100 hover:border-gray-300 transition"
//                     title="Preview Template"
//                   >
//                     <Eye size={15} className="text-gray-600" /> Preview
//                   </button>

//                   <button
//                     onClick={(e) => {
//                       e.stopPropagation();
//                       onEdit(template);
//                     }}
//                     className="flex-1 flex items-center justify-center gap-1.5 rounded-xl bg-red-600 px-2.5 py-2 text-xs font-semibold text-white hover:bg-red-700 shadow-sm transition"
//                     title="Edit Template"
//                   >
//                     <Edit3 size={15} /> Edit
//                   </button>

//                   <button
//                     onClick={(e) => {
//                       e.stopPropagation();
//                       onDelete(template);
//                     }}
//                     className="flex items-center justify-center rounded-xl border border-gray-200 bg-gray-50 p-2 text-red-600 hover:bg-red-50 hover:border-red-200 transition shrink-0"
//                     title="Delete Template"
//                   >
//                     <Trash2 size={16} />
//                   </button>
//                 </div>
//               </div>
//             );
//           })}
//         </div>
//       )}
//     </section>
//   );
// }

import { useState, useMemo } from "react";
import {
  FileBadge2,
  CheckCircle2,
  Eye,
  Edit3,
  Trash2,
  Star,
} from "lucide-react";

interface TemplateCardProps {
  templates: any[];
  selectedTemplate: any;
  onSelect: (template: any) => void;
  onPreview: (template: any) => void;
  onEdit: (template: any) => void;
  onDelete: (template: any) => void;
  onSetDefault: (template: any) => void;
  loading: boolean;
}

// converts "appreciation-letter" / "offer_letter" -> "Appreciation Letter"
const formatLabel = (type: string) =>
  type
    .replace(/[-_]/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .split(" ")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");

export default function TemplateCards({
  templates,
  selectedTemplate,
  onSelect,
  onPreview,
  onEdit,
  onDelete,
  onSetDefault,
  loading,
}: TemplateCardProps) {
  const [activeCategory, setActiveCategory] = useState("all");

  // Dynamically build categories from whatever documentType values exist in templates
  const categories = useMemo(() => {
    const uniqueTypes = Array.from(
      new Set(
        templates
          .map((t) => t.documentType)
          .filter((type): type is string => Boolean(type))
      )
    );

    return [
      { id: "all", label: "All Templates" },
      ...uniqueTypes.map((type) => ({ id: type, label: formatLabel(type) })),
    ];
  }, [templates]);

  const filteredTemplates = templates.filter((t) => {
    if (activeCategory === "all") return true;
    return t.documentType === activeCategory;
  });

  if (loading) {
    return (
      <section className="rounded-3xl border border-gray-200 bg-white shadow-sm">
        <div className="border-b border-gray-100 p-6">
          <h2 className="text-2xl font-bold text-gray-900">
            Available Templates
          </h2>
          <p className="mt-2 text-gray-500">Loading templates...</p>
        </div>

        <div className="grid gap-6 p-6 md:grid-cols-2 xl:grid-cols-3">
          {[1, 2, 3].map((item) => (
            <div
              key={item}
              className="h-64 animate-pulse rounded-2xl bg-gray-100"
            />
          ))}
        </div>
      </section>
    );
  }

  return (
    <section className="rounded-3xl border border-gray-200 bg-white shadow-sm overflow-hidden">
      <div className="border-b border-gray-100 p-4 sm:p-6 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
              Available Templates ({filteredTemplates.length})
            </h2>
            <p className="mt-1 text-xs sm:text-sm text-gray-500">
              Bifurcated by Document Type. Select the active default template for students.
            </p>
          </div>
        </div>

        {/* Category Bifurcation Tabs - built dynamically from backend documentType values */}
        <div className="flex items-center gap-2 pt-2 overflow-x-auto no-scrollbar flex-nowrap sm:flex-wrap pb-1">
          {categories.map((cat) => {
            const count =
              cat.id === "all"
                ? templates.length
                : templates.filter((t) => t.documentType === cat.id).length;

            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`flex items-center gap-2 rounded-xl px-3.5 py-2 text-xs font-semibold shrink-0 transition ${
                  activeCategory === cat.id
                    ? "bg-red-600 text-white shadow-md font-bold"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-gray-900"
                }`}
              >
                {cat.label}
                <span
                  className={`rounded-full px-2 py-0.5 text-[10px] ${
                    activeCategory === cat.id
                      ? "bg-red-700 text-white"
                      : "bg-gray-200 text-gray-700"
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {!filteredTemplates.length ? (
        <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
          <FileBadge2 size={50} className="text-gray-300 sm:size-[60px]" />
          <h3 className="mt-4 text-lg sm:text-xl font-semibold text-gray-800">
            No Templates Found
            {activeCategory !== "all" &&
              ` for ${formatLabel(activeCategory)}`}
          </h3>
          <p className="mt-2 text-gray-500 text-xs sm:text-sm max-w-sm">
            Create a new template for this document type to get started.
          </p>
        </div>
      ) : (
        <div className="grid gap-4 sm:gap-6 p-4 sm:p-6 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
          {filteredTemplates.map((template) => {
            const isSelected = selectedTemplate?._id === template._id;

            return (
              <div
                key={template._id}
                onClick={() => onSelect(template)}
                className={`group flex flex-col justify-between rounded-2xl border p-4 sm:p-6 transition-all duration-200 bg-white hover:-translate-y-1 hover:shadow-xl cursor-pointer ${
                  isSelected
                    ? "border-red-500 ring-2 ring-red-100 shadow-md"
                    : "border-gray-200 hover:border-red-300"
                }`}
              >
                <div>
                  {/* Header */}
                  <div className="flex items-center justify-between gap-2 flex-wrap sm:flex-nowrap">
                    <div className="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-2xl bg-red-50 text-red-600 shrink-0">
                      <FileBadge2 size={22} />
                    </div>

                    <div className="flex items-center gap-2">
                      {template.isDefault ? (
                        <span className="inline-flex items-center gap-1 rounded-full bg-green-100 px-2.5 py-1 text-[11px] sm:text-xs font-bold text-green-700 border border-green-200 shadow-sm">
                          <CheckCircle2 size={13} /> Active Default
                        </span>
                      ) : (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onSetDefault(template);
                          }}
                          className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-2.5 py-1 text-[11px] sm:text-xs font-semibold text-amber-700 hover:bg-amber-100 border border-amber-200 transition"
                          title="Set as active template for this document type"
                        >
                          <Star size={13} /> Set Default
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Title & Document Type (raw value from backend) */}
                  <h3 className="mt-4 sm:mt-5 text-base sm:text-lg font-bold text-gray-900 group-hover:text-red-600 transition break-words">
                    {template.name}
                  </h3>
                  <span className="mt-1 inline-block uppercase text-[10px] sm:text-[11px] font-bold tracking-wider text-red-600 bg-red-50 px-2.5 py-0.5 rounded-md">
                    {template.documentType}
                  </span>

                  {/* Metadata */}
                  <div className="mt-4 rounded-xl bg-gray-50 p-3 text-[11px] sm:text-xs text-gray-500 flex justify-between">
                    <span>Engine: {template.design?.editor || "Fabric.js"}</span>
                    <span>
                      {new Date(template.updatedAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </span>
                  </div>
                </div>

                {/* Action Buttons inside Card */}
                <div className="mt-5 sm:mt-6 flex items-center gap-2 border-t pt-4">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onPreview(template);
                    }}
                    className="flex-1 flex items-center justify-center gap-1.5 rounded-xl border border-gray-200 bg-gray-50 px-2.5 py-2 text-xs font-semibold text-gray-700 hover:bg-gray-100 hover:border-gray-300 transition"
                    title="Preview Template"
                  >
                    <Eye size={15} className="text-gray-600" /> Preview
                  </button>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onEdit(template);
                    }}
                    className="flex-1 flex items-center justify-center gap-1.5 rounded-xl bg-red-600 px-2.5 py-2 text-xs font-semibold text-white hover:bg-red-700 shadow-sm transition"
                    title="Edit Template"
                  >
                    <Edit3 size={15} /> Edit
                  </button>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onDelete(template);
                    }}
                    className="flex items-center justify-center rounded-xl border border-gray-200 bg-gray-50 p-2 text-red-600 hover:bg-red-50 hover:border-red-200 transition shrink-0"
                    title="Delete Template"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}