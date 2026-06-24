import AuthLayout from "../../../layouts/AuthLayout";
import { useNavigate } from "react-router-dom";

export default function ResetPasswordPage() {
    const navigate = useNavigate();
  return (
    <AuthLayout>

      <div className="bg-white shadow-xl rounded-3xl p-8 md:p-10 w-full max-w-md">

        <h1 className="text-4xl font-bold">
          Reset Password
        </h1>

        <p className="text-gray-500 mt-3">
          Create a new password for your account.
        </p>

        <div className="mt-8">

          <label className="text-sm text-gray-500">
            New Password
          </label>

          <input
            type="password"
            className="w-full border rounded-2xl px-5 py-4 mt-2"
          />

        </div>

        <div className="mt-6">

          <label className="text-sm text-gray-500">
            Confirm Password
          </label>

          <input
            type="password"
            className="w-full border rounded-2xl px-5 py-4 mt-2"
          />

        </div>

       <button
  onClick={() => navigate("/password-reset-success")}
  className="w-full bg-red-600 text-white py-4 rounded-2xl mt-8 hover:bg-red-700"
>
  Reset Password
</button>

      </div>

    </AuthLayout>
  );
}