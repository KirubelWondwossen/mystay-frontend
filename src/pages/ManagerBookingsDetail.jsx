import ManagerLayout from "../components/layout/ManagerLayout";
import ManagerTopComponents from "../components/manager/ManagerTopComponents";
import { Link } from "react-router-dom";
import { HomeModernIcon, UserIcon } from "@heroicons/react/24/outline";
import Button from "../components/ui/Button";
import { useEffect, useRef, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { getManagerBookings, getManagerInfo } from "../services/getAPi";
import toast, { Toaster } from "react-hot-toast";
import { useParams } from "react-router-dom";
import { getNumberOfDays } from "../utils/getNumberOfDays";
import { Loader } from "../components/ui/Loader";
import { formatBookingDates } from "../utils/formatBookingDates";
import { formatTimestamp } from "../utils/formatTimeStamp";
import ErrorMessage from "../components/ui/ErrorMessage";

const statusColors = {
  check_in: "#dcfce7",
  pending: "#FEF9C3",
  checked_out: "#e5e7eb",
};
const statusTxtColors = {
  pending: "#D97706",
  check_in: "#15803d",
  checked_out: "#374151",
};

function ManagerBookingDetails() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentBook, setCurrentBook] = useState({});
  const { token } = useAuth();
  const ref = useRef(null);
  const { id } = useParams();

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);

        const manager = await getManagerInfo(token);
        ref.current = manager.hotel.id;

        const bookingData = await getManagerBookings(ref.current, token);
        setBookings(bookingData);
      } catch (e) {
        setError(e.message);
        toast.error(e.message);
      } finally {
        setLoading(false);
      }
    };

    if (token) load();
  }, [token]);

  useEffect(() => {
    if (!id && !bookings) return;

    const filtered = bookings.filter((b) => Number(b.id) === Number(id));
    setCurrentBook(filtered[0]);
  }, [bookings, id]);

  console.log(currentBook);

  return (
    <ManagerLayout>
      <div className="max-w-[120rem] mx-auto flex flex-col gap-[3.2rem]">
        <ManagerTopComponents header={`Booking ${id}`}>
          <Status data={currentBook} />
          <Link to={"/managerbookings"} className="font-heading text-primary">
            ← Back
          </Link>
        </ManagerTopComponents>
        {loading && <Loader loading={loading} />}
        {!loading && error && <ErrorMessage message={error} />}
        {!loading && !error && <BookingDetails currentBook={currentBook} />}
        <DetailButtons />
      </div>
    </ManagerLayout>
  );
}
function BookingDetails({ currentBook }) {
  if (!currentBook) return null;

  const guestName = currentBook.guest?.full_name || "Unknown Guest";
  const guestEmail = currentBook.guest?.email || "No email";

  return (
    <div className="bg-white shadow-md flex flex-col gap-3">
      <div className="flex justify-between items-center rounded-t-sm p-4 bg-[#6366f1] text-[#e0e7ff] font-heading">
        <div className="flex gap-3 items-center">
          <HomeModernIcon className="w-8" />
          <span className="">
            {getNumberOfDays(currentBook.check_in, currentBook.check_out)}{" "}
            nights
          </span>
        </div>
        <span className="">
          {formatBookingDates(currentBook.check_in, currentBook.check_out)}
        </span>
      </div>
      <ul className="flex gap-3 p-4 font-body items-center">
        <li>
          <UserIcon className={"w-5"} />{" "}
        </li>
        <li>{guestName}</li>
        <li className="text-tTertiary">{guestEmail}</li>
      </ul>

      <div
        style={{
          backgroundColor: statusColors[currentBook.status] || "#e5e7eb",
          color: statusTxtColors[currentBook.status] || "#374151",
        }}
        className="p-4 flex justify-between mx-4 rounded-sm font-body"
      >
        <div className="flex gap-3">
          <span className="font-semibold">Total Price</span>
          <span>${currentBook.total_price || 0}</span>
        </div>
        <span className="font-semibold">
          {currentBook.status?.toUpperCase() || "PENDING"}
        </span>
      </div>

      <span className="text-xs self-end mb-4 font-body text-tSecondary p-4">
        {currentBook.created_at
          ? formatTimestamp(currentBook.created_at)
          : "Date not available"}
      </span>
    </div>
  );
}

function DetailButtons() {
  return (
    <div className="flex gap-2 self-end">
      <Button
        className={"bg-primary rounded-lg p-2 text-white hover:bg-[#4338ca]"}
      >
        Check-in
      </Button>
      <Button
        className={"bg-error rounded-lg p-2 text-white hover:bg-[#4338ca]"}
      >
        Delete
      </Button>
      <Link to={"/managerbookings"} className="font-heading text-primary">
        <Button
          className={"border border-tSecondary rounded-lg p-2 text-tSecondary"}
        >
          Back
        </Button>
      </Link>
    </div>
  );
}
function Status({ data }) {
  if (!data || !data.status) return null;

  return (
    <span
      className="py-1 px-3 justify-self-start text-xs w-fit rounded-full absolute left-72"
      style={{
        backgroundColor: statusColors[data.status],
        color: statusTxtColors[data.status],
      }}
    >
      {data.status.toUpperCase()}
    </span>
  );
}

export default ManagerBookingDetails;
