import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { HeartIcon } from "@heroicons/react/24/outline";
import { HeartIcon as HeartIconSolid } from "@heroicons/react/24/solid";
import RatingStars from "../ui/RatingStars";
import { IMG_SRC } from "../../services/apiURl";

function RoomCard({ room, onRemove }) {
  const key = "hotelRooms";
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem(key) || "[]");
    setSaved(stored.some((r) => r.id === room.id));
  }, [room.id]);

  const toggleWishlist = () => {
    const stored = JSON.parse(localStorage.getItem(key) || "[]");

    if (saved) {
      const updated = stored.filter((r) => r.id !== room.id);
      localStorage.setItem(key, JSON.stringify(updated));
      setSaved(false);
      onRemove?.(room.id);
    } else {
      localStorage.setItem(key, JSON.stringify([...stored, room]));
      setSaved(true);
    }
  };

  return (
    <div className="flex flex-col rounded-xl bg-white overflow-hidden shadow-sm hover:shadow-lg transition duration-300">
      <div className="relative h-56 overflow-hidden">
        <img
          src={
            room.image_url
              ? `${IMG_SRC}${room.image_url}`
              : "/images/placeholder.webp"
          }
          alt="Room image"
          className="w-full h-full object-cover"
        />

        <div
          onClick={toggleWishlist}
          className="absolute right-4 top-4 cursor-pointer"
        >
          {saved ? (
            <HeartIconSolid className="w-7 text-red-500 drop-shadow" />
          ) : (
            <HeartIcon className="w-7 text-white drop-shadow" />
          )}
        </div>

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
          <Link to={`/hotel/${room.hotel_id}`}>
            <h3 className="text-lg font-heading font-semibold text-tSecondary">
              {room.hotel.name} ·
            </h3>
          </Link>
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

          <Link to={`/hotel/${room.hotel.id}/room/${room.id}`}>
            <button className="px-4 py-2 text-sm rounded-lg bg-primary text-white">
              Book Now
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default RoomCard;
