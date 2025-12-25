import {
  BuildingOffice2Icon,
  MapPinIcon,
  RectangleStackIcon,
  HomeModernIcon,
  CurrencyDollarIcon,
} from "@heroicons/react/24/outline";
import RatingStars from "../ui/RatingStars";
import { Link } from "react-router-dom";

export function RoomDetail({ room }) {
  return (
    <div className="flex flex-col items-start gap-4">
      <h4 className="text-4xl text-tSecondary px-3 t py-1 rounded-md font-heading absolute left-[30%] top-[8%] font-extrabold bg-white">
        Room {room.room_number}
      </h4>
      <TextIcon icon={BuildingOffice2Icon}>
        <div className="flex items-center gap-4">
          <Link to={`/hotel/${room.hotel_id}`}>
            <h3 className="text-2xl font-heading font-semibold text-tSecondary">
              {room.hotel?.name} ·{" "}
            </h3>
          </Link>
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
export function TextIcon({ children, icon: Icon }) {
  return (
    <div className="flex gap-3 items-center">
      <div className="flex gap-3 items-center">
        <Icon className="w-8" />
        {children}
      </div>
    </div>
  );
}

export function Description({ description }) {
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

// eslint-disable-next-line
export function Tag({ value, icon: Icon }) {
  return (
    <div className="bg-[#f9fafb] px-3 py-2 rounded-full flex gap-1 items-center">
      <Icon className="w-5" />

      <span className="text-tSecondary  font-semibold font-heading">
        {value}
      </span>
    </div>
  );
}
