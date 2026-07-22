// import { useState } from "react";

// import {
//   Building2,
//   Mail,
//   Globe,
//   User,
//   MessageSquare,
// } from "lucide-react";

// import {
//   COMPANY_SIZES,
//   USE_CASES,
// } from "./demo.constants";

// export default function DemoForm() {
//   const [form, setForm] = useState({
//     email: "",
//     firstName: "",
//     lastName: "",
//     company: "",
//     website: "",
//     employees: "",
//     useCase: "",
//     message: "",
//   });

//   const handleChange = (
//     e: React.ChangeEvent<
//       HTMLInputElement |
//       HTMLSelectElement |
//       HTMLTextAreaElement
//     >
//   ) => {
//     setForm({
//       ...form,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();

//     console.log(form);

//     // API Call
//   };

//   return (
//     <div
//   className="
// p-6
// sm:p-8
// lg:p-14
// xl:p-20
// "
// >
//       <h2 className="text-3xl
// sm:text-4xl
// lg:text-5xl font-bold text-slate-900">
//         Book a Demo
//       </h2>

//       <p className="mt-1 text-slate-500">
//         Tell us about your organization and we'll
//         schedule a personalized demo.
//       </p>

//       <form
//         onSubmit={handleSubmit}
//         className="space-y-6 mt-8 lg:mt-12"
//       >
//         {/* Email */}

//         <div>

//           <label className="text-sm font-medium text-slate-600">
//             Work Email
//           </label>

//           <div className="mt-2 relative">

//             <Mail
//               size={18}
//               className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
//             />

//             <input
//               name="email"
//               type="email"
//               value={form.email}
//               onChange={handleChange}
//               placeholder="john@company.com"
//               className="
//               w-full
//               h-14
//               rounded-xl
//               border
//               border-slate-200 bg-slate-50
//               pl-12
//               pr-4
//               outline-none
//               focus:border-red-500
//               "
//             />

//           </div>

//         </div>

//         {/* Name */}

//         <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

//           <div>

//             <label className="text-sm font-medium text-slate-600">
//               First Name
//             </label>

//             <div className="relative mt-2">

//               <User
//                 size={18}
//                 className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
//               />

//               <input
//                 name="firstName"
//                 value={form.firstName}
//                 onChange={handleChange}
//                 placeholder="John"
//                 className="
//                 w-full
//                 h-14
//                 rounded-xl
//                 border
//                 border-slate-200 bg-slate-50
//                 pl-12
//                 pr-4
//                 outline-none
//                 focus:border-red-500
//                 "
//               />

//             </div>

//           </div>

//           <div>

//             <label className="text-sm font-medium text-slate-600">
//               Last Name
//             </label>

//             <input
//               name="lastName"
//               value={form.lastName}
//               onChange={handleChange}
//               placeholder="Doe"
//               className="
//               mt-2
//               w-full
//               h-14
//               rounded-xl
//               border
//               border-slate-200 bg-slate-50
//               px-4
//               outline-none
//               focus:border-red-500
//               "
//             />

//           </div>

//         </div>

//         {/* Company */}

//         <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

//           <div>

//             <label className="text-sm font-medium text-slate-600">
//               Organization
//             </label>

//             <div className="relative mt-2">

//               <Building2
//                 size={18}
//                 className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
//               />

//               <input
//                 name="company"
//                 value={form.company}
//                 onChange={handleChange}
//                 placeholder="Tiiron Technologies"
//                 className="
//                 w-full
//                 h-14
//                 rounded-xl
//                 border
//                 border-slate-200 bg-slate-50
//                 pl-12
//                 pr-4
//                 outline-none
//                 focus:border-red-500
//                 "
//               />

//             </div>

//           </div>

//           <div>

//             <label className="text-sm font-medium text-slate-600">
//               Website
//             </label>

//             <div className="relative mt-2">

//               <Globe
//                 size={18}
//                 className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
//               />

//               <input
//                 name="website"
//                 value={form.website}
//                 onChange={handleChange}
//                 placeholder="https://"
//                 className="
//                 w-full
//                 h-14
//                 rounded-xl
//                 border
//                 border-slate-200 bg-slate-50
//                 pl-12
//                 pr-4
//                 outline-none
//                 focus:border-red-500
//                 "
//               />

//             </div>

//           </div>

//         </div>

//         {/* Dropdown */}

//         <div>

//           <label className="text-sm font-medium text-slate-600">
//             Organization Size
//           </label>

//           <select
//             name="employees"
//             value={form.employees}
//             onChange={handleChange}
//             className="
//             mt-2
//             w-full
//             h-14
//             rounded-xl
//             border
//             border-slate-200 bg-slate-50
//             px-4
//             outline-none
//             focus:border-red-500
//             "
//           >
//             <option value="">
//               Select Organization Size
//             </option>

//             {COMPANY_SIZES.map((item) => (
//               <option
//                 key={item}
//                 value={item}
//               >
//                 {item}
//               </option>
//             ))}

//           </select>

//         </div>

//         <div>

//           <label className="text-sm font-medium text-slate-600">
//             Interested In
//           </label>

//           <select
//             name="useCase"
//             value={form.useCase}
//             onChange={handleChange}
//             className="
//             mt-2
//             w-full
//             h-14
//             rounded-xl
//             border
//             border-slate-200 bg-slate-50
//             px-4
//             outline-none
//             focus:border-red-500
//             "
//           >
//             <option value="">
//               Select Use Case
//             </option>

//             {USE_CASES.map((item) => (
//               <option
//                 key={item}
//                 value={item}
//               >
//                 {item}
//               </option>
//             ))}

//           </select>

//         </div>

//         {/* Message */}

//         <div>

//           <label className="text-sm font-medium text-slate-600">
//             Message
//           </label>

//           <div className="relative mt-2">

//             <MessageSquare
//               size={18}
//               className="absolute left-4 top-5 text-slate-400"
//             />

//             <textarea
//               rows={5}
//               name="message"
//               value={form.message}
//               onChange={handleChange}
//               placeholder="Tell us about your requirements..."
//               className="
//               w-full
//               rounded-xl
//               border
//               border-slate-200 bg-slate-50
//               pl-12
//               pr-4
//               pt-4
//               outline-none
//               resize-none
//               focus:border-red-500
//               "
//             />

//           </div>

//         </div>

//         {/* Button */}

//         <button
//           type="submit"
//           className="
//           w-full
//           h-14
// lg:h-16
//           rounded-xl
//           bg-red-600
//           hover:bg-red-700
//           text-white
//           text-lg
//           font-semibold
//           transition
//           "
//         >
//           Book My Demo
//         </button>

//       </form>
//     </div>
//   );
// }


import { useState } from "react";

import {
  Building2,
  Mail,
  Globe,
  User,
  MessageSquare,
} from "lucide-react";

import {
  COMPANY_SIZES,
  USE_CASES,
} from "./demo.constants";

const inputClass =
  "w-full h-11 rounded-lg border border-slate-200 bg-slate-50 pl-11 pr-3 text-sm outline-none focus:border-red-500";

const plainInputClass =
  "w-full h-11 rounded-lg border border-slate-200 bg-slate-50 px-3 text-sm outline-none focus:border-red-500";

export default function DemoForm() {
  const [form, setForm] = useState({
    email: "",
    firstName: "",
    lastName: "",
    company: "",
    website: "",
    employees: "",
    useCase: "",
    message: "",
  });

const handleChange = (
  e: React.ChangeEvent<
    HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
  >
) => {
  setForm({
    ...form,
    [e.target.name]: e.target.value,
  });
};

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(form);
    // API Call
  };

  return (
    <div className="p-5 sm:p-6 lg:p-8 xl:p-10">
      <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-slate-900">
        Book a Demo
      </h2>

      <p className="mt-2 text-sm text-slate-500">
        Tell us about your organization and we'll schedule a personalized demo.
      </p>

      <form onSubmit={handleSubmit} className="space-y-4 mt-5 lg:mt-6">
        {/* Email */}
        <div>
          <label className="text-xs font-medium text-slate-600">
            Work Email
          </label>
          <div className="mt-1.5 relative">
            <Mail
              size={16}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
            />
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              placeholder="john@company.com"
              className={inputClass}
            />
          </div>
        </div>

        {/* Name */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div>
            <label className="text-xs font-medium text-slate-600">
              First Name
            </label>
            <div className="relative mt-1.5">
              <User
                size={16}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
              />
              <input
                name="firstName"
                value={form.firstName}
                onChange={handleChange}
                placeholder="John"
                className={inputClass}
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-medium text-slate-600">
              Last Name
            </label>
            <input
              name="lastName"
              value={form.lastName}
              onChange={handleChange}
              placeholder="Doe"
              className={`mt-1.5 ${plainInputClass}`}
            />
          </div>
        </div>

        {/* Company */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div>
            <label className="text-xs font-medium text-slate-600">
              Organization
            </label>
            <div className="relative mt-1.5">
              <Building2
                size={16}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
              />
              <input
                name="company"
                value={form.company}
                onChange={handleChange}
                placeholder="Tiiron Technologies"
                className={inputClass}
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-medium text-slate-600">
              Website
            </label>
            <div className="relative mt-1.5">
              <Globe
                size={16}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
              />
              <input
                name="website"
                value={form.website}
                onChange={handleChange}
                placeholder="https://"
                className={inputClass}
              />
            </div>
          </div>
        </div>

        {/* Dropdown */}
        <div>
          <label className="text-xs font-medium text-slate-600">
            Organization Size
          </label>
          <select
            name="employees"
            value={form.employees}
            onChange={handleChange}
            className={`mt-1.5 ${plainInputClass}`}
          >
            <option value="">Select Organization Size</option>
            {COMPANY_SIZES.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="text-xs font-medium text-slate-600">
            Interested In
          </label>
          <select
            name="useCase"
            value={form.useCase}
            onChange={handleChange}
            className={`mt-1.5 ${plainInputClass}`}
          >
            <option value="">Select Use Case</option>
            {USE_CASES.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>

        {/* Message */}
        <div>
          <label className="text-xs font-medium text-slate-600">
            Message
          </label>
          <div className="relative mt-1.5">
            <MessageSquare
              size={16}
              className="absolute left-3.5 top-3.5 text-slate-400"
            />
            <textarea
              rows={3}
              name="message"
              value={form.message}
              onChange={handleChange}
              placeholder="Tell us about your requirements..."
              className="w-full rounded-lg border border-slate-200 bg-slate-50 pl-11 pr-3 pt-3 text-sm outline-none resize-none focus:border-red-500"
            />
          </div>
        </div>

        {/* Button */}
        <button
          type="submit"
          className="w-full h-11 lg:h-12 rounded-lg bg-red-600 hover:bg-red-700 text-white text-sm font-semibold transition"
        >
          Book My Demo
        </button>
      </form>
    </div>
  );
}