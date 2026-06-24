import AuthLayout from "../../../layouts/AuthLayout";
import { useNavigate } from "react-router-dom";
export default function OtpVerificationPage() {
    const navigate = useNavigate();
  return (
    <AuthLayout>

      <div className="bg-white shadow-xl rounded-3xl p-8 md:p-10 w-full max-w-md">

        <h1 className="text-4xl font-bold">
          Verify OTP
        </h1>

        <p className="text-gray-500 mt-3">
          Enter the 6-digit code sent to your email.
        </p>

        <input
          className="w-full border rounded-2xl px-4 py-4 mt-8 text-center text-xl md:text-2xl tracking-[6px] md:tracking-[10px]"
          placeholder="000000"
        />

       <button
  onClick={() => navigate("/reset-password")}
  className="w-full bg-red-600 text-white py-4 rounded-2xl mt-8 hover:bg-red-700"
>
  Verify Code
</button>

      </div>

    </AuthLayout>
  );
}