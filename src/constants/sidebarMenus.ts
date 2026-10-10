import {
  LayoutDashboard,
  History,
  User,
  Settings,
  UploadCloud,
  Users,
  FileBadge,
  UserCog,
  Megaphone,
  Server,
  Award,
  Ticket,
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
    icon: Award,
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

admin: [
    {
      label: "Dashboard",
      path: "/organization/dashboard",
      icon: LayoutDashboard,
    },
    {
      label: "Certificate Templates",
      path: "/organization/templates",
      icon: FileBadge,
    },
    {
      label: "Student Data Upload",
      path: "/organization/student-upload",
      icon: UploadCloud,
    },
    {
      label: "Update Student Data",
      path: "/organization/update-student",
      icon: Users,
    },
    {
      label: "Profile Management",
      path: "/organization/profile",
      icon: UserCog,
    },
    {
      label: "Advertisements",
      path: "/organization/ads",
      icon: Megaphone,
    },
    {
      label: "Self Hosted Platforms",
      path: "/organization/self-hosted",
      icon: Server,
    },
    {
      label: "Support Tickets",
      path: "/tickets",
      icon: Ticket,
    },
  ],
};
