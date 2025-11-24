import { useState } from "react";
import ManagerLayout from "../components/ManagerLayout";
import { BriefcaseIcon } from "@heroicons/react/24/outline";

const managerStatsData = [
  {
    icon: BriefcaseIcon,
    stat: "Booking",
    value: 11,
    iconColor: "text-[#0369a1]",
    iconBg: "bg-[#e0f2fe]",
  },
  {
    icon: BriefcaseIcon,
    stat: "Sales",
    value: "$32,465.00",
    iconColor: "text-[#15803d]",
    iconBg: "bg-[#dcfce7]",
  },
  {
    icon: BriefcaseIcon,
    stat: "Check ins",
    value: 4,
    iconColor: "text-[#4338ca]",
    iconBg: "bg-[#e0e7ff]",
  },
  {
    icon: BriefcaseIcon,
    stat: "Occupancy rate",
    value: "36%",
    iconColor: "text-[#a16207]",
    iconBg: "bg-[#fef9c3]",
  },
];

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

function ManagerDashboardCards() {
  return (
    <div className="grid grid-cols-4 gap-8">
      {managerStatsData.map((item, index) => (
        <ManagerDashboardCard key={index}>
          <ManagerStats {...item} />
        </ManagerDashboardCard>
      ))}
    </div>
  );
}

function ManagerDashboardCard({ children, className }) {
  return (
    <div
      className={`border bg-white border-border rounded-md w-full ${className}`}
    >
      {children}
    </div>
  );
}

// eslint-disable-next-line
function ManagerStats({ icon: Icon, stat, value, iconColor, iconBg }) {
  return (
    <div className="grid grid-cols-[4rem_1fr] grid-rows-2 px-3 py-2 w-max gap-x-1">
      <div
        className={`p-4 self-center justify-self-start aspect-square row-span-full rounded-full flex items-center justify-center text-start ${iconBg}`}
      >
        <Icon className={`w-7 ${iconColor}`} />
      </div>

      <p className="text-[#6b7280] justify-self-start text-start self-end text-xs uppercase font-semibold font-body">
        {stat}
      </p>

      <p className="font-heading text-xl text-start justify-self-start min-w-0 break-words">
        {value}
      </p>
    </div>
  );
}

export default ManagerHome;
