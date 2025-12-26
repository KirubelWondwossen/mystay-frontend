import { Link, useParams } from "react-router-dom";
import ProfileLayout from "../components/layout/ProfileLayout";
import Subheader from "../components/ui/Subheader";
import { useEffect, useState } from "react";
import { getCookie } from "../utils/getCookie";
import { getBookings } from "../services/getAPi";
import { Loader } from "../components/ui/Loader";
import ErrorMessage from "../components/ui/ErrorMessage";
import GuestReservationTable from "../components/guest/guestReservationTable";
import { cancelBooking } from "../services/patchAPI";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

const fields = ["Dates", "Status", "Amount"];

function ProfileReservations() {
  const [bookings, setBookings] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const accessToken = getCookie("access_token");
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const load = async () => {
      if (!accessToken) return;

      setLoading(true);
      try {
        const guestData = await getBookings(accessToken);
        const guestId = Number(id);

        setBookings(guestData.filter((el) => el.guest.id === guestId));
      } catch (e) {
        setError("");
        console.log("User not authenticated", e);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [accessToken, id]);

  async function handleCancelBooking(roomId) {
    try {
      const res = await cancelBooking(roomId, accessToken);
      console.log(res);

      if (!res || res.error) {
        throw new Error(res?.error || "Booking cancel failed");
      }

      toast.success("Booking cancelled successfully");
      navigate(0);
    } catch (error) {
      toast.error(error.message || "Unable to cancel booking");
    }
  }
  return (
    <ProfileLayout>
      {loading && <Loader loading={loading} />}
      {!loading && error && <ErrorMessage message={error} />}
      {!loading && !error && (
        <>
          <Subheader>Your reservations</Subheader>
          {bookings && bookings.length === 0 && (
            <p className="font-body text-lg font-semibold">
              You have no reservations yet. Check out{" "}
              <Link to={"/"} className="text-primary font-heading underline">
                Luxury rooms →
              </Link>
            </p>
          )}
          <div>
            {<Fields fields={fields} />}
            {bookings &&
              bookings.length > 0 &&
              bookings.map((booking) => (
                <GuestReservationTable
                  data={booking}
                  key={booking.id}
                  handleCancelBookings={handleCancelBooking}
                />
              ))}
          </div>
        </>
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
    </ProfileLayout>
  );
}

function Fields({ fields }) {
  return (
    <div className="grid grid-cols-[1fr_1fr_1fr_1fr_3.2rem] gap-2 border border-[#e5e7eb] rounded-t-sm">
      {fields.map((el, i) => (
        <div
          className="justify-self-start text-sm font-heading p-2 text-tSecondary font-semibold"
          key={i}
        >
          {el.toUpperCase()}
        </div>
      ))}
    </div>
  );
}

export default ProfileReservations;
