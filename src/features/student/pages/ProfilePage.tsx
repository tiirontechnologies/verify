import DashboardLayout from "../../../layouts/DashboardLayout";
import StatsCard from "../../../components/shared/StatsCard";
import CredentialCard from "../components/CredentialCard";
import RecentActivity from "../components/RecentActivity";
import {
  Mail,
  Phone,
  GraduationCap,
  Calendar,
  User,
  MapPin,
} from "lucide-react";

export default function ProfilePage() {
  return (
    <DashboardLayout>
      <div className="space-y-8">

        {/* Heading */}

        <div>
          <h1 className="text-4xl font-bold">
            My Profile
          </h1>

          <p className="text-gray-500 mt-2">
            Manage your personal and academic information.
          </p>
        </div>

        {/* Top Section */}

        <div className="grid lg:grid-cols-3 gap-8">

          {/* Left Card */}

<div className="bg-white rounded-3xl border shadow-sm p-6 md:p-8">
            <div className="flex flex-col items-center">

<div className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-red-500 text-white flex items-center justify-center text-4xl md:text-5xl font-bold">                R
              </div>

              <h2 className="text-2xl md:text-3xl font-bold mt-6 text-center">
                Ram Pandey
              </h2>

              <p className="text-gray-500 mt-2">
                Verified Student ✓
              </p>

              <div className="mt-6 text-gray-500">
                Student ID : STU-2026-001
              </div>

              <button className="mt-8 px-6 py-3 bg-red-600 text-white rounded-2xl hover:bg-red-700">
                Edit Profile
              </button>

            </div>

          </div>

          {/* Right Card */}

          <div className="lg:col-span-2 bg-white rounded-3xl border shadow-sm p-8">

            <h2 className="text-2xl font-bold mb-8">
              Personal Information
            </h2>

<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <Mail className="text-red-600" />
                  <span className="font-semibold">Email</span>
                </div>

                <p className="text-gray-500">
                  ram@example.com
                </p>
              </div>

              <div>
                <div className="flex items-center gap-3 mb-2">
                  <Phone className="text-red-600" />
                  <span className="font-semibold">Mobile</span>
                </div>

                <p className="text-gray-500">
                  +91 9876543210
                </p>
              </div>

              <div>
                <div className="flex items-center gap-3 mb-2">
                  <Calendar className="text-red-600" />
                  <span className="font-semibold">Date of Birth</span>
                </div>

                <p className="text-gray-500">
                  10 Aug 2000
                </p>
              </div>

              <div>
                <div className="flex items-center gap-3 mb-2">
                  <User className="text-red-600" />
                  <span className="font-semibold">Gender</span>
                </div>

                <p className="text-gray-500">
                  Male
                </p>
              </div>

              <div>
                <div className="flex items-center gap-3 mb-2">
                  <MapPin className="text-red-600" />
                  <span className="font-semibold">Address</span>
                </div>

                <p className="text-gray-500">
                  Gorakhpur, Uttar Pradesh
                </p>
              </div>

            </div>

          </div>

        </div>

        {/* Academic Information */}

        <div className="bg-white rounded-3xl border shadow-sm p-8">

          <h2 className="text-2xl font-bold mb-8">
            Academic Information
          </h2>

          <div className="grid md:grid-cols-3 gap-8">

            <div>
              <GraduationCap className="text-red-600 mb-3" />
              <h3 className="font-semibold">
                Institution
              </h3>

              <p className="text-gray-500">
                Tiiron Academy
              </p>
            </div>

            <div>
              <h3 className="font-semibold">
                Department
              </h3>

              <p className="text-gray-500">
                Computer Science
              </p>
            </div>

            <div>
              <h3 className="font-semibold">
                Batch
              </h3>

              <p className="text-gray-500">
                2026
              </p>
            </div>

          </div>

        </div>

        {/* Statistics */}

<div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
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

          <StatsCard
            title="Downloads"
            value="22"
          />

        </div>

        {/* Skills */}

        <div className="bg-white rounded-3xl border shadow-sm p-8">

          <h2 className="text-2xl font-bold mb-8">
            Skills
          </h2>

          <div className="flex flex-wrap gap-4">

            {[
              "React",
              "Node.js",
              "MongoDB",
              "Docker",
              "TypeScript",
              "AWS",
            ].map((skill) => (
              <span
                key={skill}
                className="px-5 py-3 rounded-full bg-red-50 text-red-600 font-medium"
              >
                {skill}
              </span>
            ))}

          </div>

        </div>

        {/* Recent Credentials */}

        <div>

          <h2 className="text-2xl font-bold mb-6">
            Recent Credentials
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