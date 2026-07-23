import AuthLayout from "../../../layouts/AuthLayout";
import LoginForm from "../components/LoginForm";
import Navbar from "../../landing/components/Navbar";
import Footer from "../../../components/shared/Footer";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar />

      <main className="flex-1 flex items-center justify-center py-6">
        <AuthLayout>
          <LoginForm />
        </AuthLayout>
      </main>

      <Footer />
    </div>
  );
}