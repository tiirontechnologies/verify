// import {
//   Building2,
//   UserCog,
//   ImagePlus,
//   CircleCheckBig,
// } from "lucide-react";

// const steps = [
//   {
//     title: "Organization",
//     icon: Building2,
//     active: true,
//   },
//   {
//     title: "Administrator",
//     icon: UserCog,
//     active: false,
//   },
//   {
//     title: "Branding",
//     icon: ImagePlus,
//     active: false,
//   },
//   {
//     title: "Review",
//     icon: CircleCheckBig,
//     active: false,
//   },
// ];

// export default function SignupProgress() {
//   return (
//     <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
//       <div className="flex items-center justify-between">
//         {steps.map((step, index) => {
//           const Icon = step.icon;

//           return (
//             <div
//               key={step.title}
//               className="flex flex-1 items-center"
//             >
//               <div className="flex items-center gap-4">
//                 <div
//                   className={`flex h-14 w-14 items-center justify-center rounded-2xl transition ${
//                     step.active
//                       ? "bg-red-600 text-white shadow-lg"
//                       : "bg-slate-100 text-slate-500"
//                   }`}
//                 >
//                   <Icon size={22} />
//                 </div>

//                 <div>
//                   <p className="text-sm text-slate-500">
//                     Step {index + 1}
//                   </p>

//                   <h3
//                     className={`font-semibold ${
//                       step.active
//                         ? "text-red-600"
//                         : "text-slate-700"
//                     }`}
//                   >
//                     {step.title}
//                   </h3>
//                 </div>
//               </div>

//               {index !== steps.length - 1 && (
//                 <div className="mx-6 hidden h-[2px] flex-1 bg-slate-200 lg:block">
//                   <div className="h-full w-1/4 rounded-full bg-red-600" />
//                 </div>
//               )}
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// }


import {
  Building2,
  UserCog,
  ImagePlus,
  CircleCheckBig,
} from "lucide-react";

const steps = [
  {
    title: "Organization",
    icon: Building2,
    active: true,
  },
  {
    title: "Administrator",
    icon: UserCog,
    active: false,
  },
  {
    title: "Branding",
    icon: ImagePlus,
    active: false,
  },
  {
    title: "Review",
    icon: CircleCheckBig,
    active: false,
  },
];

export default function SignupProgress() {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-3 shadow-sm sm:p-4 lg:p-5">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => {
          const Icon = step.icon;

          return (
            <div key={step.title} className="flex flex-1 items-center">
              <div className="flex items-center gap-2 sm:gap-3">
                <div
                  className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-xl transition sm:h-9 sm:w-9 lg:h-10 lg:w-10 ${
                    step.active
                      ? "bg-red-600 text-white shadow-lg"
                      : "bg-slate-100 text-slate-500"
                  }`}
                >
                  <Icon size={16} />
                </div>

                <div className="hidden sm:block">
                  <p className="text-[10px] text-slate-500 lg:text-xs">
                    Step {index + 1}
                  </p>

                  <h3
                    className={`text-xs font-semibold lg:text-sm ${
                      step.active ? "text-red-600" : "text-slate-700"
                    }`}
                  >
                    {step.title}
                  </h3>
                </div>
              </div>

              {index !== steps.length - 1 && (
                <div className="mx-2 hidden h-[2px] flex-1 bg-slate-200 sm:mx-3 lg:mx-6 lg:block">
                  <div className="h-full w-1/4 rounded-full bg-red-600" />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}