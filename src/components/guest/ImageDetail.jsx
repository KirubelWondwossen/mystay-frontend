import { useState } from "react";
import { RoomDetail } from "./RoomDetail";

export function ImageDetail({ room }) {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  if (!room) return null;

  return (
    <div className="grid grid-cols-[3fr_4fr] gap-20 border border-primary-800 py-3 px-10 mt-7 mb-8 relative">
      <div className="relative aspect-[3/2] bg-gray-100 overflow-hidden rounded-lg">
        {!loaded && !error && (
          <div className="absolute inset-0 animate-pulse bg-gray-300" />
        )}

        <img
          src={room.image_url}
          alt="room"
          loading="lazy"
          onLoad={() => setLoaded(true)}
          onError={(e) => {
            setError(true);
            e.currentTarget.src = "/images/placeholder.webp";
          }}
          className={`
            w-full h-full object-cover object-center
            transition-opacity duration-500
            ${loaded ? "opacity-100" : "opacity-0"}
          `}
        />
      </div>

      <RoomDetail room={room} />
    </div>
  );
}
