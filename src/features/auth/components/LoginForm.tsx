import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../../../api/auth.api";
import useMeRedirect from "../hooks/useMeRedirect";

export default function LoginForm() {
  const navigate = useNavigate();
  const redirectToDashboard = useMeRedirect();

  const [role, setRole] =
useState<"student" | "admin">("student");
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
    localStorage.setItem("user", JSON.stringify(response.user));

    await redirectToDashboard();

  } catch (err: any) {
    setError(err.response?.data?.message || "Invalid email or password");
  } finally {
    setLoading(false);
  }
};

const handleGoogleLogin = () => {
  // Implement Google login logic here
  console.log("Google login clicked");
  window.location.href = "http://localhost:5000/api/auth/google"; // Redirect to your backend endpoint for Google OAuth 
}
  return (
<div className="w-full px-6">
<div className="text-center">
  <h1 className="text-[42px] font-bold text-slate-900">
    Login to Your Account
  </h1>

  <p className="mt-3 text-[18px] text-slate-500">
    Sign in to continue to your account
  </p>
</div>

      {/* Role */}

<div className="grid grid-cols-2 border rounded-2xl overflow-hidden mt-8">
<button
onClick={() => setRole("student")}
className={`h-16 font-semibold transition ${
role==="student"
? "bg-red-50 text-red-600 border-b-2 border-red-600"
: "bg-white text-slate-700"
}`}
>
Student
</button>

<button
onClick={() => setRole("admin")}
className={`h-16 font-semibold transition ${
role==="admin"
? "bg-red-50 text-red-600 border-b-2 border-red-600"
: "bg-white text-slate-700"
}`}
>
Admin
</button>

      </div>

      {/* Google */}

<button
onClick={handleGoogleLogin}
className="
w-full
h-16
border
rounded-2xl
mt-8
font-semibold
hover:bg-gray-50
transition
"
>
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
          className="
w-full
h-16
border
rounded-2xl
px-5
mt-2
outline-none
focus:border-red-500
"
        />

      </div>

      {/* Password */}

      <div className="mt-6">

        <div className="flex justify-between">

          <label className="text-sm text-gray-500">
            Password
          </label>

        </div>

        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter password"
          className="
w-full
h-16
border
rounded-2xl
px-5
mt-2
outline-none
focus:border-red-500
"
        />
        <div className="flex items-center justify-between mt-6">

<div className="flex items-center gap-3">

<input
type="checkbox"
className="w-5 h-5"
/>

<span className="text-slate-500">
Remember me
</span>

</div>

<button
onClick={() => navigate("/forgot-password")}
className="text-red-500 font-medium"
>
Forgot Password?
</button>

</div>

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
        className="
w-full
h-16
mt-8
rounded-2xl
bg-red-600
hover:bg-red-700
text-white
text-lg
font-semibold
transition
"
      >
        {loading ? "Logging In..." : "Login to Dashboard"}
      </button>

      {/* Footer */}

      {/* <div className="mt-8 text-center text-gray-500">

        Don't have an account?

        <button className="text-red-500 ml-2 font-medium">
          Create Account
        </button>

      </div> */}

    </div>
  );
}