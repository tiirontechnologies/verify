import { ExternalLink } from "lucide-react";

import {
  FaFacebookSquare,
  FaLinkedin,
  FaTwitter,
  FaInstagram,
} from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-[#06142B] text-white">

      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-20">

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-14">

          {/* Left Section */}

          <div className="lg:col-span-2">

            <div className="flex items-center gap-3">

              <h1 className="text-4xl font-bold text-red-500">
                Tiiron
              </h1>

            </div>

            <p className="mt-8 text-gray-400 leading-10 text-lg">
              A comprehensive, next-generation ERP solution designed to
              streamline institutional workflows, automate administration,
              and enhance productivity.
            </p>

            <div className="flex gap-8 mt-10">

<FaFacebookSquare className="w-8 h-8 text-gray-400 hover:text-white cursor-pointer" />

<FaLinkedin className="w-8 h-8 text-gray-400 hover:text-white cursor-pointer" />

<FaTwitter className="w-8 h-8 text-gray-400 hover:text-white cursor-pointer" />

<FaInstagram className="w-8 h-8 text-gray-400 hover:text-white cursor-pointer" />

            </div>

          </div>

          {/* Quick Links */}

          <div>

            <h2 className="font-bold text-3xl mb-10">
              QUICK LINKS
            </h2>

            <div className="space-y-6 text-gray-400 text-xl">

              <p className="hover:text-white cursor-pointer">
                Home
              </p>

              <p className="hover:text-white cursor-pointer">
                Features
              </p>

              <p className="hover:text-white cursor-pointer">
                Contact Us
              </p>

              <p className="hover:text-white cursor-pointer">
                Book a Demo
              </p>

            </div>

          </div>

          {/* Solutions */}

          <div>

            <h2 className="font-bold text-3xl mb-10">
              OUR SOLUTIONS
            </h2>

            <div className="space-y-6 text-gray-400 text-xl">

              <div className="flex items-center gap-2 hover:text-white cursor-pointer">
                Tiiron LMS
                <ExternalLink size={18} />
              </div>

              <div className="flex items-center gap-2 hover:text-white cursor-pointer">
                Inacademic
                <ExternalLink size={18} />
              </div>

              <div className="flex items-center gap-2 hover:text-white cursor-pointer">
                Tiiron Academy
                <ExternalLink size={18} />
              </div>

              <div className="flex items-center gap-2 hover:text-white cursor-pointer">
                Tiiron Technologies
                <ExternalLink size={18} />
              </div>

            </div>

          </div>

          {/* Company */}

          <div>

            <h2 className="font-bold text-3xl mb-10">
              COMPANY
            </h2>

            <div className="space-y-6 text-gray-400 text-xl">

              <p className="hover:text-white cursor-pointer">
                About Us
              </p>

              <p className="hover:text-white cursor-pointer">
                Contact
              </p>

              <p className="hover:text-white cursor-pointer">
                Partners
              </p>

              <div className="flex items-center gap-2 hover:text-white cursor-pointer">
                Careers
                <ExternalLink size={18} />
              </div>

            </div>

          </div>

        </div>

        {/* Bottom */}

        <div className="border-t border-gray-700 mt-20 pt-10 flex flex-col lg:flex-row items-center justify-between gap-6">

          <p className="text-gray-500 text-lg text-center">
            ©2026 Tiiron Technologies Pvt Ltd. All rights reserved.
          </p>

          <div className="flex gap-10 text-gray-500 text-lg">

            <button className="hover:text-white">
              Terms & Conditions
            </button>

            <button className="hover:text-white">
              Refund Policy
            </button>

            <button className="hover:text-white">
              Privacy Policy
            </button>

          </div>

        </div>

      </div>

    </footer>
  );
}