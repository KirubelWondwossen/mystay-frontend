import { Link } from "react-router-dom";

import AdminDashboardLayout from "../components/layout/AdminDashboardLayout";
import ManagerTopComponents from "../components/manager/ManagerTopComponents";

function AdminApplicationDetails() {
  return (
    <AdminDashboardLayout>
      <div className="max-w-[120rem] mx-auto flex flex-col gap-6">
        <ManagerTopComponents header={"Application #"}>
          <Link to={"/adminapplication"} className="font-heading text-primary">
            ← Back
          </Link>
        </ManagerTopComponents>
      </div>
    </AdminDashboardLayout>
  );
}

export default AdminApplicationDetails;
