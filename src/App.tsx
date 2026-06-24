import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./features/landing/pages/LandingPage";
import VerificationPage from "./features/verification/pages/VerificationPage";
import LoginPage from "./features/auth/pages/LoginPage";
import VerificationFailedPage from "./features/verification/pages/VerificationFailedPage";
import StudentDashboard from "./features/student/pages/StudentDashboard";
import OrganizationDashboard from "./features/organization/pages/OrganizationDashboard";
import ProtectedRoute from "./routes/ProtectedRoute";
import MyCredentials from "./features/student/pages/MyCredentials";
import VerificationHistory from "./features/student/pages/VerificationHistory";
import ProfilePage from "./features/student/pages/ProfilePage";
import SettingsPage from "./features/student/pages/SettingsPage";
import ForgotPasswordPage from "./features/auth/pages/ForgotPasswordPage";
import OtpVerificationPage from "./features/auth/pages/OtpVerificationPage";
import ResetPasswordPage from "./features/auth/pages/ResetPasswordPage";
import PasswordResetSuccessPage from "./features/auth/pages/PasswordResetSuccessPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route
          path="/"
          element={<LandingPage />}
        />

        <Route
          path="/verification/:id"
          element={<VerificationPage />}
        />
        <Route
  path="/verification-failed"
  element={<VerificationFailedPage />}
/>

        <Route
          path="/login"
          element={<LoginPage />}
        />
        <Route
  path="/forgot-password"
  element={<ForgotPasswordPage />}
/>

<Route
  path="/verify-otp"
  element={<OtpVerificationPage />}
/>

<Route
  path="/reset-password"
  element={<ResetPasswordPage />}
/>

<Route
  path="/password-reset-success"
  element={<PasswordResetSuccessPage />}
/>
        <Route
  path="/student/dashboard"
  element={
    <ProtectedRoute>
      <StudentDashboard />
    </ProtectedRoute>
  }
/>

<Route
  path="/student/credentials"
  element={
    <ProtectedRoute>
      <MyCredentials />
    </ProtectedRoute>
  }
/>

<Route
  path="/student/history"
  element={
    <ProtectedRoute>
      <VerificationHistory />
    </ProtectedRoute>
  }
/>

 <Route
  path="/student/profile"
  element={
    <ProtectedRoute>
      <ProfilePage />
    </ProtectedRoute>
  }
/>

<Route
  path="/student/settings"
  element={
    <ProtectedRoute>
      <SettingsPage />
    </ProtectedRoute>
  }
/>

<Route
  path="/organization/dashboard"
  element={
    <ProtectedRoute>
      <OrganizationDashboard />
    </ProtectedRoute>
  }
/>

      </Routes>
    </BrowserRouter>
  );
}

export default App;