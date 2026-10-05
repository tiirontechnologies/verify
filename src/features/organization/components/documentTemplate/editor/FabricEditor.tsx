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
  const initialPages =
    template?.design?.pages || template?.design?.data?.pages || undefined;
  const initialActivePageId =
    template?.design?.activePageId || template?.design?.data?.activePageId;

  return (
    <FabricProvider
      initialOrientation={initialOrientation}
      initialPages={initialPages}
      initialActivePageId={initialActivePageId}
    >
      <Workspace
        template={template}
        onBack={onBack}
      />
    </FabricProvider>
  );
}