import DashboardLayout from "../../../layouts/DashboardLayout";
import StatsCard from "../../../components/shared/StatsCard";
import CredentialCard from "../components/CredentialCard";
import RecentActivity from "../components/RecentActivity";
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
  Camera,
  Check,
  X,
  Wrench,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";

import {
  getMyProfile,
  updateProfile,
  updateProfilePicture,
} from "../../../api/studentProfile.api";

import type { StudentProfile } from "../../../types/studentProfile";

const MAX_IMAGE_SIZE = 2 * 1024 * 1024; // 2MB

const inputCls =
  "w-full border border-gray-200 rounded-xl px-3 py-2 text-gray-800 font-medium focus:outline-none focus:ring-2 focus:ring-red-200 focus:border-red-400";

type FormState = {
  mobile: string;
  dateOfBirth: string;
  gender: string;
  address: string;
  college: string;
  department: string;
  batch: string;
  skills: string[];
};

const buildForm = (p: StudentProfile): FormState => ({
  mobile: p.mobile || "",
  dateOfBirth: p.dateOfBirth || "",
  gender: p.gender || "Male",
  address: p.address || "",
  college: p.college || "",
  department: p.department || "",
  batch: p.batch || "",
  skills: p.skills || [],
});

// "internship" -> "Internship Certificate", "offer-letter" -> "Offer Letter"
const formatCertificateTitle = (type?: string): string => {
  if (!type) return "Certificate";
  const words = type
    .replace(/[-_]+/g, " ")
    .trim()
    .split(/\s+/)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
    .join(" ");
  return /(letter|certificate)$/i.test(words) ? words : `${words} Certificate`;
};

export default function ProfilePage() {
  const [profile, setProfile] = useState<StudentProfile | null>(null);

  const [loading, setLoading] = useState(true);
  const [certId, setcertId] = useState("TTINT202600000");
  const [certificates, setCertificates] = useState<any[]>([]);

  // ---- inline edit state ----
  const [isEditing, setIsEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState<FormState | null>(null);
  const [skillInput, setSkillInput] = useState("");
  const [pictureFile, setPictureFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        // Certificates alag try/catch mein, taaki certificate na ho to profile na ruke
        try {
          const certdata = await getMyCertificate();
          const raw = certdata?.data;
          const list: any[] = Array.isArray(raw) ? raw : raw ? [raw] : [];

          // Latest issued pehle
          list.sort(
            (a, b) =>
              new Date(b.issueDate || b.createdAt || 0).getTime() -
              new Date(a.issueDate || a.createdAt || 0).getTime()
          );

          setCertificates(list);
          if (list[0]?.certificateId) setcertId(list[0].certificateId);
        } catch (err) {
          setCertificates([]);
        }

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

  // preview object URL cleanup
  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  if (loading) {
    return (
      <DashboardLayout>
        <div className="fixed inset-0 flex items-center justify-center bg-white overflow-hidden">
          {/* Background Glow */}
          <div className="absolute w-[420px] h-[420px] rounded-full bg-red-600/10 blur-3xl animate-pulse" />
          <div className="absolute w-[280px] h-[280px] rounded-full bg-red-400/10 blur-2xl animate-pulse [animation-delay:0.3s]" />

          {/* Loader */}
          <div className="relative z-10 flex flex-col items-center">
            <div className="relative w-28 h-28">
              {/* Circular progress ring */}
              <svg className="w-28 h-28 -rotate-90" viewBox="0 0 100 100">
                <circle
                  cx="50"
                  cy="50"
                  r="42"
                  fill="none"
                  stroke="#fee2e2"
                  strokeWidth="6"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="42"
                  fill="none"
                  stroke="#dc2626"
                  strokeWidth="6"
                  strokeLinecap="round"
                  strokeDasharray="264"
                  strokeDashoffset="66"
                  className="animate-[spin_1.2s_linear_infinite] origin-center"
                />
              </svg>

              {/* Center Icon */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center shadow-[0_0_25px_rgba(220,38,38,0.45)] animate-pulse">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>

            {/* Text */}
            <h2 className="mt-8 text-2xl font-bold text-gray-900 tracking-wide">
              Setting up your profile
            </h2>

            <p className="mt-2 text-gray-500 text-sm text-center max-w-xs">
              Fetching your details and credentials, this'll just take a moment.
            </p>

            {/* Loading Dots */}
            <div className="flex gap-2 mt-6">
              <span className="w-2 h-2 rounded-full bg-red-600 animate-bounce"></span>
              <span className="w-2 h-2 rounded-full bg-red-500 animate-bounce [animation-delay:0.15s]"></span>
              <span className="w-2 h-2 rounded-full bg-red-400 animate-bounce [animation-delay:0.3s]"></span>
            </div>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  if (!profile || !form) {
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
  }

  // ---- handlers (profile is non-null below) ----
  const startEdit = () => {
    setForm(buildForm(profile!));
    setIsEditing(true);
  };

  const cancelEdit = () => {
    setIsEditing(false);
    setForm(null);
    setSkillInput("");
    setPictureFile(null);
    setPreview(null);
  };

  const setField = (name: keyof FormState, value: string) =>
    setForm((prev) => (prev ? { ...prev, [name]: value } : prev));

  const handlePictureChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = ""; // same file dobara select ho sake
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file.");
      return;
    }
    if (file.size > MAX_IMAGE_SIZE) {
      toast.error("Image must be smaller than 2MB.");
      return;
    }

    setPictureFile(file);
    setPreview(URL.createObjectURL(file));
  };

  const addSkill = () => {
    const skill = skillInput.trim();
    if (!skill) return;
    setForm((prev) =>
      !prev || prev.skills.some((s) => s.toLowerCase() === skill.toLowerCase())
        ? prev
        : { ...prev, skills: [...prev.skills, skill] }
    );
    setSkillInput("");
  };

  const removeSkill = (index: number) =>
    setForm((prev) =>
      prev
        ? { ...prev, skills: prev.skills.filter((_, i) => i !== index) }
        : prev
    );

  const handleSave = async () => {
    if (!form || !profile) return;
    try {
      setSaving(true);

      const response = await updateProfile(form);
      const data = response.data;

      let profileImage = profile.profileImage;
      if (pictureFile) {
        const picRes = await updateProfilePicture(pictureFile);
        profileImage = picRes.data.profileImage;
      }

      setProfile({
        ...profile,
        mobile: data.mobile,
        dateOfBirth: data.dateOfBirth ? data.dateOfBirth.split("T")[0] : "",
        gender: data.gender,
        address: data.address,
        college: data.college,
        department: data.department,
        batch: data.batch,
        skills: data.skills,
        profileImage,
      });

      toast.success("Your profile has been updated successfully.");
      cancelEdit();
    } catch {
      toast.error("Unable to update your profile. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  const avatarSrc = preview || profile!.profileImage;
  const skillsToShow = isEditing && form ? form.skills : profile!.skills || [];

  const infoItems = [
    { icon: Mail, label: "Email", value: profile!.email },
    {
      icon: Phone,
      label: "Mobile",
      name: "mobile" as const,
      value: profile!.mobile || "Not Updated",
    },
    {
      icon: Calendar,
      label: "Date of Birth",
      name: "dateOfBirth" as const,
      type: "date",
      value: profile!.dateOfBirth
        ? new Date(profile!.dateOfBirth).toLocaleDateString("en-GB")
        : "Not Updated",
    },
    {
      icon: User,
      label: "Gender",
      name: "gender" as const,
      value: profile!.gender || "Not Updated",
    },
    {
      icon: MapPin,
      label: "Address",
      name: "address" as const,
      value: profile!.address || "Not Updated",
    },
  ];

  const academicItems = [
    {
      icon: GraduationCap,
      title: "Institution",
      name: "college" as const,
      value: profile!.college || "Not Updated",
    },
    {
      icon: Building2,
      title: "Department",
      name: "department" as const,
      value: profile!.department || "Not Updated",
    },
    {
      icon: Layers3,
      title: "Batch",
      name: "batch" as const,
      value: profile!.batch || "Not Updated",
    },
  ];

  const verifiedCount = certificates.filter((c) => c.status === "active").length;
  const recentCertificates = certificates.slice(0, 4);

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
              {isEditing
                ? "You're editing your profile. Don't forget to save."
                : "Manage your personal and academic information."}
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
                {avatarSrc ? (
                  <img
                    src={avatarSrc}
                    alt={profile!.fullName}
                    className="w-28 h-28 rounded-full border border-red-400 shadow-xl shadow-red-300 object-cover ring-4 ring-white"
                  />
                ) : (
                  <div className="w-28 h-28 rounded-full bg-gradient-to-br from-red-500 to-red-600 text-white flex items-center justify-center text-4xl font-bold ring-4 ring-white shadow-md">
                    {profile!.fullName.charAt(0).toUpperCase()}
                  </div>
                )}

                {isEditing ? (
                  <>
                    <button
                      type="button"
                      onClick={() => fileRef.current?.click()}
                      className="absolute bottom-1 right-1 p-2 rounded-full bg-red-600 text-white hover:bg-red-700 shadow-lg ring-2 ring-white"
                      aria-label="Change profile picture"
                    >
                      <Camera className="w-4 h-4" />
                    </button>
                    <input
                      ref={fileRef}
                      type="file"
                      accept="image/png,image/jpeg,image/webp"
                      className="hidden"
                      onChange={handlePictureChange}
                    />
                  </>
                ) : (
                  <span className="absolute bottom-1 right-1 bg-white rounded-full p-1 shadow">
                    <BadgeCheck className="w-6 h-6 text-red-600 fill-red-100" />
                  </span>
                )}
              </div>

              {isEditing && (
                <p className="text-xs text-gray-400 mt-3">
                  JPG, PNG or WEBP, max 2MB
                </p>
              )}

              <h2 className="text-2xl font-bold mt-5 text-center text-slate-700">
                {profile!.fullName}
              </h2>

              <p className="text-sm text-red-600 font-medium mt-1">
                Verified Student
              </p>

              <div className="mt-5 px-4 py-1.5 rounded-full bg-red-50 border border-gray-200 text-sm text-red-600 font-mono tracking-wide">
                TII-2026-{String(profile!.lmsId).padStart(4, "0")}
              </div>

              {!isEditing ? (
                <button
                  onClick={startEdit}
                  className="mt-7 w-full flex items-center justify-center gap-2 px-6 py-3 border border-red-600  text-red-600  hover:text-white rounded-2xl font-medium hover:bg-red-500 active:scale-[0.98] transition-all duration-150 shadow-sm hover:shadow-md"
                >
                  <Pencil className="w-4 h-4" />
                  Edit Profile
                </button>
              ) : (
                <div className="mt-7 w-full flex gap-3">
                  <button
                    onClick={cancelEdit}
                    disabled={saving}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-3 border border-gray-300 text-gray-600 rounded-2xl font-medium hover:bg-gray-50 disabled:opacity-60"
                  >
                    <X className="w-4 h-4" />
                    Cancel
                  </button>
                  <button
                    onClick={handleSave}
                    disabled={saving}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-red-600 text-white rounded-2xl font-medium hover:bg-red-700 active:scale-[0.98] disabled:opacity-60"
                  >
                    <Check className="w-4 h-4" />
                    {saving ? "Saving..." : "Save"}
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Right Card — Personal Info */}
          <div className="lg:col-span-2 bg-white rounded-3xl shadow-sm border border-gray-100 p-6 md:p-8">
            <h2 className="text-xl font-bold mb-8 text-gray-900">
              Personal Information
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {infoItems.map(({ icon: Icon, label, name, type, value }) => (
                <div
                  key={label}
                  className={`flex items-start gap-4 p-4 rounded-2xl hover:bg-gray-50 transition-colors ${
                    isEditing && name === "address" ? "sm:col-span-2" : ""
                  }`}
                >
                  <div className="shrink-0 w-11 h-11 rounded-xl bg-red-50 flex items-center justify-center">
                    <Icon className="w-5 h-5 text-red-600" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-xs uppercase tracking-wide text-gray-400 font-semibold mb-0.5">
                      {label}
                    </p>

                    {isEditing && form && name ? (
                      name === "gender" ? (
                        <select
                          value={form.gender}
                          onChange={(e) => setField("gender", e.target.value)}
                          className={inputCls}
                        >
                          <option>Male</option>
                          <option>Female</option>
                          <option>Other</option>
                        </select>
                      ) : name === "address" ? (
                        <textarea
                          rows={3}
                          value={form.address}
                          onChange={(e) => setField("address", e.target.value)}
                          className={`${inputCls} resize-none`}
                        />
                      ) : (
                        <input
                          type={type || "text"}
                          value={form[name]}
                          onChange={(e) => setField(name, e.target.value)}
                          className={inputCls}
                        />
                      )
                    ) : (
                      <p className="text-gray-800 font-medium truncate">
                        {value}
                      </p>
                    )}
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
            {academicItems.map(({ icon: Icon, title, name, value }) => (
              <div
                key={title}
                className="flex items-center gap-4 p-5 rounded-2xl border border-gray-100 hover:border-red-100 hover:bg-red-50/30 transition-colors"
              >
                <div className="w-12 h-12 rounded-xl bg-red-50 flex items-center justify-center shrink-0">
                  <Icon className="w-6 h-6 text-red-600" />
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="font-semibold text-gray-800">{title}</h3>
                  {isEditing && form ? (
                    <input
                      value={form[name]}
                      onChange={(e) => setField(name, e.target.value)}
                      className={`${inputCls} mt-1`}
                    />
                  ) : (
                    <p className="text-gray-500 truncate" title={value}>
                      {value}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Skills */}
        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6 md:p-8">
          <h2 className="text-xl font-bold mb-6 text-gray-900 flex items-center gap-2">
            <Wrench className="w-5 h-5 text-red-600" />
            Skills
          </h2>

          {isEditing && (
            <div className="flex gap-2 mb-5">
              <input
                value={skillInput}
                onChange={(e) => setSkillInput(e.target.value)}
                placeholder="Add a skill and press Enter"
                className={`${inputCls} flex-1`}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    addSkill();
                  }
                }}
              />
              <button
                type="button"
                onClick={addSkill}
                className="px-5 rounded-xl bg-red-600 text-white hover:bg-red-700"
              >
                Add
              </button>
            </div>
          )}

          {skillsToShow.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {skillsToShow.map((skill, index) => (
                <span
                  key={`${skill}-${index}`}
                  className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-50 border border-red-100 text-red-700 text-sm font-medium"
                >
                  {skill}
                  {isEditing && (
                    <button
                      type="button"
                      onClick={() => removeSkill(index)}
                      aria-label={`Remove ${skill}`}
                      className="hover:text-red-900"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                </span>
              ))}
            </div>
          ) : (
            <p className="text-gray-400 text-sm">No skills added yet.</p>
          )}
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          <StatsCard title="Credentials" value={String(certificates.length)} />
          <StatsCard title="Verified" value={String(verifiedCount)} />
          <StatsCard title="Shared" value="NA" />
          <StatsCard title="Downloads" value="NA" />
        </div>

        {/* Recent Credentials */}
        <div>
          <h2 className="text-xl font-bold mb-6 text-gray-900">
            Recent Credentials
          </h2>

          {recentCertificates.length > 0 ? (
            <div className="grid lg:grid-cols-2 gap-6">
              {recentCertificates.map((cert) => (
                <CredentialCard
                  key={cert._id || cert.certificateId}
                  title={formatCertificateTitle(cert.certificateType)}
                  issuer={`Issued by ${cert.organization || "Tiiron Technologies"}`}
                />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8 text-center">
              <p className="text-gray-400 text-sm">No credentials issued yet.</p>
            </div>
          )}
        </div>

        {/* Activity */}
        <RecentActivity id={certId} />
      </div>
    </DashboardLayout>
  );
}