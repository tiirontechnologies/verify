import React, { useEffect, useState } from "react";
import { paymentApi } from "../api/payment";
import Navbar from "../features/landing/components/Navbar";
import Topbar from "../components/shared/Topbar"; 
import useMeRedirect from "../features/auth/hooks/useMeRedirect";
// import tiironLogo from "../assets/Tiiron_Technologies_Logo.png";

interface PlanFeature {
  label: string;
  included: boolean;
}

interface Plan {
  id: string;
  planCode: string; 
  name: string;
  tagline: string;
  price: string;
  duration: string;
  period: string;
  features: PlanFeature[];
  highlighted?: boolean;
  badge?: string;
}

const plans: Plan[] = [
  {
    id: "trial",
    planCode: "TRIAL",
    name: "14-Day Trial",
    tagline: "Explore Tiiron Verify with a low-cost trial",
    price: "₹99",
    period: "/14 Days",
    duration: "14 Days Access",
    badge: "TRIAL",
    features: [
      { label: "Verify issued certificates and credentials", included: true },
      { label: "Search using unique Verification ID", included: true },
      { label: "Access verification details", included: true },
      { label: "Printable verification results", included: true },
      { label: "Basic verification history", included: true },
      { label: "Secure encrypted connection", included: true },
      { label: "No long-term commitment", included: true },
    ],
  },
  {
    id: "starter",
    planCode: "STARTER",
    name: "Starter",
    tagline: "Everything you need for regular credential verification",
    price: "₹499",
    period: "/month",
    duration: "1 Month Access",
    highlighted: true,
    badge: "Popular",
    features: [
      { label: "All Trial features", included: true },
      { label: "Verification of multiple credentials", included: true },
      { label: "Extended verification history", included: true },
      { label: "Organization verification access", included: true },
      { label: "Printable verification reports", included: true },
      { label: "Centralized verification records", included: true },
      { label: "Faster verification workflow", included: true },
      { label: "Email support", included: true },
    ],
  },
  {
    id: "pro",
    planCode: "PROFESSIONAL",
    name: "Professional",
    tagline: "A complete verification solution for growing organizations",
    price: "₹2,499",
    period: "/6 Months",
    duration: "6 Months Access",
    features: [
      { label: "All Starter features", included: true },
      { label: "6 months of uninterrupted access", included: true },
      { label: "Higher verification usage", included: true },
      { label: "Advanced verification history", included: true },
      { label: "Organization-level verification management", included: true },
      { label: "Detailed verification records", included: true },
      { label: "Printable verification reports", included: true },
      { label: "Priority support", included: true },
    ],
  },
];

const CheckIcon: React.FC<{ active: boolean }> = ({ active }) => (
  <svg
    className={`h-5 w-5 shrink-0 ${active ? "text-rose-600" : "text-neutral-300"}`}
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    {active ? (
      <path
        d="M16.7 5.3a1 1 0 0 1 0 1.4l-7.4 7.4a1 1 0 0 1-1.4 0L4.3 10.5a1 1 0 1 1 1.4-1.4l2.9 2.9 6.7-6.7a1 1 0 0 1 1.4 0Z"
        fill="currentColor"
      />
    ) : (
      <path
        d="M5 10h10"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    )}
  </svg>
);

declare global {
  interface Window {
    Razorpay: any;
  }
}

const loadRazorpayScript = () =>
  new Promise<boolean>((resolve) => {
    if (window.Razorpay) {
      resolve(true);
      return;
    }
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });

const SubscriptionPage: React.FC = () => {
  const [loadingPlanId, setLoadingPlanId] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const checkLogin = useMeRedirect(false);
  // null = abhi check ho raha hai (flicker se bachne ke liye)
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);

  useEffect(() => {
    loadRazorpayScript();
  }, []);

  // Login check: Topbar (login) ya Navbar (logout) decide karne ke liye
  useEffect(() => {
    let active = true;

    (async () => {
      try {
        const result = await checkLogin();
        if (active) setIsLoggedIn(Boolean(result));
      } catch {
        if (active) setIsLoggedIn(false);
      }
    })();

    return () => {
      active = false;
    };
  }, [checkLogin]);

  const handleGetStarted = async (plan: Plan) => {
    setErrorMsg(null);
    setSuccessMsg(null);
    setLoadingPlanId(plan.id);

    try {
      const { data } = await paymentApi.createOrder({ plan: plan.planCode });

      // Backend actual response shape:
      // { success, message, data: { key, razorpayOrderId, amount, currency, plan, paymentId } }
      if (!data?.success || !data?.data) {
        setErrorMsg(data?.message || "Failed to create order. Please try again.");
        setLoadingPlanId(null);
        return;
      }

      const { key, razorpayOrderId, amount, currency } = data.data;

      // Free trial / zero-amount order — no Razorpay popup needed if backend already marks it paid.
      if (!amount || amount === 0) {
        try {
          const statusRes = await paymentApi.getPaymentStatus(razorpayOrderId);
          if (statusRes.data?.status === "paid") {
            setSuccessMsg(`${plan.name} activated successfully!`);
          } else {
            setSuccessMsg(`${plan.name} order created.`);
          }
        } catch {
          setSuccessMsg(`${plan.name} order created.`);
        }
        setLoadingPlanId(null);
        return;
      }

      const finalKey = key || import.meta.env.VITE_RAZORPAY_KEY_ID;
      if (!finalKey) {
        setErrorMsg("Payment configuration error: Razorpay key missing.");
        setLoadingPlanId(null);
        return;
      }

      const scriptLoaded = await loadRazorpayScript();
      if (!scriptLoaded) {
        setErrorMsg("Unable to load payment gateway. Please check your connection.");
        setLoadingPlanId(null);
        return;
      }

      const options = {
        key: finalKey,
        amount,
        currency: currency || "INR",
        name: "Tiiron Verification Portal",
        // image: tiironLogo,
        image:"https://verify.tiirontechnologies.com/assets/Tiiron_Technologies_Logo-CIXHLnbO.png",
        description: `${plan.name} Subscription`,
        order_id: razorpayOrderId,
        handler: async (response: any) => {
          try {
            const verifyRes = await paymentApi.verifyPayment({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              plan: plan.planCode,
            });

            if (verifyRes.data?.success) {
              setSuccessMsg(`Payment successful! ${plan.name} activated.`);
            } else {
              setErrorMsg(verifyRes.data?.message || "Payment verification failed.");
            }
          } catch (err: any) {
            setErrorMsg(
              err?.response?.data?.message || "Payment verification failed."
            );
          } finally {
            setLoadingPlanId(null);
          }
        },
        modal: {
          ondismiss: () => {
            setLoadingPlanId(null);
          },
        },
        theme: { color: "#e11d2a" },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.on("payment.failed", (response: any) => {
        setErrorMsg(response?.error?.description || "Payment failed. Please try again.");
        setLoadingPlanId(null);
      });
      razorpay.open();
    } catch (err: any) {
      setErrorMsg(
        err?.response?.data?.message || "Something went wrong. Please try again."
      );
      setLoadingPlanId(null);
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#fdfaf9] text-neutral-900 antialiased">
      {/* Login ho to Topbar, logout ho to Navbar */}
      {isLoggedIn === null ? null : isLoggedIn ? <Topbar /> : <Navbar />}

      {/* ambient tint */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute left-1/2 top-[-15%] h-[500px] w-[900px] -translate-x-1/2 rounded-full bg-rose-200/40 blur-[130px]" />
        <div className="absolute bottom-[-20%] right-[-10%] h-[400px] w-[500px] rounded-full bg-red-100/60 blur-[130px]" />
      </div>

      <div className="relative mx-auto max-w-6xl px-6 py-20">
        {/* Header */}
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-rose-200 bg-rose-50 px-3 py-1 text-xs font-medium text-rose-700">
            Tiiron Verify Portal
          </span>
          <h1 className="mt-5 text-4xl font-semibold tracking-tight text-neutral-900 sm:text-5xl">
            Choose Your Plan
          </h1>
          <p className="mt-4 text-base leading-relaxed text-neutral-500">
            Securely verify certificates, credentials, and student records with Tiiron Verify. Select a plan that fits your organization's verification requirements and get started in minutes.
          </p>
        </div>

        {(errorMsg || successMsg) && (
          <div className="mx-auto mt-8 max-w-xl animate-in fade-in slide-in-from-top-2 duration-300">
            {errorMsg && (
              <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
                {errorMsg}
              </div>
            )}
            {successMsg && (
              <div className="rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm font-medium text-green-700">
                {successMsg}
              </div>
            )}
          </div>
        )}

        {/* Plans */}
        <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-3">
          {plans.map((plan) => {
            const isLoading = loadingPlanId === plan.id;

            return (
              <div
                key={plan.id}
                className={`group relative flex flex-col rounded-2xl border p-7 transition-all duration-300 ease-out hover:-translate-y-1.5 ${
                  plan.highlighted
                    ? "border-rose-300 bg-white shadow-[0_1px_2px_rgba(0,0,0,0.04),0_24px_60px_-20px_rgba(225,29,42,0.35)] ring-1 ring-rose-100 hover:shadow-[0_1px_2px_rgba(0,0,0,0.04),0_32px_70px_-16px_rgba(225,29,42,0.45)] hover:ring-rose-200"
                    : "border-neutral-200 bg-white/70 shadow-sm hover:border-rose-200 hover:shadow-lg hover:shadow-rose-100/60"
                }`}
              >
                {plan.badge && (
                  <span className="absolute -top-3 left-7 rounded-full bg-rose-600 px-3 py-1 text-xs font-medium text-white shadow-md shadow-rose-300/60 transition-transform duration-300 group-hover:scale-105">
                    {plan.badge}
                  </span>
                )}

                <h2 className="text-lg font-medium text-neutral-900">
                  {plan.name}
                </h2>
                <p className="mt-1 text-sm text-neutral-500">{plan.tagline}</p>

                <div className="mt-6 flex items-baseline gap-1">
                  <span className="text-3xl font-semibold text-neutral-900">
                    {plan.price}
                  </span>
                  {plan.period && (
                    <span className="text-sm text-neutral-400">
                      {plan.period}
                    </span>
                  )}
                </div>
                <p className="mt-1 text-sm font-medium text-rose-600">
                  {plan.duration}
                </p>

                <button
                  type="button"
                  disabled={isLoading}
                  onClick={() => handleGetStarted(plan)}
                  className={`mt-6 w-full rounded-xl px-4 py-2.5 text-sm font-medium transition-all duration-200 ease-out active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100 ${
                    plan.highlighted
                      ? "bg-rose-600 text-white shadow-sm shadow-rose-200 hover:bg-rose-700 hover:shadow-md hover:shadow-rose-300/60 hover:scale-[1.02]"
                      : "bg-neutral-50 text-neutral-800 border border-neutral-200 hover:bg-rose-600 hover:text-white hover:border-rose-600 hover:scale-[1.02] hover:shadow-md hover:shadow-rose-200/60"
                  }`}
                >
                  {isLoading ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
                      </svg>
                      Processing...
                    </span>
                  ) : (
                    "Get started"
                  )}
                </button>

                <ul className="mt-7 space-y-3">
                  {plan.features.map((feature) => (
                    <li
                      key={feature.label}
                      className="flex items-center gap-3 text-sm transition-transform duration-200 hover:translate-x-0.5"
                    >
                      <CheckIcon active={feature.included} />
                      <span
                        className={
                          feature.included ? "text-neutral-700" : "text-neutral-400"
                        }
                      >
                        {feature.label}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

        {/* Footer note */}
        <p className="mt-10 text-center text-xs text-neutral-400">
          Transparent pricing. Secure payments. Reliable verification.
          Plans and pricing may vary based on your organization's requirements.
        </p>
      </div>
    </div>
  );
};

export default SubscriptionPage;