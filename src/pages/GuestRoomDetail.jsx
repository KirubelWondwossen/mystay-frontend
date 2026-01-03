import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "react-day-picker/dist/style.css";
import toast, { Toaster } from "react-hot-toast";

import Page from "../components/layout/Page";
import Navbar from "../components/ui/Navbar";
import Sticky from "../components/layout/Sticky";
import Main from "../components/layout/MainLayout";
import BottomNav from "../components/ui/BottomNav";
import {
  getGuestProfile,
  getHotel,
  getRoomDetail,
  getUnavailableDates,
} from "../services/getAPi";
import { Loader } from "../components/ui/Loader";
import { formatDateToYMD } from "../utils/formatDateToYMD";
import Backdrop from "../components/ui/Backdrop";
import { ImageDetail } from "../components/guest/ImageDetail";
import { BookDatePrice } from "../components/guest/BookDatePrice";
import { CardPaymentPopup } from "../components/guest/CardPaymentPopup";
import { MobilePaymentPopup } from "../components/guest/MobilePaymentPopup";

// Leaflet
import { Map } from "../components/ui/Map";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";
import { API_URL } from "../services/apiURl";
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: icon,
  shadowUrl: iconShadow,
});

function GuestRoomDetail() {
  const [guest, setGuest] = useState(null);
  const [room, setRoom] = useState({});
  const [totalPrice, setTotalPrice] = useState(0);
  const [payload, setPayload] = useState({});
  const [payment, setPayment] = useState();
  const [loading, setLoading] = useState(false);
  const [loadingBook, setLoadingBook] = useState(false);
  const [error, setError] = useState(null);
  const [range, setRange] = useState();
  const [unavDates, setUnavDates] = useState({
    unavailable_dates: [],
  });
  const [openMobile, setOpenMobile] = useState(false);
  const [successPayment, setSuccessPayment] = useState(false);
  const [openCard, setOpenCard] = useState(false);
  const [hotel, setHotel] = useState(null);

  const authenticated = Boolean(guest);
  const { roomId, hotelId } = useParams();
  const params = new URLSearchParams(window.location.search);
  const token = params.get("token");

  if (token) {
    localStorage.setItem("access_token", token);
    window.history.replaceState({}, "", "/");
  }
  const accessToken = localStorage.getItem("access_token");

  const navigate = useNavigate();

  useEffect(() => {
    const loadGuest = async () => {
      if (!accessToken) return;

      setLoading(true);
      try {
        const guestData = await getGuestProfile(accessToken);
        setGuest(guestData);
      } catch (e) {
        setGuest(null);
        setError("User not authenticated, booking disabled");
        console.log("User not authenticated", e);
      } finally {
        setLoading(false);
      }
    };

    loadGuest();
  }, [accessToken]);

  useEffect(() => {
    const load = async () => {
      setLoading(true);

      try {
        const roomData = await getRoomDetail(roomId, hotelId);
        setRoom(roomData);
      } catch (e) {
        setError(e.message);
        toast.error("Failed to load room details");
      }

      try {
        const dates = await getUnavailableDates(roomId);
        setUnavDates(dates);
      } catch (e) {
        setError(e.message);
        toast.error("Failed to load unavailable dates");
      }

      try {
        const hotelData = await getHotel(hotelId);
        setHotel(hotelData);
      } catch (e) {
        setHotel(null);
        setError(e);
        console.log("Hotel not found");
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [hotelId, roomId, accessToken]);

  useEffect(() => {
    if (successPayment) {
      setPayment((prev) => prev);
    }
  }, [successPayment]);

  useEffect(() => {
    if (!range?.from || !range?.to || !payment || totalPrice <= 0) return;

    setPayload({
      check_in: formatDateToYMD(range.from),
      check_out: formatDateToYMD(range.to),
      room_id: +roomId,
      payment_method: payment,
    });
  }, [payment, totalPrice, range, roomId]);

  useEffect(() => {
    if (!payment || successPayment) return;

    if (payment === "mobile") {
      setOpenMobile(true);
      setOpenCard(false);
    }

    if (payment === "card") {
      setOpenCard(true);
      setOpenMobile(false);
    }

    if (payment === "cash") {
      setOpenMobile(false);
      setOpenCard(false);
      toast.success("Cash payment selected. Pay at check-in.");
    }
  }, [payment, successPayment]);

  const handleClose = () => setOpenMobile(false);
  const handleCardClose = () => setOpenCard(false);

  async function handleBook(e) {
    e.preventDefault();

    if (!payload?.check_in || !payload?.check_out) {
      toast.error("Please select check-in and check-out dates");
      return;
    }

    if (!payment) {
      toast.error("Please select a payment method");
      return;
    }

    if (payment !== "cash" && !successPayment) {
      toast.error("Please complete payment first");
      return;
    }
    setLoadingBook(true);
    try {
      const res = await fetch(`${API_URL}/bookings/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (res.status === 409) {
        throw new Error(
          data?.message ||
            data?.error ||
            "Selected days are booked. Please select unbooked days"
        );
      }

      if (!res.ok && res.status !== 409) {
        throw new Error(
          data?.message ||
            data?.error ||
            "Booking request failed. Please try again."
        );
      }

      toast.success(
        payment === "cash"
          ? "Booking confirmed! Pay at check-in."
          : "Booking confirmed! Payment successful."
      );

      setRange(undefined);
      setPayment("");
      setSuccessPayment(false);
      setTimeout(() => {
        navigate(0);
      }, 1000);
    } catch (err) {
      toast.error(err.message || "Something went wrong. Please try again.");
    } finally {
      setLoadingBook(false);
    }
  }

  return (
    <Page>
      <Sticky pos={"top"}>
        <Navbar guest={guest} />
      </Sticky>
      {loading && <Loader loading={loading} />}
      {!loading && error && <p className="text-center text-red-500">{error}</p>}

      <Main style={"mb-6"}>
        {!loading && !error && (
          <>
            <ImageDetail room={room} />
            {hotel && (
              <div className="w-full h-[400px] mt-10 mb-10">
                <Map
                  latitude={Number(hotel.exact_location.latitude)}
                  longitude={Number(hotel.exact_location.longitude)}
                  location={hotel.address}
                />
              </div>
            )}

            <BookDatePrice
              range={range}
              setRange={setRange}
              price={room.price_per_night}
              unavDates={unavDates}
              authenticated={authenticated}
              totalPrice={totalPrice}
              setTotalPrice={setTotalPrice}
              handleBook={handleBook}
              setPayment={setPayment}
              payment={payment}
              loadingBook={loadingBook}
            />
          </>
        )}
      </Main>
      <Sticky pos={"bottom"}>
        <BottomNav />
      </Sticky>
      <Toaster
        position="top-center"
        reverseOrder={false}
        toastOptions={{
          duration: 5000,
        }}
      />
      {openMobile && (
        <MobilePaymentPopup
          handleClose={handleClose}
          totalPrice={totalPrice}
          setSuccessPayment={setSuccessPayment}
        />
      )}

      {openCard && (
        <CardPaymentPopup
          handleClose={handleCardClose}
          totalPrice={totalPrice}
          setSuccessPayment={setSuccessPayment}
        />
      )}
      {openMobile && <Backdrop handleOpenModal={handleClose} />}
      {openCard && <Backdrop handleOpenModal={handleCardClose} />}
    </Page>
  );
}

export default GuestRoomDetail;
