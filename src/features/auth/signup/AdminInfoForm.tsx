// import {
//   User,
//   Mail,
//   Lock,
// } from "lucide-react";
// import Input from "../signup/Input";

// type AdminInfoFormProps = {
//   formData: {
//     contactPerson: string;
//     email: string;
//     password: string;
//     confirmPassword: string;
//   };

//   handleChange: (
//     e: React.ChangeEvent<HTMLInputElement>
//   ) => void;
// };

// export default function AdminInfoForm({
//   formData,
//   handleChange,
// }: AdminInfoFormProps) {
//   return (
//     <section className="rounded-3xl border border-slate-200 bg-white shadow-sm">
//       <div className="border-b border-slate-100 px-8 py-6">
//         <div className="flex items-center gap-4">
//           <div className="rounded-2xl bg-red-100 p-3">
//             <User className="text-red-600" />
//           </div>

//           <div>
//             <h2 className="text-2xl font-bold text-slate-900">
//               Administrator Account
//             </h2>

//             <p className="mt-1 text-slate-500">
//               This account will manage certificates,
//               students and verification history.
//             </p>
//           </div>
//         </div>
//       </div>

//       <div className="grid gap-6 p-8 md:grid-cols-2">

//         <Input
//           icon={<User size={18} />}
//           name="contactPerson"
//           value={formData.contactPerson}
//           onChange={handleChange}
//           label="Contact Person"
//           placeholder="John Smith"
//         />

//         <Input
//           icon={<Mail size={18} />}
//           name="email"
//           value={formData.email}
//           onChange={handleChange}
//           label="Official Email"
//           placeholder="admin@company.com"
//         />

//         <Input
//           icon={<Lock size={18} />}
//           name="password"
//           value={formData.password}
//           onChange={handleChange}
//           label="Password"
//           type="password"
//           placeholder="Password"
//         />

//         <Input
//           icon={<Lock size={18} />}
//           name="confirmPassword"
//           value={formData.confirmPassword}
//           onChange={handleChange}
//           label="Confirm Password"
//           type="password"
//           placeholder="Confirm Password"
//         />

//       </div>
//     </section>
//   );
// }

import { User, Mail, Lock } from "lucide-react";
import Input from "../signup/Input";

type AdminInfoFormProps = {
  formData: {
    contactPerson: string;
    email: string;
    password: string;
    confirmPassword: string;
  };

  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function AdminInfoForm({
  formData,
  handleChange,
}: AdminInfoFormProps) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="border-b border-slate-100 px-4 py-4 sm:px-5 sm:py-5">
        <div className="flex items-center gap-3">
          <div className="rounded-xl bg-red-100 p-2.5">
            <User className="text-red-600" size={18} />
          </div>

          <div>
            <h2 className="text-base font-bold text-slate-900 sm:text-lg">
              Administrator Account
            </h2>

            <p className="mt-0.5 text-xs text-slate-500 sm:text-sm">
              This account will manage certificates, students and
              verification history.
            </p>
          </div>
        </div>
      </div>

      <div className="grid gap-4 p-4 sm:grid-cols-2 sm:p-5">
        <Input
          icon={<User size={16} />}
          name="contactPerson"
          value={formData.contactPerson}
          onChange={handleChange}
          label="Contact Person"
          placeholder="John Smith"
        />

        <Input
          icon={<Mail size={16} />}
          name="email"
          value={formData.email}
          onChange={handleChange}
          label="Official Email"
          placeholder="admin@company.com"
        />

        <Input
          icon={<Lock size={16} />}
          name="password"
          value={formData.password}
          onChange={handleChange}
          label="Password"
          type="password"
          placeholder="Password"
        />

        <Input
          icon={<Lock size={16} />}
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          label="Confirm Password"
          type="password"
          placeholder="Confirm Password"
        />
      </div>
    </section>
  );
}