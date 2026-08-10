import { useState, useEffect } from "react";
import DashboardLayout from "../../../layouts/DashboardLayout";

import OrganizationHero from "../components/dashboard/OrganizationHero";
import OrganizationStats from "../components/dashboard/OrganizationStats";
import AnalyticsOverview from "../components/dashboard/AnalyticsOverview";
import QuickActions from "../components/dashboard/QuickActions";
import RecentActivity from "../components/dashboard/RecentActivity";
import { organizationApi } from "../../../api/organization.api";
import { Loader2 } from "lucide-react";

export default function OrganizationDashboard() {
  const [companyName, setCompanyName] = useState<string>("Organization Admin");
  const [certificates, setCertificates] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    Promise.all([
      organizationApi.getProfile().catch(() => null),
      organizationApi.getRecentCertificates().catch(() => null),
    ]).then(([profileRes, certsRes]) => {
      if (!isMounted) return;

      if (profileRes?.data?.organization?.companyName) {
        setCompanyName(profileRes.data.organization.companyName);
      }

      const rawCerts = certsRes?.data?.certificates || certsRes?.data || [];
      if (Array.isArray(rawCerts)) {
        setCertificates(rawCerts);
      }

      setLoading(false);
    });

    return () => {
      isMounted = false;
    };
  }, []);

  // Compute live metrics
  const totalCertificates = certificates.length;
  const uniqueStudents = new Set(
    certificates.map((c) => (c.email || c.studentName || c._id).toLowerCase().trim())
  ).size;

  const activeCount = certificates.filter((c) => c.status === "active").length;
  const revokedCount = certificates.filter((c) => c.status === "revoked").length;

  const todayStr = new Date().toDateString();
  const todayUploads = certificates.filter((c) => {
    if (!c.createdAt) return false;
    return new Date(c.createdAt).toDateString() === todayStr;
  }).length;

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex flex-col items-center justify-center min-h-[400px] gap-3">
          <Loader2 size={32} className="animate-spin text-red-600" />
          <p className="text-sm font-semibold text-slate-600">Loading Dashboard Metrics...</p>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-8 pb-10">
        {/* Hero */}
        <OrganizationHero
          companyName={companyName}
          totalStudents={uniqueStudents}
          totalCertificates={totalCertificates}
          activeCount={activeCount}
          todayUploads={todayUploads}
        />

        {/* KPI Cards */}
        <OrganizationStats
          totalStudents={uniqueStudents}
          totalCertificates={totalCertificates}
          activeCount={activeCount}
          revokedCount={revokedCount}
        />

        {/* Analytics Chart */}
        <AnalyticsOverview certificates={certificates} />

        {/* Quick Access to Modules */}
        <QuickActions />

        {/* Recent Activity Feed */}
        <RecentActivity certificates={certificates} />
      </div>
    </DashboardLayout>
  );
}