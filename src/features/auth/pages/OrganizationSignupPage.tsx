import { useState } from "react";
import toast from "react-hot-toast";
import { organizationApi } from "../../../api/organization.api";
import SignupHero from "../signup/SignupHero";
import OrganizationInfoForm from "../signup/OrganizationInfoForm";
import SignupSidebar from "../signup/SignupSidebar";
import TermsSection from "../signup/TermsSection";
import AddressBrandingSection from "../signup/AddressBrandingSection";
import { useNavigate } from "react-router-dom";
import SignupStepper from "../signup/SignupStepper";
import AdminInfoForm from "../signup/AdminInfoForm";
import Footer from "../../../components/shared/Footer";

export default function OrganizationSignupPage() {
  const [formData, setFormData] = useState({
    companyName: "",
    industry: "",
    website: "",
    phone: "",
    contactPerson: "",
    email: "",
    password: "",
    confirmPassword: "",

    country: "",
    state: "",
    city: "",
    postalCode: "",
    address: "",
  });

  const [logo, setLogo] = useState<File | null>(null);
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [agreePrivacy, setAgreePrivacy] = useState(false);
  const [newsletter, setNewsletter] = useState(false);

  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCheckboxChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, checked } = e.target;

    switch (name) {
      case "agreeTerms":
        setAgreeTerms(checked);
        break;

      case "agreePrivacy":
        setAgreePrivacy(checked);
        break;

      case "newsletter":
        setNewsletter(checked);
        break;
    }
  };

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLogo(e.target.files?.[0] || null);
  };

  const removeLogo = () => {
    setLogo(null);
  };

  const handleSubmit = async () => {
    if (!agreeTerms || !agreePrivacy) {
      toast.error("Please accept the Terms & Conditions and Privacy Policy.");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    try {
      setLoading(true);

      const response = await organizationApi.signup({
        companyName: formData.companyName,
        contactPerson: formData.contactPerson,
        email: formData.email,
        password: formData.password,

        phone: formData.phone,
        website: formData.website,
        industry: formData.industry,

        country: formData.country,
        state: formData.state,
        city: formData.city,
        postalCode: formData.postalCode,
        address: formData.address,
      });

      toast.success(response.data.message);

      // Reset form
      setFormData({
        companyName: "",
        industry: "",
        website: "",
        phone: "",
        contactPerson: "",
        email: "",
        password: "",
        confirmPassword: "",
        country: "",
        state: "",
        city: "",
        postalCode: "",
        address: "",
      });

      // Reset logo
      setLogo(null);

      // Reset checkboxes
      setAgreeTerms(false);
      setAgreePrivacy(false);
      setNewsletter(false);

      // Navigate after the toast has been visible for a moment
      setTimeout(() => {
        navigate("/login", { replace: true });
      }, 1800);
      console.log(response.data);
    } catch (error: any) {
      console.error(error);

      toast.error(
        error?.response?.data?.message ||
          "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-red-50">
      <SignupHero />

      <div className="mx-auto max-w-[1300px] px-4 py-8 lg:px-8">
        <SignupStepper
          currentStep={currentStep}
          setCurrentStep={setCurrentStep}
        />

        <div className="mt-6 grid gap-5 xl:grid-cols-[2fr_340px]">
          {/* Left */}
          <div className="space-y-5">
            {currentStep === 1 && (
              <OrganizationInfoForm
                formData={formData}
                handleChange={handleChange}
              />
            )}

            {currentStep === 2 && (
              <AdminInfoForm
                formData={formData}
                handleChange={handleChange}
              />
            )}

            {currentStep === 3 && (
              <AddressBrandingSection
                formData={formData}
                logo={logo}
                handleChange={handleChange}
                handleLogoChange={handleLogoChange}
                removeLogo={removeLogo}
              />
            )}

            {currentStep === 4 && (
              <TermsSection
                formData={formData}
                logo={logo}
                agreeTerms={agreeTerms}
                agreePrivacy={agreePrivacy}
                newsletter={newsletter}
                handleCheckboxChange={handleCheckboxChange}
                handleSubmit={handleSubmit}
                loading={loading}
              />
            )}

            <div className="mt-5 flex justify-between">
              {currentStep >1 && (


                <button
                type="button"
                disabled={currentStep === 1}
                onClick={() => setCurrentStep((prev) => prev - 1)}
                className="rounded-xl border border-red-600  px-5 py-2.5 text-sm text-red-600 hover:bg-red-600 hover:text-white"
                >
                &larr; Previous
              </button>
              )}

              {currentStep < 4 && (
                <button
                  type="button"
                  onClick={() => setCurrentStep((prev) => prev + 1)}
                  className="rounded-xl border bg-red-600 text-white  px-5 py-2.5 text-sm ml-auto  hover:border-red-600"
                >
                  Next →
                </button>
              )}
            </div>
          </div>

          {/* Right */}
          <div className="h-fit xl:sticky xl:top-6">
            <SignupSidebar currentStep={currentStep} />
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}