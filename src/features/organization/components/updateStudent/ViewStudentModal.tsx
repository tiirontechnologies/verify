import { useState } from "react";
import { X, ExternalLink, ShieldCheck, Calendar, User, Mail, BookOpen, Award, GraduationCap, FileText, AwardIcon, FileCheck, Ban, Loader2, CheckCircle2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { organizationApi } from "../../../../api/organization.api";

interface ViewStudentModalProps {
  student: any;
  onClose: () => void;
  onSuccess?: () => void;
}

export default function ViewStudentModal({
  student,
  onClose,
  onSuccess,
}: ViewStudentModalProps) {
  const navigate = useNavigate();

  const documents: any[] = student?.documents || [student];
  const [selectedDocIndex, setSelectedDocIndex] = useState(0);
  const [updating, setUpdating] = useState(false);

  const currentDoc = documents[selectedDocIndex] || documents[0] || student;

  const formatDate = (dateStr?: string) => {
    if (!dateStr) return "N/A";
    const d = new Date(dateStr);
    return isNaN(d.getTime())
      ? dateStr
      : d.toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        });
  };

  const handleOpenPublicVerification = () => {
    const docId = currentDoc._id || currentDoc.id || currentDoc.certificateId || student._id;
    navigate(`/student/certificates/doc/${docId}`);
  };

  const handleToggleDocStatus = async () => {
    const docId = currentDoc._id || currentDoc.id;
    if (!docId) return;

    const newStatus = currentDoc.status === "active" ? "revoked" : "active";
    try {
      setUpdating(true);
      await organizationApi.bulkUpdateStatus([docId], newStatus);
      currentDoc.status = newStatus;
      if (onSuccess) {
        onSuccess();
      }
    } catch (err) {
      console.error("Failed to update status for document:", err);
    } finally {
      setUpdating(false);
    }
  };

  const getDocBadgeInfo = (certType?: string) => {
    const cType = (certType || "internship").toLowerCase();
    if (cType === "internship") {
      return { label: "Internship Certificate", Icon: Award, color: "bg-red-50 text-red-700 border-red-200" };
    }
    if (cType === "training") {
      return { label: "Training Certificate", Icon: GraduationCap, color: "bg-blue-50 text-blue-700 border-blue-200" };
    }
    if (cType === "offer-letter") {
      return { label: "Offer Letter", Icon: FileText, color: "bg-emerald-50 text-emerald-700 border-emerald-200" };
    }
    if (cType === "appreciation-letter") {
      return { label: "Appreciation Letter", Icon: AwardIcon, color: "bg-amber-50 text-amber-700 border-amber-200" };
    }
    return { label: "Custom Document", Icon: FileCheck, color: "bg-purple-50 text-purple-700 border-purple-200" };
  };

  const currentBadge = getDocBadgeInfo(currentDoc.certificateType);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
      <div className="w-full max-w-xl overflow-hidden rounded-3xl bg-white shadow-2xl border border-slate-200 animate-in fade-in zoom-in duration-200">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 px-6 py-5 bg-slate-50/50">
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-xl font-bold text-slate-900">{student.studentName}</h3>
              {documents.length > 1 && (
                <span className="text-[11px] font-bold bg-slate-200 text-slate-700 px-2 py-0.5 rounded-full">
                  {documents.length} Assigned Documents
                </span>
              )}
            </div>
            <p className="text-xs text-slate-500 font-mono mt-0.5">{student.email}</p>
          </div>

          <button
            onClick={onClose}
            className="rounded-full p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-700 transition"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4 text-sm text-slate-700">
          {/* Multi Document Tabs */}
          {documents.length > 1 && (
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Select Document to Manage</label>
              <div className="flex flex-wrap gap-2">
                {documents.map((doc, idx) => {
                  const bInfo = getDocBadgeInfo(doc.certificateType);
                  const isSelected = idx === selectedDocIndex;
                  const isRevoked = doc.status === "revoked";

                  return (
                    <button
                      key={doc._id || idx}
                      onClick={() => setSelectedDocIndex(idx)}
                      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold border transition ${
                        isSelected
                          ? `${bInfo.color} ring-2 ring-slate-400/20 shadow-sm scale-105`
                          : isRevoked
                          ? "bg-red-50/50 text-red-600 border-red-200 line-through"
                          : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50"
                      }`}
                    >
                      <bInfo.Icon size={14} />
                      {bInfo.label}
                      {isRevoked && <span className="text-[10px] font-normal text-red-600 no-underline">(Revoked)</span>}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Current Selected Document Status Card */}
          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/80 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md text-xs font-semibold border ${currentBadge.color}`}>
                  <currentBadge.Icon size={14} /> {currentBadge.label}
                </span>
              </div>
              <span className="font-mono font-bold text-slate-900 bg-white px-2.5 py-0.5 rounded border border-slate-200 text-xs">
                {currentDoc.certificateId}
              </span>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-slate-200/60">
              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-500 uppercase font-semibold">Status:</span>
                <span
                  className={`inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-0.5 rounded-full ${
                    currentDoc.status === "active"
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {currentDoc.status === "active" ? <ShieldCheck size={14} /> : <Ban size={14} />}
                  {currentDoc.status === "active" ? "Verified Active" : "Revoked"}
                </span>
              </div>

              {/* Per-Document Status Toggle Button */}
              <button
                onClick={handleToggleDocStatus}
                disabled={updating}
                className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-bold transition border ${
                  currentDoc.status === "active"
                    ? "bg-amber-50 text-amber-800 border-amber-200 hover:bg-amber-100"
                    : "bg-green-50 text-green-800 border-green-200 hover:bg-green-100"
                } disabled:opacity-60`}
              >
                {updating ? (
                  <Loader2 size={13} className="animate-spin" />
                ) : currentDoc.status === "active" ? (
                  <Ban size={13} />
                ) : (
                  <CheckCircle2 size={13} />
                )}
                {updating
                  ? "Updating..."
                  : currentDoc.status === "active"
                  ? "Revoke This Document Only"
                  : "Activate This Document Only"}
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 bg-white border border-slate-200 rounded-xl space-y-1">
              <div className="flex items-center gap-1.5 text-xs text-slate-400 font-semibold">
                <Mail size={14} /> Email
              </div>
              <p className="font-semibold text-slate-800 text-xs truncate">{student.email}</p>
            </div>

            <div className="p-3 bg-white border border-slate-200 rounded-xl space-y-1">
              <div className="flex items-center gap-1.5 text-xs text-slate-400 font-semibold">
                <BookOpen size={14} /> Course
              </div>
              <p className="font-semibold text-slate-800 text-xs truncate">{currentDoc.course || student.course}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 bg-white border border-slate-200 rounded-xl space-y-1">
              <div className="flex items-center gap-1.5 text-xs text-slate-400 font-semibold">
                <User size={14} /> Role / Position
              </div>
              <p className="font-semibold text-slate-800 text-xs">{currentDoc.role || student.role || "Participant"}</p>
            </div>

            <div className="p-3 bg-white border border-slate-200 rounded-xl space-y-1">
              <div className="flex items-center gap-1.5 text-xs text-slate-400 font-semibold">
                <Calendar size={14} /> Duration
              </div>
              <p className="font-semibold text-slate-800 text-xs">
                {formatDate(currentDoc.startDate || student.startDate)} - {formatDate(currentDoc.endDate || student.endDate)}
              </p>
            </div>
          </div>

          <div className="p-3 bg-white border border-slate-200 rounded-xl flex justify-between items-center text-xs">
            <div>
              <span className="text-slate-400 font-medium">Mentor:</span>{" "}
              <span className="font-semibold text-slate-800">{currentDoc.mentor || student.mentor || "N/A"}</span>
            </div>
            <div>
              <span className="text-slate-400 font-medium">Director:</span>{" "}
              <span className="font-semibold text-slate-800">{currentDoc.director || student.director || "N/A"}</span>
            </div>
          </div>

          {/* Actions */}
          <div className="pt-4 border-t border-slate-100 flex justify-end gap-3">
            <button
              onClick={onClose}
              className="px-5 py-2 rounded-xl border border-slate-200 text-slate-700 text-sm font-semibold hover:bg-slate-50 transition"
            >
              Close
            </button>
            <button
              onClick={handleOpenPublicVerification}
              className="inline-flex items-center gap-2 px-5 py-2 rounded-xl bg-red-600 text-white text-sm font-semibold hover:bg-red-700 transition shadow-md shadow-red-200"
            >
              <ExternalLink size={16} /> Open Document View
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
