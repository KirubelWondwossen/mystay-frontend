import { Link } from "react-router-dom";
import { HeartIcon } from "@heroicons/react/24/outline";
import RatingStars from "../ui/RatingStars";

function RoomCard({ room }) {
  return (
    <div className="flex flex-col rounded-xl bg-white overflow-hidden shadow-sm hover:shadow-lg transition duration-300">
      <div className="relative h-56 overflow-hidden">
        <img
          src={
            room.image_url
              ? `http://127.0.0.1:8000${room.image_url}`
              : "/images/placeholder.webp"
          }
          alt="Room image"
          className="w-full h-full object-cover"
        />
        <HeartIcon className="w-7 cursor-pointer absolute right-4 top-4 text-white drop-shadow" />
        <div className="absolute left-4 top-4 flex gap-2">
          <span className="bg-black/60 text-white text-xs px-3 py-1 rounded-full">
            {room.room_type[0].toUpperCase() + room.room_type.slice(1)}
          </span>
          <span className="bg-black/60 text-white text-xs px-3 py-1 rounded-full">
            {room.bed_type[0].toUpperCase() + room.bed_type.slice(1)} Bed
          </span>
        </div>
      </div>

      <div className="p-4 flex flex-col gap-2 text-left">
        <div className="flex items-center gap-1">
          <h3 className="text-lg font-heading font-semibold text-tSecondary">
            {room.hotel.name} ·{" "}
          </h3>
          <RatingStars star={room.hotel.rating} w={"4"} />
        </div>

        <p className="text-sm text-tTertiary line-clamp-2">
          {room.hotel.address}
        </p>
        <div className="mt-3 flex items-center justify-between">
          <p className="text-lg font-semibold text-tSecondary">
            ${room.price_per_night}
            <span className="text-sm font-normal text-tTertiary"> / Night</span>
          </p>
          <Link to={`/roomdetailpage`}>
            <button className="px-4 py-2 text-sm rounded-lg bg-primary text-white hover:bg-primary/90 transition">
              Book Now
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default RoomCard;
