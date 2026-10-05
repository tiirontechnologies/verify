import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronDown, Menu, X, User, LogOut } from "lucide-react";
import logo from "../../../assets/Tiiron_Technologies_Logo.png";
import api from "../../../api/axios";
import { getCurrentUser } from "../../../api/auth.api";

const mainLinks = [
  { label: "Home", href: "/" },
  { label: "Services", href: "https://tiirontechnologies.com/services" },
  { label: "Products", href: "https://tiirontechnologies.com/products" },
  { label: "About", href: "https://tiirontechnologies.com/about" },
];

const exploreLinks = [
  { label: "Pricing", href: "https://tiirontechnologies.com/pricing" },
  { label: "Testimonials", href: "https://tiirontechnologies.com/comingsoon" },
  { label: "Help & Support", href: "/help-support" },
  { label: "Book a Demo", href: "/book-demo" },
];

export default function Navbar() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [exploreOpen, setExploreOpen] = useState(false);
  const [mobileExploreOpen, setMobileExploreOpen] = useState(false);
  const [user, setUser] = useState<any>(() => {
    try {
      return JSON.parse(
        sessionStorage.getItem("user") || localStorage.getItem("user") || "null",
      );
    } catch {
      return null;
    }
  });

  useEffect(() => {
    let active = true;
    getCurrentUser()
      .then((response) => {
        if (!active) return;
        const currentUser =
          response?.userRedirect?.user || response?.userRedirect || response?.user?.user || response?.user || response?.data?.user || response?.data || response;
        if (currentUser?.role || currentUser?.roleId || currentUser?.name || currentUser?.email) {
          setUser(currentUser);
          localStorage.setItem("user", JSON.stringify(currentUser));
        } else {
          setUser(null);
          sessionStorage.removeItem("user");
          localStorage.removeItem("user");
        }
      })
      .catch(() => {
        if (active) {
          setUser(null);
          sessionStorage.removeItem("user");
          localStorage.removeItem("user");
        }
      });

    const syncUser = () => {
      try {
        setUser(
          JSON.parse(
            sessionStorage.getItem("user") || localStorage.getItem("user") || "null",
          ),
        );
      } catch {
        setUser(null);
      }
    };
    window.addEventListener("storage", syncUser);
    return () => {
      active = false;
      window.removeEventListener("storage", syncUser);
    };
  }, []);

  const profilePath = user?.role === "admin" || user?.roleId === "admin" ? "/organization/profile" : "/student/profile";
  const profileImage = user?.profileImage || user?.profilePicture;

  const handleProfileImageError = () => {
    setUser((current: any) => current ? { ...current, profileImage: null, profilePicture: null } : current);
  };

  const handleLogout = async () => {
    try {
      await api.post("/api/auth/logout", {});
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      sessionStorage.clear();
      localStorage.clear();
      setUser(null);
      setOpen(false);
      navigate("/", { replace: true });
    }
  };

  return (
    <>
      <header className="fixed top-0 z-50 w-full border-b border-slate-200 bg-white shadow-sm">
        <nav className="mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-3.5 lg:px-8">
          <a href="/" className="flex items-center gap-2 pl-4 md:pl-6 lg:pl-0" aria-label="Tiiron Technologies Home">
            <img src={logo} alt="Tiiron Technologies Logo" className="h-10 w-auto" />
          </a>

          <div className="hidden md:flex flex-1 items-center justify-center gap-8 font-semibold text-slate-900">
            {mainLinks.map((item) => (
              <a key={item.label} href={item.href} className="text-base font-medium transition-colors hover:text-[#ef233c]">
                {item.label}
              </a>
            ))}
            <div className="relative">
              <button
                type="button"
                className="flex items-center gap-1 text-base transition-colors hover:text-[#ef233c]"
                onClick={() => setExploreOpen((value) => !value)}
              >
                Explore
                <ChevronDown size={18} strokeWidth={2} className={`transition-transform duration-300 ${exploreOpen ? "rotate-180" : ""}`} />
              </button>
              {exploreOpen && (
                <div className="absolute left-0 mt-2 min-w-[200px] rounded-xl border border-slate-200 bg-white py-2 shadow-xl">
                  {exploreLinks.map((item) => (
                    <a
                      key={item.label}
                      href={item.href}
                      className="block px-4 py-2 text-base text-slate-700 transition hover:bg-slate-50 hover:text-[#ef233c]"
                    >
                      {item.label}
                    </a>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="flex items-center gap-3 pr-4 md:pr-6">
            {user ? (
              <>
                <a href={profilePath} className="hidden md:inline-flex items-center gap-2 rounded-full border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-800 transition hover:border-[#ef233c] hover:text-[#ef233c]">
                  {profileImage ? (
                    <img src={profileImage} alt="" onError={handleProfileImageError} className="h-7 w-7 rounded-full border border-slate-200 object-cover" />
                  ) : (
                    <span className="flex h-7 w-7 items-center justify-center rounded-full bg-slate-100 text-slate-600"><User size={16} /></span>
                  )}
                  {user.name || user.email || "Profile"}
                </a>
                <button type="button" onClick={handleLogout} title="Log out" aria-label="Log out" className="hidden md:inline-flex h-10 w-10 items-center justify-center rounded-full border border-red-300 text-red-600 transition hover:border-red-600 hover:bg-red-50">
                  <LogOut size={18} />
                </button>
                <a href={profilePath} className="md:hidden flex h-9 w-9 items-center justify-center overflow-hidden rounded-full text-slate-900 hover:bg-slate-100" aria-label="Profile">
                  {profileImage ? (
                    <img src={profileImage} alt={`${user.name || "User"} profile`} onError={handleProfileImageError} className="h-full w-full rounded-full object-cover" />
                  ) : (
                    <User size={18} />
                  )}
                </a>
              </>
            ) : (
              <>
                <a href="/login" className="md:hidden p-2 rounded-full text-slate-900 hover:bg-slate-100" aria-label="Login">
                  <User size={18} />
                </a>
                <a href="/login" className="hidden md:inline-block rounded-full border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-slate-900 transition hover:border-[#ef233c] hover:text-[#ef233c]">Login</a>
                <a href="/signup" className="hidden md:inline-block rounded-full bg-[#ef233c] px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-red-600">Organization Registration</a>
              </>
            )}
            <button
              type="button"
              onClick={() => setOpen((value) => !value)}
              className="rounded-full p-2 text-slate-900 transition-colors hover:bg-slate-100 md:hidden"
              aria-label="Toggle menu"
            >
              {open ? <X size={24} strokeWidth={2} /> : <Menu size={24} strokeWidth={2} />}
            </button>
          </div>
        </nav>

        <div
          className={`fixed inset-x-0 top-[64px] z-40 border-t border-slate-200 bg-white shadow-xl transition-all duration-300 ease-out md:hidden ${
            open ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-full opacity-0"
          }`}
        >
          <nav className="mx-auto flex w-full max-w-7xl flex-col gap-4 px-4 py-5 text-slate-900 sm:px-6">
            {mainLinks.map((item) => (
              <a key={item.label} href={item.href} className="py-2 text-base font-semibold transition-colors hover:text-[#ef233c]">
                {item.label === "About" ? "About Us" : item.label}
              </a>
            ))}
            <button
              type="button"
              onClick={() => setMobileExploreOpen((value) => !value)}
              className="flex items-center justify-between py-2 text-base font-semibold transition-colors hover:text-[#ef233c]"
            >
              Explore
              <ChevronDown size={20} strokeWidth={2} className={`transition-transform duration-300 ${mobileExploreOpen ? "rotate-180" : ""}`} />
            </button>
            {mobileExploreOpen && (
              <div className="rounded-xl border border-slate-200 bg-white">
                {exploreLinks.map((item) => (
                  <a key={item.label} href={item.href} onClick={() => setOpen(false)} className="block px-4 py-3 text-base font-medium text-slate-900 transition hover:bg-slate-50 hover:text-[#ef233c]">
                    {item.label}
                  </a>
                ))}
              </div>
            )}
            {user ? (
              <div className="flex flex-col gap-3 pt-2">
                <a href={profilePath} onClick={() => setOpen(false)} className="rounded-full border border-slate-300 px-5 py-3 text-center text-sm font-semibold text-slate-900">My Profile</a>
                <button type="button" onClick={handleLogout} className="inline-flex items-center justify-center gap-2 rounded-full border border-red-300 px-5 py-3 text-sm font-semibold text-red-600 hover:bg-red-50">
                  <LogOut size={17} /> Log out
                </button>
              </div>
            ) : (
              <div className="flex flex-col gap-3 pt-2">
                <a href="/login" className="rounded-full border border-slate-300 px-5 py-3 text-center text-sm font-semibold text-slate-900 transition hover:border-[#ef233c] hover:text-[#ef233c]">Login</a>
                <a href="/signup" className="rounded-full bg-[#ef233c] px-5 py-3 text-center text-sm font-semibold text-white transition hover:bg-red-600">Register Organization</a>
              </div>
            )}
          </nav>
        </div>
      </header>
      <div className="h-[64px]" aria-hidden="true" />
    </>
  );
}
