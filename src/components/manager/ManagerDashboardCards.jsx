import ManagerDashboardCard from "./ManagerDashboardCard";
import { BriefcaseIcon } from "@heroicons/react/24/outline";
import DoughnutChart from "../charts/DoughnutChart";
import LineChart from "../charts/LineChart";
import { useEffect, useMemo, useRef, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useAuth } from "../../context/AuthContext";
import {
  getDashboard,
  getManagerBookings,
  getManagerInfo,
} from "../../services/getAPi";
import { getStayNights } from "../../utils/getStayNights";
import { EmptyState } from "../ui/EmptyState";

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
    (b) =>
      b.status !== "cancelled" &&
      (isToday(b.created_at) || isToday(b.check_in) || isToday(b.check_out))
  );
}

export default function ManagerDashboardCards({ setLoading, setError }) {
  const [bookings, setBookings] = useState([]);
  const [dashboard, setDashboard] = useState();
  const { token } = useAuth();
  const ref = useRef(null);

  const checkedInBookings = useMemo(
    () => bookings.filter((el) => el.status === "completed").length,
    [bookings]
  );
  const occupancyRate = useMemo(() => {
    const occupied = dashboard?.stats?.occupied_rooms;
    const totalRooms = dashboard?.stats?.total_rooms;

    if (!totalRooms) return "0%";
    return Math.round((occupied / totalRooms) * 100) + "%";
  }, [dashboard]);

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        const manager = await getManagerInfo(token);
        ref.current = manager.hotel.id;

        const bookingData = await getManagerBookings(ref.current, token);
        setBookings(bookingData);

        const dashboardData = await getDashboard(token);
        setDashboard(dashboardData);
      } catch (e) {
        setError(e.message);
        toast.error(e.message);
      } finally {
        setLoading(false);
      }
    };

    if (token) load();
  }, [token, setLoading, setError]);

  return (
    <div className="grid grid-cols-4 gap-8">
      {dashboard ? (
        <>
          {/* Bookings */}
          <ManagerDashboardCard>
            <ManagerHomeStats
              icon={BriefcaseIcon}
              stat="Bookings"
              value={dashboard?.stats?.total_bookings}
              iconColor="text-[#0369a1]"
              iconBg="bg-[#e0f2fe]"
            />
          </ManagerDashboardCard>

          {/* Sales */}
          <ManagerDashboardCard>
            <ManagerHomeStats
              icon={BriefcaseIcon}
              stat="Sales"
              value={`$${dashboard?.stats?.total_sales}`}
              iconColor="text-[#15803d]"
              iconBg="bg-[#dcfce7]"
            />
          </ManagerDashboardCard>

          {/* Check-ins */}
          <ManagerDashboardCard>
            <ManagerHomeStats
              icon={BriefcaseIcon}
              stat="Check ins"
              value={checkedInBookings}
              iconColor="text-[#4338ca]"
              iconBg="bg-[#e0e7ff]"
            />
          </ManagerDashboardCard>

          {/* Occupancy Rate */}
          <ManagerDashboardCard>
            <ManagerHomeStats
              icon={BriefcaseIcon}
              stat="Occupancy rate"
              value={occupancyRate}
              iconColor="text-[#a16207]"
              iconBg="bg-[#fef9c3]"
            />
          </ManagerDashboardCard>
        </>
      ) : (
        <EmptyState
          title="Loading Stats"
          description="Dashboard data not available"
        />
      )}
      {/* Activity */}
      <ManagerDashboardCard className="col-span-2">
        <ManagerActivityCard bookings={bookings} />
      </ManagerDashboardCard>

      {/* Stay Duration */}
      <ManagerDashboardCard className="col-span-2">
        <ManagerDurationChart bookings={bookings} />
      </ManagerDashboardCard>

      {/* Sales Chart */}
      <ManagerDashboardCard className="col-span-4">
        <ManagerSalesChart bookings={bookings} />
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

      {(!bookings || bookings.length === 0) && (
        <EmptyState
          title="No data"
          description="No bookings are available yet."
        />
      )}

      {todayBookings.length === 0 && bookings.length > 0 && (
        <EmptyState
          title="No Activity Today"
          description="No check-ins or check-outs today."
        />
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
  if (!stat) return null;
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

function ManagerDurationChart({ bookings }) {
  const hasData = bookings && bookings.length > 0;

  return (
    <div className="p-3 flex flex-col gap-4">
      <CardsHeader>Stay Duration Summary</CardsHeader>

      {!hasData ? (
        <EmptyState
          title="No Stay Data"
          description="Booking history is required to calculate stay duration."
        />
      ) : (
        <DoughnutChart bookings={bookings} />
      )}
    </div>
  );
}

function ManagerSalesChart({ bookings }) {
  const hasSales = bookings && bookings.some((b) => b.total_price > 0);

  return (
    <div className="p-3 flex flex-col gap-4">
      <CardsHeader>Sales Overview</CardsHeader>

      {!hasSales ? (
        <EmptyState
          title="No Sales Yet"
          description="Sales data will appear once bookings start generating revenue."
        />
      ) : (
        <LineChart bookings={bookings} />
      )}
    </div>
  );
}
