import { useEffect, useRef, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

import { ManagerFilter } from "../components/manager/ManagerFilter";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";

import ManagerLayout from "../components/layout/ManagerLayout";
import ManagerTopComponents from "../components/manager/ManagerTopComponents";
import { ManagerFilterBy } from "../components/manager/ManagerFilterBy";
import ManagerBookingsTable from "../components/manager/ManagerBookingsTable";
import SortBy from "../components/ui/SortBy";
import ManagerTableCols from "../components/manager/ManagerTableCols";
import { useAuth } from "../context/AuthContext";
import {
  getBookings,
  getManagerBookings,
  getManagerInfo,
  getRooms,
} from "../services/getAPi";
import { EmptyState } from "../components/ui/EmptyState";
import { cancelBooking, checkIn, completeBooking } from "../services/patchAPI";
import PrevNext from "../components/ui/PrevNext";

const filterOptions = [
  { value: 1, type: "All" },
  { value: 2, type: "Completed" },
  { value: 3, type: "Cancelled" },
  { value: 4, type: "Pending" },
];

const sortOptions = [
  { value: "recent", text: "Sort by date (recent first)" },
  { value: "earlier", text: "Sort by date (earlier first)" },
  { value: "high", text: "Sort by amount (high first)" },
  { value: "low", text: "Sort by amount (low first)" },
];

const fields = ["Room", "Guest", "Dates", "Status", "Amount"];
const PAGE_SIZE = 9;

function ManagerBookings() {
  const [active, setActive] = useState(1);
  const [bookings, setBookings] = useState([]);
  const [rooms, setRooms] = useState({});
  const [filteredBookings, setFilteredBookings] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const ref = useRef(null);
  const [page, setPage] = useState(1);

  const { token } = useAuth();
  const filterBy = searchParams.get("filter") || "All";
  const hasData = bookings.length > 0;
  const navigate = useNavigate();

  const startIndex = (page - 1) * PAGE_SIZE;
  const endIndex = startIndex + PAGE_SIZE;
  const paginatedBookings = filteredBookings.slice(startIndex, endIndex);

  useEffect(() => {
    setPage(1);
  }, [filterBy]);

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);

        const manager = await getManagerInfo(token);
        ref.current = manager.hotel.id;

        const bookingData = await getManagerBookings(ref.current, token);
        setBookings(bookingData);

        const roomData = await getRooms();
        setRooms(roomData);
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
    let updated = [...bookings];

    if (filterBy !== "All") {
      updated = updated.filter((booking) => booking.status === filterBy);
    }

    setFilteredBookings(updated);
  }, [bookings, filterBy]);

  async function handleCheckin(bookingId) {
    try {
      const res = await checkIn(bookingId, token);

      if (!res || res.error) {
        throw new Error(res?.error || "Check-in failed");
      }

      toast.success("Guest checked in successfully");
      navigate(0);
    } catch (error) {
      toast.error(error.message || "Unable to check in");
    }
  }

  async function handleCancelBooking(bookingId) {
    try {
      const res = await cancelBooking(bookingId, token);

      if (!res || res.error) {
        throw new Error(res?.error || "Booking cancel failed");
      }

      toast.success("Booking cancelled successfully");
      navigate(0);
    } catch (error) {
      toast.error(error.message || "Unable to cancel booking");
    }
  }

  async function handleComplete(bookingId) {
    try {
      const res = await completeBooking(bookingId, token);

      if (!res || res.error) {
        throw new Error(res?.error || "Booking complete failed");
      }

      toast.success("Booking completed successfully");
      navigate(0);
    } catch (error) {
      toast.error(error.message || "Unable to ccomplete booking");
    }
  }

  function handleFilter(selectedFilter) {
    if (selectedFilter === "All") {
      searchParams.delete("filter");
    } else {
      searchParams.set(
        "filter",
        selectedFilter.toLowerCase().replace(/\s+/g, "_")
      );
    }

    setSearchParams(searchParams);
  }

  return (
    <ManagerLayout
      loading={loading}
      error={error}
      getData={getBookings}
      id={ref.current}
    >
      {!hasData && !error && !loading && (
        <EmptyState title="No Bookings yet" description="Wait for bookings" />
      )}

      {hasData && !error && !loading && (
        <div className="max-w-[120rem] mx-auto flex flex-col gap-[3.2rem]">
          <ManagerTopComponents header="All Bookings">
            <div className="flex gap-3">
              <ManagerFilter>
                {filterOptions.map((item, index) => (
                  <ManagerFilterBy
                    key={index}
                    value={item.value}
                    active={active}
                    setActive={setActive}
                    filters={item.type}
                    handleFilter={handleFilter}
                  />
                ))}
              </ManagerFilter>

              <SortBy sortOptions={sortOptions} />
            </div>
          </ManagerTopComponents>

          <div>
            {filteredBookings.length === 0 && (
              <EmptyState
                title={"No Bookings"}
                description={"Change the filter option"}
              />
            )}
            {filteredBookings.length > 0 && (
              <>
                <ManagerTableCols fields={fields} />
                {paginatedBookings.map((el) => (
                  <ManagerBookingsTable
                    key={el.id}
                    data={el}
                    room={rooms}
                    handleCancelBooking={handleCancelBooking}
                    handleCheckin={handleCheckin}
                    handleComplete={handleComplete}
                  />
                ))}
              </>
            )}
            <PrevNext
              page={page}
              setPage={setPage}
              total={filteredBookings.length}
            />
          </div>
        </div>
      )}

      <Toaster
        position="top-center"
        reverseOrder={false}
        toastOptions={{
          duration: 5000,
          style: {
            minWidth: "250px",
            maxWidth: "600px",
          },
        }}
      />
    </ManagerLayout>
  );
}

export default ManagerBookings;
