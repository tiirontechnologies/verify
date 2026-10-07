import { useMemo, useState } from "react";
import { ChevronDown, Search, ShieldCheck, FilePlus2, Building2, CreditCard, Mail } from "lucide-react";
import Navbar from "../features/landing/components/Navbar";
import Footer from "../components/shared/Footer";

const articles = [
  { category: "Certificates", question: "How do I create a certificate?", answer: "Sign in to your student account, open Generate Certificate, choose the certificate type, fill in the required details, and submit it. Your organization will review and issue the certificate." },
  { category: "Certificates", question: "Where can I find my issued certificates?", answer: "Open My Credentials from your dashboard. Issued certificates and their verification IDs are listed there. You can open a certificate to view or download it." },
  { category: "Organizations", question: "How do I assign a verification portal to my organization?", answer: "Sign in as an organization administrator and open your organization dashboard. Complete your organization profile and contact support if portal access or administrator permissions need to be configured." },
  { category: "Organizations", question: "How do I add students or upload records?", answer: "From the organization dashboard, use Student Upload to add records in bulk, or open the student management area to add and update individual records." },
  { category: "Verification", question: "How do I verify a certificate?", answer: "Enter the certificate's unique Verification ID in the verification portal, or open its verification link or QR code. Check that the displayed name, organization, and credential details match the document." },
  { category: "Verification", question: "My verification ID is not working. What should I do?", answer: "Check the ID for typing errors and try again. If the credential still cannot be found, contact the organization that issued it and include the ID." },
  { category: "Billing", question: "How can I change or review my subscription?", answer: "Open Subscription from your signed-in dashboard to review available plans and your current subscription details. Pricing and billing information is also available on the Pricing page." },
  { category: "Billing", question: "Can I request a refund?", answer: "Please review the Refund Policy for eligibility and payment guidance. For a duplicate or incorrect charge, email verify@tiirontechnologies.com with your account email and payment reference." },
];

const categories = [
  { name: "Certificates", icon: FilePlus2, description: "Create, access, and manage credentials." },
  { name: "Organizations", icon: Building2, description: "Set up your portal and manage records." },
  { name: "Verification", icon: ShieldCheck, description: "Verify credentials and solve ID issues." },
  { name: "Billing", icon: CreditCard, description: "Plans, subscriptions, and payments." },
];

export default function HelpSupportPage() {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All topics");
  const [openQuestion, setOpenQuestion] = useState<string | null>(articles[0].question);
  const filteredArticles = useMemo(() => articles.filter((article) =>
    (activeCategory === "All topics" || article.category === activeCategory) &&
    `${article.question} ${article.answer} ${article.category}`.toLowerCase().includes(query.trim().toLowerCase())
  ), [activeCategory, query]);

  return <div className="font-sans text-slate-900"><Navbar />
    <main className="min-h-screen bg-[#fdfaf9] px-4 pb-16 pt-18 sm:px-6">
      <section className="mx-auto max-w-5xl">
        <div className="relative isolate overflow-hidden rounded-[2rem] border border-rose-100 bg-gradient-to-br from-white via-rose-50 to-orange-50 px-6 py-10 shadow-sm sm:px-12 sm:py-14">
          <div aria-hidden="true" className="absolute -right-20 -top-28 -z-10 h-80 w-80 rounded-full bg-rose-200/40 blur-3xl" />
          <div aria-hidden="true" className="absolute -bottom-32 left-1/3 -z-10 h-64 w-64 rounded-full bg-orange-200/30 blur-3xl" />
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-rose-200 bg-white/80 px-3.5 py-1.5 text-xs font-bold uppercase tracking-[.14em] text-rose-700 shadow-sm"><ShieldCheck size={15} /> Tiiron Verify Help Center</span>
            <h1 className="mt-6 text-4xl font-bold tracking-tight text-slate-900 sm:text-6xl sm:leading-[1.08]">What can we <span className="text-rose-600">help you</span> with?</h1>
            <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">Quick answers for certificates, verification, your organization portal, and billing.</p>
            <label className="mx-auto mt-8 flex max-w-2xl items-center gap-3 rounded-2xl border border-slate-200 bg-white px-5 py-4 text-slate-500 shadow-lg shadow-rose-900/5 transition focus-within:border-rose-300 focus-within:ring-4 focus-within:ring-rose-100">
              <Search size={21} className="shrink-0 text-rose-600" /><input aria-label="Search help articles" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search articles, e.g. create a certificate" className="w-full bg-transparent text-sm text-slate-900 outline-none placeholder:text-slate-400 sm:text-base" />
              <span className="hidden shrink-0 rounded-lg bg-slate-50 px-2 py-1 text-xs text-slate-400 sm:inline">{articles.length} guides</span>
            </label>
            <div className="mt-5 flex flex-wrap items-center justify-center gap-2 text-sm"><span className="mr-1 text-slate-500">Popular:</span>{["Create a certificate", "Verify an ID", "Refunds"].map((topic) => <button key={topic} onClick={() => { setQuery(topic === "Refunds" ? "refund" : topic === "Verify an ID" ? "verification ID" : "create a certificate"); setActiveCategory("All topics"); }} className="rounded-full border border-rose-100 bg-white/80 px-3 py-1.5 font-medium text-slate-700 transition hover:border-rose-300 hover:text-rose-700">{topic}</button>)}</div>
          </div>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map(({ name, icon: Icon, description }) => <button key={name} onClick={() => setActiveCategory(activeCategory === name ? "All topics" : name)} className={`rounded-2xl border bg-white p-5 text-left shadow-sm transition hover:-translate-y-0.5 hover:border-rose-300 hover:shadow-md ${activeCategory === name ? "border-rose-400 ring-2 ring-rose-100" : "border-slate-200"}`}><Icon size={22} className="text-rose-600" /><h2 className="mt-4 font-semibold">{name}</h2><p className="mt-1 text-sm leading-5 text-slate-500">{description}</p></button>)}
        </div>

        <section className="mx-auto mt-12 max-w-3xl">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3"><h2 className="text-2xl font-bold">{activeCategory === "All topics" ? "Frequently asked questions" : activeCategory}</h2>{activeCategory !== "All topics" && <button onClick={() => setActiveCategory("All topics")} className="text-sm font-semibold text-rose-700 hover:underline">Show all topics</button>}</div>
          <div className="divide-y divide-slate-100 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            {filteredArticles.map((article) => <article key={article.question} className="px-5 sm:px-6"><button onClick={() => setOpenQuestion(openQuestion === article.question ? null : article.question)} aria-expanded={openQuestion === article.question} className="flex w-full items-center justify-between gap-4 py-5 text-left font-semibold"><span>{article.question}</span><ChevronDown size={19} className={`shrink-0 text-rose-600 transition-transform ${openQuestion === article.question ? "rotate-180" : ""}`} /></button>{openQuestion === article.question && <p className="max-w-2xl pb-5 text-sm leading-6 text-slate-600">{article.answer}</p>}</article>)}
            {filteredArticles.length === 0 && <p className="p-6 text-sm text-slate-600">No articles matched your search. Try another phrase or <a className="font-semibold text-rose-700 underline" href="/contact-us">contact our team</a>.</p>}
          </div>
        </section>

        <div className="mx-auto mt-12 flex max-w-3xl flex-col items-start justify-between gap-5 rounded-2xl border border-rose-100 bg-rose-50 p-6 sm:flex-row sm:items-center sm:p-8"><div><h2 className="text-lg font-bold">Still need help?</h2><p className="mt-1 text-sm text-slate-600">Our team can help with account, certificate, and verification questions.</p></div><a href="/contact-us" className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-rose-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-rose-700"><Mail size={17} /> Contact Us</a></div>
      </section>
    </main><Footer /></div>;
}
