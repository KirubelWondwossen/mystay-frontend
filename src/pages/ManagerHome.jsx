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
        <ManagerTopComponents header={"Dashboard"}></ManagerTopComponents>
        <ManagerDashboardCards setLoading={setLoading} setError={setError} />
      </div>
    </ManagerLayout>
  );
}

function ManagerFilterBy({
  value,
  activeDay: activeDay,
  setActiveDay: setActiveDay,
}) {
  const isActive = activeDay === value;

  return (
    <span
      onClick={() => setActiveDay(value)}
      className={`
        ${isActive ? "bg-primary text-white" : "bg-white text-black"}
        font-body text-sm px-2 py-1 cursor-pointer rounded-sm 
        hover:bg-primary hover:text-white transition duration-300
      `}
    >
      Last {value} days
    </span>
  );
}

export default ManagerHome;
