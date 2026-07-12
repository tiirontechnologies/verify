import DashboardLayout from "../../../layouts/DashboardLayout";
import StatsCard from "../../../components/shared/StatsCard";
import CredentialCard from "../components/CredentialCard";
import RecentActivity from "../components/RecentActivity";
import EditProfileModal from "../components/profile/EditProfileModal";

import {
  Mail,
  Phone,
  GraduationCap,
  Calendar,
  User,
  MapPin,
  Building2,
  Layers3,
} from "lucide-react";
import { useEffect, useState } from "react";

import {
  getMyProfile,
} from "../../../api/studentProfile.api";

import type {
  StudentProfile,
} from "../../../types/studentProfile";

export default function ProfilePage() {
  const [profile, setProfile] =
  useState<StudentProfile | null>(null);

const [loading, setLoading] = useState(true);
const [showEditModal, setShowEditModal] = useState(false);

  useEffect(() => {

  const fetchProfile = async () => {

    try {

      const response =
        await getMyProfile();

      const data = response.data;

      setProfile({

        id: data._id,

        fullName: data.fullName,

        email: data.email,

        mobile: data.mobile,

        dateOfBirth: data.dateOfBirth
          ? new Date(
              data.dateOfBirth
            ).toLocaleDateString("en-GB")
          : "",

        gender: data.gender,

        address: data.address,

        college: data.college,

        department: data.department,

        batch: data.batch,

        skills: data.skills,

        profileImage: data.profileImage,
        lmsId: data.lmsId,

      });

    } catch (error) {

    } finally {

      setLoading(false);

    }

  };

  fetchProfile();

}, []);

if (loading) {

  return (
    <DashboardLayout>
      <div className="flex justify-center items-center h-screen">
        Loading Profile...
      </div>
    </DashboardLayout>
  );

}

if (!profile) {

  return (
    <DashboardLayout>
      <div className="flex justify-center items-center h-screen">
        Profile Not Found
      </div>
    </DashboardLayout>
  );

}
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

<div className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-red-500 text-white flex items-center justify-center text-4xl md:text-5xl font-bold">
  {profile.fullName.charAt(0).toUpperCase()}
              </div>

              <h2 className="text-2xl md:text-3xl font-bold mt-6 text-center">
                {profile.fullName}
              </h2>

              <p className="text-gray-500 mt-2">
                Verified Student ✓
              </p>

              <div className="mt-6 text-gray-500">
                Student ID : TII-2026-
{String(profile.lmsId).padStart(4, "0")}
              </div>

              <button
    onClick={() => setShowEditModal(true)}
    className="mt-8 px-6 py-3 bg-red-600 text-white rounded-2xl hover:bg-red-700"
>
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
                  {profile.email}
                </p>
              </div>

              <div>
                <div className="flex items-center gap-3 mb-2">
                  <Phone className="text-red-600" />
                  <span className="font-semibold">Mobile</span>
                </div>

                <p className="text-gray-500">
                  {profile.mobile || "Not Updated"}
                </p>
              </div>

              <div>
                <div className="flex items-center gap-3 mb-2">
                  <Calendar className="text-red-600" />
                  <span className="font-semibold">Date of Birth</span>
                </div>

                <p className="text-gray-500">
                  {profile.dateOfBirth || "Not Updated"}
                </p>
              </div>

              <div>
                <div className="flex items-center gap-3 mb-2">
                  <User className="text-red-600" />
                  <span className="font-semibold">Gender</span>
                </div>

                <p className="text-gray-500">
                  {profile.gender}
                </p>
              </div>

              <div>
                <div className="flex items-center gap-3 mb-2">
                  <MapPin className="text-red-600" />
                  <span className="font-semibold">Address</span>
                </div>

                <p className="text-gray-500">
                  {profile.address || "Not Updated"}
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
              <Building2 className="text-red-600 mb-3" />
              <h3 className="font-semibold">
                Department
              </h3>

              <p className="text-gray-500">
                {profile.department || "Not Updated"}
              </p>
            </div>

            <div>
              <Layers3 className="text-red-600 mb-3" />
              <h3 className="font-semibold">
                Batch
              </h3>

              <p className="text-gray-500">
                {profile.batch || "Not Updated"}
              </p>
            </div>

          </div>

        </div>

        {/* Statistics */}

<div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
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

          <StatsCard
            title="Downloads"
            value="NA"
          />

        </div>

        {/* Skills */}

        <div className="bg-white rounded-3xl border shadow-sm p-8">

          <h2 className="text-2xl font-bold mb-8">
            Skills
          </h2>

          <div className="flex flex-wrap gap-4">

           {profile.skills.map((skill) => (

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
              title="Internship Certificate"
              issuer="Issued by Tiiron Technologies"
            />

            <CredentialCard
              title="Training Certificate"
              issuer="Issued by Tiiron Technologies"
            />

          </div>

        </div>

        {/* Activity */}

        <RecentActivity />

      </div>

      {showEditModal && (

    <EditProfileModal
        profile={profile}
        onClose={() => setShowEditModal(false)}
        onUpdate={(updatedProfile) => {

            setProfile(updatedProfile);

            setShowEditModal(false);

        }}
    />

)}
    </DashboardLayout>
  );
}