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

  // null = abhi check ho raha hai (flicker se bachne ke liye)
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);

  useEffect(() => {
    let active = true;

    (async () => {
      try {
        const result = await checkLogin(); // user object / true return hona chahiye
        if (active) setIsLoggedIn(Boolean(result));
      } catch {
        if (active) setIsLoggedIn(false);
      }
    })();

    return () => {
      active = false;
    };
  }, [checkLogin]);

  return (
    <div className="min-h-screen overflow-x-hidden bg-white text-slate-900">
      {isLoggedIn === null ? null : isLoggedIn ? <Topbar /> : <Navbar />}
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