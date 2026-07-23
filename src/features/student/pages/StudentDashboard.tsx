import DashboardLayout from "../../../layouts/DashboardLayout";
import StatsCard from "../../../components/shared/StatsCard";
import CredentialCard from "../components/CredentialCard";
import RecentActivity from "../components/RecentActivity";
import { getMyCertificate } from "../../../api/certificate.api";
import { useEffect,useState } from "react";

export default function StudentDashboard() {
  const [certId,setcertId] = useState("TTINT202600000");
  useEffect(()=>{
    const fetchData = async()=>{

      const Cert = await getMyCertificate();
      setcertId(Cert.data.certificateId);
    }

    fetchData();

  },[]);

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
            value="2"
          />

          <StatsCard
            title="Verified"
            value="2"
          />

          <StatsCard
            title="Shared"
            value="NA"
          />

        </div>

        {/* Credentials */}

<div>

  <h2 className="text-2xl font-bold mb-6">
    My Credentials
  </h2>

  <div className="grid lg:grid-cols-2 gap-6">

    <CredentialCard
      title="Internship Completion Certificate"
      issuer="Tiiron Academy"
    />

    <CredentialCard
      title="Training Completion Certificate"
      issuer="Tiiron Academy"
    />

  </div>

</div>

{/* Activity */}

<RecentActivity id={certId} />

      </div>

    </DashboardLayout>
  );
}