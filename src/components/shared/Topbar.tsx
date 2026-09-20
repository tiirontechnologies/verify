import { useState, useRef, useEffect } from "react";
import {
  Search,
  Bell,
  Menu,
  User,
  Sunrise,
  Sun,
  Sunset,
  Camera,
  Settings,
  ShieldCheck,
  History,
  LifeBuoy,
  LogOut,
  Crown,
} from "lucide-react";
import { useSidebar } from "../../context/SidebarContext";
import { useNavigate } from "react-router-dom";

function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) return { text: "Good Morning", Icon: Sunrise, color: "text-orange-500", bg: "bg-orange-50" };
  if (hour < 17) return { text: "Good Afternoon", Icon: Sun, color: "text-amber-500", bg: "bg-amber-50" };
  return { text: "Good Evening", Icon: Sunset, color: "text-indigo-500", bg: "bg-indigo-50" };
}

export default function Topbar() {
  const { setOpen } = useSidebar();
  const [profileOpen, setProfileOpen] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);
  
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  
  const navigate = useNavigate();
  
  const firstLetter =
    user?.name?.charAt(0)?.toUpperCase() ||
    user?.email?.charAt(0)?.toUpperCase() ||
    "?";

  const firstName = user?.name?.split(" ")[0] || "there";
  const { text: greetingText, Icon: GreetingIcon, color, bg } = getGreeting();

  const isAdmin = user?.role === "admin"; // apne actual role field se match kar lena
  const activePlan = user?.plan || "Starter";

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) {
        setProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    window.location.href = "/login";
  };

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

        {/* Profile Avatar + Dropdown */}
        <div className="relative" ref={profileRef}>
          <button
            onClick={() => setProfileOpen((v) => !v)}
            className="w-11 h-11 rounded-full bg-gradient-to-br from-red-500 to-rose-600 text-white flex items-center justify-center font-semibold text-base uppercase transition hover:brightness-110 ring-2 ring-offset-2 ring-red-100"
            title={user?.name || user?.email || "Profile"}
          >
            {firstLetter !== "?" ? firstLetter : <User size={18} />}
          </button>

          {profileOpen && (
            <div className="absolute right-0 top-14 w-80 rounded-3xl bg-white shadow-2xl shadow-slate-900/10 border border-slate-100 overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-200">
              {/* Gradient banner + overlapping avatar */}
              <div className="relative h-16 bg-gradient-to-r from-red-500 via-rose-500 to-orange-400">
                <div className="absolute -bottom-7 left-5">
                  <div className="relative">
                    <div className="w-16 h-16 rounded-2xl bg-white p-1 shadow-lg">
                      <div className="w-full h-full rounded-xl bg-gradient-to-br from-red-500 to-rose-600 text-white flex items-center justify-center font-semibold text-xl uppercase">
                        {firstLetter !== "?" ? firstLetter : <User size={22} />}
                      </div>
                    </div>
                    <button
                      title="Change profile photo"
                      className="absolute -bottom-1.5 -right-1.5 w-6 h-6 rounded-full bg-slate-900 text-white shadow-md flex items-center justify-center hover:bg-slate-700 transition"
                    >
                      <Camera size={11} />
                    </button>
                  </div>
                </div>
              </div>

              {/* Name + email */}
              <div className="pt-9 px-5 pb-4">
                <p className="text-sm font-semibold text-slate-900 truncate">
                  {user?.name || "there"}
                </p>
                <p className="text-xs text-slate-400 truncate">{user?.email}</p>
              </div>

              {/* Active plan — admin only */}
              {isAdmin && (
                <div className="mx-4 mb-3 flex items-center justify-between rounded-2xl bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-100 px-3.5 py-2.5">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-amber-100 flex items-center justify-center">
                      <Crown size={13} className="text-amber-600" />
                    </div>
                    <div>
                      <p className="text-[11px] text-slate-400 leading-none mb-0.5">Active Plan</p>
                      <p className="text-xs font-semibold text-slate-800 leading-none">{activePlan}</p>
                    </div>
                  </div>
                  <button 
                  onClick={()=>navigate("/subscription")}
                  className="text-[11px] font-semibold text-rose-600 hover:text-rose-700 transition">
                    Manage
                  </button>
                </div>
              )}

              <div className="h-px bg-slate-100 mx-4" />

              {/* Menu items */}
              <div className="p-2.5 space-y-0.5">
                <button className="w-full flex items-center gap-3 px-2.5 py-2.5 rounded-2xl text-sm text-slate-700 hover:bg-slate-50 transition group">
                  <div className="w-8 h-8 rounded-xl bg-slate-100 group-hover:bg-slate-200 flex items-center justify-center transition shrink-0">
                    <Settings size={15} className="text-slate-500" />
                  </div>
                  Account Settings
                </button>

                {isAdmin ? (
                  <button className="w-full flex items-center gap-3 px-2.5 py-2.5 rounded-2xl text-sm text-slate-700 hover:bg-slate-50 transition group">
                    <div className="w-8 h-8 rounded-xl bg-slate-100 group-hover:bg-slate-200 flex items-center justify-center transition shrink-0">
                      <ShieldCheck size={15} className="text-slate-500" />
                    </div>
                    Organization Verification Settings
                  </button>
                ) : (
                  <>
                    <button className="w-full flex items-center gap-3 px-2.5 py-2.5 rounded-2xl text-sm text-slate-700 hover:bg-slate-50 transition group">
                      <div className="w-8 h-8 rounded-xl bg-slate-100 group-hover:bg-slate-200 flex items-center justify-center transition shrink-0">
                        <History size={15} className="text-slate-500" />
                      </div>
                      Verification History
                    </button>
                    <button className="w-full flex items-center gap-3 px-2.5 py-2.5 rounded-2xl text-sm text-slate-700 hover:bg-slate-50 transition group">
                      <div className="w-8 h-8 rounded-xl bg-slate-100 group-hover:bg-slate-200 flex items-center justify-center transition shrink-0">
                        <LifeBuoy size={15} className="text-slate-500" />
                      </div>
                      Help & Support
                    </button>
                  </>
                )}
              </div>

              <div className="h-px bg-slate-100 mx-4" />

              {/* Logout */}
              <div className="p-2.5">
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-2.5 py-2.5 rounded-2xl text-sm text-red-600 hover:bg-red-50 transition group"
                >
                  <div className="w-8 h-8 rounded-xl bg-red-50 group-hover:bg-red-100 flex items-center justify-center transition shrink-0">
                    <LogOut size={15} className="text-red-500" />
                  </div>
                  Log Out
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}