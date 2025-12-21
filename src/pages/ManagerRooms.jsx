import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";

import {
  EllipsisVerticalIcon,
  PencilIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";

import toast, { Toaster } from "react-hot-toast";
import { EmptyState } from "../components/ui/EmptyState";
import { useAuth } from "../context/AuthContext";

import ManagerLayout from "../components/layout/ManagerLayout";
import ManagerTopComponents from "../components/manager/ManagerTopComponents";
import { ManagerFilterBy } from "../components/manager/ManagerFilterBy";
import { ManagerFilter } from "../components/manager/ManagerFilter";
import SortBy from "../components/ui/SortBy";
import Button from "../components/ui/Button";
import Backdrop from "../components/ui/Backdrop";
import ManagerAddRoomPopup from "../components/manager/ManagerAddRoomPopup";
import { getManagerInfo, getRooms } from "../services/getAPi";

const filterOptions = [
  { value: 1, type: "All" },
  { value: 2, type: "Queen" },
  { value: 3, type: "King" },
  { value: 4, type: "Twin" },
];
// const filterOptions = [
//   { type: "All" },
//   { type: "Standard" },
//   { type: "Single" },
//   { type: "Double" },
//   { type: "Suite" },
//   { type: "Deluxe" },
// ];
const sortOptions = [
  { value: "name-asc", text: "Sort by name (A-Z)" },
  { value: "name-desc", text: "Sort by name (Z-A)" },
  { value: "regularPrice-asc", text: "Sort by price (low first)" },
  { value: "regularPrice-desc", text: "Sort by price (high first)" },
];

const fields = ["Room", "Bed Type", "Room Type", "Price"];

function ManagerRooms() {
  const [rooms, setRooms] = useState([]);
  const [filteredRooms, setFilteredRooms] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [mode, setMode] = useState("create");
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();

  const sortBy = searchParams.get("sortBy") || "name-asc";
  const filter = searchParams.get("filter") || "All";
  const { token } = useAuth();
  const hasData = rooms.length > 0;
  const ref = useRef();

  useEffect(() => {
    if (!token) return;

    const load = async () => {
      try {
        setLoading(true);
        const manager = await getManagerInfo(token);
        ref.current = manager.hotel.id;

        const roomData = await getRooms(ref.current, token);

        setRooms(roomData);
        setFilteredRooms(roomData);
      } catch (e) {
        setError(e.message);
        toast.error(e.message);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [token]);

  useEffect(() => {
    let updatedRooms = [...rooms];

    if (filter !== "All") {
      updatedRooms = updatedRooms.filter(
        (room) => room.bed_type?.toLowerCase() === filter.toLowerCase()
      );
    }

    if (sortBy === "name-asc")
      updatedRooms.sort((a, b) => a.room_number.localeCompare(b.room_number));
    if (sortBy === "name-desc")
      updatedRooms.sort((a, b) => b.room_number.localeCompare(a.room_number));
    if (sortBy === "regularPrice-asc")
      updatedRooms.sort((a, b) => a.price_per_night - b.price_per_night);
    if (sortBy === "regularPrice-desc")
      updatedRooms.sort((a, b) => b.price_per_night - a.price_per_night);

    setFilteredRooms(updatedRooms);
  }, [sortBy, filter, rooms]);

  function handleOpenModal() {
    setOpenModal((prev) => !prev);
  }
  const handleCreateRoom = () => {
    setMode("create");
    setSelectedRoom(null);
    setOpenModal(true);
  };

  const handleEditRoom = (room) => {
    setMode("edit");
    setSelectedRoom(room);
    setOpenModal(true);
  };
  function handleCloseModal() {
    setOpenModal(false);
  }

  function handleFilter(selectedFilter) {
    console.log(selectedFilter);

    if (selectedFilter === "all") searchParams.delete("filter");
    else searchParams.set("filter", selectedFilter);

    setSearchParams(searchParams);
  }

  function handleSort(option) {
    searchParams.set("sortBy", option);
    setSearchParams(searchParams);
  }

  return (
    <ManagerLayout
      loading={loading}
      error={error}
      getData={getRooms}
      id={ref.current}
    >
      {!hasData && !error && !loading && (
        <EmptyState title={"No rooms yet"} description={"Add rooms"} />
      )}
      {!loading && !error && (
        <div className="max-w-[120rem] mx-auto flex flex-col gap-5">
          {hasData && (
            <>
              <ManagerTopComponents header={"All Bookings"}>
                <div className="flex gap-3">
                  <ManagerFilter>
                    {filterOptions.map((item, index) => (
                      <ManagerFilterBy
                        key={index}
                        filters={item.type}
                        handleFilter={handleFilter}
                      />
                    ))}
                  </ManagerFilter>
                  <SortBy
                    sortOptions={sortOptions}
                    sortBy={sortBy}
                    onChange={handleSort}
                  />
                </div>
              </ManagerTopComponents>
              <div>
                <Fields fields={fields} />
                {filteredRooms.map((el, i) => (
                  <Rooms rooms={el} key={i} handleEditRoom={handleEditRoom} />
                ))}
              </div>
            </>
          )}

          <Button
            className={`bg-primary rounded-lg p-2 text-white hover:bg-[#4338ca] ${
              !hasData && "self-center"
            }`}
            onClick={() => handleCreateRoom()}
          >
            Add new room
          </Button>
          {openModal && <Backdrop handleOpenModal={handleCloseModal} />}

          {openModal && (
            <ManagerAddRoomPopup
              handleOpenModal={handleOpenModal}
              id={ref.current}
              mode={mode}
              initialData={selectedRoom}
            />
          )}
        </div>
      )}
      <Toaster
        position="top-center"
        reverseOrder={false}
        toastOptions={{
          duration: 5000,
        }}
      />
    </ManagerLayout>
  );
}

function Fields({ fields }) {
  return (
    <div className="grid  grid-cols-[0.6fr_1.2fr_1fr_1fr_1fr_1fr] gap-2 border border-[#e5e7eb] rounded-t-sm">
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

function Rooms({ rooms, handleEditRoom }) {
  const [popup, setPopup] = useState(false);
  const popupRef = useRef(null);
  const iconRef = useRef(null);

  function handlePopup() {
    setPopup((prev) => !prev);
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
    <div className="relative grid grid-cols-[0.6fr_1.2fr_1fr_1fr_1fr_1fr] gap-5 text-tSecondary font-heading items-center border border-t-0 border-[#e5e7eb] bg-white">
      <img
        src={
          rooms.image_url
            ? `http://127.0.0.1:8000${rooms.image_url}`
            : "/placeholder.png"
        }
        alt="room"
        className="aspect-[3/2] object-cover object-center"
      />
      <span className="justify-self-start py-4">{rooms.room_number}</span>

      <span className="justify-self-start py-4 text-sm">
        {rooms.room_type.toUpperCase()}
      </span>
      <span className="justify-self-start py-4 text-sm ">
        {rooms.bed_type.toUpperCase()}
      </span>
      <span className="justify-self-start py-4 ml-2">
        ${rooms.price_per_night}
      </span>
      <EllipsisVerticalIcon
        ref={iconRef}
        className="w-5 cursor-pointer hover:bg-[#f9fafb] rounded-sm"
        onClick={handlePopup}
      />
      <BookingOption
        popup={popup}
        popupRef={popupRef}
        room={rooms}
        handleEditRoom={handleEditRoom}
      />
    </div>
  );
}

function BookingOption({ popup, popupRef, room, handleEditRoom }) {
  return (
    <div
      ref={popupRef}
      className={`${
        popup ? "visible" : "invisible"
      } bg-white w-36 shadow-lg rounded-md flex flex-col z-50 absolute right-0 top-[75%]`}
    >
      <IconDetail
        icon={PencilIcon}
        detail={"Edit"}
        onClick={() => handleEditRoom(room)}
      />
      <IconDetail icon={TrashIcon} detail={"Delete"} />
    </div>
  );
}

// eslint-disable-next-line
function IconDetail({ icon: Icon, detail, onClick }) {
  return (
    <div
      className="flex gap-2 hover:bg-[#f9fafb] cursor-pointer p-2"
      onClick={onClick}
    >
      <Icon className="w-4" />
      <span className="font-body text-xs">{detail}</span>
    </div>
  );
}

export default ManagerRooms;
