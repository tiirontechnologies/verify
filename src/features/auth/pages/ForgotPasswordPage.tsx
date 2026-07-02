import AuthLayout from "../../../layouts/AuthLayout";
import { useNavigate } from "react-router-dom";

export default function ForgotPasswordPage()

{
const navigate = useNavigate();
  return (
    <AuthLayout>

<div className="bg-white shadow-xl rounded-3xl p-6 sm:p-8 md:p-10 w-full max-w-md">
        <h1 className="text-3xl md:text-4xl font-bold">
          Forgot Password
        </h1>

        <p className="text-gray-500 mt-3 leading-7">
          Enter your registered email address and we'll send you a verification code.
        </p>

        <div className="mt-8">

          <label className="text-sm text-gray-500">
            Email Address
          </label>

          <input
            type="email"
            placeholder="Enter email"
            className="w-full border rounded-2xl px-4 md:px-5 py-3 md:py-4 mt-2 outline-none focus:border-red-400 cursor-pointer"
          />

        </div>

       <button
  onClick={() => navigate("/verify-otp")}
  className="w-full bg-red-600 text-white py-3 md:py-4 rounded-2xl mt-8 hover:bg-red-700 transition cursor-pointer"
>
  Send Verification Code
</button>

      </div>

    </AuthLayout>
  );
}