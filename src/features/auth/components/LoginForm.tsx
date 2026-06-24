import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../services/authService";

export default function LoginForm() {
  const navigate = useNavigate();

  const [role, setRole] = useState<"student" | "organization">("student");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await login(email, password);

      localStorage.setItem("token", response.token);
      localStorage.setItem("role", response.role);

      if (response.role === "student") {
        navigate("/student/dashboard");
      }

      if (response.role === "organization") {
        navigate("/organization/dashboard");
      }
    } catch (err) {
      setError("Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
<div className="bg-white shadow-xl rounded-3xl p-6 sm:p-8 lg:p-10 w-full max-w-md">
<h1 className="text-3xl sm:text-4xl font-bold text-slate-800">
            Welcome Back
      </h1>

      <p className="text-gray-500 mt-3">
        Sign in to continue
      </p>

      {/* Role */}

<div className="grid grid-cols-2 bg-gray-100 rounded-2xl p-1 mt-6 sm:mt-8">
        <button
          onClick={() => setRole("student")}
          className={`py-3 rounded-xl transition ${
            role === "student"
              ? "bg-white shadow font-semibold"
              : ""
          }`}
        >
          Student
        </button>

        <button
          onClick={() => setRole("organization")}
          className={`py-3 rounded-xl transition ${
            role === "organization"
              ? "bg-white shadow font-semibold"
              : ""
          }`}
        >
          Organization
        </button>

      </div>

      {/* Google */}

      <button className="w-full border rounded-2xl py-3 sm:py-4 mt-6 sm:mt-8 hover:bg-gray-50 transition">
        Continue with Google
      </button>

      {/* Divider */}

      <div className="flex items-center gap-4 my-8">

        <div className="flex-1 h-[1px] bg-gray-200"></div>

        <span className="text-sm text-gray-400">
          OR
        </span>

        <div className="flex-1 h-[1px] bg-gray-200"></div>

      </div>

      {/* Email */}

      <div>

        <label className="text-sm text-gray-500">
          Email
        </label>

        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter email"
          className="w-full border rounded-2xl px-4 sm:px-5 py-3 sm:py-4 mt-2 outline-none focus:border-red-400"
        />

      </div>

      {/* Password */}

      <div className="mt-6">

        <div className="flex justify-between">

          <label className="text-sm text-gray-500">
            Password
          </label>

          <button
  onClick={() => navigate("/forgot-password")}
  className="text-red-500 text-sm"
>
  Forgot Password?
</button>

        </div>

        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter password"
          className="w-full border rounded-2xl px-4 sm:px-5 py-3 sm:py-4 mt-2 outline-none focus:border-red-400"
        />

      </div>

      {/* Error */}

      {error && (
        <p className="text-red-500 text-sm mt-5">
          {error}
        </p>
      )}

      {/* Login */}

      <button
        onClick={handleLogin}
        disabled={loading}
        className="w-full bg-red-500 hover:bg-red-600 text-white rounded-2xl py-3 sm:py-4 mt-6 sm:mt-8 transition"
      >
        {loading ? "Logging In..." : "Login to Dashboard"}
      </button>

      {/* Footer */}

      <div className="mt-8 text-center text-gray-500">

        Don't have an account?

        <button className="text-red-500 ml-2 font-medium">
          Create Account
        </button>

      </div>

    </div>
  );
}