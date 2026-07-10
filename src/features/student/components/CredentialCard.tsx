import { Eye, BadgeCheck } from "lucide-react";

import { useNavigate } from "react-router-dom";

type CredentialCardProps = {
  title: string;
  issuer: string;
};

export default function CredentialCard({
  title,
  issuer,
}: CredentialCardProps) {
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-3xl border p-6 shadow-sm hover:shadow-md transition">

      <div className="flex items-center justify-between">

        <div>
          <h2 className="text-xl font-bold text-gray-900">
            {title}
          </h2>

          <p className="text-gray-500 mt-2">
            Issued by {issuer}
          </p>
        </div>

        <BadgeCheck
          size={28}
          className="text-green-500"
        />

      </div>

      <div className="mt-8 flex gap-3">

        <button
  onClick={() => navigate("/student/my-certificate")}
  className="flex items-center gap-2 px-4 py-2 rounded-xl bg-red-600 text-white hover:bg-red-700 transition"
>

  <Eye size={18} />

  View

</button>

        {/* <button className="flex items-center gap-2 px-4 py-2 rounded-xl border hover:bg-gray-100 transition">

          <Download size={18} />

          Download

        </button> */}

      </div>

    </div>
  );
}