import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

import {
  ArrowDownOnSquareIcon,
  EllipsisVerticalIcon,
  EyeIcon,
  TrashIcon,
  CheckCircleIcon,
} from "@heroicons/react/24/outline";
import { formatDateToReadable } from "../../utils/formatDateToReadable";

const statusColors = {
  confirmed: "#dcfce7",
  pending: "#FEF9C3",
  cancelled: "#FECACA",
  completed: "#e0f2fe",
};
const statusTxtColors = {
  pending: "#D97706",
  confirmed: "#15803d",
  cancelled: "#B91C1C",
  completed: "#0369a1",
};
function ManagerBookingsTable({
  data,
  room,
  handleCheckin,
  handleCancelBookings,
  handleComplete,
}) {
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

  const currentRoom = room.find((r) => r.id === data.room_id);

  return (
    <div className="relative grid-cols-[0.6fr_2fr_2.4fr_1.4fr_1fr_3.2rem] gap-2 text-tSecondary font-heading grid p-2 items-center border border-t-0 border-[#e5e7eb] bg-white">
      <span className="justify-self-start">{currentRoom.room_number}</span>
      <NameDate main={data.guest.full_name} sub={data.guest.email} />
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
      <BookingOption
        popup={popup}
        popupRef={popupRef}
        id={data.id}
        handleCancelBookings={handleCancelBookings}
        handleCheckin={handleCheckin}
        handleComplete={handleComplete}
        status={data.status}
      />
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

function BookingOption({
  popup,
  popupRef,
  id,
  handleCancelBookings,
  handleCheckin,
  status,
  handleComplete,
}) {
  return (
    <div
      ref={popupRef}
      className={`${
        popup ? "visible" : "invisible"
      } bg-white w-36 shadow-lg rounded-md flex flex-col z-50 absolute right-0 top-[75%]`}
    >
      <Link to={`/booking/${id}`}>
        <IconDetail icon={EyeIcon} detail="Details" />
      </Link>

      {status === "pending" && (
        <>
          <IconDetail
            icon={ArrowDownOnSquareIcon}
            detail="Check-in"
            onClick={handleCheckin}
            id={id}
          />

          <IconDetail
            icon={TrashIcon}
            detail="Cancel"
            onClick={handleCancelBookings}
            id={id}
          />
        </>
      )}

      {status === "confirmed" && (
        <>
          <IconDetail
            icon={CheckCircleIcon}
            detail="Complete"
            onClick={handleComplete}
            id={id}
          />

          <IconDetail
            icon={TrashIcon}
            detail="Cancel"
            onClick={handleCancelBookings}
            id={id}
          />
        </>
      )}
    </div>
  );
}

// eslint-disable-next-line
function IconDetail({ icon: Icon, detail, onClick, id }) {
  return (
    <div
      className="flex gap-2 hover:bg-[#f9fafb] cursor-pointer p-2"
      onClick={() => onClick(id)}
    >
      <Icon className="w-4" />
      <span className="font-body text-xs">{detail}</span>
    </div>
  );
}

export default ManagerBookingsTable;
