import DashboardLayout from "../../../layouts/DashboardLayout";

import UploadHero from "../components/upload/UploadHero";
import UploadDropzone from "../components/upload/UploadDropzone";
import UploadGuidelines from "../components/upload/UploadGuidelines";
import RecentUploads from "../components/upload/RecentUploads";

export default function StudentUploadPage() {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Page Header */}
        <UploadHero />

        {/* Upload Area */}
        <UploadDropzone />

        {/* Upload Instructions */}
        <UploadGuidelines />

        {/* Upload History */}
        <RecentUploads />
      </div>
    </DashboardLayout>
  );
}