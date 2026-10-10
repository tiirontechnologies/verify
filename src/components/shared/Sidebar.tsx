
import { NavLink, useNavigate } from "react-router-dom";
import { LogOut, X } from "lucide-react";
import { sidebarMenus } from "../../constants/sidebarMenus";
import { useSidebar } from "../../context/SidebarContext";
import TiironLogo from "../../assets/Tiiron_Technologies_Logo.png";
import { baseURL } from "../../api/axios";
import axios from "axios";

export default function Sidebar() {
  const navigate = useNavigate();
  const { open, setOpen } = useSidebar();

let role: "student" | "admin" = "student";
try {
  const storedUser = sessionStorage.getItem("user") || localStorage.getItem("user");
  const parsedUser = storedUser ? JSON.parse(storedUser) : {};
  if (parsedUser.role === "admin" || parsedUser.roleId === "admin") role = "admin";
} catch { /* use the student menu when there is no readable session */ }

  const menus = sidebarMenus[role];

  // const handleLogout = () => {
  //   localStorage.removeItem("token");
  //   localStorage.removeItem("role");
  //   navigate("/login");
  // };
  const handleLogout = async () => {
  try {
    await axios.post(
      `${baseURL}/api/auth/logout`,
      {},
      {
        withCredentials: true,
      }
    );
  } catch (err) {
    console.error(err);
  } finally {
    sessionStorage.clear();
    localStorage.clear();

    navigate("/login", { replace: true });
  }
};

  return (
    <>
      {/* Mobile Overlay */}
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm md:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed  top-0 left-0 z-50
          h-screen w-72
          bg-white border-r border-gray-200
          shadow-xl md:shadow-none
          transition-all duration-300 ease-in-out
          ${open ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0
          flex flex-col
        `}
      >
        {/* ================= HEADER ================= */}

        <div className="relative px-6 pt-8 pb-6 border-b border-gray-100">
          {/* Close Button */}
          <button
            onClick={() => setOpen(false)}
            className="absolute right-5 top-5 md:hidden rounded-lg p-2 hover:bg-gray-100 transition"
          >
            <X size={22} />
          </button>

          {/* Logo */}
          <div className="flex justify-center">
            <img
              src={TiironLogo}
              alt="Tiiron Technologies"
              className="h-16 w-auto object-contain"
            />
          </div>

          {/* Role Badge */}
          <div className="mt-6 flex justify-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-red-100 bg-gradient-to-r from-red-50 via-white to-red-50 px-5 py-2 shadow-sm">
              <span className="h-2.5 w-2.5 rounded-full bg-red-600 animate-pulse"></span>

              <span className="text-sm font-semibold tracking-wide text-gray-700 capitalize">
                {role} Dashboard
              </span>
            </div>
          </div>
        </div>

        {/* ================= MENU ================= */}

        <nav className="flex-1 px-4 py-8 overflow-y-auto">
          <div className="space-y-2">
            {menus.map((menu) => {
              const Icon = menu.icon;

              return (
                <NavLink
                  key={menu.path}
                  to={menu.path}
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    `group relative flex items-center gap-4 rounded-2xl px-5 py-4 transition-all duration-200 ${
                      isActive
                        ? "bg-red-50 text-red-600 shadow-sm"
                        : "text-gray-700 hover:bg-gray-50 hover:text-red-600"
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      {isActive && (
                        <span className="absolute left-0 top-3 bottom-3 w-1 rounded-r-full bg-red-600"></span>
                      )}

                      <Icon
                        size={20}
                        className={`transition-transform duration-200 ${
                          isActive
                            ? "scale-110"
                            : "group-hover:scale-110"
                        }`}
                      />

                      <span className="font-medium">{menu.label}</span>
                    </>
                  )}
                </NavLink>
              );
            })}
          </div>
        </nav>

        {/* ================= FOOTER ================= */}

        <div className="border-t border-gray-100 p-5">
          <button
            onClick={handleLogout}
            className="group flex w-full items-center justify-center gap-3 rounded-2xl border border-red-600 text-red-600 px-5 py-3 hover:text-white font-medium shadow-lg shadow-red-600/20 transition-all duration-300 hover:-translate-y-0.5 hover:bg-red-600 hover:shadow-red-600/30"
          >
            <LogOut
              size={20}
              className="transition-transform duration-300 group-hover:-rotate-12"
            />

            Logout
          </button>
        </div>
      </aside>
    </>
  );
}
