import ManagerLayout from "../components/layout/ManagerLayout";
import ManagerDashboardCards from "../components/manager/ManagerDashboardCards";
import ManagerTopComponents from "../components/manager/ManagerTopComponents";
import { ManagerFilter } from "../components/manager/ManagerFilter";
import { useState } from "react";

const filterOptions = [{ value: 7 }, { value: 30 }, { value: 90 }];
function ManagerHome() {
  const [activeDay, setActiveDay] = useState(7);

  return (
    <ManagerLayout>
      <div className="max-w-[120rem] mx-auto flex flex-col gap-[3.2rem]">
        <ManagerTopComponents header={"Dashboard"}>
          <ManagerFilter>
            {filterOptions.map((item, index) => (
              <ManagerFilterBy
                key={index}
                value={item.value}
                activeDay={activeDay}
                setActiveDay={setActiveDay}
              />
            ))}
          </ManagerFilter>
        </ManagerTopComponents>
        <ManagerDashboardCards />
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
