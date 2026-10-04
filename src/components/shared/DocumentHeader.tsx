// import React from "react";
// import { ArrowLeft, Award, GraduationCap, FileText, FileCheck, FileBadge2 } from "lucide-react";
// import { useNavigate } from "react-router-dom";

// export interface DocumentHeaderProps {
//   title: string;
//   subtitle?: string;
//   docType?: string;
//   certificateId?: string;
//   icon?: any;
//   onBack?: () => void;
//   backText?: string;
//   actions?: React.ReactNode;
// }

// const getDocTypeIcon = (docType?: string, CustomIcon?: any) => {
//   if (CustomIcon) return CustomIcon;
//   const type = (docType || "").toLowerCase();
//   if (type === "training") return GraduationCap;
//   if (type === "offer-letter") return FileText;
//   if (type === "appreciation-letter") return Award;
//   if (type === "custom") return FileCheck;
//   if (type === "template") return FileBadge2;
//   return Award; // default for internship & general certificates
// };

// const getDocTypeTheme = (docType?: string) => {
//   const type = (docType || "").toLowerCase();
//   if (type === "training") {
//     return {
//       gradient: "from-blue-500/10 via-indigo-500/5 to-transparent",
//       iconBg: "bg-blue-50 border-blue-100 text-blue-600",
//       badgeBg: "bg-blue-50 text-blue-700 border-blue-200",
//     };
//   }
//   if (type === "offer-letter") {
//     return {
//       gradient: "from-emerald-500/10 via-teal-500/5 to-transparent",
//       iconBg: "bg-emerald-50 border-emerald-100 text-emerald-600",
//       badgeBg: "bg-emerald-50 text-emerald-700 border-emerald-200",
//     };
//   }
//   if (type === "appreciation-letter") {
//     return {
//       gradient: "from-amber-500/10 via-orange-500/5 to-transparent",
//       iconBg: "bg-amber-50 border-amber-100 text-amber-600",
//       badgeBg: "bg-amber-50 text-amber-700 border-amber-200",
//     };
//   }
//   if (type === "custom") {
//     return {
//       gradient: "from-purple-500/10 via-pink-500/5 to-transparent",
//       iconBg: "bg-purple-50 border-purple-100 text-purple-600",
//       badgeBg: "bg-purple-50 text-purple-700 border-purple-200",
//     };
//   }
//   // Default red theme for Internship & standard templates
//   return {
//     gradient: "from-red-500/10 via-orange-500/5 to-transparent",
//     iconBg: "bg-red-50 border-red-100 text-red-600",
//     badgeBg: "bg-red-50 text-red-700 border-red-200",
//   };
// };

// export default function DocumentHeader({
//   title,
//   subtitle,
//   docType,
//   certificateId,
//   icon,
//   onBack,
//   backText = "Back",
//   actions,
// }: DocumentHeaderProps) {
//   const navigate = useNavigate();
//   const IconComponent = getDocTypeIcon(docType, icon);
//   const theme = getDocTypeTheme(docType);

//   const handleBack = () => {
//     if (onBack) {
//       onBack();
//     } else {
//       navigate(-1);
//     }
//   };

//   return (
//     <div className="relative overflow-hidden bg-white rounded-2xl sm:rounded-3xl shadow-sm border border-slate-200 p-5 sm:p-8 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-5">
//       {/* Top Subtle Accent Gradient */}
//       <div
//         className={`absolute inset-x-0 top-0 h-16 bg-gradient-to-r ${theme.gradient} pointer-events-none`}
//       />

//       <div className="relative">
//         <button
//           onClick={handleBack}
//           className="flex items-center gap-2 text-red-600 hover:text-red-700 mb-4 sm:mb-5 transition text-sm sm:text-base font-medium group cursor-pointer"
//         >
//           <ArrowLeft size={18} className="transition-transform group-hover:-translate-x-1" />
//           <span>{backText}</span>
//         </button>

//         <div className="flex items-center gap-3 sm:gap-4">
//           <div
//             className={`flex h-11 w-11 sm:h-14 sm:w-14 shrink-0 items-center justify-center rounded-2xl border shadow-sm ${theme.iconBg}`}
//           >
//             <IconComponent className="h-5 w-5 sm:h-7 sm:w-7" />
//           </div>

//           <div>
//             <div className="flex items-center gap-2 flex-wrap">
//               <h1 className="text-xl sm:text-3xl lg:text-4xl font-bold text-slate-900">
//                 {title}
//               </h1>
//               {docType && (
//                 <span
//                   className={`text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-md border ${theme.badgeBg}`}
//                 >
//                   {docType.replace("-", " ")}
//                 </span>
//               )}
//             </div>

//             <p className="text-slate-500 mt-1 text-xs sm:text-base leading-relaxed">
//               {subtitle || `View official ${docType || "document"} details and verification status.`}
//               {certificateId && (
//                 <span className="ml-2 font-mono font-medium text-slate-700">
//                   (ID: {certificateId})
//                 </span>
//               )}
//             </p>
//           </div>
//         </div>
//       </div>

//       {actions && <div className="relative self-start sm:self-auto flex items-center gap-3">{actions}</div>}
//     </div>
//   );
// }

import React from "react";
import {
  ArrowLeft,
  Award,
  GraduationCap,
  FileText,
  FileCheck,
  FileBadge2,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

export interface DocumentHeaderProps {
  title: string;
  subtitle?: string;
  docType?: string;
  certificateId?: string;
  icon?: any;
  onBack?: () => void;
  backText?: string;
  actions?: React.ReactNode;
}

const getDocTypeIcon = (docType?: string, CustomIcon?: any) => {
  if (CustomIcon) return CustomIcon;
  const type = (docType || "").toLowerCase();
  if (type === "training") return GraduationCap;
  if (type === "offer-letter") return FileText;
  if (type === "appreciation-letter") return Award;
  if (type === "custom") return FileCheck;
  if (type === "template") return FileBadge2;
  return Award; // default for internship & general certificates
};

// Unified red theme for ALL document types — no more type-based color switching
const getDocTypeTheme = (_docType?: string) => {
  return {
    gradient: "from-red-500/10 via-orange-500/5 to-transparent",
    iconBg: "bg-red-50 border-red-100 text-red-600",
    badgeBg: "bg-red-50 text-red-700 border-red-200",
  };
};

export default function DocumentHeader({
  title,
  subtitle,
  docType,
  certificateId,
  icon,
  onBack,
  backText = "Back",
  actions,
}: DocumentHeaderProps) {
  const navigate = useNavigate();
  const IconComponent = getDocTypeIcon(docType, icon);
  const theme = getDocTypeTheme(docType);

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      navigate(-1);
    }
  };

  return (
    <div className="relative overflow-hidden bg-white rounded-2xl sm:rounded-3xl shadow-sm border border-slate-200 p-5 sm:p-8 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-5">
      {/* Top Subtle Accent Gradient */}
      <div
        className={`absolute inset-x-0 top-0 h-16 bg-gradient-to-r ${theme.gradient} pointer-events-none`}
      />

      <div className="relative">
        <button
          onClick={handleBack}
          className="flex items-center gap-2 text-red-600 hover:text-red-700 mb-4 sm:mb-5 transition text-sm sm:text-base font-medium group cursor-pointer"
        >
          <ArrowLeft
            size={18}
            className="transition-transform group-hover:-translate-x-1"
          />
          <span>{backText}</span>
        </button>

        <div className="flex items-center gap-3 sm:gap-4">
          <div
            className={`flex h-11 w-11 sm:h-14 sm:w-14 shrink-0 items-center justify-center rounded-2xl border shadow-sm ${theme.iconBg}`}
          >
            <IconComponent className="h-5 w-5 sm:h-7 sm:w-7" />
          </div>

          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h1 className="text-xl sm:text-3xl lg:text-4xl font-bold text-slate-900">
                {title}
              </h1>
              {docType && (
                <span
                  className={`text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-md border ${theme.badgeBg}`}
                >
                  {docType.replace("-", " ")}
                </span>
              )}
            </div>

            <p className="text-slate-500 mt-1 text-xs sm:text-base leading-relaxed">
              {subtitle ||
                `View official ${docType || "document"} details and verification status.`}
              {certificateId && (
                <span className="ml-2 font-mono font-medium text-slate-700">
                  (ID: {certificateId})
                </span>
              )}
            </p>
          </div>
        </div>
      </div>

      {actions && (
        <div className="relative self-start sm:self-auto flex items-center gap-3">
          {actions}
        </div>
      )}
    </div>
  );
}
