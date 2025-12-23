import { useEffect, useState } from "react";
import { DayPicker } from "react-day-picker";
import { useParams } from "react-router-dom";
import "react-day-picker/dist/style.css";
import toast, { Toaster } from "react-hot-toast";
import {
  BuildingOffice2Icon,
  MapPinIcon,
  RectangleStackIcon,
  HomeModernIcon,
  CurrencyDollarIcon,
} from "@heroicons/react/24/outline";
import { FaGoogle } from "react-icons/fa";

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
import RatingStars from "../components/ui/RatingStars";
import { Loader } from "../components/ui/Loader";
import { getDaysFromRange } from "../utils/getDaysFromRange";
import Button from "../components/ui/Button";
import { getCookie } from "../utils/getCookie";

function GuestRoomDetail() {
  const [guest, setGuest] = useState(null);
  const [room, setRoom] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [range, setRange] = useState();
  const [unavDates, setUnavDates] = useState({
    unavailable_dates: [],
  });

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
            />
          </>
        )}
      </Main>
      <Sticky pos={"bottom"}>
        <BottomNav />
      </Sticky>
    </Page>
  );
}

function ImageDetail({ room }) {
  return (
    <div className=" grid grid-cols-[3fr_4fr] gap-20 border border-primary-800 py-3 px-10 mt-7 mb-8 relative">
      <img
        className="object-cover object-center aspect-[3/2]"
        src={
          room.image_url
            ? `http://127.0.0.1:8000${room.image_url}`
            : "/images/placeholder.webp"
        }
      />
      <Detail room={room} />
    </div>
  );
}

function Detail({ room }) {
  return (
    <div className="flex flex-col items-start gap-4">
      <h4 className="text-4xl text-tSecondary px-3 t py-1 rounded-md font-heading absolute left-[30%] top-[8%] font-extrabold bg-white">
        Room {room.room_number}
      </h4>
      <TextIcon icon={BuildingOffice2Icon}>
        <div className="flex items-center gap-4">
          <h3 className="text-2xl font-heading font-semibold text-tSecondary">
            {room.hotel?.name} ·{" "}
          </h3>
          <RatingStars star={room.hotel?.rating} w={"6"} />
        </div>
      </TextIcon>
      <TextIcon icon={MapPinIcon}>
        <p className="text-lg text-tSecondary line-clamp-2">
          {room.hotel?.address}
        </p>
      </TextIcon>

      <TextIcon icon={CurrencyDollarIcon}>
        <p className="text-lg text-tSecondary  font-heading">
          ${room.price_per_night}/ Night
        </p>
      </TextIcon>
      <div className="flex gap-2">
        <Tag
          value={
            room.room_type
              ? room.room_type[0].toUpperCase() + room.room_type.slice(1)
              : ""
          }
          icon={HomeModernIcon}
        />
        <Tag
          value={
            room.bed_type
              ? room.bed_type[0].toUpperCase() + room.bed_type.slice(1)
              : ""
          }
          icon={RectangleStackIcon}
        />
      </div>
      <Description description={room.description} />
    </div>
  );
}
// eslint-disable-next-line
function Tag({ value, icon: Icon }) {
  return (
    <div className="bg-[#f9fafb] px-3 py-2 rounded-full flex gap-1 items-center">
      <Icon className="w-5" />

      <span className="text-tSecondary  font-semibold font-heading">
        {value}
      </span>
    </div>
  );
}

function BookDatePrice({ range, setRange, price, unavDates }) {
  return (
    <div className="grid grid-cols-[1.8fr_0.6fr] w-full">
      <DateSelector
        range={range}
        setRange={setRange}
        price={price}
        unavDates={unavDates}
      />
      <BookInfo />
    </div>
  );
}

function DateSelector({ range, setRange, price, unavDates }) {
  function handleClear() {
    setRange("");
  }

  const unavailableDates = unavDates.unavailable_dates.map((date) => {
    const d = new Date(date);
    d.setHours(0, 0, 0, 0);
    return d;
  });

  const disabledDays = [{ before: new Date() }, ...unavailableDates];

  return (
    <div className="flex flex-col w-fit">
      <DayPicker
        mode="range"
        selected={range}
        onSelect={setRange}
        numberOfMonths={2}
        disabled={disabledDays}
        className="font-heading"
        classNames={{
          today: "",
          selected: "bg-primary text-white hover:bg-primary ",
          range_start: "bg-primary text-white rounded-l-full",
          range_middle: "bg-primary text-white",
          range_end: "bg-primary text-white rounded-r-full",
        }}
      />

      <div className="bg-background2 p-6 flex gap-2 items-center">
        <span className="text-xl text-tSecondary font-heading">
          ${price} <span className="text-sm"> /night</span>
        </span>
        {range && (
          <>
            <span className="p-2 text-xl font-heading text-tSecondary">
              {getDaysFromRange(range)} days
            </span>
            <span className="p-2 text-xl font-heading text-tSecondary">
              Total ${+price * getDaysFromRange(range)}
            </span>
            <Button
              onClick={handleClear}
              className="py-1 px-2 ml-52 text-lg font-heading text-tSecondary border border-tSecondary rounded-lg"
            >
              Clear
            </Button>
          </>
        )}
      </div>
    </div>
  );
}

function BookInfo() {
  const handleGoogleLogin = () => {
    window.location.href =
      "http://127.0.0.1:8000/api/auth/google/login?redirect=http://localhost:5173/";
  };

  return (
    <div className="flex flex-col items-start justify-center w-full">
      <Button
        onClick={handleGoogleLogin}
        className="flex items-center gap-2 border px-4 py-2 rounded"
      >
        <FaGoogle className="w-8" />
        Continue with Google
      </Button>
    </div>
  );
}

// eslint-disable-next-line
function TextIcon({ children, icon: Icon }) {
  return (
    <div className="flex gap-3 items-center">
      <div className="flex gap-3 items-center">
        <Icon className="w-8" />
        {children}
      </div>
    </div>
  );
}

function Description({ description }) {
  return (
    <div className={`flex flex-col gap-2 items-start px-4`}>
      <span className="font-heading text-tSecondary font-semibold text-xl">
        About
      </span>
      <p
        className={`font-body text-tPrimary text-start max-w-lg leading-relaxed `}
      >
        {description}
      </p>
    </div>
  );
}
export default GuestRoomDetail;
