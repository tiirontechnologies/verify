import Sidebar from "../components/shared/Sidebar";
import Topbar from "../components/shared/Topbar";

type DashboardLayoutProps = {
  children: React.ReactNode;
};

export default function DashboardLayout({
  children,
}: DashboardLayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50">

      <div className="flex">

        {/* Sidebar */}

        <Sidebar />

        {/* Right Side */}

        <div className="flex-1">

          <Topbar />

          <main className="p-4 md:p-8">
            {children}
          </main>

        </div>

      </div>

    </div>
  );
}