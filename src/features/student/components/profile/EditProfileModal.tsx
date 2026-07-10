import { useState } from "react";
import { X } from "lucide-react";

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

  });

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

      });

    } catch (error) {

      console.log(error);

      alert("Unable to update profile.");

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