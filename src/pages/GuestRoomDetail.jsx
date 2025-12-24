import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "react-day-picker/dist/style.css";
import toast, { Toaster } from "react-hot-toast";

import Page from "../components/layout/Page";
import Navbar from "../components/ui/Navbar";
import Sticky from "../components/layout/Sticky";
import Main from "../components/layout/MainLayout";
import BottomNav from "../components/ui/BottomNav";
import {
  getGuestProfile,
  getRoomDetail,
  getUnavailableDates,
} from "../services/getAPi";
import { Loader } from "../components/ui/Loader";
import { getCookie } from "../utils/getCookie";
import { formatDateToYMD } from "../utils/formatDateToYMD";
import Backdrop from "../components/ui/Backdrop";
import { ImageDetail } from "../components/guest/ImageDetail";
import { BookDatePrice } from "../components/guest/BookDatePrice";
import { CardPaymentPopup } from "../components/guest/CardPaymentPopup";
import { MobilePaymentPopup } from "../components/guest/MobilePaymentPopup";
function GuestRoomDetail() {
  const [guest, setGuest] = useState(null);
  const [room, setRoom] = useState({});
  const [totalPrice, setTotalPrice] = useState(0);

  const [payment, setPayment] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [range, setRange] = useState();
  const [unavDates, setUnavDates] = useState({
    unavailable_dates: [],
  });
  const [openMobile, setOpenMobile] = useState(false);
  const [successPayment, setSuccessPayment] = useState(false);
  const [openCard, setOpenCard] = useState(false);

  const authenticated = Boolean(guest);

  const { roomId, hotelId } = useParams();
  const accessToken = getCookie("access_token");
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
        const guestData = await getGuestProfile(accessToken);
        setGuest(guestData);
      } catch (e) {
        setGuest(null);
        console.log("User not authenticated, booking disabled");
      }

      setLoading(false);
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

    const payload = {
      check_in: formatDateToYMD(range.from),
      check_out: formatDateToYMD(range.to),
      room_id: roomId,
      payment_method: payment,
      total_price: totalPrice,
    };
  }, [payment, totalPrice, range, roomId]);

  useEffect(() => {
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
  }, [payment]);

  useEffect(() => {
    if (successPayment) {
      setOpenMobile(false);
      setOpenCard(false);
    }
  }, [successPayment]);

  // Fix this
  const handleClose = () => setOpenMobile(false);
  const handleCardClose = () => setOpenCard(false);

  function handleBook(e) {
    e.preventDefault();

    if (payment === "cash") {
      toast.success("Booking confirmed! Pay at check-in.");
      return;
    }

    if (!successPayment) {
      toast.error("Please complete payment first");
      return;
    }

    toast.success("Booking confirmed!");
  }

  return (
    <Page>
      <Sticky pos={"top"}>
        <Navbar guest={guest} authenticated={authenticated} />
      </Sticky>
      {loading && !error && <Loader loading={loading} />}
      <Main style={"mb-6"}>
        {!loading && !error && (
          <>
            <ImageDetail room={room} />
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
