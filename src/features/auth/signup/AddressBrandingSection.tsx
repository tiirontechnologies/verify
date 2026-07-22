// import {
//   MapPin,
//   Building,
//   ImagePlus,
//   Trash2,
// } from "lucide-react";

// type AddressBrandingSectionProps = {
//   formData: {
//     country: string;
//     state: string;
//     city: string;
//     postalCode: string;
//     address: string;
//   };

//   logo: File | null;

//   handleChange: (
//     e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
//   ) => void;

//   handleLogoChange: (
//     e: React.ChangeEvent<HTMLInputElement>
//   ) => void;

//   removeLogo: () => void;
// };

// export default function AddressBrandingSection({
//   formData,
//   logo,
//   handleChange,
//   handleLogoChange,
//   removeLogo,
// }: AddressBrandingSectionProps) {
//   return (
//     <section className="rounded-3xl border border-slate-200 bg-white shadow-sm">
//       <div className="border-b border-slate-100 px-5 py-5 sm:px-6 sm:py-6 lg:px-8">
//         <div className="flex items-center gap-4">
//           <div className="rounded-2xl bg-red-100 p-3">
//             <MapPin className="text-red-600" />
//           </div>

//           <div>
//             <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
//               Address & Branding
//             </h2>

//             <p className="mt-1 text-slate-500">
//               Help users identify your organization.
//             </p>
//           </div>
//         </div>
//       </div>

//       <div className="grid gap-10 p-5 sm:p-6 lg:p-8 grid grid-cols-1 gap-5 sm:p-6 lg:p-8 lg:grid-cols-2 xl:grid-cols-[1.4fr_380px]">
//         {/* Address */}

//         <div className="space-y-6">
//           <div className="grid gap-6 md:grid-cols-2">
//             <Input
//               name="country"
//               value={formData.country}
//               onChange={handleChange}
//               label="Country"
//               placeholder="India"
//             />

//             <Input
//               name="state"
//               value={formData.state}
//               onChange={handleChange}
//               label="State"
//               placeholder="Uttar Pradesh"
//             />

//             <Input
//               name="city"
//               value={formData.city}
//               onChange={handleChange}
//               label="City"
//               placeholder="Gorakhpur"
//             />

//             <Input
//               name="postalCode"
//               value={formData.postalCode}
//               onChange={handleChange}
//               label="Postal Code"
//               placeholder="273001"
//             />
//           </div>

//           <div>
//             <label className="mb-2 block font-medium text-slate-700">
//               Complete Address
//             </label>

//             <textarea
//               name="address"
//               value={formData.address}
//               onChange={handleChange}
//               rows={5}
//               placeholder="Enter complete address..."
//               className="w-full rounded-2xl border border-slate-300 p-4 outline-none transition focus:border-red-500 focus:ring-4 focus:ring-red-100"
//             />
//           </div>
//         </div>

//         {/* Branding */}

//         <div>
//           <h3 className="mb-4 text-lg font-semibold text-slate-900">
//             Organization Logo
//           </h3>

//           <label
//             className="
// flex
// h-56 sm:h-64 lg:h-72
// cursor-pointer
// flex-col
// items-center
// justify-center
// rounded-3xl
// border-2
// border-dashed
// border-slate-300
// bg-slate-50
// transition
// hover:border-red-500
// hover:bg-red-50
// "
//           >
//             {logo ? (
//               <img
//                 src={URL.createObjectURL(logo)}
//                 alt="logo"
//                 className="max-h-28 sm:max-h-36 object-contain"
//               />
//             ) : (
//               <>
//                 <ImagePlus
//                   className="text-red-500"
//                   size={46}
//                 />

//                 <h4 className="mt-4 font-semibold text-slate-800">
//                   Upload Logo
//                 </h4>

//                 <p className="mt-2 text-center text-sm text-slate-500">
//                   PNG, JPG or SVG
//                   <br />
//                   Maximum size 5 MB
//                 </p>
//               </>
//             )}

//             <input
//               type="file"
//               hidden
//               accept="image/*"
//               onChange={handleLogoChange}
//             />
//           </label>

//           {logo && (
//             <button
//               type="button"
//               className="mt-4 flex items-center gap-2 rounded-xl border border-red-200 px-4 py-2 text-red-600 transition hover:bg-red-50"
//               onClick={removeLogo}
//             >
//               <Trash2 size={16} />
//               Remove Logo
//             </button>
//           )}

//           <div className="mt-8 rounded-2xl bg-red-50 p-5">
//             <div className="flex gap-3">
//               <Building
//                 className="mt-1 text-red-600"
//                 size={18}
//               />

//               <p className="text-sm leading-7 text-slate-600">
//                 Your logo will appear on issued certificates,
//                 organization dashboard and verification pages.
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }

// type InputProps = {
//   name: string;
//   value: string;
//   onChange: (
//     e: React.ChangeEvent<HTMLInputElement>
//   ) => void;

//   label: string;
//   placeholder: string;
// };

// function Input({
//   name,
//   value,
//   onChange,
//   label,
//   placeholder,
// }: InputProps) {
//   return (
//     <div>
//       <label className="mb-2 block font-medium text-slate-700">
//         {label}
//       </label>

//       <input
//         name={name}
//         value={value}
//         onChange={onChange}
//         placeholder={placeholder}
//         className="
// w-full
// rounded-2xl
// border
// border-slate-300
// px-4
// py-4
// outline-none
// transition
// focus:border-red-500
// focus:ring-4
// focus:ring-red-100
// "
//       />
//     </div>
//   );
// }


import { MapPin, Building, ImagePlus, Trash2 } from "lucide-react";

type AddressBrandingSectionProps = {
  formData: {
    country: string;
    state: string;
    city: string;
    postalCode: string;
    address: string;
  };

  logo: File | null;

  handleChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;

  handleLogoChange: (e: React.ChangeEvent<HTMLInputElement>) => void;

  removeLogo: () => void;
};

export default function AddressBrandingSection({
  formData,
  logo,
  handleChange,
  handleLogoChange,
  removeLogo,
}: AddressBrandingSectionProps) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="border-b border-slate-100 px-4 py-4 sm:px-5 sm:py-5">
        <div className="flex items-center gap-3">
          <div className="rounded-xl bg-red-100 p-2.5">
            <MapPin className="text-red-600" size={18} />
          </div>

          <div>
            <h2 className="text-base font-bold text-slate-900 sm:text-lg">
              Address & Branding
            </h2>

            <p className="mt-0.5 text-xs text-slate-500 sm:text-sm">
              Help users identify your organization.
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 p-4 sm:p-5 lg:grid-cols-2 lg:p-6 xl:grid-cols-[1.4fr_320px]">
        {/* Address */}
        <div className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <Input
              name="country"
              value={formData.country}
              onChange={handleChange}
              label="Country"
              placeholder="India"
            />

            <Input
              name="state"
              value={formData.state}
              onChange={handleChange}
              label="State"
              placeholder="Uttar Pradesh"
            />

            <Input
              name="city"
              value={formData.city}
              onChange={handleChange}
              label="City"
              placeholder="Gorakhpur"
            />

            <Input
              name="postalCode"
              value={formData.postalCode}
              onChange={handleChange}
              label="Postal Code"
              placeholder="273001"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-slate-700">
              Complete Address
            </label>

            <textarea
              name="address"
              value={formData.address}
              onChange={handleChange}
              rows={4}
              placeholder="Enter complete address..."
              className="w-full rounded-xl border border-slate-300 p-3 text-sm outline-none transition focus:border-red-500 focus:ring-4 focus:ring-red-100"
            />
          </div>
        </div>

        {/* Branding */}
        <div>
          <h3 className="mb-3 text-sm font-semibold text-slate-900">
            Organization Logo
          </h3>

          <label
            className="
            flex
            h-36
            sm:h-40
            cursor-pointer
            flex-col
            items-center
            justify-center
            rounded-2xl
            border-2
            border-dashed
            border-slate-300
            bg-slate-50
            transition
            hover:border-red-500
            hover:bg-red-50
            "
          >
            {logo ? (
              <img
                src={URL.createObjectURL(logo)}
                alt="logo"
                className="max-h-20 sm:max-h-24 object-contain"
              />
            ) : (
              <>
                <ImagePlus className="text-red-500" size={30} />

                <h4 className="mt-2.5 text-sm font-semibold text-slate-800">
                  Upload Logo
                </h4>

                <p className="mt-1.5 text-center text-xs text-slate-500">
                  PNG, JPG or SVG
                  <br />
                  Maximum size 5 MB
                </p>
              </>
            )}

            <input
              type="file"
              hidden
              accept="image/*"
              onChange={handleLogoChange}
            />
          </label>

          {logo && (
            <button
              type="button"
              className="mt-3 flex items-center gap-2 rounded-lg border border-red-200 px-3 py-1.5 text-xs text-red-600 transition hover:bg-red-50"
              onClick={removeLogo}
            >
              <Trash2 size={14} />
              Remove Logo
            </button>
          )}

          <div className="mt-4 rounded-xl bg-red-50 p-3">
            <div className="flex gap-2.5">
              <Building className="mt-0.5 shrink-0 text-red-600" size={15} />

              <p className="text-xs leading-5 text-slate-600">
                Your logo will appear on issued certificates, organization
                dashboard and verification pages.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

type InputProps = {
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label: string;
  placeholder: string;
};

function Input({ name, value, onChange, label, placeholder }: InputProps) {
  return (
    <div>
      <label className="mb-1.5 block text-sm font-medium text-slate-700">
        {label}
      </label>

      <input
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="
        w-full
        rounded-xl
        border
        border-slate-300
        px-3
        py-2.5
        text-sm
        outline-none
        transition
        focus:border-red-500
        focus:ring-4
        focus:ring-red-100
        "
      />
    </div>
  );
}