import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

import {
  ArrowDownOnSquareIcon,
  EllipsisVerticalIcon,
  EyeIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import { formatDateToReadable } from "../../utils/formatDateToReadable";

const statusColors = {
  confirmed: "#dcfce7",
  pending: "#FEF9C3",
  cancelled: "#FECACA",
};
const statusTxtColors = {
  pending: "#D97706",
  confirmed: "#15803d",
  cancelled: "#B91C1C",
};
function GuestReservationTable({ data }) {
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

  if (!data) return null;
  return (
    <div className="relative grid-cols-[1fr_1fr_1fr_1fr_3.2rem] gap-2 text-tSecondary font-heading grid p-2 items-center border border-t-0 border-[#e5e7eb] bg-white">
      <NameDate
        main={"From " + formatDateToReadable(data.check_in)}
        sub={"To " + formatDateToReadable(data.check_out)}
      />
      <span
        className="py-1 px-3 justify-self-start text-xs w-fit rounded-full"
        style={{
          backgroundColor: statusColors[data.status],
          color: statusTxtColors[data.status],
        }}
      >
        {data.status.toUpperCase()}
      </span>
      <div className="flex justify-between w-full ml-4">
        <span className="text-sm ">${data.total_price}</span>

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
      } bg-white w-fit  shadow-lg rounded-md flex flex-col z-50 absolute left-[72%] top-[20%]`}
    >
      <IconDetail icon={TrashIcon} detail={"Cancel reservation"} />
    </div>
  );
}

// eslint-disable-next-line
function IconDetail({ icon: Icon, detail }) {
  return (
    <div className="flex gap-2 hover:bg-[#f9fafb] cursor-pointer p-2">
      <Icon className="w-4" />
      <span className="font-heading text-sm">{detail}</span>
    </div>
  );
}

export default GuestReservationTable;
