import AuthLayout from "../../../layouts/AuthLayout";
import { CircleCheckBig } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function PasswordResetSuccessPage() {
    const navigate = useNavigate();
  return (
    <AuthLayout>

      <div className="bg-white shadow-xl rounded-3xl p-10 w-full max-w-md text-center">

        <CircleCheckBig
          className="mx-auto text-green-500"
          size={80}
        />

        <h1 className="text-4xl font-bold mt-8">
          Password Updated
        </h1>

        <p className="text-gray-500 mt-4 leading-7">
          Your password has been reset successfully.
        </p>

      <button
  onClick={() => navigate("/login")}
  className="w-full bg-red-600 text-white py-4 rounded-2xl mt-8"
>
  Back To Login
</button>

      </div>

    </AuthLayout>
  );
}