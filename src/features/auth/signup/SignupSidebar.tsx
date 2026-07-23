
import {
  Building2,
  User,
  ImagePlus,
  ClipboardCheck,
  CheckCircle2,
  Clock3,
  ShieldCheck,
  Mail,
} from "lucide-react";

type Props = {
  currentStep: number;
};

export default function SignupSidebar({ currentStep }: Props) {
  switch (currentStep) {
    case 1:
      return (
        <Card
          icon={<Building2 size={20} />}
          title="Organization Information"
          description="Tell us about your organization."
          items={[
            "Organization name",
            "Industry & website",
            "Official phone number",
            "Basic organization details",
          ]}
          footer="Estimated time: 1 minute"
        />
      );

    case 2:
      return (
        <Card
          icon={<User size={20} />}
          title="Administrator Account"
          description="Create the primary administrator."
          items={[
            "Administrator name",
            "Official email address",
            "Create secure password",
            "Account credentials",
          ]}
          footer="Only one administrator account is created initially."
        />
      );

    case 3:
      return (
        <Card
          icon={<ImagePlus size={20} />}
          title="Brand Identity"
          description="Complete your organization profile."
          items={[
            "Organization address",
            "Upload company logo",
            "Logo appears on certificates",
            "Visible on verification pages",
          ]}
          footer="PNG, JPG or SVG • Max 5 MB"
        />
      );

    case 4:
      return (
        <Card
          icon={<ClipboardCheck size={20} />}
          title="Review & Submit"
          description="Final verification before registration."
          items={[
            "Review all entered information",
            "Accept Terms & Privacy Policy",
            "Submit organization request",
            "Approval within 24–48 hours",
          ]}
          footer="Your request will be reviewed by the Tiiron team."
        />
      );

    default:
      return null;
  }
}

type CardProps = {
  icon: React.ReactNode;
  title: string;
  description: string;
  items: string[];
  footer: string;
};

function Card({ icon, title, description, items, footer }: CardProps) {
  return (
    <div className="sticky top-6 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="rounded-xl bg-red-100 p-2 text-red-600 shrink-0">
          {icon}
        </div>

        <div>
          <h3 className="text-sm font-bold text-slate-900 sm:text-base">
            {title}
          </h3>
          <p className="mt-0.5 text-xs text-slate-500">{description}</p>
        </div>
      </div>

      {/* Checklist */}
      <div className="mt-4 space-y-3">
        {items.map((item) => (
          <div key={item} className="flex items-start gap-2.5">
            <CheckCircle2
              size={15}
              className="mt-0.5 shrink-0 text-green-600"
            />
            <span className="text-xs leading-5 text-slate-700 sm:text-sm">
              {item}
            </span>
          </div>
        ))}
      </div>

      {/* Info */}
      <div className="mt-4 rounded-xl bg-red-50 p-3">
        <div className="flex items-start gap-2.5">
          <Clock3 size={15} className="mt-0.5 shrink-0 text-red-600" />
          <p className="text-xs leading-5 text-slate-600">{footer}</p>
        </div>
      </div>

      {/* Security */}
      <div className="mt-3 rounded-xl bg-slate-50 p-3">
        <div className="flex items-start gap-2.5">
          <ShieldCheck size={15} className="mt-0.5 shrink-0 text-green-600" />
          <p className="text-xs leading-5 text-slate-600">
            All submitted information is encrypted and securely reviewed
            before your organization is activated.
          </p>
        </div>
      </div>

      {/* Support */}
      <div className="mt-3 flex items-center gap-2 border-t border-slate-200 pt-3 text-xs text-slate-500">
        <Mail size={14} />
        <span>contact@tiirontechnologies.com</span>
      </div>
    </div>
  );
}