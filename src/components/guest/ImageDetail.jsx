import { IMG_SRC } from "../../services/apiURl";
import { RoomDetail } from "./RoomDetail";

export function ImageDetail({ room }) {
  return (
    <div className=" grid grid-cols-[3fr_4fr] gap-20 border border-primary-800 py-3 px-10 mt-7 mb-8 relative">
      <img
        className="object-cover object-center aspect-[3/2]"
        src={
          room.image_url
            ? `${IMG_SRC}${room.image_url}`
            : "/images/placeholder.webp"
        }
      />
      <RoomDetail room={room} />
    </div>
  );
}
