import React, { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import Navbar from "../features/landing/components/Navbar";

/* 👇 Formspree link yaha lagao */
const FORMSPREE_URL = "https://formspree.io/f/mdekqyvy";

interface FormState {
  fullName: string;
  email: string;
  mobile: string;
  organization: string;
  city: string;
  website: string;
  address: string;
  message: string;
}

type Status = "idle" | "loading" | "success" | "error";

const initialState: FormState = {
  fullName: "",
  email: "",
  mobile: "",
  organization: "",
  city: "",
  website: "",
  address: "",
  message: "",
};

const inputClass =
  "w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5 text-[11px] text-slate-700 placeholder-slate-400 outline-none transition focus:border-red-500 focus:bg-white focus:ring-1 focus:ring-red-500";

/* ---------- Icons ---------- */
const MailIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <path d="m3 7 9 6 9-6" />
  </svg>
);

const PhoneIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
);

const PinIcon = () => (
  <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2a7 7 0 0 0-7 7c0 5.25 7 13 7 13s7-7.75 7-13a7 7 0 0 0-7-7zm0 9.5A2.5 2.5 0 1 1 12 6.5a2.5 2.5 0 0 1 0 5z" />
  </svg>
);

const FacebookIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="#1877F2">
    <path d="M24 12a12 12 0 1 0-13.88 11.85v-8.38H7.08V12h3.04V9.36c0-3 1.79-4.67 4.53-4.67 1.31 0 2.69.23 2.69.23v2.95h-1.51c-1.49 0-1.96.93-1.96 1.88V12h3.33l-.53 3.47h-2.8v8.38A12 12 0 0 0 24 12z" />
  </svg>
);

const InstagramIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#E1306C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="18" height="18" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r="1" fill="#E1306C" />
  </svg>
);

const LinkedInIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="#0A66C2">
    <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z" />
  </svg>
);

const TwitterIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="#1D9BF0">
    <path d="M23.95 4.57a10 10 0 0 1-2.82.77 4.96 4.96 0 0 0 2.16-2.72c-.95.56-2 .96-3.13 1.19a4.92 4.92 0 0 0-8.38 4.49A13.97 13.97 0 0 1 1.64 3.16a4.92 4.92 0 0 0 1.52 6.57 4.9 4.9 0 0 1-2.23-.62v.06a4.93 4.93 0 0 0 3.95 4.83 4.96 4.96 0 0 1-2.21.08 4.93 4.93 0 0 0 4.6 3.42A9.87 9.87 0 0 1 0 19.54a13.94 13.94 0 0 0 7.55 2.21c9.05 0 14-7.5 14-14 0-.21 0-.42-.02-.63a10 10 0 0 0 2.46-2.55z" />
  </svg>
);

/* ---------- Component ---------- */
const ContactUs: React.FC = () => {
  const [form, setForm] = useState<FormState>(initialState);
  const [captcha, setCaptcha] = useState<boolean>(false);
  const [status, setStatus] = useState<Status>("idle");

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!captcha) {
      alert("Please verify that you are not a robot.");
      return;
    }

    setStatus("loading");

    try {
      const res = await fetch(FORMSPREE_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          "Full Name": form.fullName,
          "Email ID": form.email,
          "Mobile Number": form.mobile,
          "School/Organization": form.organization,
          City: form.city,
          Website: form.website,
          Address: form.address,
          Message: form.message,
        }),
      });

      if (res.ok) {
        setStatus("success");
        setForm(initialState);
        setCaptcha(false);
      } else {
        setStatus("error");
      }
    } catch (err) {
      console.error("Formspree error:", err);
      setStatus("error");
    }
  };

  const socials = [
    { label: "Facebook", icon: <FacebookIcon />, href: "#" },
    { label: "Instagram", icon: <InstagramIcon />, href: "#" },
    { label: "LinkedIn", icon: <LinkedInIcon />, href: "#" },
    { label: "Twitter", icon: <TwitterIcon />, href: "#" },
  ];

  return (
    <>
      {/* ================= NAVBAR ================= */}
      <Navbar />

      <section className="min-h-screen bg-slate-50 px-4 py-6 font-sans">
        <div className="mx-auto grid max-w-[1000px] grid-cols-1 gap-5 lg:grid-cols-[1.12fr_0.88fr]">
          {/* ================= LEFT CARD ================= */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-[19px] font-extrabold leading-tight text-red-600">
              We're Always Ready
            </h2>
            <p className="mt-1 text-[10px] font-medium text-[#1e2a5a]">
              Get in touch with your Technology Partner.
            </p>

            <form onSubmit={handleSubmit} className="mt-5">
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <input
                  type="text"
                  name="fullName"
                  value={form.fullName}
                  onChange={handleChange}
                  placeholder="Full Name"
                  required
                  className={inputClass}
                />
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="Email ID"
                  required
                  className={inputClass}
                />
                <input
                  type="tel"
                  name="mobile"
                  value={form.mobile}
                  onChange={handleChange}
                  placeholder="Mobile Number"
                  required
                  className={inputClass}
                />
                <input
                  type="text"
                  name="organization"
                  value={form.organization}
                  onChange={handleChange}
                  placeholder="School/Organization"
                  className={inputClass}
                />
                <input
                  type="text"
                  name="city"
                  value={form.city}
                  onChange={handleChange}
                  placeholder="City"
                  className={inputClass}
                />
                <input
                  type="text"
                  name="website"
                  value={form.website}
                  onChange={handleChange}
                  placeholder="Website"
                  className={inputClass}
                />
                <input
                  type="text"
                  name="address"
                  value={form.address}
                  onChange={handleChange}
                  placeholder="Address"
                  className={`${inputClass} sm:col-span-2`}
                />
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Your Message"
                  rows={4}
                  className={`${inputClass} resize-none sm:col-span-2`}
                />
              </div>

              {/* Captcha + Submit */}
              <div className="mt-5 flex items-center justify-between">
                <label className="flex h-[62px] w-[190px] cursor-pointer items-center justify-between rounded-md border border-slate-300 bg-[#f9f9f9] px-3 shadow-sm">
                  <span className="flex items-center gap-2.5">
                    <input
                      type="checkbox"
                      checked={captcha}
                      onChange={(e) => setCaptcha(e.target.checked)}
                      className="h-4 w-4 cursor-pointer rounded-sm border-slate-400"
                    />
                    <span className="text-[10px] text-slate-600">
                      I'm not a robot
                    </span>
                  </span>
                  <span className="flex flex-col items-center leading-none">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                      <path d="M12 3a9 9 0 0 1 8.5 6" stroke="#4a90e2" strokeWidth="2.5" strokeLinecap="round" />
                      <path d="M20.5 9 21 4l-5 .8" stroke="#4a90e2" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M12 21a9 9 0 0 1-8.5-6" stroke="#9aa0a6" strokeWidth="2.5" strokeLinecap="round" />
                    </svg>
                    <span className="mt-0.5 text-[6px] text-slate-500">
                      reCAPTCHA
                    </span>
                  </span>
                </label>

                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="rounded-lg border border-red-600 bg-white px-8 py-2.5 text-[11px] font-bold uppercase text-red-600 transition hover:bg-red-600 hover:text-white disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {status === "loading" ? "Sending..." : "Submit"}
                </button>
              </div>

              {/* Status message */}
              {status === "success" && (
                <p className="mt-3 text-[10px] font-semibold text-green-600">
                  Thank you! Your message has been sent successfully.
                </p>
              )}
              {status === "error" && (
                <p className="mt-3 text-[10px] font-semibold text-red-600">
                  Something went wrong. Please try again.
                </p>
              )}
            </form>

            {/* Social */}
            <div className="mt-6 border-t border-slate-200 pt-4">
              <p className="text-[10px] font-bold text-[#1e2a5a]">
                Connect with us on social media
              </p>
              <div className="mt-3 flex flex-wrap gap-2.5">
                {socials.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    className="flex items-center gap-1.5 rounded-md border border-slate-200 bg-white px-3 py-1.5 text-[9px] font-semibold text-[#1e2a5a] shadow-sm transition hover:border-red-400"
                  >
                    {s.icon}
                    {s.label}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* ================= RIGHT COLUMN ================= */}
          <div className="flex flex-col gap-5">
            {/* Contact card */}
            <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
              {/* Email */}
              <div className="flex items-center gap-3 rounded-xl border border-slate-100 bg-[#f4f8fd] px-3 py-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-red-500 bg-white text-red-600">
                  <MailIcon />
                </div>
                <a
                  href="mailto:contact@tiiron.com"
                  className="text-[9px] font-bold text-[#1e2a5a]"
                >
                  contact@tiiron.com
                </a>
              </div>

              {/* Call */}
              <div className="mt-3 flex items-center gap-3 rounded-xl border border-slate-100 bg-[#f4f8fd] px-3 py-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-red-500 bg-white text-red-600">
                  <PhoneIcon />
                </div>
                <div className="flex flex-1 items-start justify-between">
                  <div>
                    <p className="text-[7px] font-bold uppercase text-red-600">
                      Call Now
                    </p>
                    <a
                      href="tel:+919161218740"
                      className="text-[9px] font-bold text-[#1e2a5a]"
                    >
                      +91 9161218740
                    </a>
                  </div>
                  <div className="mr-3">
                    <p className="text-[7px] font-bold uppercase text-red-600">
                      Technical Support
                    </p>
                    <a
                      href="mailto:admin@tiiron.com"
                      className="text-[9px] font-bold text-black"
                    >
                      admin@tiiron.com
                    </a>
                    <p className="text-[7px] text-slate-500">
                      (Technical Support)
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Map card */}
            <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
              <div className="flex flex-col items-center text-center">
                <span className="text-red-600">
                  <PinIcon />
                </span>
                <p className="mt-0.5 text-[7px] font-bold uppercase tracking-wide text-slate-500">
                  Head Office
                </p>
                <p className="mt-1 text-[7px] font-semibold leading-relaxed text-[#1e2a5a]">
                  Unit No: 806A, 8th Floor, Levana Cyber Height, Vibhuti Khand,
                  Gomti Nagar, Lucknow Uttar Pradesh, India – 226010
                </p>
              </div>

              <div className="mt-3 overflow-hidden rounded-lg border border-slate-200">
                <iframe
                  title="Tiiron Head Office"
                  src="https://www.google.com/maps?q=Levana+Cyber+Heights+Vibhuti+Khand+Gomti+Nagar+Lucknow&output=embed"
                  width="100%"
                  height="270"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ContactUs;