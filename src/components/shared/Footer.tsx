import {
  ExternalLink,
  Phone,
  Mail,
  MapPin,
} from "lucide-react";

import {
  FaFacebookF,
  FaLinkedinIn,
  FaTwitter,
  FaInstagram,
} from "react-icons/fa";

import logo from "../../assets/Tiiron_Technologies_Logo.png";

export default function Footer() {
  return (
    <footer className="bg-white">

      {/* Main */}

      <div className="w-full max-w-[1750px] mx-auto px-5 sm:px-6 md:px-8 lg:px-12 py-10 lg:py-14">

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-x-8 xl:gap-x-16 gap-y-10">

          {/* Company */}

          <div className="col-span-1 lg:col-span-3 text-center lg:text-left">

            <img
  src={logo}
  alt="Tiiron"
  className="h-28 lg:h-36 w-auto object-contain mx-auto lg:mx-0"
/>

            <div className="-mt-4 max-w-sm mx-auto lg:mx-0">

              <p className="text-gray-600 text-[17px] leading-9">

                A comprehensive, next-generation credential verification
                platform designed to securely issue, manage and verify
                digital credentials for institutions and enterprises.

              </p>

              <div className="flex justify-center lg:justify-start gap-4 mt-8">

                {[
                  <FaLinkedinIn />,
                  <FaTwitter />,
                  <FaInstagram />,
                  <FaFacebookF />,
                ].map((icon, index) => (
                  <button
                    key={index}
className="
w-18
h-18
rounded-2xl
border
border-gray-200
flex
items-center
justify-center
text-gray-500
text-xl
hover:bg-red-600
hover:text-white
hover:border-red-600
transition
"                  >
                    {icon}
                  </button>
                ))}

              </div>

            </div>

          </div>

          {/* Quick Links */}

          <div className="col-span-1 lg:col-span-2 pt-0 lg:pt-5 text-center lg:text-left">

            <h2 className="text-[28px] font-extrabold text-gray-900 mb-7">
              Quick Links
            </h2>

            <div className="space-y-5">

              <p className="
text-[18px]
font-semibold
text-gray-700
hover:text-red-600
transition-all
duration-200
hover:translate-x-1
cursor-pointer
">
                Home
              </p>

              <p className="
text-[18px]
font-semibold
text-gray-700
hover:text-red-600
transition-all
duration-200
hover:translate-x-1
cursor-pointer
">
                Features
              </p>

              <p className="
text-[18px]
font-semibold
text-gray-700
hover:text-red-600
transition-all
duration-200
hover:translate-x-1
cursor-pointer
">
                Contact Us
              </p>

              <p className="
text-[18px]
font-semibold
text-gray-700
hover:text-red-600
transition-all
duration-200
hover:translate-x-1
cursor-pointer
">
                Book a Demo
              </p>

            </div>

          </div>

          {/* Solutions */}

          <div className="col-span-1 lg:col-span-2 pt-0 lg:pt-5 text-center lg:text-left">

            <h2 className="text-[28px] font-extrabold text-gray-900 mb-7">
              Our Solutions
            </h2>

            <div className="space-y-5">

            <div
  className="
group
flex
justify-center
lg:justify-start
items-center
gap-2
text-[18px]
font-semibold
text-gray-700
hover:text-red-600
hover:translate-x-1
transition-all
duration-200
cursor-pointer
"
>
  Tiiron LMS
  <ExternalLink
    size={16} strokeWidth={2.4}
    className="opacity-50 group-hover:opacity-100 transition"
  />
</div>

              <div className="
group
flex
justify-center
lg:justify-start
items-center
gap-2
text-[18px]
font-semibold
text-gray-700
hover:text-red-600
hover:translate-x-1
transition-all
duration-200
cursor-pointer
">
                Inacademic
                <ExternalLink
    size={16} strokeWidth={2.4}
    className="opacity-50 group-hover:opacity-100 transition"
/>
              </div>

              <div className="
group
flex
justify-center
lg:justify-start
items-center
gap-2
text-[18px]
font-semibold
text-gray-700
hover:text-red-600
hover:translate-x-1
transition-all
duration-200
cursor-pointer
">
                Tiiron Academy
                <ExternalLink
    size={16} strokeWidth={2.4}
    className="opacity-50 group-hover:opacity-100 transition"
/>
              </div>

              <div className="
group
flex
justify-center
lg:justify-start
items-center
gap-2
text-[18px]
font-semibold
text-gray-700
hover:text-red-600
hover:translate-x-1
transition-all
duration-200
cursor-pointer
">
                Tiiron Technologies
                <ExternalLink
    size={16} strokeWidth={2.4}
    className="opacity-50 group-hover:opacity-100 transition"
/>
              </div>

            </div>

          </div>

          {/* Company */}

          <div className="col-span-1 lg:col-span-2 pt-0 lg:pt-5 text-center lg:text-left">

            <h2 className="text-[28px] font-extrabold text-gray-900 mb-7">
              Company
            </h2>

            <div className="space-y-5">

              <p className="
text-[18px]
font-semibold
text-gray-700
hover:text-red-600
transition-all
duration-200
hover:translate-x-1
cursor-pointer
">
                About Us
              </p>

              <p className="
text-[18px]
font-semibold
text-gray-700
hover:text-red-600
transition-all
duration-200
hover:translate-x-1
cursor-pointer
">
                Contact
              </p>

              <p className="
text-[18px]
font-semibold
text-gray-700
hover:text-red-600
transition-all
duration-200
hover:translate-x-1
cursor-pointer
">
                Partners
              </p>

              <div className="
group
flex
justify-center
lg:justify-start
items-center
gap-2
text-[18px]
font-semibold
text-gray-700
hover:text-red-600
hover:translate-x-1
transition-all
duration-200
cursor-pointer
">
                Careers
                <ExternalLink
    size={16} strokeWidth={2.4}
    className="opacity-50 group-hover:opacity-100 transition"
/>
              </div>

            </div>

          </div>

          {/* Contact */}

          <div className="col-span-1 lg:col-span-2 pt-0 lg:pt-5 text-center lg:text-left">

            <h2 className="text-[28px] font-extrabold text-gray-900 mb-7">
              Contact Us
            </h2>

            <div className="space-y-8">

              <div className="flex justify-center lg:justify-start gap-3">

                <Phone
                  size={24}
                  className="text-red-600 mt-0.5 flex-shrink-0"
                />

                <div>

                  <p className="text-[13px] uppercase tracking-wider text-gray-400">
                    Phone
                  </p>

                  <p className="text-[18px] font-semibold text-gray-800">
                    +91 91612 18740
                  </p>

                </div>

              </div>

              <div className="flex justify-center lg:justify-start gap-3">

                <Mail
                  size={24}
                  className="text-red-600 mt-0.5 flex-shrink-0"
                />

                <div>

                  <p className="text-sm font-medium uppercase tracking-wider text-gray-400">
                    Email
                  </p>

                  <p className="text-[18px] font-semibold text-gray-800">
                    contact@tiirontechnologies.com
                  </p>

                </div>

              </div>

              <div className="flex justify-center lg:justify-start gap-3">

                <MapPin
                  size={24}
                  className="text-red-600 mt-0.5 flex-shrink-0"
                />

                <div>

                  <p className="text-sm font-medium uppercase tracking-wider text-gray-400">
                    Office
                  </p>

                  <p className="text-[18px] font-semibold text-gray-800">
                    Gorakhpur, Uttar Pradesh
                  </p>

                </div>

              </div>

            </div>

          </div>

        </div>

      </div>

      {/* Bottom */}

      <div>

<div className="
max-w-[1750px]
mx-auto
px-5
sm:px-6
md:px-8
lg:px-12
py-5
flex
flex-col
lg:flex-row
justify-between
items-center
gap-5
text-center
lg:text-left
">
          <p className="text-gray-700 text-sm">
            © 2026 Tiiron Technologies Pvt Ltd. All rights reserved.
          </p>

          <div className="flex flex-wrap justify-center lg:justify-end gap-5 md:gap-8 text-base">

            <button className="text-gray-500 hover:text-red-600 transition">
              Privacy Policy
            </button>

            <button className="text-gray-500 hover:text-red-600 transition">
              Terms & Conditions
            </button>

            <button className="text-gray-500 hover:text-red-600 transition">
              Refund Policy
            </button>

          </div>

        </div>

      </div>

    </footer>
  );
}