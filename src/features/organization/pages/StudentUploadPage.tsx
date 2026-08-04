import { useState } from "react";
import DashboardLayout from "../../../layouts/DashboardLayout";

import UploadHero from "../components/upload/UploadHero";
import UploadDropzone from "../components/upload/UploadDropzone";
import UploadGuidelines from "../components/upload/UploadGuidelines";
import RecentUploads from "../components/upload/RecentUploads";

export default function StudentUploadPage() {
  const [refreshKey, setRefreshKey] = useState(0);

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Page Header */}
        <UploadHero />

        {/* Upload Area */}
        <UploadDropzone onUploadSuccess={() => setRefreshKey((prev) => prev + 1)} />

        {/* Upload Instructions */}
        <UploadGuidelines />

        {/* Upload History / Imported Certificates Table */}
        <RecentUploads refreshTrigger={refreshKey} />
      </div>
    </DashboardLayout>
  );
}