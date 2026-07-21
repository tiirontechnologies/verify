import DashboardLayout from "../../../layouts/DashboardLayout";

import CertificateTemplateHero from "../components/certificateTemplates/CertificateTemplateHero";
import TemplateCards from "../components/certificateTemplates/TemplateCards";
import TemplatePreview from "../components/certificateTemplates/TemplatePreview";
import TemplateActions from "../components/certificateTemplates/TemplateActions";

export default function CertificateTemplatesPage() {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        <CertificateTemplateHero />

        <TemplateCards />

        <TemplatePreview />

        <TemplateActions />
      </div>
    </DashboardLayout>
  );
}