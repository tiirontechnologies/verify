import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";
import FeaturesSection from "../components/FeaturesSection";
import HowItWorksSection from "../components/HowItWorksSection";
import TrustedOrganizationsSection from "../components/TrustedOrganizationsSection";
import CTASection from "../components/CTASection";
import QRCodeCTA from "../components/QRCodeCTA";
import NewsletterSection from "../components/NewsletterSection";
import Footer from "../../../components/shared/Footer";

export default function LandingPage() {
  return (
    <>
      <Navbar />
      <HeroSection />
      <FeaturesSection />
      <HowItWorksSection />
      <TrustedOrganizationsSection />
      <CTASection />
      <QRCodeCTA />
      <NewsletterSection />
      <Footer />
    </>
  );
}