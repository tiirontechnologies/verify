import DashboardLayout from "../../../layouts/DashboardLayout";

import AdvertisementHero from "../components/advertisements/AdvertisementHero";
import AdvertisementStats from "../components/advertisements/AdvertisementStats";
import AdvertisementCards from "../components/advertisements/AdvertisementCards";
import AdvertisementPreview from "../components/advertisements/AdvertisementPreview";
import AdvertisementActions from "../components/advertisements/AdvertisementActions";

export default function AdvertisementsPage() {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        <AdvertisementHero />

        <AdvertisementStats />

        <AdvertisementCards />

        <AdvertisementPreview />

        <AdvertisementActions />
      </div>
    </DashboardLayout>
  );
}