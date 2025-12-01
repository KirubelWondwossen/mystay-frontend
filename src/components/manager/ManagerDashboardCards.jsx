import ManagerDashboardCard from "./ManagerDashboardCard";
import { BriefcaseIcon } from "@heroicons/react/24/outline";
import DoughnutChart from "../charts/DoughnutChart";
import LineChart from "../charts/LineChart";

// ===== Manager Stats Data ===== //
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

// ===== Main Dashboard Cards Layout ===== //
export default function ManagerDashboardCards() {
  return (
    <div className="grid grid-cols-4 gap-8">
      {managerStatsData.map((item, index) => (
        <ManagerDashboardCard key={index}>
          <ManagerHomeStats {...item} />
        </ManagerDashboardCard>
      ))}

      <ManagerDashboardCard className="col-span-2">
        <ManagerActivityCard />
      </ManagerDashboardCard>

      <ManagerDashboardCard className="col-span-2">
        <ManagerDurationChart />
      </ManagerDashboardCard>

      <ManagerDashboardCard className="col-span-4">
        <ManagerSalesChart />
      </ManagerDashboardCard>
    </div>
  );
}

function CardsHeader({ children }) {
  return (
    <h3 className="font-heading text-tSecondary text-xl font-semibold self-start">
      {children}
    </h3>
  );
}

function ManagerActivityCard() {
  return (
    <div className="flex flex-col gap-4 p-3">
      <CardsHeader>Today</CardsHeader>
      <p className="font-body text-tSecondary font-medium">
        No activity today...
      </p>
    </div>
  );
}

// eslint-disable-next-line
function ManagerHomeStats({ icon: Icon, stat, value, iconColor, iconBg }) {
  return (
    <div className="grid grid-cols-[4rem_1fr] grid-rows-2 gap-x-1 px-3 py-2 w-max">
      <div
        className={`flex items-center justify-center p-4 rounded-full aspect-square row-span-full ${iconBg}`}
      >
        <Icon className={`w-7 ${iconColor}`} />
      </div>

      <p className="text-[#6b7280] text-xs uppercase font-semibold font-body self-end">
        {stat}
      </p>

      <p className="font-heading text-xl break-words">{value}</p>
    </div>
  );
}

function ManagerDurationChart() {
  return (
    <div className="p-3 flex flex-col gap-4">
      <CardsHeader>Stay Duration Summary</CardsHeader>
      <DoughnutChart />
    </div>
  );
}

function ManagerSalesChart() {
  return (
    <div className="p-3 flex flex-col gap-4">
      <CardsHeader>Sales from 11 23 2025 — Nov 29 2025</CardsHeader>
      <LineChart />
    </div>
  );
}
