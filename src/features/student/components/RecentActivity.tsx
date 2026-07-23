import {
  CheckCircle,
  Download,
  Share2,
  // PlusCircle,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

type RecentActivityProps = {
  id: string;
};
export default function RecentActivity({id}:RecentActivityProps) {
  const navigate = useNavigate();

    const handleShare = async (id: string) => {
    try {
      await navigator.share({
        title: "Certificate",
        text: "Verify my certificate",
        url: `${window.location.origin}/verification/${id}`,
      });
    } catch (error) {
      alert("Failed to share credentials!");
    }
  };

  return (
    <div className="bg-white rounded-3xl p-8 shadow-sm">

      <h2 className="text-2xl font-bold mb-8">
        Recent Activity
      </h2>

      <div className="space-y-6">

        <div onClick={()=>navigate(`/verification/${id}`)} className="flex items-center cursor-pointer gap-4">
          <CheckCircle className="text-green-500" />
          <p>Credential verified successfully.</p>
        </div>

        <div 
        onClick={() => handleShare(id)}
        className="flex items-center cursor-pointer gap-4">
          <Share2 className="text-blue-500" />
          <p>Shared Certification.</p>
        </div>

        <div  onClick={()=>navigate("/student/my-certificate")} className="flex  cursor-pointer items-center gap-4">
          <Download className="text-orange-500" />
          <p>Downloaded  Certificate.</p>
        </div>

        {/* <div className="flex items-center gap-4">
          <PlusCircle className="text-purple-500" />
          <p>New credential added.</p>
        </div> */}

      </div>

    </div>
  );
}