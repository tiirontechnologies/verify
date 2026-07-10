import {
  LayoutDashboard,
  History,
  User,
  Settings,
  Users,
  FileText,
  FileBadge2,
} from "lucide-react";

export const sidebarMenus = {
  student: [
    {
      label: "Dashboard",
      path: "/student/dashboard",
      icon: LayoutDashboard,
    },
    {
      label: "Profile",
      path: "/student/profile",
      icon: User,
    },
    {
    label: "My Certificate",
    path: "/student/my-certificate",
    icon: FileBadge2,
},
    // {
    //   label: "My Credentials",
    //   path: "/student/credentials",
    //   icon: BadgeCheck,
    // },
    {
      label: "Verification History",
      path: "/student/history",
      icon: History,
    },
    {
      label: "Settings",
      path: "/student/settings",
      icon: Settings,
    },
  ],

  organization: [
    {
      label: "Dashboard",
      path: "/organization/dashboard",
      icon: LayoutDashboard,
    },
    {
      label: "Students",
      path: "/organization/students",
      icon: Users,
    },
    {
      label: "Credentials",
      path: "/organization/credentials",
      icon: FileText,
    },
    {
      label: "Settings",
      path: "/organization/settings",
      icon: Settings,
    },
  ],
};