import { useNavigate } from "react-router-dom";
import { Check } from "lucide-react";
import Navbar from "../features/landing/components/Navbar";
import Footer from "../components/shared/Footer";

const plans = [
  { code: "TRIAL", name: "14-Day Trial", price: "₹99", period: "/14 days", description: "Explore Tiiron Verify with a low-cost trial", features: ["Verify certificates and credentials", "Search by unique Verification ID", "Printable verification results", "Basic verification history"] },
  { code: "STARTER", name: "Starter", price: "₹499", period: "/month", description: "Everything you need for regular credential verification", popular: true, features: ["Everything in Trial", "Multiple credential verification", "Extended verification history", "Organization access", "Email support"] },
  { code: "PROFESSIONAL", name: "Professional", price: "₹2,499", period: "/6 months", description: "A complete solution for growing organizations", features: ["Everything in Starter", "Higher verification usage", "Advanced verification history", "Detailed printable reports", "Priority support"] },
];

export default function PricingPage() {
  const navigate = useNavigate();
  return <div className="font-sans text-slate-900"><Navbar /><main className="min-h-screen bg-[#fdfaf9] px-5 pt-16 pb-16 text-slate-900">
    <div className="mx-auto max-w-6xl">
      <div className="mx-auto max-w-2xl text-center"><span className="rounded-full border border-rose-200 bg-rose-50 px-3 py-1 text-xs font-semibold text-rose-700">TIIRON VERIFY</span><h1 className="mt-5 text-4xl font-bold tracking-tight sm:text-5xl">Simple, transparent pricing</h1><p className="mt-4 text-slate-600">Choose a plan that fits your organization's verification needs. Review your order before signing in to continue.</p></div>
      <div className="mt-6 grid gap-6 md:grid-cols-3">{plans.map((plan) => <section key={plan.code} className={`relative flex flex-col rounded-2xl border bg-white p-7 shadow-sm ${plan.popular ? "border-rose-300 ring-1 ring-rose-100 shadow-xl shadow-rose-100" : "border-slate-200"}`}>{plan.popular && <span className="absolute -top-3 left-6 rounded-full bg-rose-600 px-3 py-1 text-xs font-bold text-white">POPULAR</span>}<h2 className="text-xl font-semibold">{plan.name}</h2><p className="mt-2 min-h-10 text-sm text-slate-500">{plan.description}</p><p className="mt-6 text-3xl font-bold">{plan.price}<span className="ml-1 text-sm font-normal text-slate-500">{plan.period}</span></p><ul className="my-7 flex-1 space-y-3">{plan.features.map((feature) => <li key={feature} className="flex gap-2 text-sm text-slate-700"><Check size={17} className="shrink-0 text-rose-600" />{feature}</li>)}</ul><button onClick={() => navigate(`/checkout?plan=${plan.code}`)} className={`rounded-xl px-4 py-3 text-sm font-semibold ${plan.popular ? "bg-rose-600 text-white hover:bg-rose-700" : "border border-slate-200 hover:border-rose-300 hover:text-rose-700"}`}>Review plan</button></section>)}</div>
      <p className="mt-8 text-center text-xs text-slate-500">Secure payment is completed after you sign in. Taxes, if applicable, are shown at payment.</p>
    </div>
  </main><Footer /></div>;
}
