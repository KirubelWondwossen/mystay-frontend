import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

import {
  ArrowDownOnSquareIcon,
  EllipsisVerticalIcon,
  EyeIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";

function ManagerBookingsTable({ data }) {
  const [popup, setPopup] = useState(false);

  const popupRef = useRef(null);
  const iconRef = useRef(null);

  function handlePopup() {
    setPopup((el) => !el);
  }

  useEffect(() => {
    function handleClickOutside(e) {
      if (
        popup &&
        popupRef.current &&
        !popupRef.current.contains(e.target) &&
        iconRef.current &&
        !iconRef.current.contains(e.target)
      ) {
        setPopup(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [popup]);

  return (
    <div className="relative grid-cols-[0.6fr_2fr_2.4fr_1.4fr_1fr_3.2rem] gap-2 text-tSecondary font-heading grid p-2 items-center border border-t-0 border-[#e5e7eb] bg-white">
      <span className="justify-self-start">{data.room}</span>

      <NameDate main={data.guest} sub={data.email} />
      <NameDate main={data.stay} sub={data.dates} />

      <span className="py-1 px-3 text-[#0369a1] justify-self-start text-sm w-fit rounded-full bg-[#e0f2fe]">
        {data.type}
      </span>

      <div className="flex justify-between w-full ml-4">
        <span className="text-sm ">${data.amount}</span>

        <EllipsisVerticalIcon
          ref={iconRef}
          className="w-5 cursor-pointer hover:bg-[#f9fafb] rounded-sm"
          onClick={handlePopup}
        />
      </div>

      <BookingOption popup={popup} popupRef={popupRef} />
    </div>
  );
}

function NameDate({ main, sub }) {
  return (
    <div className="flex flex-col items-start w-fit">
      <span className="text-sm">{main}</span>
      <span className="text-tTertiary font-body text-xs">{sub}</span>
    </div>
  );
}

function BookingOption({ popup, popupRef }) {
  return (
    <div
      ref={popupRef}
      className={`${
        popup ? "visible" : "invisible"
      } bg-white w-36 shadow-lg rounded-md flex flex-col z-50 absolute right-0 top-[75%]`}
    >
      <Link to={"/managerbookingsdetail"}>
        <IconDetail icon={EyeIcon} detail={"Details"} />
      </Link>
      <IconDetail icon={ArrowDownOnSquareIcon} detail={"Check-in"} />
      <IconDetail icon={TrashIcon} detail={"Delete"} />
    </div>
  );
}

//Ignore
function IconDetail({ icon: Icon, detail }) {
  return (
    <div className="flex gap-2 hover:bg-[#f9fafb] cursor-pointer p-2">
      <Icon className="w-4" />
      <span className="font-body text-xs">{detail}</span>
    </div>
  );
}

export default ManagerBookingsTable;
