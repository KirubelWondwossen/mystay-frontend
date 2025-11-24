import { useState } from "react";
import ManagerLayout from "../components/ManagerLayout";
import ManagerDashboardCards from "../components/ManagerDashboardCards";

function ManagerHome() {
  return (
    <ManagerLayout>
      <div className="max-w-[120rem] mx-auto flex flex-col gap-[3.2rem]">
        <HomeTop />
        <ManagerDashboardCards />
      </div>
    </ManagerLayout>
  );
}

function HomeTop() {
  return (
    <div className="flex justify-between w-full items-center">
      <h1 className="font-heading text-tSecondary font-semibold text-3xl text-start">
        Dashboard
      </h1>
      <FilterByDays />
    </div>
  );
}
function FilterByDays() {
  const [activeDay, setActiveDay] = useState(7);

  return (
    <div className="flex items-center gap-3 bg-white p-1 rounded-md shadow-sm">
      <FilterDays value={7} activeDay={activeDay} setActiveDay={setActiveDay} />
      <FilterDays
        value={30}
        activeDay={activeDay}
        setActiveDay={setActiveDay}
      />
      <FilterDays
        value={90}
        activeDay={activeDay}
        setActiveDay={setActiveDay}
      />
    </div>
  );
}

function FilterDays({ value, activeDay, setActiveDay }) {
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
