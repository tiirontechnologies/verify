
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Topbar from "../../../components/shared/Topbar";
import HeroSection from "../components/HeroSection";
import FeaturesSection from "../components/FeaturesSection";
import HowItWorksSection from "../components/HowItWorksSection";
import TrustedOrganizationsSection from "../components/TrustedOrganizationsSection";
import CTASection from "../components/CTASection";
import QRCodeCTA from "../components/QRCodeCTA";
import NewsletterSection from "../components/NewsletterSection";
import Footer from "../../../components/shared/Footer";
import useMeRedirect from "../../auth/hooks/useMeRedirect";

export default function LandingPage() {
  const checkLogin = useMeRedirect(false);

  // null = loading/checking
  // true = logged in
  // false = not logged in
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);

  useEffect(() => {
    let active = true;

    (async () => {
      try {
        const result = await checkLogin();

        if (active) {
          setIsLoggedIn(Boolean(result));
        }
      } catch {
        // API error => Navbar hi dikhega
        if (active) {
          setIsLoggedIn(false);
        }
      }
    })();

    return () => {
      active = false;
    };
  }, [checkLogin]);

  return (
    <div className="min-h-screen overflow-x-hidden bg-white text-slate-900">
      {/* Only confirmed logged-in user gets Topbar */}
      {isLoggedIn === true ? <Topbar /> : <Navbar />}

      <HeroSection />
      <FeaturesSection />
      <HowItWorksSection />
      <TrustedOrganizationsSection />
      <CTASection />
      <QRCodeCTA />
      <NewsletterSection />
      <Footer />
    </div>
  );
}
