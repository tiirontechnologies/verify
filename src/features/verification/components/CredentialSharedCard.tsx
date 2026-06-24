export default function CredentialShareCard() {
  return (
    <div className="bg-white border border-red-100 rounded-2xl p-8 mt-8">

      <h2 className="text-2xl font-bold mb-6">
        Share Credential
      </h2>

      {/* QR */}

      <div className="flex justify-center">

        <div className="flex justify-center bg-gray-100 rounded-2xl flex items-center justify-center text-gray-400">
          <img
  className="rounded-xl"
  src="https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=VT-9928-RS-2026"
/>
        </div>

      </div>

      <p className="text-gray-500 text-center mt-6">
        Scan to verify instantly
      </p>

      <div className="flex flex-col gap-4 mt-8">

        <button className="bg-red-600 text-white py-3 rounded-xl hover:bg-red-700">
          Share Credential
        </button>

        <button className="border py-3 rounded-xl hover:bg-gray-50">
          Copy Verification Link
        </button>

      </div>

    </div>
  );
}