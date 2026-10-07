import { Link } from "react-router-dom";
import Navbar from "../features/landing/components/Navbar";
import Footer from "../components/shared/Footer";
import { ShieldCheck, FileText, RefreshCcw } from "lucide-react";

type Kind = "privacy" | "terms" | "refund";
const content: Record<Kind, { title: string; intro: string; sections: { heading: string; body: string }[] }> = {
  privacy: { title: "Privacy Policy", intro: "This policy describes how Tiiron Verify handles information when you use our credential verification and subscription services.", sections: [
    { heading: "Information we collect", body: "We may collect account and organization details you provide, contact information, subscription and transaction references, and the verification data needed to provide the service." },
    { heading: "How information is used", body: "We use information to operate and secure accounts, process subscriptions, provide verification results, respond to support requests, and meet applicable legal obligations." },
    { heading: "Sharing and security", body: "We share information with service providers who help operate the portal and when required to provide a verification or comply with law. We use reasonable safeguards and limit access to authorized purposes." },
    { heading: "Your choices and contact", body: "You may request access, correction, or deletion of account information subject to legal and service requirements. Contact verify@tiirontechnologies.com for privacy requests." },
  ] },
  terms: { title: "Terms & Conditions", intro: "These terms apply to your access to Tiiron Verify, including credential verification, organization tools, and paid plans.", sections: [
    { heading: "Accounts and access", body: "Provide accurate account information and keep your login credentials secure. You are responsible for activity performed through your account and must notify us about suspected unauthorized access." },
    { heading: "Using verification services", body: "Use the portal only for lawful, authorized verification purposes. Do not misuse, interfere with, reverse engineer, or attempt unauthorized access to the service or another person's records." },
    { heading: "Subscriptions and payment", body: "Plan features, duration, and fees are displayed at checkout. Paid access begins after successful payment confirmation and is subject to the selected plan." },
    { heading: "Service and contact", body: "We may update features to maintain or improve the portal. For questions about these terms, contact verify@tiirontechnologies.com." },
  ] },
  refund: { title: "Refund Policy", intro: "Please review this policy before purchasing a Tiiron Verify subscription.", sections: [
    { heading: "Digital subscription purchases", body: "Because subscriptions provide immediate access to digital services, payments are generally non-refundable once a plan has been activated, except where applicable law requires otherwise." },
    { heading: "Duplicate or incorrect charges", body: "If you believe you were charged more than once or the amount is incorrect, contact us promptly with your account email and payment reference so we can investigate." },
    { heading: "Failed payments", body: "A payment that is declined or not confirmed does not activate a paid subscription. If your bank shows a debit but the portal shows no successful order, contact support for reconciliation." },
    { heading: "Request help", body: "Email verify@tiirontechnologies.com with your order or payment reference. Approved refunds, where applicable, are returned through the original payment method." },
  ] },
};

export default function LegalPage({ kind }: { kind: Kind }) {
  const page = content[kind];
  const PageIcon = kind === "privacy" ? ShieldCheck : kind === "refund" ? RefreshCcw : FileText;
  return <div className="font-sans text-slate-900"><Navbar /><main className="min-h-[65vh] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-rose-50 via-[#fdfaf9] to-slate-50 px-4 py-10 sm:px-6 sm:py-16"><article className="mx-auto max-w-4xl">
    <Link to="/" className="text-sm font-semibold text-rose-700 hover:text-rose-800">Tiiron Verify <span aria-hidden="true">/</span> Policies</Link>
    <header className="mt-7 rounded-3xl border border-rose-100 bg-white/90 p-6 shadow-sm sm:p-9"><div className="flex items-start gap-4"><div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-rose-50 text-rose-700 sm:h-14 sm:w-14"><PageIcon size={25} /></div><div><p className="text-xs font-bold uppercase tracking-[.16em] text-rose-700">Tiiron Verify · {kind === "terms" ? "Service terms" : kind === "refund" ? "Billing information" : "Data protection"}</p><h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">{page.title}</h1><p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600 sm:text-base sm:leading-7">{page.intro}</p></div></div></header>
    <div className="mt-6 grid gap-5 md:grid-cols-[minmax(0,1fr)_220px] md:items-start"><div className="divide-y divide-slate-100 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">{page.sections.map((section, index) => <section key={section.heading} className="p-5 sm:p-7"><p className="text-xs font-bold tracking-wide text-rose-600">{String(index + 1).padStart(2, "0")}</p><h2 className="mt-1 text-lg font-semibold sm:text-xl">{section.heading}</h2><p className="mt-2 text-sm leading-6 text-slate-600 sm:text-base sm:leading-7">{section.body}</p></section>)}</div><aside className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm md:sticky md:top-6"><h2 className="text-sm font-semibold">Related pages</h2><nav className="mt-3 flex flex-wrap gap-2 md:flex-col">{[{ label: "Privacy", to: "/privacy-policy" }, { label: "Terms & Conditions", to: "/terms-and-conditions" }, { label: "Refund Policy", to: "/refund-policy" }, { label: "Pricing", to: "/pricing" }].map((item) => <Link key={item.to} className={`rounded-lg px-3 py-2 text-sm transition ${item.to === `/${kind === "terms" ? "terms-and-conditions" : kind === "refund" ? "refund-policy" : "privacy-policy"}` ? "bg-rose-50 font-semibold text-rose-700" : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"}`} to={item.to}>{item.label}</Link>)}</nav><div className="mt-5 border-t border-slate-100 pt-4"><p className="text-xs leading-5 text-slate-500">Questions about this page?</p><a className="mt-1 inline-block break-all text-sm font-medium text-rose-700 hover:underline" href="mailto:verify@tiirontechnologies.com">verify@tiirontechnologies.com</a></div></aside></div>
    <p className="mt-5 text-xs leading-5 text-slate-500">This page summarizes Tiiron Verify's current service practices. Please have final policy language reviewed for your organization before relying on it as legal advice.</p>
  </article></main><Footer /></div>;
}
