import FabricEditor from "../../organization/components/documentTemplate/editor/FabricEditor";
import { useNavigate } from "react-router-dom";

export default function DocumentTemplateDesigner() {
  const navigate = useNavigate();
  return <FabricEditor onBack={() => navigate(-1)} />;
}