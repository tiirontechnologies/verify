import {
  Mail,
  Phone,
  ShieldCheck,
  FileText,
  Lock,
} from "lucide-react";
import { Link } from "react-router-dom";

// Change the logo path
import tiironLogo from "../../../assets/Tiiron_Technologies_Logo.png";

export default function SignupFooter() {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto max-w-[1500px] px-6 py-10 lg:px-10">

        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">

          {/* Brand */}

          <div>

            <div className="flex items-center gap-3">

              <img
                src={tiironLogo}
                alt="Tiiron Verify"
                className="h-12 w-auto"
              />

              <div>
                <h3 className="text-lg font-bold text-slate-900">
                  Tiiron Verify
                </h3>

                <p className="text-sm text-slate-500">
                  Credential Verification Platform
                </p>
              </div>

            </div>

            <p className="mt-5 text-sm leading-7 text-slate-600">
              Securely issue, manage and verify digital credentials
              using enterprise-grade security and QR authentication.
            </p>

          </div>

          {/* Company */}

          <div>

            <h4 className="mb-4 text-lg font-semibold">
              Company
            </h4>

            <div className="space-y-3">

              <Link
                to="/"
                className="block text-slate-600 hover:text-red-600"
              >
                Home
              </Link>

              <Link
                to="/login"
                className="block text-slate-600 hover:text-red-600"
              >
                Login
              </Link>

              <Link
                to="/organization-signup"
                className="block text-slate-600 hover:text-red-600"
              >
                Register Organization
              </Link>

            </div>

          </div>

          {/* Security */}

          <div>

            <h4 className="mb-4 text-lg font-semibold">
              Security
            </h4>

            <div className="space-y-4">

              <div className="flex items-center gap-3">

                <ShieldCheck
                  size={18}
                  className="text-green-600"
                />

                SSL Protected

              </div>

              <div className="flex items-center gap-3">

                <Lock
                  size={18}
                  className="text-green-600"
                />

                End-to-End Encryption

              </div>

              <div className="flex items-center gap-3">

                <FileText
                  size={18}
                  className="text-green-600"
                />

                Manual Organization Review

              </div>

            </div>

          </div>

          {/* Contact */}

          <div>

            <h4 className="mb-4 text-lg font-semibold">
              Support
            </h4>

            <div className="space-y-4">

              <div className="flex items-center gap-3">

                <Mail
                  size={18}
                  className="text-red-600"
                />

                <a href="mailto:verify@tiirontechnologies.com" className="hover:text-red-700">verify@tiirontechnologies.com</a>

              </div>

              <div className="flex items-center gap-3">

                <Phone
                  size={18}
                  className="text-red-600"
                />

                +91 XXXXX XXXXX

              </div>

            </div>

          </div>

        </div>

        <div className="mt-10 border-t border-slate-200 pt-6">

          <div className="flex flex-col items-center justify-between gap-4 text-sm text-slate-500 md:flex-row">

            <p>
              © {new Date().getFullYear()} Tiiron Verify.
              All rights reserved.
            </p>

            <div className="flex gap-6">

              <Link
                to="/privacy-policy"
                className="hover:text-red-600"
              >
                Privacy Policy
              </Link>

              <Link
                to="/terms"
                className="hover:text-red-600"
              >
                Terms of Service
              </Link>

            </div>

          </div>

        </div>

      </div>
    </footer>
  );
}
