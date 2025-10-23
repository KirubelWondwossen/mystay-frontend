import { Link } from "react-router-dom";
import { HeartIcon } from "@heroicons/react/24/outline";
import { StarIcon } from "@heroicons/react/16/solid";

function RoomCard() {
  return (
    <Link to={`/roomdetailpage`}>
      <div className="flex flex-col rounded-xl hover:scale-105 duration-300  gap-4 bg-white overflow-hidden">
        <div className="overflow-hidden h-64 rounded-xl relative">
          <HeartIcon className="w-7 cursor-pointer absolute right-[5%] top-[5%] text-white" />
          <img
            className="transition-transform w-full"
            src="/images/img-3.jpg"
            alt="Alt"
          />
        </div>
        <div className="pb-5 text-left">
          <h3 className="sm:text-lg md:text-xl font-heading font-semibold">
            Standard Queen Room
          </h3>
          <div className="flex gap-3 items-center">
            <p className="font-body text-[#6A6A6A]">$100 per night</p>
            <div className="flex gap-1 items-center">
              <StarIcon className="text-[#6A6A6A] w-4" />
              <p className="font-body text-[#6A6A6A]">4.5</p>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default RoomCard;
