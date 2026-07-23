import { FileBadge } from "lucide-react";

export default function AvailableCertificates() {
  return (
    <div className="bg-white shadow-lg  rounded-3xl p-8 mt-8">

      <h2 className="text-2xl font-bold mb-8">
        Achieved Certificates
      </h2>

      <div className="space-y-5">

        {/* Internship */}

        <div className="flex justify-between items-center shadow-lg rounded-2xl px-6 py-5 hover:bg-gray-50">

          <div className="flex items-center gap-4">

            <FileBadge
              className="text-red-600"
              size={30}
            />

            <div>

              <h3 className="font-semibold">
                Internship Certificate
              </h3>

              <p className="text-sm text-gray-500">
                Issued by Tiiron Technologies
              </p>

            </div>

          </div>

          {/* <button className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-xl">

            <Download size={18} />

            Download

          </button> */}

        </div>

        {/* Training */}

        <div className="flex justify-between items-center shadow-lg  rounded-2xl px-6 py-5 hover:bg-gray-50">

          <div className="flex items-center gap-4">

            <FileBadge
              className="text-blue-600"
              size={30}
            />

            <div>

              <h3 className="font-semibold">
                Training Certificate
              </h3>

              <p className="text-sm text-gray-500">
                Issued by Tiiron Technologies
              </p>

            </div>

          </div>

          {/* <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-xl">

            <Download size={18} />

            Download

          </button> */}

        </div>

      </div>

    </div>
  );
}