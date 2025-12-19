import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import {
  EllipsisVerticalIcon,
  EyeIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";

function AdminManagerListTable({ data }) {
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
    <div className="relative grid-cols-[2fr_1.6fr_1.6fr_2fr_0.6fr] gap-2 text-tSecondary font-heading grid p-2 items-center border border-t-0 border-[#e5e7eb] bg-white">
      <NameDate main={data.name} sub={data.email} />
      <NameDate
        main={data.hotel_name || "Not yet"}
        sub={data.hotel_address || "Not yet"}
      />

      <div className="flex justify-between w-full mr-2">
        <span className="px-2">{data.phone}</span>
        <EllipsisVerticalIcon
          ref={iconRef}
          className="w-5 cursor-pointer hover:bg-[#f9fafb] rounded-sm"
          onClick={handlePopup}
        />
      </div>

      <BookingOption popup={popup} popupRef={popupRef} appId={data.id} />
    </div>
  );
}

function NameDate({ main, sub }) {
  return (
    <div className="flex flex-col items-start justify-self-start px-2">
      <span className="text-sm">{main}</span>
      <span className="text-tTertiary font-body text-xs">{sub}</span>
    </div>
  );
}

function BookingOption({ popup, popupRef, appId }) {
  return (
    <div
      ref={popupRef}
      className={`${
        popup ? "visible" : "invisible"
      } bg-white w-36 shadow-lg rounded-md flex flex-col z-50 absolute right-[18%] top-[20%]`}
    >
      <Link to={`/manager/${appId}`}>
        <IconDetail icon={EyeIcon} detail={"Details"} />
      </Link>
    </div>
  );
}

// eslint-disable-next-line
function IconDetail({ icon: Icon, detail }) {
  return (
    <div className="flex gap-2 hover:bg-[#f9fafb] cursor-pointer p-2">
      <Icon className="w-4" />
      <span className="font-body text-xs">{detail}</span>
    </div>
  );
}

export default AdminManagerListTable;
