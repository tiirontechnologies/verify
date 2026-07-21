import { Search, Bell, Menu } from "lucide-react";
import { useSidebar } from "../../context/SidebarContext";

export default function Topbar() {
  const { setOpen } = useSidebar();

  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const firstLetter =
    user?.name?.charAt(0)?.toUpperCase() ||
    user?.email?.charAt(0)?.toUpperCase() ||
    "?";

  return (
    <header className="bg-white border-b h-20 px-4 md:px-8 flex items-center justify-between">
      {/* Left */}
      <div className="flex items-center gap-4">
        {/* Mobile Menu */}
        <button
          className="md:hidden"
          onClick={() => setOpen(true)}
        >
          <Menu size={28} />
        </button>

        <div>
          <h1 className="text-2xl md:text-3xl font-bold">
            Dashboard
          </h1>

          <p className="text-gray-500 text-sm md:text-base mt-1">
            Welcome back
          </p>
        </div>
      </div>

      {/* Right */}
      <div className="flex items-center gap-3 md:gap-6">
        {/* Search */}
        <div className="hidden lg:flex items-center bg-gray-100 px-4 py-3 rounded-2xl w-80">
          <Search
            size={18}
            className="text-gray-400"
          />

          <input
            className="bg-transparent outline-none ml-3 flex-1"
            placeholder="Search..."
          />
        </div>

        {/* Notification */}
        <button className="w-11 h-11 rounded-2xl bg-gray-100 flex items-center justify-center transition hover:bg-gray-200">
          <Bell size={20} />
        </button>

        {/* Profile Avatar */}
        <button
          className="w-11 h-11 rounded-full bg-red-600 text-white flex items-center justify-center font-bold text-lg uppercase transition hover:bg-red-700"
          title={user?.name || user?.email || "Profile"}
        >
          {firstLetter}
        </button>
      </div>
    </header>
  );
}