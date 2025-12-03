import { useEffect, useRef, useState } from "react";
import {
  EllipsisVerticalIcon,
  PencilIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";

import { ManagerFilterBy } from "../components/manager/ManagerFilterBy";
import ManagerLayout from "../components/layout/ManagerLayout";
import ManagerTopComponents from "../components/manager/ManagerTopComponents";
import { ManagerFilter } from "../components/manager/ManagerFilter";
import SortBy from "../components/ui/SortBy";

const rooms = [
  {
    id: "001",
    fits: "Fits up to 2",
    price: 250.0,
    type: "Queen",
    img: "/images/img-1.jpg",
  },
  {
    id: "002",
    fits: "Fits up to 2",
    price: 350.0,
    type: "King",
    img: "/images/img-2.jpg",
  },
  {
    id: "003",
    fits: "Fits up to 4",
    price: 300.0,
    type: "Twin",
    img: "/images/img-3.jpg",
  },
  {
    id: "004",
    fits: "Fits up to 4",
    price: 500.0,
    type: "Queen",
    img: "/images/img-1.jpg",
  },
  {
    id: "005",
    fits: "Fits up to 6",
    price: 350.0,
    type: "Twin",
    img: "/images/img-2.jpg",
  },
  {
    id: "006",
    fits: "Fits up to 6",
    price: 800.0,
    type: "King",
    img: "/images/img-3.jpg",
  },
  {
    id: "007",
    fits: "Fits up to 8",
    price: 600.0,
    type: "Queen",
    img: "/images/img-1.jpg",
  },
  {
    id: "008",
    fits: "Fits up to 10",
    price: 1400.0,
    type: "King",
    img: "/images/img-2.jpg",
  },
];

const filterOptions = [
  { value: 1, type: "All" },
  { value: 2, type: "Queen" },
  { value: 3, type: "King" },
  { value: 4, type: "Twin" },
];

const sortOptions = [
  {
    value: "name-asc",
    text: "Sort by name (A-Z)",
  },
  {
    value: "name-desc",
    text: "Sort by name (Z-A)",
  },
  {
    value: "regularPrice-asc",
    text: "Sort by price (low first)",
  },
  {
    value: "regularPrice-desc",
    text: "Sort by price (high first)",
  },
];

const fields = ["Room", "Type", "Capacity", "Price"];

function ManagerRooms() {
  const [active, setActive] = useState(1);
  const [filteredRooms, setFilteredRooms] = useState(rooms);

  function handleFilter(filter) {
    console.log(filter);

    if (filter === "All") return setFilteredRooms(rooms);
    const newRooms = rooms.filter((el) => el.type === filter);
    setFilteredRooms(newRooms);
  }
  return (
    <ManagerLayout>
      <div className="max-w-[120rem] mx-auto flex flex-col gap-[3.2rem]">
        <ManagerTopComponents header={"All Bookings"}>
          <div className="flex gap-3">
            <ManagerFilter>
              {filterOptions.map((item, index) => (
                <ManagerFilterBy
                  key={index}
                  value={item.value}
                  active={active}
                  setActive={setActive}
                  filters={item.type}
                  handleFilter={handleFilter}
                />
              ))}
            </ManagerFilter>
            <SortBy sortOptions={sortOptions} />
          </div>
        </ManagerTopComponents>
        <div>
          <Fields fields={fields} />
          {filteredRooms.map((el, i) => (
            <Rooms rooms={el} key={i} />
          ))}
        </div>
      </div>
    </ManagerLayout>
  );
}

function Fields({ fields }) {
  return (
    <div className="grid grid-cols-[0.6fr_1.8fr_2.2fr_1fr_1fr_1fr] gap-2 border border-[#e5e7eb] rounded-t-sm">
      <div></div>
      {fields.map((el, i) => (
        <div
          className="justify-self-start text-sm font-heading p-2 text-tSecondary font-semibold"
          key={i}
        >
          {el.toUpperCase()}
        </div>
      ))}
    </div>
  );
}

function Rooms({ rooms }) {
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
    <div className="relative grid grid-cols-[0.6fr_1.8fr_2.2fr_1fr_1fr_1fr] gap-5 text-tSecondary font-heading items-center border border-t-0 border-[#e5e7eb] bg-white">
      <img
        src={rooms.img}
        alt="room"
        className="aspect-[3/2] object-cover object-center"
      />
      <span className="justify-self-start py-4">{rooms.id}</span>
      <span className="justify-self-start py-4 text-sm">
        {rooms.type.toUpperCase()}
      </span>
      <span className="justify-self-start py-4 text-sm font-body">
        {rooms.fits}
      </span>
      <span className="justify-self-start py-4 ml-2">${rooms.price}</span>
      <EllipsisVerticalIcon
        ref={iconRef}
        className="w-5 cursor-pointer hover:bg-[#f9fafb] rounded-sm"
        onClick={handlePopup}
      />
      <BookingOption popup={popup} popupRef={popupRef} />
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
      <IconDetail icon={PencilIcon} detail={"Edit"} />
      <IconDetail icon={TrashIcon} detail={"Delete"} />
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

export default ManagerRooms;
