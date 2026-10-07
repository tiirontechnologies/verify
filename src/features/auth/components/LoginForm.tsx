import { useState, useEffect } from "react";
import type { FormEvent } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { login } from "../../../api/auth.api";
import useMeRedirect from "../hooks/useMeRedirect";
import { baseURL } from "../../../api/axios";

export default function LoginForm() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const redirectToDashboard = useMeRedirect();

  useEffect(() => {
    redirectToDashboard();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [role, setRole] = useState<"student" | "admin">("student");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!loading) void handleLogin();
  };

  const handleLogin = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await login(email, password, role);

      if (!response.success) {
        throw new Error("Login failed");
      }

      const loggedInRole = response.user.role;
      const requestedRedirect = searchParams.get("redirect");
      const redirectPath = requestedRedirect?.startsWith("/") && !requestedRedirect.startsWith("//")
        ? requestedRedirect
        : null;

      // Prevent logging in from the wrong tab
      if (role === "student" && loggedInRole !== "student") {
        setError("Invalid Credentials.");
        return;
      }

      if (role === "admin" && loggedInRole !== "admin") {
        setError("Invalid Credentials");
        return;
      }

      // Store only user details
      sessionStorage.setItem("user", JSON.stringify(response.user));

      if (redirectPath) {
        navigate(redirectPath, { replace: true });
        return;
      }

      if (loggedInRole === "student") {
        navigate("/student/dashboard", { replace: true });
        return;
      }

      if (loggedInRole === "admin") {
        navigate("/organization/dashboard", { replace: true });
        return;
      }
    } catch (err: any) {
      setError(
        err.response?.data?.message || err.message || "Invalid email or password"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    window.location.href = `${baseURL}/api/auth/google`;
  };

  return (
    <div className="w-full">
      <div className="text-center">
        <h1 className="text-xl sm:text-2xl font-bold text-slate-900">
          {role === "student" ? "Student Login" : "Organization Login"}
        </h1>

        <p className="mt-1.5 text-xs sm:text-sm text-slate-500">
          {role === "student"
            ? "Sign in using your student credentials."
            : "Sign in using your organization administrator account."}
        </p>
      </div>

      {/* Role */}
      <div className="grid grid-cols-2 border rounded-xl overflow-hidden mt-5">
        <button
          onClick={() => setRole("student")}
          className={`h-9 sm:h-10 text-sm font-semibold transition ${
            role === "student"
              ? "bg-red-50 text-red-600 border-b-2 border-red-600"
              : "bg-white text-slate-700"
          }`}
        >
          User
        </button>

        <button
          onClick={() => setRole("admin")}
          className={`h-9 sm:h-10 text-sm font-semibold transition ${
            role === "admin"
              ? "bg-red-50 text-red-600 border-b-2 border-red-600"
              : "bg-white text-slate-700"
          }`}
        >
          Organization
        </button>
      </div>

      {/* Google */}
      <button
        onClick={handleGoogleLogin}
        className="w-full h-9 sm:h-10 text-sm border rounded-xl mt-4 font-semibold hover:bg-gray-50 transition"
      >
        Continue with Google
      </button>

      {/* Divider */}
      <div className="flex items-center gap-3 my-4">
        <div className="flex-1 h-[1px] bg-gray-200"></div>
        <span className="text-xs text-gray-400">OR</span>
        <div className="flex-1 h-[1px] bg-gray-200"></div>
      </div>

      <form onSubmit={handleSubmit}>
      {/* Email */}
      <div>
        <label className="text-xs text-gray-500">Email</label>
        <input
          type="email"
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter email"
          className="w-full h-9 sm:h-10 text-sm border rounded-xl px-3.5 mt-1.5 outline-none focus:border-red-500"
        />
      </div>

      {/* Password */}
      <div className="mt-3.5">
        <div className="flex justify-between">
          <label className="text-xs text-gray-500">Password</label>
        </div>

        <div className="relative mt-1.5">
          <input
            type={showPassword ? "text" : "password"}
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
            className="w-full h-9 sm:h-10 text-sm border rounded-xl px-3.5 pr-11 outline-none focus:border-red-500"
          />
          <button
            type="button"
            onClick={() => setShowPassword((visible) => !visible)}
            aria-label={showPassword ? "Hide password" : "Show password"}
            title={showPassword ? "Hide password" : "Show password"}
            className="absolute inset-y-0 right-0 flex items-center px-3 text-slate-400 hover:text-slate-700"
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mt-3.5">
          <div className="flex items-center gap-2">
            <input type="checkbox" className="w-4 h-4" />
            <span className="text-slate-500 text-sm">Remember me</span>
          </div>

          <button
            type="button"
            onClick={() => navigate("/forgot-password")}
            className="text-red-500 font-medium text-sm text-left sm:text-right"
          >
            Forgot Password?
          </button>
        </div>
      </div>

      {/* Error */}
      {error && <p className="text-red-500 text-xs mt-3">{error}</p>}

      {/* Login */}
      <button
        type="submit"
        disabled={loading}
        className="w-full h-9 sm:h-10 mt-5 text-sm rounded-xl bg-red-600 hover:bg-red-700 text-white font-semibold transition disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {loading ? "Logging In..." : "Login to Dashboard"}
      </button>
      </form>

      {/* Footer */}
      {role === "admin" && (
        <div className="mt-5 text-center text-sm">
          <span className="text-slate-500">Don't have an organization account?</span>
          <button
            type="button"
            onClick={() => navigate("/signup")}
            className="ml-2 font-semibold text-red-600 hover:text-red-700"
          >
            Sign Up
          </button>
        </div>
      )}
    </div>
  );
}
