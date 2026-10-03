import DashboardLayout from "../../../layouts/DashboardLayout";
import RecentActivity from "../components/RecentActivity";
import { useEffect, useState } from "react";
import { getMyCertificate } from "../../../api/certificate.api";
import { useNavigate } from "react-router-dom";
import {
  Award,
  GraduationCap,
  ArrowRight,
  FileText,
  AwardIcon,
  FileCheck,
  BadgeCheck,
  Building2,
  ShieldCheck,
  Sparkles,
  ExternalLink,
} from "lucide-react";

export default function StudentDashboard() {
  const navigate = useNavigate();
  const [certificates, setCertificates] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCerts = async () => {
      try {
        const response = await getMyCertificate();
        const list = Array.isArray(response.data) ? response.data : [response.data];
        setCertificates(list.filter(Boolean));
      } catch (err) {
        console.error("Failed to load student dashboard certificates:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchCerts();
  }, []);

  const totalCount = loading ? "..." : String(certificates.length);
  const activeCount = loading
    ? "..."
    : String(certificates.filter((c) => c.status === "active").length);
  const orgName = certificates[0]?.organization || "Tiiron Technologies";
  const activityCertId = certificates[0]?.certificateId || certificates[0]?._id || "";

  return (
    <DashboardLayout>
      <div className="space-y-8 pb-10">
        {/* Welcome Gradient Hero Banner */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-slate-900 via-slate-800 to-red-950 p-6 sm:p-10 text-white shadow-xl border border-slate-800">
          {/* Background Decorative Accents */}
          <div className="absolute -top-12 -right-12 h-64 w-64 rounded-full bg-red-600/20 blur-3xl pointer-events-none"></div>
          <div className="absolute -bottom-16 -left-16 h-64 w-64 rounded-full bg-blue-600/15 blur-3xl pointer-events-none"></div>

          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2 max-w-xl">
              <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3.5 py-1 text-xs font-medium backdrop-blur-md border border-white/15 text-red-200">
                <Sparkles size={14} className="text-amber-400 animate-pulse" />
                <span>Student Verification Portal</span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold  tracking-tight text-white">
                Welcome Back 
              </h1>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                Manage, view, and share your tamper-proof certificates and official offer letters in one secure workspace.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => navigate("/student/my-certificate")}
                className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-red-600 to-red-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-red-600/30 hover:from-red-500 hover:to-red-600 transition-all hover:scale-[1.02]"
              >
                Explore All Documents <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* Enhanced Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: Total Credentials */}
          <div className="group relative overflow-hidden rounded-3xl bg-white p-6 shadow-sm border border-slate-200/80 transition-all duration-300 hover:shadow-xl hover:border-red-200 hover:-translate-y-1">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Total Credentials
              </span>
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-red-50 text-red-600 transition-transform duration-300 group-hover:scale-110">
                <Award size={24} />
              </div>
            </div>
            <div className="mt-4">
              <span className="text-4xl font-black tracking-tight text-slate-900">
                {totalCount}
              </span>
              <p className="text-xs text-slate-500 mt-1 font-medium">
                Issued documents on your account
              </p>
            </div>
          </div>

          {/* Card 2: Verified Status */}
          <div className="group relative overflow-hidden rounded-3xl bg-white p-6 shadow-sm border border-slate-200/80 transition-all duration-300 hover:shadow-xl hover:border-emerald-200 hover:-translate-y-1">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Verified Credentials
              </span>
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600 transition-transform duration-300 group-hover:scale-110">
                <ShieldCheck size={24} />
              </div>
            </div>
            <div className="mt-4">
              <span className="text-4xl font-black tracking-tight text-slate-900">
                {activeCount}
              </span>
              <p className="text-xs text-emerald-600 mt-1 font-semibold flex items-center gap-1">
                <BadgeCheck size={14} /> Active & Blockchain Authenticated
              </p>
            </div>
          </div>

          {/* Card 3: Organization */}
          <div className="group relative overflow-hidden rounded-3xl bg-white p-6 shadow-sm border border-slate-200/80 transition-all duration-300 hover:shadow-xl hover:border-blue-200 hover:-translate-y-1">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Issuing Organization
              </span>
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 transition-transform duration-300 group-hover:scale-110">
                <Building2 size={24} />
              </div>
            </div>
            <div className="mt-4">
              <span className="text-xl font-bold tracking-tight text-slate-900 truncate block">
                {orgName}
              </span>
              <p className="text-xs text-slate-500 mt-1 font-medium">
                Verified Organization Roster
              </p>
            </div>
          </div>
        </div>

        {/* Credentials List Section */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-slate-900">
                My Issued Credentials
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Select any document below to view detailed breakdown or export PNG/PDF.
              </p>
            </div>

            {certificates.length > 0 && (
              <button
                onClick={() => navigate("/student/my-certificate")}
                className="text-xs font-bold text-red-600 hover:text-red-700 transition flex items-center gap-1"
              >
                View All <ExternalLink size={14} />
              </button>
            )}
          </div>

          {loading ? (
            <div className="flex flex-col items-center justify-center p-12 bg-white rounded-3xl border border-slate-200 shadow-sm">
              <div className="h-10 w-10 rounded-full border-4 border-red-100 border-t-red-600 animate-spin"></div>
              <p className="text-xs text-slate-500 mt-4 font-medium">Loading your credential records...</p>
            </div>
          ) : certificates.length === 0 ? (
            <div className="p-12 text-center bg-white rounded-3xl border border-slate-200 shadow-sm">
              <div className="h-16 w-16 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award size={36} />
              </div>
              <h3 className="text-lg font-bold text-slate-900">No Credentials Issued Yet</h3>
              <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
                Your organization has not assigned any certificates or offer letters to your account yet.
              </p>
            </div>
          ) : (
            <div className="grid lg:grid-cols-2 gap-6">
              {certificates.map((cert) => {
                const cType = (cert.certificateType || "internship").toLowerCase();
                const isInternship = cType === "internship";
                const isTraining = cType === "training";
                const isOfferLetter = cType === "offer-letter";
                const isAppreciation = cType === "appreciation-letter";

                let Icon = FileCheck;
                let bgStyle = "bg-purple-50 text-purple-600 border-purple-200";
                let btnStyle = "bg-purple-600 hover:bg-purple-700 shadow-purple-200";
                let badgeStyle = "bg-purple-50 text-purple-700 border-purple-200";
                let titleText = (cert.certificateType || "Document")
                  .replace(/-/g, " ")
                  .replace(/\b\w/g, (l: string) => l.toUpperCase());

                if (isInternship) {
                  Icon = Award;
                  bgStyle = "bg-red-50 text-red-600 border-red-200";
                  btnStyle = "bg-red-600 hover:bg-red-700 shadow-red-200";
                  badgeStyle = "bg-red-50 text-red-700 border-red-200";
                  titleText = "Internship Certificate";
                } else if (isTraining) {
                  Icon = GraduationCap;
                  bgStyle = "bg-blue-50 text-blue-600 border-blue-200";
                  btnStyle = "bg-blue-600 hover:bg-blue-700 shadow-blue-200";
                  badgeStyle = "bg-blue-50 text-blue-700 border-blue-200";
                  titleText = "Training Certificate";
                } else if (isOfferLetter) {
                  Icon = FileText;
                  bgStyle = "bg-emerald-50 text-emerald-600 border-emerald-200";
                  btnStyle = "bg-emerald-600 hover:bg-emerald-700 shadow-emerald-200";
                  badgeStyle = "bg-emerald-50 text-emerald-700 border-emerald-200";
                  titleText = "Offer Letter";
                } else if (isAppreciation) {
                  Icon = AwardIcon;
                  bgStyle = "bg-amber-50 text-amber-600 border-amber-200";
                  btnStyle = "bg-amber-600 hover:bg-amber-700 shadow-amber-200";
                  badgeStyle = "bg-amber-50 text-amber-700 border-amber-200";
                  titleText = "Appreciation Letter";
                }

                const handleNavigate = () => {
                  navigate(`/student/certificates/doc/${cert._id || cert.certificateId}`);
                };

                return (
                  <div
                    key={cert._id || cert.certificateId}
                    className="group bg-white rounded-3xl border border-slate-200/90 p-6 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between">
                        <div className={`p-3.5 rounded-2xl border ${bgStyle} transition-transform duration-300 group-hover:scale-105`}>
                          <Icon size={26} />
                        </div>
                        <div className="flex items-center gap-2">
                          <span className={`text-[11px] font-bold uppercase px-3 py-1 rounded-full border ${badgeStyle}`}>
                            {titleText}
                          </span>
                          <span className="text-xs font-mono font-semibold bg-slate-100 px-2.5 py-1 rounded-md text-slate-700">
                            #{cert.certificateId}
                          </span>
                        </div>
                      </div>

                      <h3 className="text-xl font-bold text-slate-900 mt-5">
                        {titleText}
                      </h3>

                      <div className="mt-3 space-y-1 text-xs text-slate-600">
                        <p>
                          <span className="font-medium text-slate-400">Course / Program:</span>{" "}
                          <span className="font-semibold text-slate-800">{cert.course || "Technical Training"}</span>
                        </p>
                        <p>
                          <span className="font-medium text-slate-400">Issued by:</span>{" "}
                          <span className="font-semibold text-slate-800">{cert.organization || orgName}</span>
                        </p>
                      </div>
                    </div>

                    <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                      <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-100">
                        <ShieldCheck size={13} /> Active & Verified
                      </span>

                      <button
                        onClick={handleNavigate}
                        className={`flex items-center gap-2 py-2.5 px-5 rounded-xl text-xs font-semibold text-white transition-all shadow-md hover:scale-[1.02] ${btnStyle}`}
                      >
                        View {titleText} <ArrowRight size={14} />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Activity Component */}
        {activityCertId && (
          <div className="rounded-3xl bg-white border border-slate-200 p-2 shadow-sm">
            <RecentActivity id={activityCertId} />
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
