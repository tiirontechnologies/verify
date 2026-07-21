import { ExternalLink, Mail, MapPin, Phone, Share2 } from "lucide-react";
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaTwitter } from "react-icons/fa";
import logo from "../../assets/Tiiron_Technologies_Logo.png";

const quickLinks = [
  { label: "Our Products", href: "https://tiirontechnologies.com/products" },
  { label: "Services Offered", href: "https://tiirontechnologies.com/services" },
  { label: "Help & Support", href: "https://tiirontechnologies.com/help" },
  { label: "Request a Demo", href: "/book-demo" },
];

const solutionLinks = [
  { label: "Tiiron LMS", href: "https://www.tiiron.com/", external: true  },
  { label: "Tiiron ERP", href: "https://erp.tiiron.com/", external: true  },
  { label: "Inacademic", href: "https://inacademic.com/", external: true  },
  { label: "Tiiron Academy", href: "https://academy.tiiron.com/", external: true  },
];

const companyLinks = [
  { label: "About Us", href: "https://tiirontechnologies.com/about" },
  { label: "Contact Us", href: "https://tiirontechnologies.com/contact" },
  { label: "Careers", href: "mailto:contact@tiirontechnologies.com", external: true },
  { label: "Verify Credentials", href: "https://verify.tiirontechnologies.com/", external: true },
];

const socialLinks = [
  { label: "LinkedIn", icon: <FaLinkedinIn />, href: "https://www.linkedin.com/company/tiirontechnologies/" },
  { label: "Twitter", icon: <FaTwitter />, href: "https://x.com/tiirontech" },
  { label: "Instagram", icon: <FaInstagram />, href: "https://www.instagram.com/tiirontechnologies" },
  { label: "Facebook", icon: <FaFacebookF />, href: "https://www.facebook.com/tiirontechnologies/" },
];

function FooterNavColumn({
  title,
  links,
}: {
  title: string;
  links: Array<{ label: string; href: string; external?: boolean }>;
}) {
  return (
    <div>
      <h3 className="footer-col-h text-slate-900">{title}</h3>
      <ul className="space-y-3">
        {links.map((link) => (
          <li key={link.label}>
            <a
              href={link.href}
              className="footer-link group"
              target={link.external ? "_blank" : undefined}
              rel={link.external ? "noopener noreferrer" : undefined}
            >
              {link.label}
              {link.external ? <ExternalLink size={14} className="opacity-70 transition group-hover:opacity-100" /> : null}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Footer() {
  return (
    <footer className="lg:pt-3 sm:pt-10 border-t border-slate-200  bg-white text-slate-900">
      <div className="mx-auto w-full font-semibold max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="
              grid
              grid-cols-1
              sm:grid-cols-2
              lg:grid-cols-3
              xl:grid-cols-[1.6fr_0.9fr_0.9fr_0.9fr_1.1fr]
              gap-x-10
              gap-y-10
            "
          >
          <div>
            <img src={logo} alt="Tiiron Technologies Logo" className="h-11 w-auto" />
            <p className="mt-3 max-w-md text-base leading-6" style={{color: "#787773"}}>
              Empowering institutions with AI powered products, enterprise software,
              and intelligent technologies that transform learning and drive
              innovation.
            </p>
            <div className="mt-4 flex flex-wrap gap-3">
              {socialLinks.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-slate-100 text-gray-500 transition hover:border-[#ef233c] hover:bg-[#ef233c] hover:text-white"
                  aria-label={item.label}
                >
                  {item.icon}
                </a>
              ))}
              <a
                href="#"
                id="share-btn"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-slate-100 text-gray-500 transition hover:border-[#ef233c] hover:bg-[#ef233c] hover:text-white"
                aria-label="Share"
              >
                <Share2 size={16} />
              </a>
            </div>
          </div>

          <FooterNavColumn title="Quick Links" links={quickLinks} />
          <FooterNavColumn title="Our Solutions" links={solutionLinks} />
          <FooterNavColumn title="Company" links={companyLinks} />
          <div>
            <h3 className="footer-col-h text-slate-900">Contact Us</h3>
            <ul className="space-y-5 text-sm text-slate-600">
              <li className="flex items-start gap-3">
                <Phone size={20} className="mt-1 text-[#ef233c]" />
                <div className="flex flex-col">
                  <span className="footer-contact-label">Phone Number</span>
                  <a href="tel:+919161218740" className="mt-1 font-semibold text-gray-500">+91 91612 18740</a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Mail size={20} className="mt-1 text-[#ef233c]" />
                <div className="flex flex-col">
                  <span className="footer-contact-label">Email Address</span>
                  <a href="mailto:contact@tiirontechnologies.com" className="mt-1 font-semibold text-gray-500">contact@tiirontechnologies.com</a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <MapPin size={20} className="mt-1 text-[#ef233c]" />
                <div className="flex flex-col">
                  <span className="footer-contact-label">Office Location</span>
                  <a href="https://maps.app.goo.gl/8r17FQn1egqxaZ8c7" target="_blank" rel="noopener noreferrer" className="mt-1 font-semibold text-gray-500">
                    Lucknow, Uttar Pradesh, India
                  </a>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-slate-300 pt-8 text-sm text-gray-400 sm:flex-row sm:items-center sm:justify-between mb-0 pb-0">
          <p>© 2026 Tiiron Technologies Pvt. Ltd. All rights reserved.</p>
          <div className="flex flex-wrap gap-6 sm:gap-8">
            <a href="#" className="transition hover:text-[#ef233c]">Terms & Conditions</a>
            <a href="#" className="transition hover:text-[#ef233c]">Refund Policy</a>
            <a href="#" className="transition hover:text-[#ef233c]">Privacy Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
