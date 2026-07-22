import DashboardLayout from "../../../layouts/DashboardLayout";

import OrganizationHero from "../components/dashboard/OrganizationHero";
import OrganizationStats from "../components/dashboard/OrganizationStats";
import AnalyticsOverview from "../components/dashboard/AnalyticsOverview";
import QuickActions from "../components/dashboard/QuickActions";
import RecentActivity from "../components/dashboard/RecentActivity";

export default function OrganizationDashboard() {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Hero */}
        <OrganizationHero />

        {/* KPI Cards */}
        <OrganizationStats />

        {/* Analytics */}
        <AnalyticsOverview />

        {/* Quick Access to Modules */}
        <QuickActions />

        {/* Activity Feed */}
        <RecentActivity />
      </div>
    </DashboardLayout>
  );
}