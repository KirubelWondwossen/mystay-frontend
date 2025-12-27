import ManagerDashboardCard from "./ManagerDashboardCard";
import { BriefcaseIcon } from "@heroicons/react/24/outline";
import DoughnutChart from "../charts/DoughnutChart";
import LineChart from "../charts/LineChart";
import { useEffect, useRef, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useAuth } from "../../context/AuthContext";
import { getManagerBookings, getManagerInfo } from "../../services/getAPi";
import { getStayNights } from "../../utils/getStayNights";

const statusColors = {
  confirmed: "#dcfce7",
  pending: "#FEF9C3",
  cancelled: "#FECACA",
  completed: "#e0f2fe",
};
const statusTxtColors = {
  pending: "#D97706",
  confirmed: "#15803d",
  cancelled: "#B91C1C",
  completed: "#0369a1",
};

function getTodayActivity(bookings) {
  const today = new Date().toDateString();

  const isToday = (date) => new Date(date).toDateString() === today;

  return bookings.filter(
    (b) => isToday(b.created_at) || isToday(b.check_in) || isToday(b.check_out)
  );
}

export default function ManagerDashboardCards() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { token } = useAuth();
  const ref = useRef(null);

  useEffect(() => {
    const load = async () => {
      try {
        const manager = await getManagerInfo(token);
        ref.current = manager.hotel.id;

        const bookingData = await getManagerBookings(ref.current, token);
        setBookings(bookingData);
        setLoading(true);
      } catch (e) {
        setError(e.message);
        toast.error(e.message);
      } finally {
        setLoading(false);
      }
    };

    if (token) load();
  }, [token]);

  return (
    <div className="grid grid-cols-4 gap-8">
      {/* Bookings */}
      <ManagerDashboardCard>
        <ManagerHomeStats
          icon={BriefcaseIcon}
          stat="Bookings"
          value={11}
          iconColor="text-[#0369a1]"
          iconBg="bg-[#e0f2fe]"
        />
      </ManagerDashboardCard>

      {/* Sales */}
      <ManagerDashboardCard>
        <ManagerHomeStats
          icon={BriefcaseIcon}
          stat="Sales"
          value="$32,465.00"
          iconColor="text-[#15803d]"
          iconBg="bg-[#dcfce7]"
        />
      </ManagerDashboardCard>

      {/* Check-ins */}
      <ManagerDashboardCard>
        <ManagerHomeStats
          icon={BriefcaseIcon}
          stat="Check ins"
          value={4}
          iconColor="text-[#4338ca]"
          iconBg="bg-[#e0e7ff]"
        />
      </ManagerDashboardCard>

      {/* Occupancy Rate */}
      <ManagerDashboardCard>
        <ManagerHomeStats
          icon={BriefcaseIcon}
          stat="Occupancy rate"
          value="36%"
          iconColor="text-[#a16207]"
          iconBg="bg-[#fef9c3]"
        />
      </ManagerDashboardCard>

      {/* Activity */}
      <ManagerDashboardCard className="col-span-2">
        <ManagerActivityCard bookings={bookings} />
      </ManagerDashboardCard>

      {/* Stay Duration */}
      <ManagerDashboardCard className="col-span-2">
        <ManagerDurationChart />
      </ManagerDashboardCard>

      {/* Sales Chart */}
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

function ManagerActivityCard({ bookings }) {
  const todayBookings = getTodayActivity(bookings);

  return (
    <div className="flex flex-col gap-4 p-3 max-h-64 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300">
      <CardsHeader>Today</CardsHeader>

      {todayBookings.length === 0 && (
        <p className="font-body text-tSecondary font-medium">
          No activity today...
        </p>
      )}

      {todayBookings.map((booking, i) => (
        <Status data={booking} key={i} />
      ))}
    </div>
  );
}

function Status({ data }) {
  if (!data) return null;
  return (
    <div className="flex gap-4 items-center py-2 border-b border-[#e5e7eb]">
      <StatusTag data={data} />
      <span className="font-heading text-tSecondary">
        {data.guest?.full_name}
      </span>
      <span className="font-heading text-tSecondary">
        {getStayNights(data.check_in, data.check_out)} days
      </span>
      <span className="font-heading text-tSecondary">{data.total_price}</span>
    </div>
  );
}

function StatusTag({ data }) {
  if (!data) return null;

  return (
    <span
      className="py-1 px-3 justify-self-start text-xs w-fit rounded-full"
      style={{
        backgroundColor: statusColors[data.status],
        color: statusTxtColors[data.status],
      }}
    >
      {data.status?.toUpperCase()}
    </span>
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
