import Header from "./Header";
import LeftSidebar from "./LeftSidebar";
import Canvas from "./Canvas";
import RightSidebar from "./RightSidebar";

interface WorkspaceProps {
  template?: any;
  onBack: () => void;
}

export default function Workspace({
  template,
  onBack,
}: WorkspaceProps) {
  return (
    <div className="flex h-screen flex-col bg-gray-50 overflow-hidden">
      <Header template={template} onBack={onBack} />

      <div className="flex flex-1 overflow-hidden">
        <LeftSidebar />

        <Canvas template={template} />

        <RightSidebar />
      </div>
    </div>
  );
}