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

export default function SignupSidebar({
  currentStep,
}: Props) {
  switch (currentStep) {
    case 1:
      return (
        <Card
          icon={<Building2 size={28} />}
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
          icon={<User size={28} />}
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
          icon={<ImagePlus size={28} />}
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
          icon={<ClipboardCheck size={28} />}
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

function Card({
  icon,
  title,
  description,
  items,
  footer,
}: CardProps) {
  return (
    <div className="sticky top-8 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">

      {/* Header */}

      <div className="flex items-center gap-4">

        <div className="rounded-2xl bg-red-100 p-3 text-red-600">
          {icon}
        </div>

        <div>
          <h3 className="text-xl font-bold text-slate-900">
            {title}
          </h3>

          <p className="mt-1 text-sm text-slate-500">
            {description}
          </p>
        </div>

      </div>

      {/* Checklist */}

      <div className="mt-8 space-y-5">

        {items.map((item) => (
          <div
            key={item}
            className="flex items-start gap-3"
          >
            <CheckCircle2
              size={18}
              className="mt-0.5 text-green-600"
            />

            <span className="text-sm leading-6 text-slate-700">
              {item}
            </span>
          </div>
        ))}

      </div>

      {/* Info */}

      <div className="mt-8 rounded-2xl bg-red-50 p-5">

        <div className="flex items-start gap-3">

          <Clock3
            size={18}
            className="mt-1 text-red-600"
          />

          <p className="text-sm leading-6 text-slate-600">
            {footer}
          </p>

        </div>

      </div>

      {/* Security */}

      <div className="mt-6 rounded-2xl bg-slate-50 p-5">

        <div className="flex items-start gap-3">

          <ShieldCheck
            size={18}
            className="mt-1 text-green-600"
          />

          <p className="text-sm leading-6 text-slate-600">
            All submitted information is encrypted and securely
            reviewed before your organization is activated.
          </p>

        </div>

      </div>

      {/* Support */}

      <div className="mt-6 flex items-center gap-3 border-t border-slate-200 pt-5 text-sm text-slate-500">

        <Mail size={16} />

        <span>contact@tiirontechnologies.com</span>

      </div>

    </div>
  );
}