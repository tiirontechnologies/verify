// import { useEffect, useRef } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
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
import GenerateCertificatePage from "./features/student/pages/GenerateCertificatePage";
import DocumentViewerPage from "./features/student/pages/DocumentViewerPage";
import DocumentTemplateDesigner from "./features/organization/pages/DocumentTemplateDesigner";
// import useMeRedirect from "./features/auth/hooks/useMeRedirect";
import BookDemoPage from "./components/demo/BookDemoPage";
import StudentUploadPage from "./features/organization/pages/StudentUploadPage";
import UpdateStudentPage from "./features/organization/pages/UpdateStudentPage";
import CertificateTemplatesPage from "./features/organization/pages/CertificateTemplatesPage";
import TemplatePreviewPage from "./features/organization/pages/TemplatePreviewPage";
import OrganizationProfilePage from "./features/organization/pages/OrganizationProfilePage";
import AdvertisementsPage from "./features/organization/pages/AdvertisementsPage";
import OrganizationSignupPage from "./features/auth/pages/OrganizationSignupPage";
import NotFoundPage from "./pages/NotFoundPage";
import ComingSoon from "./pages/ComingSoon";
import SubscriptionPage from "./pages/Subscription";
import DashboardLayout from "./layouts/DashboardLayout";
import ContactUsPage from "./pages/HelpandSupport";
import HelpSupportPage from "./pages/HelpSupportPage";
import PricingPage from "./pages/PricingPage";
import CheckoutPage from "./pages/CheckoutPage";
import LegalPage from "./pages/LegalPage";

// function AuthBootstrap() {
//   const redirectToDashboard = useMeRedirect();
//   const hasCheckedRef = useRef(false);

//   useEffect(() => {
//     if (hasCheckedRef.current) {
//       return;
//     }

//     hasCheckedRef.current = true;

//     redirectToDashboard();
//   }, [redirectToDashboard]);

//   return null;
// }

// this is app function 
function App() {
  return (
    <BrowserRouter>
      {/* <AuthBootstrap /> */}
      <Routes>

        <Route
          path="/"
          element={<LandingPage />}
        />

        <Route
          path="/book-demo"
          element={<BookDemoPage />}
        />
        <Route path="/pricing" element={<PricingPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/privacy-policy" element={<LegalPage kind="privacy" />} />
        <Route path="/terms-and-conditions" element={<LegalPage kind="terms" />} />
        <Route path="/refund-policy" element={<LegalPage kind="refund" />} />
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
{/* <Route
    path="/docx-editor"
    element={<DocxEditorPage />}
/> */}
<Route
  path="/designer"
  element={
    <ProtectedRoute>
      <DocumentTemplateDesigner />
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
  path="/student/my-certificate"
  element={
    <ProtectedRoute>
      <GenerateCertificatePage />
    </ProtectedRoute>
  }
/>
<Route

    path="/certificate-templates/:id"

    element={<ProtectedRoute><TemplatePreviewPage /></ProtectedRoute>}

/>
<Route
  path="/certificate-templates/:id/edit"
  element={
    <ProtectedRoute>
      <DocumentTemplateDesigner />
    </ProtectedRoute>
  }
/>
<Route
    path="/designer"
    element={
      <ProtectedRoute>
        <DocumentTemplateDesigner />
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
  path="/student/certificates/doc/:certificateId"
  element={
    <ProtectedRoute>
      <DocumentViewerPage />
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

<Route
path="/organization/student-upload"
element={
  <ProtectedRoute>
      <StudentUploadPage />
    </ProtectedRoute>
}
/>
<Route
path="/organization/update-student"
element={
  <ProtectedRoute>
      <UpdateStudentPage />
    </ProtectedRoute>
}
/>

<Route
path="/organization/templates"
element={
  <ProtectedRoute>
      <CertificateTemplatesPage />
    </ProtectedRoute>
}
/>
<Route
path="/organization/profile"
element={
  <ProtectedRoute>
      <OrganizationProfilePage />
    </ProtectedRoute>
}
/>

<Route
path="/organization/ads"
element={
  <ProtectedRoute>
      <AdvertisementsPage />
    </ProtectedRoute>
}
/>
<Route
path="/organization/self-hosted"
element={
  <ProtectedRoute>
    
    <ComingSoon
  featureName="Self Hosted Platforms"
  description="You'll be able to deploy and manage self-hosted verification instances from here."
/>

        </ProtectedRoute>
}
/>

<Route
path="/signup"
element={
  
      <OrganizationSignupPage />
  
}
/>

<Route
path="/Subscription"
element={
  <ProtectedRoute>
    <DashboardLayout>
      <SubscriptionPage />
    </DashboardLayout>
  </ProtectedRoute>
}
/>

<Route
  path="*"
  element={<NotFoundPage />}
/>
<Route path="/contact-us" element={<ContactUsPage />} />
<Route path="/help-and-support" element={<HelpSupportPage />} />
<Route path="/help-support" element={<Navigate to="/help-and-support" replace />} />
<Route path="/helpandsupport" element={<Navigate to="/contact-us" replace />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
