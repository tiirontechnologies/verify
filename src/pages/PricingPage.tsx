import { useMemo } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { ArrowRight, Check, LockKeyhole } from "lucide-react";
import Navbar from "../features/landing/components/Navbar";
import Footer from "../components/shared/Footer";

const plans = [
  { code: "TRIAL", name: "14-Day Trial", price: "₹99", period: "/14 days", description: "Explore Tiiron Verify with a low-cost trial", features: ["Verify certificates and credentials", "Search by unique Verification ID", "Printable verification results", "Basic verification history"] },
  { code: "STARTER", name: "Starter", price: "₹499", period: "/month", description: "Everything you need for regular credential verification", popular: true, features: ["Everything in Trial", "Multiple credential verification", "Extended verification history", "Organization access", "Email support"] },
  { code: "PROFESSIONAL", name: "Professional", price: "₹2,499", period: "/6 months", description: "A complete solution for growing organizations", features: ["Everything in Starter", "Higher verification usage", "Advanced verification history", "Detailed printable reports", "Priority support"] },
];

export default function PricingPage() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedPlan = useMemo(() => plans.find((plan) => plan.code === searchParams.get("plan")), [searchParams]);
  const signedIn = Boolean(sessionStorage.getItem("user") || localStorage.getItem("user"));

  const choosePlan = (code: string) => setSearchParams({ plan: code }, { replace: false });
  const continueToPlan = () => {
    if (signedIn) navigate("/Subscription");
    else navigate(`/login?redirect=${encodeURIComponent(`/pricing?plan=${selectedPlan?.code}`)}`);
  };

  return <div className="font-sans text-slate-900"><Navbar /><main className="min-h-screen bg-[#fdfaf9] px-5 pb-16 pt-16 text-slate-900">
    <div className="mx-auto max-w-6xl">
      <div className="mx-auto max-w-2xl text-center"><span className="rounded-full border border-rose-200 bg-rose-50 px-3 py-1 text-xs font-semibold text-rose-700">TIIRON VERIFY</span><h1 className="mt-5 text-4xl font-bold tracking-tight sm:text-5xl">Simple, transparent pricing</h1><p className="mt-4 text-slate-600">Choose a plan that fits your organization's verification needs. Review your order right here before continuing.</p></div>
      <div className="mt-10 grid gap-6 md:grid-cols-3">{plans.map((plan) => <section key={plan.code} className={`relative flex flex-col rounded-2xl border bg-white p-7 shadow-sm ${plan.popular ? "border-rose-300 ring-1 ring-rose-100 shadow-xl shadow-rose-100" : "border-slate-200"}`}>{plan.popular && <span className="absolute -top-3 left-6 rounded-full bg-rose-600 px-3 py-1 text-xs font-bold text-white">POPULAR</span>}<h2 className="text-xl font-semibold">{plan.name}</h2><p className="mt-2 min-h-10 text-sm text-slate-500">{plan.description}</p><p className="mt-6 text-3xl font-bold">{plan.price}<span className="ml-1 text-sm font-normal text-slate-500">{plan.period}</span></p><ul className="my-7 flex-1 space-y-3">{plan.features.map((feature) => <li key={feature} className="flex gap-2 text-sm text-slate-700"><Check size={17} className="shrink-0 text-rose-600" />{feature}</li>)}</ul><button onClick={() => choosePlan(plan.code)} className={`rounded-xl px-4 py-3 text-sm font-semibold transition ${selectedPlan?.code === plan.code || plan.popular ? "bg-rose-600 text-white hover:bg-rose-700" : "border border-slate-200 hover:border-rose-300 hover:text-rose-700"}`}>{selectedPlan?.code === plan.code ? "Selected" : "Review plan"}</button></section>)}</div>

      {selectedPlan && <section aria-live="polite" className="mx-auto mt-8 max-w-3xl overflow-hidden rounded-2xl border border-rose-200 bg-white shadow-lg shadow-rose-100/60"><div className="border-b border-slate-100 bg-rose-50/70 px-6 py-5 sm:px-8"><p className="text-xs font-bold uppercase tracking-wider text-rose-700">Plan checkout</p><h2 className="mt-1 text-xl font-bold text-slate-900">Review your order</h2></div><div className="p-6 sm:p-8"><div className="flex items-start justify-between gap-4"><div><p className="text-lg font-semibold">{selectedPlan.name}</p><p className="mt-1 text-sm text-slate-500">{selectedPlan.description}</p></div><p className="shrink-0 text-right text-2xl font-bold">{selectedPlan.price}<span className="block text-xs font-normal text-slate-500">{selectedPlan.period}</span></p></div><div className="mt-5 flex items-start gap-2 rounded-xl bg-slate-50 p-4 text-sm leading-6 text-slate-600"><LockKeyhole size={17} className="mt-0.5 shrink-0 text-slate-500" />{signedIn ? "Continue to your organization subscription page to confirm this plan." : "Sign in to your organization account to continue. Your selected plan will stay here when you return."}</div><div className="mt-5 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end"><button onClick={() => setSearchParams({}, { replace: false })} className="rounded-xl border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50">Choose another plan</button><button onClick={continueToPlan} className="inline-flex items-center justify-center gap-2 rounded-xl bg-rose-600 px-5 py-3 text-sm font-semibold text-white hover:bg-rose-700">{signedIn ? "Continue" : "Sign in to continue"}<ArrowRight size={16} /></button></div></div></section>}
      <p className="mt-8 text-center text-xs text-slate-500">Secure payment is completed after you sign in. Taxes, if applicable, are shown at payment.</p>
    </div>
  </main><Footer /></div>;
}
