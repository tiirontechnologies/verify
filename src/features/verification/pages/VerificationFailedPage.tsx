import { useNavigate } from "react-router-dom";

export default function VerificationFailedPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#fafafa] flex items-center justify-center px-8">

      <div className="bg-white max-w-2xl w-full rounded-3xl shadow-xl p-14 text-center">

        <div className="w-28 h-28 rounded-full bg-red-50 mx-auto flex items-center justify-center text-5xl">
          ❌
        </div>

        <h1 className="text-5xl font-bold text-slate-800 mt-10">
          Credential Not Found
        </h1>

        <p className="text-gray-500 mt-6 text-lg leading-8">
          We couldn't find any credential associated with the supplied
          Verification ID.
        </p>

        <div className="flex justify-center gap-5 mt-12">

          <button
            onClick={() => navigate("/")}
            className="bg-[#ff4d4f] text-white px-8 py-4 rounded-2xl"
          >
            Go Home
          </button>

          <button
            onClick={() => navigate("/")}
            className="border px-8 py-4 rounded-2xl"
          >
            Verify Another ID
          </button>

        </div>

      </div>

    </div>
  );
}