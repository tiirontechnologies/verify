import DashboardLayout from "../../../layouts/DashboardLayout";
import StatsCard from "../../../components/shared/StatsCard";
import CredentialCard from "../components/CredentialCard";
import RecentActivity from "../components/RecentActivity";
import EditProfileModal from "../components/profile/EditProfileModal";
import { getMyCertificate } from "../../../api/certificate.api";

import {
  Mail,
  Phone,
  GraduationCap,
  Calendar,
  User,
  MapPin,
  Building2,
  Layers3,
  BadgeCheck,
  Pencil,
  Sparkles,
} from "lucide-react";
import { useEffect, useState } from "react";

import { getMyProfile } from "../../../api/studentProfile.api";

import type { StudentProfile } from "../../../types/studentProfile";

export default function ProfilePage() {
  const [profile, setProfile] = useState<StudentProfile | null>(null);

  const [loading, setLoading] = useState(true);
  const [showEditModal, setShowEditModal] = useState(false);
  const [certId, setcertId] = useState("TTINT202600000");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const certdata = await getMyCertificate();
        setcertId(certdata.data.certificateId);

        const response = await getMyProfile();

        const data = response.data;

        setProfile({
          id: data._id,
          fullName: data.fullName,
          email: data.email,
          mobile: data.mobile,
          dateOfBirth: data.dateOfBirth ? data.dateOfBirth.split("T")[0] : "",
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
        <div className="fixed inset-0 flex items-center justify-center bg-white overflow-hidden">
          {/* Background Glow */}
          <div className="absolute w-[350px] h-[350px] rounded-full bg-red-600/10 blur-3xl animate-pulse" />

          {/* Loader */}
          <div className="relative z-10 flex flex-col items-center">
            <div className="relative w-24 h-24">
              {/* Outer Ring */}
              <div className="absolute inset-0 rounded-full border-[3px] border-red-100" />

              {/* Rotating Ring */}
              <div className="absolute inset-0 rounded-full border-[3px] border-transparent border-t-red-600 animate-spin" />

              {/* Inner Rotating Ring */}
              <div className="absolute inset-3 rounded-full border-[3px] border-transparent border-b-red-500 animate-spin [animation-direction:reverse] [animation-duration:1.4s]" />

              {/* Center Logo / Dot */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-4 h-4 rounded-full bg-red-600 shadow-[0_0_30px_rgba(220,38,38,0.7)] animate-pulse" />
              </div>
            </div>

            {/* Text */}
            <h2 className="mt-8 text-2xl font-bold text-gray-900 tracking-wide">
              Loading Profile
            </h2>

            <p className="mt-2 text-gray-500 text-sm">
              Please wait while we prepare your workspace.
            </p>

            {/* Progress Bar */}
            <div className="mt-8 w-64 h-1.5 bg-gray-200 rounded-full overflow-hidden">
              <div className="h-full w-1/2 bg-red-600 rounded-full animate-[loading_1.4s_ease-in-out_infinite]" />
            </div>

            {/* Loading Dots */}
            <div className="flex gap-2 mt-6">
              <span className="w-2.5 h-2.5 rounded-full bg-red-600 animate-bounce"></span>
              <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-bounce delay-150"></span>
              <span className="w-2.5 h-2.5 rounded-full bg-red-400 animate-bounce delay-300"></span>
            </div>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  if (!profile) {
    return (
      <DashboardLayout>
        <div className="flex flex-col justify-center items-center h-[70vh] gap-3 text-center px-4">
          <div className="w-16 h-16 rounded-2xl bg-red-50 flex items-center justify-center">
            <User className="text-red-600 w-8 h-8" />
          </div>
          <h3 className="text-xl font-semibold text-gray-800">
            Unable to load your profile
          </h3>
          <p className="text-gray-500 max-w-sm">
            Something went wrong while fetching your data. Please refresh or
            try again later.
          </p>
        </div>
      </DashboardLayout>
    );
  }

  const infoItems = [
    { icon: Mail, label: "Email", value: profile.email },
    { icon: Phone, label: "Mobile", value: profile.mobile || "Not Updated" },
    {
      icon: Calendar,
      label: "Date of Birth",
      value: profile.dateOfBirth
        ? new Date(profile.dateOfBirth).toLocaleDateString("en-GB")
        : "Not Updated",
    },
    { icon: User, label: "Gender", value: profile.gender || "Not Updated" },
    { icon: MapPin, label: "Address", value: profile.address || "Not Updated" },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-8 pb-10">
        {/* Heading */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-3">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 flex items-center gap-2">
              My Profile
              <Sparkles className="w-6 h-6 text-red-500" />
            </h1>
            <p className="text-gray-500 mt-2">
              Manage your personal and academic information.
            </p>
          </div>
        </div>

        {/* Top Section */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left Card — Identity */}
          <div className="relative bg-white  rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
            {/* Banner */}
            <div className="h-24 " />

            <div className="flex flex-col items-center px-6 md:px-8 -mt-14 pb-8">
              <div className="relative">
                {profile.profileImage ? (
                  <img
                    src={profile.profileImage}
                    alt={profile.fullName}
                    className="w-28 h-28 rounded-full border border-red-400 shadow shadow-xl shadow-red-300  object-cover ring-4 ring-white shadow-md"
                  />
                ) : (
                  <div className="w-28 h-28 rounded-full bg-gradient-to-br from-red-500 to-red-600 text-white flex items-center justify-center text-4xl font-bold ring-4 ring-white shadow-md">
                    {profile.fullName.charAt(0).toUpperCase()}
                  </div>
                )}
                <span className="absolute bottom-1 right-1 bg-white rounded-full p-1 shadow">
                  <BadgeCheck className="w-6 h-6 text-red-600 fill-red-100" />
                </span>
              </div>

              <h2 className="text-2xl font-bold mt-5 text-center text-slate-700">
                {profile.fullName}
              </h2>

              <p className="text-sm text-red-600 font-medium mt-1">
                Verified Student
              </p>

              <div className="mt-5 px-4 py-1.5 rounded-full bg-red-50 border border-gray-200 text-sm text-red-600 font-mono tracking-wide">
                TII-2026-{String(profile.lmsId).padStart(4, "0")}
              </div>

              <button
                onClick={() => setShowEditModal(true)}
                className="mt-7 w-full flex items-center justify-center gap-2 px-6 py-3 border border-red-600  text-red-600  hover:text-white rounded-2xl font-medium hover:bg-red-500 active:scale-[0.98] transition-all duration-150 shadow-sm hover:shadow-md"
              >
                <Pencil className="w-4 h-4" />
                Edit Profile
              </button>
            </div>
          </div>

          {/* Right Card — Personal Info */}
          <div className="lg:col-span-2 bg-white rounded-3xl shadow-sm border border-gray-100 p-6 md:p-8">
            <h2 className="text-xl font-bold mb-8 text-gray-900">
              Personal Information
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {infoItems.map(({ icon: Icon, label, value }) => (
                <div
                  key={label}
                  className="flex items-start gap-4 p-4 rounded-2xl hover:bg-gray-50 transition-colors"
                >
                  <div className="shrink-0 w-11 h-11 rounded-xl bg-red-50 flex items-center justify-center">
                    <Icon className="w-5 h-5 text-red-600" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs uppercase tracking-wide text-gray-400 font-semibold mb-0.5">
                      {label}
                    </p>
                    <p className="text-gray-800 font-medium truncate">
                      {value}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Academic Information */}
        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6 md:p-8">
          <h2 className="text-xl font-bold mb-8 text-gray-900">
            Academic Information
          </h2>

          <div className="grid sm:grid-cols-3 gap-6">
            {[
              {
                icon: GraduationCap,
                title: "Institution",
                value: "Tiiron Academy",
              },
              {
                icon: Building2,
                title: "Department",
                value: profile.department || "Not Updated",
              },
              {
                icon: Layers3,
                title: "Batch",
                value: profile.batch || "Not Updated",
              },
            ].map(({ icon: Icon, title, value }) => (
              <div
                key={title}
                className="flex items-center gap-4 p-5 rounded-2xl border border-gray-100 hover:border-red-100 hover:bg-red-50/30 transition-colors"
              >
                <div className="w-12 h-12 rounded-xl bg-red-50 flex items-center justify-center shrink-0">
                  <Icon className="w-6 h-6 text-red-600" />
                </div>
                <div className="min-w-0">
                  <h3 className="font-semibold text-gray-800">{title}</h3>
                  <p className="text-gray-500 truncate">{value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          <StatsCard title="Credentials" value="2" />
          <StatsCard title="Verified" value="2" />
          <StatsCard title="Shared" value="NA" />
          <StatsCard title="Downloads" value="NA" />
        </div>

        {/* Skills */}
        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6 md:p-8">
          <h2 className="text-xl font-bold mb-8 text-gray-900">Skills</h2>

          {profile.skills && profile.skills.length > 0 ? (
            <div className="flex flex-wrap gap-3">
              {profile.skills.map((skill) => (
                <span
                  key={skill}
                  className="px-5 py-2.5 rounded-full bg-red-50 text-red-600 font-medium text-sm hover:bg-red-100 transition-colors cursor-default"
                >
                  {skill}
                </span>
              ))}
            </div>
          ) : (
            <p className="text-gray-400 text-sm">No skills added yet.</p>
          )}
        </div>

        {/* Recent Credentials */}
        <div>
          <h2 className="text-xl font-bold mb-6 text-gray-900">
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
        <RecentActivity id={certId} />
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
