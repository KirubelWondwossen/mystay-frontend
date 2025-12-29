import ManagerLayout from "../components/layout/ManagerLayout";
import ManagerDashboardCards from "../components/manager/ManagerDashboardCards";
import ManagerTopComponents from "../components/manager/ManagerTopComponents";
import { useState } from "react";

function ManagerHome() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  return (
    <ManagerLayout error={error} loading={loading}>
      <div className="max-w-[120rem] mx-auto flex flex-col gap-[3.2rem]">
        {
          <>
            <ManagerTopComponents header={"Dashboard"}></ManagerTopComponents>
            <ManagerDashboardCards
              setLoading={setLoading}
              setError={setError}
            />
          </>
        }
      </div>
    </ManagerLayout>
  );
}

export default ManagerHome;
