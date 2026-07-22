import DashboardLayout from "../../../layouts/DashboardLayout";

import UpdateStudentHero from "../components/updateStudent/UpdateStudentHero";
import StudentSearchFilters from "../components/updateStudent/StudentSearchFilters";
import StudentTable from "../components/updateStudent/StudentTable";
import BulkActions from "../components/updateStudent/BulkActions";

export default function UpdateStudentPage() {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        <UpdateStudentHero />

        <StudentSearchFilters />

        <StudentTable />

        <BulkActions />
      </div>
    </DashboardLayout>
  );
}