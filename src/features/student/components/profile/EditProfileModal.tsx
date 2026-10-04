import { useState } from "react";
import { X } from "lucide-react";
import toast from "react-hot-toast";

import { updateProfile } from "../../../../api/studentProfile.api";
import type { StudentProfile } from "../../../../types/studentProfile";

type Props = {
  profile: StudentProfile;
  onClose: () => void;
  onUpdate: (profile: StudentProfile) => void;
};

export default function EditProfileModal({
  profile,
  onClose,
  onUpdate,
}: Props) {

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({

    fullName: profile.fullName,

    email: profile.email,

    mobile: profile.mobile,

    dateOfBirth: profile.dateOfBirth,

    gender: profile.gender,

    address: profile.address,

    college: profile.college,

    department: profile.department,

    batch: profile.batch,

    skills: profile.skills || [],

  });
const [skillInput, setSkillInput] = useState("");
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {

    setFormData({

      ...formData,

      [e.target.name]: e.target.value,

    });

  };

const addSkill = () => {

  const skill = skillInput.trim();

  if (!skill) return;

  setFormData((prev) => {

    if (
      prev.skills.some(
        (s) => s.toLowerCase() === skill.toLowerCase()
      )
    ) {
      return prev;
    }

    const updated = {
      ...prev,
      skills: [...prev.skills, skill],
    };

    console.log("Updated Skills:", updated.skills);

    return updated;
  });

  setSkillInput("");

};

const removeSkill = (index: number) => {
  setFormData((prev) => ({
    ...prev,
    skills: prev.skills.filter((_, i) => i !== index),
  }));
};

  const handleSubmit = async () => {

    try {

      setLoading(true);

      const response = await updateProfile({

        mobile: formData.mobile,

        dateOfBirth: formData.dateOfBirth,

        gender: formData.gender,

        address: formData.address,

        college: formData.college,

        department: formData.department,

        batch: formData.batch,

        skills: formData.skills,

      });

      const data = response.data;

      onUpdate({

        ...profile,

        mobile: data.mobile,

        dateOfBirth: data.dateOfBirth
          ? new Date(data.dateOfBirth).toLocaleDateString(
              "en-GB"
            )
          : "",

        gender: data.gender,

        address: data.address,

        college: data.college,

        department: data.department,

        batch: data.batch,

        skills: data.skills,

      });
      toast.success("Your profile has been updated successfully.");

    } catch {

      toast.error("Unable to update your profile. Please try again.");

    } finally {

      setLoading(false);

    }

  };

  return (

    <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4 overflow-y-auto">

      <div className="bg-white rounded-3xl w-full max-w-3xl shadow-2xl max-h-[90vh] overflow-y-auto">

        {/* Header */}

        <div className="flex items-start justify-between border-b px-5 md:px-8 py-5 md:py-6">

          <div>

            <h2 className="text-2xl md:text-3xl font-bold">
              Edit Profile
            </h2>

            <p className="text-gray-500 mt-2">
              Update your personal information.
            </p>

          </div>

          <button
            onClick={onClose}
          >
            <X size={28} />
          </button>

        </div>

        {/* Body */}

        <div className="p-5 md:p-8 grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">

          <div>

            <label className="font-medium">
              Full Name
            </label>

            <input
              disabled
              value={formData.fullName}
              className="mt-2 w-full border rounded-xl p-3 bg-gray-100"
            />

          </div>

          <div>

            <label className="font-medium">
              Email
            </label>

            <input
              disabled
              value={formData.email}
              className="mt-2 w-full border rounded-xl p-3 bg-gray-100"
            />

          </div>

          <div>

            <label className="font-medium">
              Mobile
            </label>

            <input
              name="mobile"
              value={formData.mobile}
              onChange={handleChange}
              className="mt-2 w-full border rounded-xl p-3"
            />

          </div>

          <div>

            <label className="font-medium">
              Date of Birth
            </label>

            <input
              type="date"
              name="dateOfBirth"
              value={formData.dateOfBirth}
              onChange={handleChange}
              className="mt-2 w-full border rounded-xl p-3"
            />

          </div>

          <div>

            <label className="font-medium">
              Gender
            </label>

            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="mt-2 w-full border rounded-xl p-3"
            >

              <option>Male</option>

              <option>Female</option>

              <option>Other</option>

            </select>

          </div>

          <div>

            <label className="font-medium">
              College
            </label>

            <input
              name="college"
              value={formData.college}
              onChange={handleChange}
              className="mt-2 w-full border rounded-xl p-3"
            />

          </div>

          <div>

            <label className="font-medium">
              Department
            </label>

            <input
              name="department"
              value={formData.department}
              onChange={handleChange}
              className="mt-2 w-full border rounded-xl p-3"
            />

          </div>

          <div>

            <label className="font-medium">
              Batch
            </label>

            <input
              name="batch"
              value={formData.batch}
              onChange={handleChange}
              className="mt-2 w-full border rounded-xl p-3"
            />

          </div>

          <div className="md:col-span-2">

  <label className="font-medium">
    Skills
  </label>

  <div className="flex mt-2 gap-2">

    <input
      value={skillInput}
      onChange={(e) =>
        setSkillInput(e.target.value)
      }
      placeholder="Add a skill"
      className="flex-1 border rounded-xl p-3"
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

  <div className="space-y-3 mt-4">

  {formData.skills.map((skill, index) => (

    <div
      key={index}
      className="flex items-center gap-3"
    >

      <input
        value={skill}
        onChange={(e) => {

          const updatedSkills = [...formData.skills];

          updatedSkills[index] = e.target.value;

          setFormData({
            ...formData,
            skills: updatedSkills,
          });

        }}
        className="flex-1 border rounded-xl p-3"
      />

<button
  type="button"
  onClick={() => removeSkill(index)}
  className="px-4 py-2 rounded-xl bg-red-600 text-white hover:bg-red-700"
>
  Remove
</button>

    </div>

  ))}

</div>

</div>

          <div className="md:col-span-2">

            <label className="font-medium">
              Address
            </label>

            <textarea
              rows={4}
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="mt-2 w-full border rounded-xl p-3 resize-none"
            />

          </div>

        </div>

        {/* Footer */}

        <div className="border-t flex flex-col-reverse sm:flex-row justify-end gap-3 px-5 md:px-8 py-5 md:py-6">

          <button
            onClick={onClose}
            className="w-full sm:w-auto px-6 py-3 rounded-xl border"
          >
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full sm:w-auto px-8 py-3 rounded-xl bg-red-600 hover:bg-red-700 text-white"
          >
            {loading ? "Saving..." : "Save Changes"}
          </button>

        </div>

      </div>

    </div>

  );

}