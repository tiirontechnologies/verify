import DashboardLayout from "../../../layouts/DashboardLayout";

import ProfileHero from "../components/profile/ProfileHero";
import OrganizationProfileCard from "../components/profile/OrganizationProfileCard";
import AuthorizedSignatories from "../components/profile/AuthorizedSignatories";
import BrandingSettings from "../components/profile/BrandingSettings";
import AccountSettings from "../components/profile/AccountSettings";

export default function OrganizationProfilePage() {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        <ProfileHero />

        <OrganizationProfileCard />

        <AuthorizedSignatories />

        <BrandingSettings />

        <AccountSettings />
      </div>
    </DashboardLayout>
  );
}