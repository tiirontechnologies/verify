import { Link, useNavigate, useSearchParams } from "react-router-dom";

const plans: Record<string, { name: string; price: string; period: string; detail: string }> = {
  TRIAL: { name: "14-Day Trial", price: "₹99", period: "14 days", detail: "Access to core verification features" },
  STARTER: { name: "Starter", price: "₹499", period: "1 month", detail: "Regular credential verification for your organization" },
  PROFESSIONAL: { name: "Professional", price: "₹2,499", period: "6 months", detail: "Advanced verification for growing organizations" },
};

export default function CheckoutPage() {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const plan = plans[params.get("plan") || ""];
  return <main className="min-h-screen bg-[#fdfaf9] px-5 py-14 font-sans text-slate-900"><div className="mx-auto max-w-2xl"><Link to="/pricing" className="text-sm font-medium text-rose-700">← Back to pricing</Link><h1 className="mt-7 text-3xl font-bold">Checkout</h1><p className="mt-2 text-slate-600">Review your selected subscription before continuing.</p>{plan ? <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8"><div className="flex items-start justify-between gap-4 border-b border-slate-100 pb-6"><div><p className="text-sm font-medium text-slate-500">Selected plan</p><h2 className="mt-1 text-xl font-semibold">{plan.name}</h2><p className="mt-2 text-sm text-slate-500">{plan.detail}</p></div><div className="text-right"><p className="text-2xl font-bold">{plan.price}</p><p className="text-sm text-slate-500">{plan.period}</p></div></div><p className="py-5 text-sm leading-6 text-slate-600">Sign in to your organization account to confirm the order and continue to secure payment.</p><button onClick={() => navigate(`/login?redirect=/Subscription`)} className="w-full rounded-xl bg-rose-600 px-4 py-3 font-semibold text-white hover:bg-rose-700">Login to continue</button><p className="mt-4 text-center text-xs text-slate-500">Your order is not charged until payment is completed.</p></div> : <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-8"><p className="text-slate-600">Choose a plan to view its checkout summary.</p><Link to="/pricing" className="mt-5 inline-flex rounded-xl bg-rose-600 px-5 py-3 font-semibold text-white">View pricing</Link></div>}</div></main>;
}
