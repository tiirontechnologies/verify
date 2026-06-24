import DashboardLayout from "../../../layouts/DashboardLayout";
import {
  Bell,
  Lock,
  Moon,
  Shield,
  Globe,
  Smartphone,
} from "lucide-react";

export default function SettingsPage() {
  return (
    <DashboardLayout>
      <div className="space-y-8">

        {/* Header */}

        <div>
          <h1 className="text-3xl md:text-4xl font-bold">
            Settings
          </h1>

          <p className="text-gray-500 mt-2">
            Manage your account preferences and security.
          </p>
        </div>

        {/* Account Settings */}

<div className="bg-white rounded-3xl border shadow-sm p-6 md:p-8">
          <h2 className="text-2xl font-bold mb-8">
            Account Settings
          </h2>

          <div className="space-y-6">

            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="flex items-center gap-4">
                <Lock className="text-red-600" />
                <div>
                  <h3 className="font-semibold">
                    Change Password
                  </h3>

                  <p className="text-gray-500 text-sm">
                    Update your password regularly.
                  </p>
                </div>
              </div>

              <button className="px-5 py-2 rounded-xl border">
                Change
              </button>
            </div>

            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="flex items-center gap-4">
                <Bell className="text-red-600" />
                <div>
                  <h3 className="font-semibold">
                    Notifications
                  </h3>

                  <p className="text-gray-500 text-sm">
                    Email and system notifications.
                  </p>
                </div>
              </div>

              <input type="checkbox" defaultChecked />
            </div>

            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="flex items-center gap-4">
                <Moon className="text-red-600" />
                <div>
                  <h3 className="font-semibold">
                    Dark Mode
                  </h3>

                  <p className="text-gray-500 text-sm">
                    Switch appearance mode.
                  </p>
                </div>
              </div>

              <input type="checkbox" />
            </div>

          </div>

        </div>

        {/* Security */}

        <div className="bg-white rounded-3xl border shadow-sm p-8">

          <h2 className="text-2xl font-bold mb-8">
            Security
          </h2>

          <div className="space-y-6">

            <div className="flex items-center gap-4">
              <Shield className="text-red-600" />

              <div>
                <h3 className="font-semibold">
                  Two Factor Authentication
                </h3>

                <p className="text-gray-500 text-sm">
                  Disabled
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <Smartphone className="text-red-600" />

              <div>
                <h3 className="font-semibold">
                  Trusted Devices
                </h3>

                <p className="text-gray-500 text-sm">
                  1 device connected
                </p>
              </div>
            </div>

          </div>

        </div>

        {/* Preferences */}

        <div className="bg-white rounded-3xl border shadow-sm p-8">

          <h2 className="text-2xl font-bold mb-8">
            Preferences
          </h2>

          <div className="flex items-center gap-4">

            <Globe className="text-red-600" />

            <div>

              <h3 className="font-semibold">
                Language
              </h3>

              <p className="text-gray-500 text-sm">
                English (India)
              </p>

            </div>

          </div>

        </div>

      </div>
    </DashboardLayout>
  );
}