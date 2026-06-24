import DashboardLayout from "../../../layouts/DashboardLayout";
import StatsCard from "../../../components/shared/StatsCard";
import CredentialCard from "../components/CredentialCard";
import RecentActivity from "../components/RecentActivity";

export default function StudentDashboard() {
  return (
    <DashboardLayout>

      <div className="space-y-8">

        {/* Welcome */}

        <div>

          <h1 className="text-3xl font-bold">
            Welcome Back 👋
          </h1>

          <p className="text-gray-500 mt-2">
            Manage and view your credentials.
          </p>

        </div>

        {/* Stats */}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          <StatsCard
            title="Credentials"
            value="12"
          />

          <StatsCard
            title="Verified"
            value="10"
          />

          <StatsCard
            title="Shared"
            value="5"
          />

        </div>

        {/* Credentials */}

<div>

  <h2 className="text-2xl font-bold mb-6">
    My Credentials
  </h2>

  <div className="grid lg:grid-cols-2 gap-6">

    <CredentialCard
      title="Python Full Stack Development"
      issuer="Tiiron Academy"
    />

    <CredentialCard
      title="AWS Cloud Practitioner"
      issuer="Tiiron Academy"
    />

  </div>

</div>

{/* Activity */}

<RecentActivity />

      </div>

    </DashboardLayout>
  );
}