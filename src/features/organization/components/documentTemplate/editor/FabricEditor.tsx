import { FabricProvider } from "./FabricContext";
import Workspace from "./Workspace";

interface FabricEditorProps {
  template?: any;
  onBack: () => void;
}

export default function FabricEditor({
  template,
  onBack,
}: FabricEditorProps) {
  const initialOrientation =
    template?.design?.orientation ||
    template?.design?.data?.orientation ||
    "landscape";

  return (
    <FabricProvider initialOrientation={initialOrientation}>
      <Workspace
        template={template}
        onBack={onBack}
      />
    </FabricProvider>
  );
}