import DashboardLayout from "../../../layouts/DashboardLayout";
import { Clock } from "lucide-react";

export default function VerificationHistory() {
  return (
    <DashboardLayout>

      <div className="space-y-8">

        {/* <div>

          <h1 className="text-4xl font-bold">
            Verification History
          </h1>

          <p className="text-gray-500 mt-2">
            Recent verification activities.
          </p>

        </div>

        <div className="bg-white rounded-3xl border shadow-sm overflow-hidden">

          <table className="w-full">

            <thead className="bg-gray-50">

              <tr>

                <th className="p-5 text-left">
                  Credential
                </th>

                <th className="p-5 text-left">
                  Date
                </th>

                <th className="p-5 text-left">
                  Status
                </th>

              </tr>

            </thead>

            <tbody>

              <tr className="border-t">

                <td className="p-5">
                  Python Full Stack Development
                </td>

                <td className="p-5">
                  21 Jun 2026
                </td>

                <td className="p-5 text-green-600">
                  Verified
                </td>

              </tr>

              <tr className="border-t">

                <td className="p-5">
                  AWS Cloud Practitioner
                </td>

                <td className="p-5">
                  18 Jun 2026
                </td>

                <td className="p-5 text-green-600">
                  Verified
                </td>

              </tr>

            </tbody>

          </table>

        </div> */}

          <div className="flex items-center justify-center py-24 px-6">
      <div className="max-w-md text-center">

        {/* Icon */}

        <div className="flex justify-center">
          <div className="w-16 h-16 rounded-2xl bg-indigo-50 flex items-center justify-center">
            <Clock

              size={80}
              className="text-red-600"
              strokeWidth={2.2}
            />
            
          </div>
        </div>
<div className="mt-6 font-semibold text-red-900 text-lg">
  Coming Soon
</div>
        {/* Title */}

        <h2 className="mt-6 text-3xl font-bold text-gray-600">
        Exciting updates are on the way. Thank you for waiting!
          
        </h2>

        {/* Description */}


        

      </div>
    </div>

      </div>

    </DashboardLayout>

  
  );
}