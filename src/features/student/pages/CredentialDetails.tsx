import DashboardLayout from "../../../layouts/DashboardLayout";
import { BadgeCheck, Download, Share2 } from "lucide-react";

export default function CredentialDetails() {
  return (
    <DashboardLayout>
      <div className="space-y-8">

        {/* Header */}
        <div>
          <h1 className="text-4xl font-bold">
            Credential Details
          </h1>

          <p className="text-gray-500 mt-2">
            View and manage your credential.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">

          {/* Left */}

          <div className="lg:col-span-2 bg-white rounded-3xl border shadow-sm p-8">

            <div className="aspect-[16/10] rounded-3xl bg-gray-100 flex items-center justify-center text-gray-400 text-xl">
              Certificate Preview
            </div>

          </div>

          {/* Right */}

          <div className="bg-white rounded-3xl border shadow-sm p-8">

            <div className="flex items-center gap-3 text-green-600">

              <BadgeCheck />

              <span className="font-semibold">
                Verified
              </span>

            </div>

            <div className="mt-8 space-y-6">

              <div>
                <p className="text-gray-500">
                  Certificate ID
                </p>

                <h3 className="font-bold">
                  CERT-2026-001
                </h3>
              </div>

              <div>
                <p className="text-gray-500">
                  Issued By
                </p>

                <h3 className="font-bold">
                  Tiiron Academy
                </h3>
              </div>

              <div>
                <p className="text-gray-500">
                  Issue Date
                </p>

                <h3 className="font-bold">
                  20 Jun 2026
                </h3>
              </div>

            </div>

            <div className="space-y-4 mt-10">

              <button className="w-full bg-red-600 text-white rounded-2xl py-4 flex items-center justify-center gap-2">

                <Download size={18} />

                Download PDF

              </button>

              <button className="w-full border rounded-2xl py-4 flex items-center justify-center gap-2">

                <Share2 size={18} />

                Share Credential

              </button>

            </div>

          </div>

        </div>

      </div>
    </DashboardLayout>
  );
}