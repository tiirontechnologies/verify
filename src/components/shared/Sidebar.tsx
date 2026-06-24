import { NavLink, useNavigate } from "react-router-dom";
import { LogOut, X } from "lucide-react";
import { sidebarMenus } from "../../constants/sidebarMenus";
import { useSidebar } from "../../context/SidebarContext";

export default function Sidebar() {
  const navigate = useNavigate();
  const { open, setOpen } = useSidebar();

  const role =
    (localStorage.getItem("role") as "student" | "organization") ||
    "student";

  const menus = sidebarMenus[role];

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/login");
  };

  return (
    <>
      {/* Overlay */}

      {open && (
        <div
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Sidebar */}

      <aside
        className={`
          fixed md:static top-0 z-50
          w-72 bg-white border-r min-h-screen p-8 flex flex-col
          transition-all duration-300
          ${open ? "left-0" : "-left-full"}
          md:left-0
        `}
      >
        {/* Header */}

        <div className="flex items-center justify-between">

          <div>

            <h1 className="text-3xl font-bold text-red-600">
              Tiiron
            </h1>

            <p className="text-sm text-gray-500 mt-2 capitalize">
              {role} Portal
            </p>

          </div>

          {/* Mobile Close Button */}

          <button
            className="md:hidden"
            onClick={() => setOpen(false)}
          >
            <X />
          </button>

        </div>

        {/* Menu */}

        <div className="mt-14 space-y-3">

          {menus.map((menu) => {
            const Icon = menu.icon;

            return (
              <NavLink
                key={menu.path}
                to={menu.path}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-4 px-5 py-4 rounded-2xl transition ${
                    isActive
                      ? "bg-red-50 text-red-600 font-semibold"
                      : "text-gray-700 hover:bg-gray-100"
                  }`
                }
              >
                <Icon size={20} />
                {menu.label}
              </NavLink>
            );
          })}

        </div>

        {/* Logout */}

        <div className="mt-auto">

          <button
            onClick={handleLogout}
            className="flex items-center gap-4 text-red-600 hover:text-red-700"
          >
            <LogOut size={20} />

            Logout
          </button>

        </div>

      </aside>
    </>
  );
}