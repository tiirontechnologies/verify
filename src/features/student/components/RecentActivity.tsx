import { useState } from "react";
import { CheckCircle, Download, Search, Share2, X } from "lucide-react";
import { useNavigate } from "react-router-dom";

type RecentActivityProps = {
  id: string;
};
export default function RecentActivity({id}:RecentActivityProps) {
  const navigate = useNavigate();
  const [verifyModalOpen, setVerifyModalOpen] = useState(false);
  const [verificationId, setVerificationId] = useState("");
  const [verificationError, setVerificationError] = useState("");

    const handleShare = async (id: string) => {
    try {
      await navigator.share({
        title: "Certificate",
        text: "Verify my certificate",
        url: `${window.location.origin}/verification/${id}`,
      });
    } catch (error) {
      alert("Failed to share credentials!");
    }
  };

  const handleVerifySubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const searchId = verificationId.trim();
    if (!searchId) {
      setVerificationError("Enter a verification ID to continue.");
      return;
    }
    setVerificationError("");
    setVerifyModalOpen(false);
    navigate(`/verification/${encodeURIComponent(searchId)}`);
  };

  return (
    <div className="bg-white rounded-3xl p-8 shadow-sm">

      <h2 className="text-2xl font-bold mb-8">
        Recent Activity
      </h2>

      <div className="space-y-6">

        <div onClick={()=>navigate(`/verification/${id}`)} className="flex items-center cursor-pointer gap-4">
          <CheckCircle className="text-green-500" />
          <p>Credential verified successfully.</p>
        </div>

        <div 
        onClick={() => handleShare(id)}
        className="flex items-center cursor-pointer gap-4">
          <Share2 className="text-blue-500" />
          <p>Shared Certification.</p>
        </div>

        <div  onClick={()=>navigate("/student/my-certificate")} className="flex  cursor-pointer items-center gap-4">
          <Download className="text-orange-500" />
          <p>Downloaded  Certificate.</p>
        </div>

        <button
          type="button"
          onClick={() => {
            setVerificationId("");
            setVerificationError("");
            setVerifyModalOpen(true);
          }}
          className="flex w-full items-center gap-4 text-left text-slate-700 transition hover:text-red-700"
        >
          <Search className="text-red-600" />
          <span>Verify another credential</span>
        </button>

        {/* <div className="flex items-center gap-4">
          <PlusCircle className="text-purple-500" />
          <p>New credential added.</p>
        </div> */}

      </div>

      {verifyModalOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/55 p-4 backdrop-blur-sm"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setVerifyModalOpen(false);
          }}
        >
          <section
            role="dialog"
            aria-modal="true"
            aria-labelledby="verify-another-title"
            className="relative w-full max-w-md overflow-hidden rounded-2xl border border-red-100 bg-white shadow-2xl"
          >
            <div className="h-1.5 bg-gradient-to-r from-red-700 via-red-500 to-rose-300" />
            <button
              type="button"
              onClick={() => setVerifyModalOpen(false)}
              aria-label="Close verification dialog"
              className="absolute right-4 top-4 rounded-full p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
            >
              <X size={18} />
            </button>
            <form onSubmit={handleVerifySubmit} className="p-6 sm:p-8">
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl border border-red-100 bg-red-50 text-red-600">
                <Search size={21} />
              </div>
              <h2 id="verify-another-title" className="text-xl font-bold text-slate-900">
                Verify a credential
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                Enter the verification ID to view its official record.
              </p>
              <label htmlFor="verification-id" className="mt-6 block text-xs font-semibold uppercase text-slate-600">
                Verification ID
              </label>
              <input
                id="verification-id"
                autoFocus
                value={verificationId}
                onChange={(event) => setVerificationId(event.target.value)}
                placeholder="e.g. CERT-2026-001"
                className="mt-2 w-full rounded-lg border border-slate-300 px-3.5 py-3 text-sm text-slate-900 outline-none transition focus:border-red-500 focus:ring-2 focus:ring-red-100"
              />
              {verificationError && (
                <p role="alert" className="mt-2 text-xs font-medium text-red-600">
                  {verificationError}
                </p>
              )}
              <button
                type="submit"
                className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-red-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-red-700"
              >
                <Search size={16} /> Search verification
              </button>
            </form>
          </section>
        </div>
      )}

    </div>
  );
}