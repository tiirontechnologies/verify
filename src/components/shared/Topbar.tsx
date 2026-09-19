

import { Search, Bell, Menu, User, Sunrise, Sun, Sunset } from "lucide-react";
import { useSidebar } from "../../context/SidebarContext";

function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) return { text: "Good Morning", Icon: Sunrise, color: "text-orange-500", bg: "bg-orange-50" };
  if (hour < 17) return { text: "Good Afternoon", Icon: Sun, color: "text-amber-500", bg: "bg-amber-50" };
  return { text: "Good Evening", Icon: Sunset, color: "text-indigo-500", bg: "bg-indigo-50" };
}

export default function Topbar() {
  const { setOpen } = useSidebar();

  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const firstLetter =
    user?.name?.charAt(0)?.toUpperCase() ||
    user?.email?.charAt(0)?.toUpperCase() ||
    "?";

  const firstName = user?.name?.split(" ")[0] || "there";
  const { text: greetingText, Icon: GreetingIcon, color, bg } = getGreeting();

  return (
    <header className="bg-white border-b border-slate-200 h-20 px-4 md:px-8 flex items-center justify-between">
      {/* Left */}
      <div className="flex items-center gap-4">
        {/* Mobile Menu */}
        <button
          className="md:hidden w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center transition hover:bg-gray-200"
          onClick={() => setOpen(true)}
        >
          <Menu size={22} />
        </button>

        <div className="flex items-center gap-3 ">
          <div className={`hidden sm:flex w-11 h-11 rounded-2xl ${bg} items-center justify-center shrink-0`}>
            <GreetingIcon size={20} className={color} strokeWidth={2} />
          </div>

          <div>
            <h1 className="text-lg md:text-xl font-bold text-slate-900 leading-tight">
              {greetingText}, {firstName}
            </h1>
            <p className="text-slate-400 text-xs md:text-sm mt-0.5">
              Here's what's happening today
            </p>
          </div>
        </div>
      </div>

      {/* Right */}
      <div className="flex items-center gap-3 md:gap-5">
        {/* Search */}
        <div className="hidden lg:flex items-center bg-gray-100 focus-within:bg-gray-50 focus-within:ring-2 focus-within:ring-red-500/20 focus-within:border-red-300 border border-transparent px-4 py-2.5 rounded-2xl w-72 transition">
          <Search size={17} className="text-gray-400 shrink-0" />
          <input
            className="bg-transparent outline-none ml-3 flex-1 text-sm placeholder:text-gray-400"
            placeholder="Search..."
          />
        </div>

        <div className="hidden md:block w-px h-8 bg-slate-200" />

        {/* Notification */}
        <button className="relative w-11 h-11 rounded-2xl bg-gray-100 flex items-center justify-center transition hover:bg-gray-200">
          <Bell size={19} className="text-slate-600" />
          <span className="absolute top-2.5 right-2.5 w-2 h-2 rounded-full bg-red-500 ring-2 ring-white" />
        </button>

        {/* Profile Avatar */}
        <button
          className="w-11 h-11 rounded-full bg-red-600 text-white flex items-center justify-center font-semibold text-base uppercase transition hover:bg-red-700 ring-2 ring-offset-2 ring-red-100"
          title={user?.name || user?.email || "Profile"}
        >
          {firstLetter !== "?" ? firstLetter : <User size={18} />}
        </button>
      </div>
    </header>
  );
}