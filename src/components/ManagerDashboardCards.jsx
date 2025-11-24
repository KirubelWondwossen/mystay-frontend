import ManagerDashboardCard from "./ManagerDashboardCard";
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

function ManagerDashboardCards() {
  return (
    <div className="grid grid-cols-4 gap-8">
      {managerStatsData.map((item, i) => (
        <ManagerDashboardCard key={i}>
          <ManagerHomeStats {...item} />
        </ManagerDashboardCard>
      ))}
      <ManagerDashboardCard className={"col-span-2"}>
        <ManagerActivityCard />
      </ManagerDashboardCard>
      <ManagerDashboardCard className={"col-span-2"}></ManagerDashboardCard>
    </div>
  );
}

function ManagerActivityCard() {
  return (
    <div className="flex flex-col gap-4 p-3">
      <h3 className="font-heading text-tSecondary text-xl self-start font-semibold">
        Today
      </h3>
      <p className="font-body text-tSecondary font-medium">
        No activity today...
      </p>
    </div>
  );
}

// eslint-disable-next-line
function ManagerHomeStats({ icon: Icon, stat, value, iconColor, iconBg }) {
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

export default ManagerDashboardCards;
