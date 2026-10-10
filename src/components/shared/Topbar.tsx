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
  Loader2,
} from "lucide-react";
import { useSidebar } from "../../context/SidebarContext";
import { useNavigate } from "react-router-dom";

import { baseURL } from "../../api/axios";
import { updateProfilePicture } from "../../api/studentProfile.api";
import { getCurrentUser } from "../../api/auth.api";
import {
  getNotifications,
  markNotificationRead,
  openNotificationStream,
  type NotificationRecord,
} from "../../api/notifications.api";

import axios from "axios";

function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) return { text: "Good Morning", Icon: Sunrise, color: "text-orange-500", bg: "bg-orange-50" };
  if (hour < 17) return { text: "Good Afternoon", Icon: Sun, color: "text-amber-500", bg: "bg-amber-50" };
  return { text: "Good Evening", Icon: Sunset, color: "text-indigo-500", bg: "bg-indigo-50" };
}

const readUser = () => {
  try {
    return JSON.parse(
      sessionStorage.getItem("user") || localStorage.getItem("user") || "{}",
    );
  } catch {
    return {};
  }
};

// Relative path ho to baseURL laga do, full URL ho to waise hi use karo
const resolveImageUrl = (src?: string) => {
  if (!src) return "";
  if (/^(https?:|data:|blob:)/i.test(src)) return src;
  return `${baseURL}${src.startsWith("/") ? "" : "/"}${src}`;
};

const MAX_IMAGE_SIZE = 2 * 1024 * 1024; // 2MB

export default function Topbar() {
  const { setOpen } = useSidebar();
  const [profileOpen, setProfileOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);
  const notificationsRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [user, setUser] = useState<any>(readUser());
  const [subscription, setSubscription] = useState<{
    planName?: string;
    amount?: number;
    currency?: string;
    status?: string;
    durationDays?: number;
    daysRemaining?: number;
    active?: boolean;
    startDate?: string;
    endDate?: string;
  } | null>(null);
  const [notifications, setNotifications] = useState<NotificationRecord[]>([]);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  const navigate = useNavigate();

  const firstLetter =
    user?.name?.charAt(0)?.toUpperCase() ||
    user?.email?.charAt(0)?.toUpperCase() ||
    "?";

  const firstName = user?.name?.split(" ")[0] || "there";
  const { text: greetingText, Icon: GreetingIcon, color, bg } = getGreeting();

  const isAdmin = user?.role === "admin" || user?.roleId === "admin";

  const profileImage = resolveImageUrl(user?.profileImage || user?.profilePicture);

  useEffect(() => {
    if (!isAdmin) {
      setSubscription(null);
      return;
    }

    let active = true;
    getCurrentUser().then((response) => {
      if (!active) return;
      const currentUser =
        response?.user?.user || response?.user || response?.data?.user || response?.data || response;
      const details = currentUser?.subscription || response?.subscription;
      if (!details) {
        setSubscription(null);
        return;
      }
      const plan = details.plan;
      setSubscription({
        planName: typeof plan === "string" ? plan : plan?.name || plan?.planName,
        amount: Number.isFinite(Number(details.amount)) ? Number(details.amount) : undefined,
        currency: details.currency,
        status: details.active === false ? "expired" : details.status || "active",
        durationDays: Number.isFinite(Number(details.durationDays))
          ? Number(details.durationDays)
          : undefined,
        daysRemaining: Number.isFinite(Number(details.daysRemaining))
          ? Number(details.daysRemaining)
          : undefined,
        active: details.active,
        startDate: details.startDate,
        endDate: details.endDate,
      });
      setUser((previous: any) => ({ ...previous, ...currentUser }));
    }).catch((error) => {
      console.error("Failed to load subscription details:", error);
      if (active) setSubscription(null);
    });

    return () => {
      active = false;
    };
  }, [isAdmin]);

  useEffect(() => {
    if (!user?.role) return;

    let active = true;
    const normalizeList = (payload: any): NotificationRecord[] => {
      const result = payload?.notifications ?? payload?.data?.notifications ?? payload?.data ?? payload;
      return Array.isArray(result) ? result : [];
    };
    const receiveNotification = (event: Event) => {
      const raw = (event as MessageEvent).data;
      if (!raw) return;
      try {
        const parsed = JSON.parse(raw);
        const notification = parsed?.notification || parsed?.data || parsed;
        setNotifications((items) => {
          const id = notification?._id || notification?.id || notification?.notificationId;
          if (id && items.some((item) => (item._id || item.id || item.notificationId) === id)) {
            return items;
          }
          return [notification, ...items].slice(0, 50);
        });
      } catch (error) {
        console.error("Invalid notification event:", error);
      }
    };

    getNotifications()
      .then((payload) => {
        if (active) setNotifications(normalizeList(payload));
      })
      .catch((error) => console.error("Failed to load notifications:", error));

    const stream = openNotificationStream();
    stream.addEventListener("message", receiveNotification);
    stream.addEventListener("notification", receiveNotification);

    return () => {
      active = false;
      stream.removeEventListener("message", receiveNotification);
      stream.removeEventListener("notification", receiveNotification);
      stream.close();
    };
  }, [user?.role]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) {
        setProfileOpen(false);
      }
      if (notificationsRef.current && !notificationsRef.current.contains(e.target as Node)) {
        setNotificationsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Navigate karo aur dropdown band kar do
  const goTo = (path: string) => {
    setProfileOpen(false);
    setNotificationsOpen(false);
    navigate(path);
  };

  const handleNotificationClick = async (notification: NotificationRecord) => {
    const id = notification._id || notification.id || notification.notificationId;
    if (id && !notification.read) {
      try {
        await markNotificationRead(id);
        setNotifications((items) =>
          items.map((item) =>
            (item._id || item.id || item.notificationId) === id
              ? { ...item, read: true, readAt: new Date().toISOString() }
              : item,
          ),
        );
      } catch (error) {
        console.error("Failed to mark notification as read:", error);
      }
    }
    const target = (notification as any).url || (notification as any).link;
    if (target) {
      setNotificationsOpen(false);
      if (target.startsWith("/")) navigate(target);
      else window.location.assign(target);
    }
  };

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

  // Camera button -> file picker
  const handlePickImage = () => {
    if (uploading) return;
    fileInputRef.current?.click();
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = ""; // same file dobara select ho sake
    if (!file) return;

    setUploadError(null);

    if (!file.type.startsWith("image/")) {
      setUploadError("Please select an image file.");
      return;
    }
    if (file.size > MAX_IMAGE_SIZE) {
      setUploadError("Image size must be under 2MB.");
      return;
    }

    setUploading(true);
    try {
      const res: any = await updateProfilePicture(file);

      // Backend response ke alag alag shape handle kiye hain, apne hisaab se adjust kar lena
      const newImage =
        res?.data?.profileImage ||
        res?.data?.profilePicture ||
        res?.data?.profile?.profileImage ||
        res?.profileImage ||
        res?.profilePicture ||
        "";

      const updatedUser = {
        ...readUser(),
        profileImage: newImage || URL.createObjectURL(file),
      };
      localStorage.setItem("user", JSON.stringify(updatedUser));
      setUser(updatedUser);
    } catch (err: any) {
      console.error(err);
      setUploadError(
        err?.response?.data?.message || "Failed to update profile picture."
      );
    } finally {
      setUploading(false);
    }
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
        <div className="relative" ref={notificationsRef}>
          <button
            type="button"
            onClick={() => setNotificationsOpen((value) => !value)}
            aria-label={`Notifications${notifications.filter((item) => !item.read).length ? `, ${notifications.filter((item) => !item.read).length} unread` : ""}`}
            aria-expanded={notificationsOpen}
            className="relative flex h-11 w-11 items-center justify-center rounded-2xl bg-gray-100 transition hover:bg-gray-200"
          >
            <Bell size={19} className="text-slate-600" />
            {notifications.some((item) => !item.read) && (
              <span className="absolute right-2.5 top-2.5 h-2 w-2 rounded-full bg-red-500 ring-2 ring-white" />
            )}
          </button>
          {notificationsOpen && (
            <div className="absolute right-0 top-14 z-50 w-[min(24rem,calc(100vw-2rem))] overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl">
              <div className="flex items-center justify-between border-b border-slate-100 px-4 py-3">
                <h2 className="text-sm font-bold text-slate-900">Notifications</h2>
                <span className="text-xs text-slate-500">
                  {notifications.filter((item) => !item.read).length} unread
                </span>
              </div>
              <div className="max-h-96 overflow-y-auto">
                {notifications.length === 0 ? (
                  <p className="px-4 py-8 text-center text-sm text-slate-500">You’re all caught up.</p>
                ) : (
                  notifications.map((notification, index) => {
                    const key = notification._id || notification.id || notification.notificationId || index;
                    return (
                      <button
                        key={key}
                        type="button"
                        onClick={() => void handleNotificationClick(notification)}
                        className={`block w-full border-b border-slate-100 px-4 py-3 text-left transition hover:bg-slate-50 ${notification.read ? "" : "bg-red-50/50"}`}
                      >
                        <span className="flex items-start gap-2">
                          {!notification.read && <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-red-500" />}
                          <span className="min-w-0 flex-1">
                            <span className="block text-sm font-semibold text-slate-800">
                              {notification.title || notification.type || "Update"}
                            </span>
                            <span className="mt-0.5 block break-words text-xs leading-5 text-slate-600">
                              {notification.message || notification.body || "You have a new notification."}
                            </span>
                            {notification.createdAt && (
                              <span className="mt-1 block text-[10px] text-slate-400">
                                {new Date(notification.createdAt).toLocaleString()}
                              </span>
                            )}
                          </span>
                        </span>
                      </button>
                    );
                  })
                )}
              </div>
            </div>
          )}
        </div>

        {/* Profile Avatar + Dropdown */}
        <div className="relative" ref={profileRef}>
          <button
            onClick={() => setProfileOpen((v) => !v)}
            className="w-11 h-11 rounded-full bg-gradient-to-br from-red-500 to-rose-600 text-white flex items-center justify-center font-semibold text-base uppercase transition hover:brightness-110 ring-2 ring-offset-2 ring-red-100 overflow-hidden"
            title={user?.name || user?.email || "Profile"}
          >
            {profileImage ? (
              <img
                src={profileImage}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            ) : firstLetter !== "?" ? (
              firstLetter
            ) : (
              <User size={18} />
            )}
          </button>

          {profileOpen && (
            <div className="absolute right-0 top-14 w-80 rounded-3xl bg-white shadow-2xl shadow-slate-900/10 border border-slate-100 overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-200">
              {/* Gradient banner + overlapping avatar */}
              <div className="relative h-16 bg-gradient-to-r from-red-500 via-rose-500 to-orange-400">
                <div className="absolute -bottom-7 left-5">
                  <div className="relative">
                    <div className="w-16 h-16 rounded-2xl bg-white p-1 shadow-lg">
                      <div className="relative w-full h-full rounded-xl bg-gradient-to-br from-red-500 to-rose-600 text-white flex items-center justify-center font-semibold text-xl uppercase overflow-hidden">
                        {profileImage ? (
                          <img
                            src={profileImage}
                            alt="Profile"
                            className="w-full h-full object-cover"
                          />
                        ) : firstLetter !== "?" ? (
                          firstLetter
                        ) : (
                          <User size={22} />
                        )}

                        {uploading && (
                          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                            <Loader2 size={20} className="animate-spin text-white" />
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Hidden file input */}
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleImageChange}
                    />

                    <button
                      onClick={handlePickImage}
                      disabled={uploading}
                      title="Change profile photo"
                      className="absolute -bottom-1.5 -right-1.5 w-6 h-6 rounded-full bg-slate-900 text-white shadow-md flex items-center justify-center hover:bg-slate-700 transition disabled:opacity-60 disabled:cursor-not-allowed"
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
                {uploadError && (
                  <p className="mt-1.5 text-[11px] font-medium text-red-600">
                    {uploadError}
                  </p>
                )}
              </div>

              {/* Active plan — admin only */}
              {isAdmin && subscription && (
                <div className="mx-4 mb-3 flex items-center justify-between rounded-2xl bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-100 px-3.5 py-2.5">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-amber-100 flex items-center justify-center">
                      <Crown size={13} className="text-amber-600" />
                    </div>
                    <div>
                      <p className="text-[11px] text-slate-400 leading-none mb-0.5">Subscription</p>
                      <p className="text-xs font-semibold text-slate-800 leading-none">
                        {subscription.planName || subscription.status || "Current plan"}
                      </p>
                      {subscription.status && subscription.planName && (
                        <p className="mt-1 text-[10px] capitalize text-slate-500">{subscription.status}</p>
                      )}
                      {subscription.amount !== undefined && (
                        <p className="mt-1 text-[10px] text-slate-600">
                          {subscription.currency || "INR"} {subscription.amount.toLocaleString()}
                        </p>
                      )}
                      {subscription.daysRemaining !== undefined && (
                        <p className="mt-1 text-[10px] text-slate-500">
                          {subscription.daysRemaining} day{subscription.daysRemaining === 1 ? "" : "s"} remaining
                        </p>
                      )}
                      {subscription.endDate && (
                        <p className="mt-1 text-[10px] text-slate-500">
                          Until {new Date(subscription.endDate).toLocaleDateString()}
                        </p>
                      )}
                    </div>
                  </div>
                  <button
                    onClick={() => goTo("/subscription")}
                    className="text-[11px] font-semibold text-rose-600 hover:text-rose-700 transition"
                  >
                    Manage
                  </button>
                </div>
              )}

              <div className="h-px bg-slate-100 mx-4" />

              {/* Menu items */}
              <div className="p-2.5 space-y-0.5">
                <button
                  onClick={() =>
                    goTo(isAdmin ? "/organization/profile" : "/student/settings")
                  }
                  className="w-full flex items-center gap-3 px-2.5 py-2.5 rounded-2xl text-sm text-slate-700 hover:bg-slate-50 transition group"
                >
                  <div className="w-8 h-8 rounded-xl bg-slate-100 group-hover:bg-slate-200 flex items-center justify-center transition shrink-0">
                    <Settings size={15} className="text-slate-500" />
                  </div>
                  Account Settings
                </button>

                {isAdmin ? (
                  <button
                    onClick={() => goTo("/organization/self-hosted")}
                    className="w-full flex items-center gap-3 px-2.5 py-2.5 rounded-2xl text-sm text-slate-700 hover:bg-slate-50 transition group"
                  >
                    <div className="w-8 h-8 rounded-xl bg-slate-100 group-hover:bg-slate-200 flex items-center justify-center transition shrink-0">
                      <ShieldCheck size={15} className="text-slate-500" />
                    </div>
                    Self Hosted Settings
                  </button>
                ) : <>
                    <button
                      onClick={() => goTo("/verification")}
                      className="w-full flex items-center gap-3 px-2.5 py-2.5 rounded-2xl text-sm text-slate-700 hover:bg-slate-50 transition group"
                    >
                      <div className="w-8 h-8 rounded-xl bg-slate-100 group-hover:bg-slate-200 flex items-center justify-center transition shrink-0">
                        <History size={15} className="text-slate-500" />
                      </div>
                      Verification History
                    </button>
                </>}
                <button
                  onClick={() => goTo("/tickets")}
                  className="w-full flex items-center gap-3 px-2.5 py-2.5 rounded-2xl text-sm text-slate-700 hover:bg-slate-50 transition group"
                >
                  <div className="w-8 h-8 rounded-xl bg-slate-100 group-hover:bg-slate-200 flex items-center justify-center transition shrink-0">
                    <LifeBuoy size={15} className="text-slate-500" />
                  </div>
                  Help & Support
                </button>
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
