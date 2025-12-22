import { Children, useEffect, useState } from "react";
import { DayPicker } from "react-day-picker";
import { useParams } from "react-router-dom";
import "react-day-picker/dist/style.css";
import toast, { Toaster } from "react-hot-toast";
import {
  BuildingOffice2Icon,
  MapPinIcon,
  RectangleStackIcon,
  HomeModernIcon,
} from "@heroicons/react/24/outline";

import Page from "../components/layout/Page";
import Navbar from "../components/ui/Navbar";
import Sticky from "../components/layout/Sticky";
import Main from "../components/layout/Main";
import BottomNav from "../components/ui/BottomNav";
import { getRoomDetail } from "../services/getAPi";
import RatingStars from "../components/ui/RatingStars";
import { Loader } from "../components/ui/Loader";

function GuestRoomDetail() {
  const [room, setRoom] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { roomId, hotelId } = useParams();

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        const roomData = await getRoomDetail(roomId, hotelId);
        setRoom(roomData);
      } catch (e) {
        setError(e.message);
        toast.error(e.message);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [hotelId, roomId]);

  return (
    <Page>
      <Sticky pos={"top"}>
        <Navbar />
      </Sticky>
      {loading && !error && <Loader loading={loading} />}
      {!loading && !error && (
        <Main>
          <ImageDetail room={room} />
        </Main>
      )}
      <Sticky pos={"bottom"}>
        <BottomNav />
      </Sticky>
    </Page>
  );
}

function ImageDetail({ room }) {
  return (
    <div className=" grid grid-cols-[3fr_4fr] gap-20 border border-primary-800 py-3 px-10 mt-7 mb-24 relative">
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
function DateSelector() {
  const [range, setRange] = useState();

  return (
    <div>
      <DayPicker
        mode="range"
        selected={range}
        onSelect={setRange}
        numberOfMonths={2}
        disabled={{ before: new Date() }}
      />
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
