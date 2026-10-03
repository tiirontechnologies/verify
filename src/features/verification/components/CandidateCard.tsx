import {
  User,
  GraduationCap,
  Calendar,
  Building2,
  CheckCircle2,
} from "lucide-react";

import type { CertificateData } from "../../../types/certificate";

type Props = {
  certificate: CertificateData;
};

export default function CandidateCard({
  certificate,
}: Props) {
  return (
    <article className="grid overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-lg sm:rounded-3xl md:grid-cols-[minmax(190px,0.72fr)_minmax(0,1.8fr)]">
      <aside className="flex flex-col justify-between bg-[#711824] p-6 text-white sm:p-8">
        <div>
          <div className="flex h-16 w-16 items-center justify-center rounded-full border border-white/25 bg-white/10 text-white sm:h-20 sm:w-20">
            <User size={34} />
          </div>
          <p className="mt-6 text-xs font-semibold uppercase text-rose-200">
            Verified candidate
          </p>
          <h2 className="mt-2 break-words text-2xl font-bold sm:text-3xl">
            {certificate.studentName}
          </h2>
          {certificate.role && (
            <p className="mt-2 break-words text-sm text-white/75">{certificate.role}</p>
          )}
          {certificate.email && (
            <p className="mt-4 break-all text-xs text-white/70">{certificate.email}</p>
          )}
        </div>

        <div className="mt-8 flex items-center gap-2 border-t border-white/20 pt-4 text-sm font-semibold text-emerald-100">
          <CheckCircle2 size={18} /> Officially verified
        </div>
      </aside>

      <div className="min-w-0 p-5 sm:p-8">
        <div className="flex flex-col gap-2 border-b border-slate-200 pb-5 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase text-red-700">
              Credential record
            </p>
            <h3 className="mt-1 break-words text-xl font-bold text-slate-900 sm:text-2xl">
              {certificate.type || "Certificate"}
            </h3>
          </div>
          <span className="inline-flex w-fit items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
            <CheckCircle2 size={14} /> Verified
          </span>
        </div>

        <section className="pt-5">
          <h4 className="text-xs font-bold uppercase text-slate-500">Experience & education</h4>
          <div className="mt-4 grid gap-5 sm:grid-cols-2">
            <div className="flex min-w-0 gap-3">
              <GraduationCap size={20} className="mt-0.5 shrink-0 text-red-700" />
              <div className="min-w-0">
                <p className="text-xs text-slate-500">Program</p>
                <p className="mt-1 break-words font-semibold text-slate-900">
                  {certificate.course || "Not specified"}
                </p>
              </div>
            </div>
            <div className="flex min-w-0 gap-3">
              <Building2 size={19} className="mt-0.5 shrink-0 text-red-700" />
              <div className="min-w-0">
                <p className="text-xs text-slate-500">Issuing organization</p>
                <p className="mt-1 break-words font-semibold text-slate-900">
                  {certificate.organization || "Not specified"}
                </p>
              </div>
            </div>
            <div className="flex min-w-0 gap-3">
              <Calendar size={19} className="mt-0.5 shrink-0 text-red-700" />
              <div className="min-w-0">
                <p className="text-xs text-slate-500">Duration</p>
                <p className="mt-1 break-words font-semibold text-slate-900">
                  {[certificate.startDate, certificate.endDate].filter(Boolean).join(" - ") || "Not specified"}
                </p>
              </div>
            </div>
            <div className="flex min-w-0 gap-3">
              <Calendar size={19} className="mt-0.5 shrink-0 text-red-700" />
              <div className="min-w-0">
                <p className="text-xs text-slate-500">Issue date</p>
                <p className="mt-1 break-words font-semibold text-slate-900">
                  {certificate.issueDate || "Not specified"}
                </p>
              </div>
            </div>
          </div>
        </section>

        <div className="mt-6 rounded-lg border border-slate-200 bg-slate-50 px-4 py-3">
          <p className="text-xs font-semibold uppercase text-slate-500">Verification ID</p>
          <p className="mt-1 break-all font-mono text-sm font-semibold text-slate-900">
            {certificate.certificateId}
          </p>
        </div>
      </div>
    </article>
  );
}