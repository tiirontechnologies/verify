import { useState, useEffect } from "react";
import DashboardLayout from "../../../layouts/DashboardLayout";
import ProfileHero from "../components/profile/ProfileHero";
import OrganizationProfileCard from "../components/profile/OrganizationProfileCard";
import AuthorizedSignatories from "../components/profile/AuthorizedSignatories";
import BrandingSettings from "../components/profile/BrandingSettings";
import AccountSettings from "../components/profile/AccountSettings";
import { organizationApi } from "../../../api/organization.api";
import { Loader2, CheckCircle2, AlertCircle } from "lucide-react";

export default function OrganizationProfilePage() {
  const [formData, setFormData] = useState({
    companyName: "",
    contactPerson: "",
    email: "",
    phone: "",
    website: "",
    industry: "",
    city: "",
    state: "",
    country: "",
    postalCode: "",
    address: "",
    description: "",
    companySize: "",
    logo: "",
    seal: "",
    directorName: "",
    mentorName: "",
    directorSignature: "",
    mentorSignature: "",
    emailNotifications: true,
    verificationPreferences: "auto-verify",
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  useEffect(() => {
    let isMounted = true;
    organizationApi
      .getProfile()
      .then((res) => {
        if (!isMounted) return;
        const org = res.data?.organization || res.data || {};
        setFormData({
          companyName: org.companyName || "",
          contactPerson: org.contactPerson || "",
          email: org.email || "",
          phone: org.phone || "",
          website: org.website || "",
          industry: org.industry || "",
          city: org.city || "",
          state: org.state || "",
          country: org.country || "",
          postalCode: org.postalCode || "",
          address: org.address || "",
          description: org.description || "",
          companySize: org.companySize || "",
          logo: org.logo || "",
          seal: org.seal || "",
          directorName: org.directorName || "",
          mentorName: org.mentorName || "",
          directorSignature: org.directorSignature || "",
          mentorSignature: org.mentorSignature || "",
          emailNotifications: org.emailNotifications !== undefined ? org.emailNotifications : true,
          verificationPreferences: org.verificationPreferences || "auto-verify",
        });
      })
      .catch((err: any) => {
        if (!isMounted) return;
        console.error("Failed to load organization profile:", err);
        setMessage({
          type: "error",
          text: err.response?.data?.message || "Failed to load profile details.",
        });
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const handleFieldChange = (field: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      setMessage(null);
      const res = await organizationApi.updateProfile(formData);
      setMessage({
        type: "success",
        text: res.data?.message || "Organization profile updated successfully!",
      });
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err: any) {
      console.error("Failed to save organization profile:", err);
      setMessage({
        type: "error",
        text: err.response?.data?.message || "Failed to save profile changes. Please try again.",
      });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex flex-col items-center justify-center min-h-[400px] gap-3">
          <Loader2 size={32} className="animate-spin text-red-600" />
          <p className="text-sm font-semibold text-slate-600">Loading Organization Profile...</p>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-8 pb-10">
        {/* Banner Alert Messages */}
        {message && (
          <div
            className={`p-4 rounded-2xl border flex items-center justify-between animate-in fade-in duration-200 ${
              message.type === "success"
                ? "bg-green-50 text-green-800 border-green-200"
                : "bg-red-50 text-red-800 border-red-200"
            }`}
          >
            <div className="flex items-center gap-3">
              {message.type === "success" ? (
                <CheckCircle2 className="text-green-600 shrink-0" size={20} />
              ) : (
                <AlertCircle className="text-red-600 shrink-0" size={20} />
              )}
              <span className="text-sm font-semibold">{message.text}</span>
            </div>
            <button
              onClick={() => setMessage(null)}
              className="text-xs font-bold underline hover:opacity-80 ml-4"
            >
              Dismiss
            </button>
          </div>
        )}

        <ProfileHero
          organizationName={formData.companyName}
          saving={saving}
          onSave={handleSave}
        />

        <OrganizationProfileCard
          data={formData}
          onChange={handleFieldChange}
        />

        <AuthorizedSignatories
          directorName={formData.directorName}
          mentorName={formData.mentorName}
          directorSignature={formData.directorSignature}
          mentorSignature={formData.mentorSignature}
          onChange={handleFieldChange}
        />

        <BrandingSettings
          logo={formData.logo}
          seal={formData.seal}
          onChange={handleFieldChange}
        />

        <AccountSettings
          emailNotifications={formData.emailNotifications}
          verificationPreferences={formData.verificationPreferences}
          onChange={handleFieldChange}
        />
      </div>
    </DashboardLayout>
  );
}