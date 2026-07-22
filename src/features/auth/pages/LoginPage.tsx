// import AuthLayout from "../../../layouts/AuthLayout";
// import LoginForm from "../components/LoginForm";

// export default function LoginPage() {
//   return (
//     <AuthLayout>
//       <LoginForm />
//     </AuthLayout>
//   );
// }

import AuthLayout from "../../../layouts/AuthLayout";
import LoginForm from "../components/LoginForm";
import Navbar from "../../landing/components/Navbar";
import Footer from "../../../components/shared/Footer";

export default function LoginPage() {
  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-slate-50 ">
        <AuthLayout>
          <LoginForm />
        </AuthLayout>
      </main>

      <Footer />
    </>
  );
}