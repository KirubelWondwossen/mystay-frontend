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
import { getManagerInfo, getRoomsManager } from "../services/getAPi";
import { deleteRoom } from "../services/deleteAPI";

const filterOptions = [
  { value: 1, type: "All" },
  { value: 2, type: "Queen" },
  { value: 3, type: "King" },
  { value: 4, type: "Twin" },
];
const sortOptions = [
  { value: "name-asc", text: "Sort by name (A-Z)" },
  { value: "name-desc", text: "Sort by name (Z-A)" },
  { value: "regularPrice-asc", text: "Sort by price (low first)" },
  { value: "regularPrice-desc", text: "Sort by price (high first)" },
];

const fields = ["Room", "Room Type", "Bed Type", "Price"];

function ManagerRooms() {
  const [rooms, setRooms] = useState([]);
  const [filteredRooms, setFilteredRooms] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [mode, setMode] = useState("create");
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [roomToDelete, setRoomToDelete] = useState(null);
  const [refresh, setRefresh] = useState(false);

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

        const roomData = await getRoomsManager(ref.current, token);

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
  }, [token, refresh]);

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
  const handleOpenDelete = (room) => setRoomToDelete(room);
  const handleCloseDelete = () => setRoomToDelete(null);

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
    if (selectedFilter === "all") searchParams.delete("filter");
    else searchParams.set("filter", selectedFilter);

    setSearchParams(searchParams);
  }

  function handleSort(option) {
    searchParams.set("sortBy", option);
    setSearchParams(searchParams);
  }

  const handleDelete = async () => {
    if (!roomToDelete) return;

    setLoading(true);
    setError(null);

    try {
      await deleteRoom(ref.current, roomToDelete.id, token);
      setRooms((prev) => prev.filter((r) => r.id !== roomToDelete.id));
      toast.success("Room deleted successfully");
      setRoomToDelete(null);
    } catch (err) {
      const message = err.message || "Failed to delete room";
      setError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ManagerLayout
      loading={loading}
      error={error}
      getData={getRoomsManager}
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
                {filteredRooms.length > 0 && (
                  <>
                    {filteredRooms.map((el) => (
                      <Rooms
                        room={el}
                        key={el.id}
                        handleEditRoom={handleEditRoom}
                        handleOpenDelete={handleOpenDelete}
                        handleDelete={handleDelete}
                        handleCloseDelete={handleCloseDelete}
                      />
                    ))}
                  </>
                )}
                {filteredRooms.length === 0 && (
                  <EmptyState
                    title={`There are no rooms by ${filter}`}
                    description={"Please try another filter"}
                  />
                )}
              </div>
            </>
          )}

          <Button
            className={`bg-primary rounded-lg p-2 text-white hover:bg-[#4338ca] ${
              !hasData && "self-center"
            }`}
            onClick={handleCreateRoom}
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
              setRefresh={setRefresh}
            />
          )}

          {roomToDelete && (
            <>
              <Backdrop handleOpenModal={handleCloseDelete} />
              <WarningPopup
                handleDelete={handleDelete}
                handleCloseDelete={handleCloseDelete}
                room={roomToDelete}
              />
            </>
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

function Rooms({ room, handleEditRoom, handleOpenDelete }) {
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
          room.image_url
            ? `http://127.0.0.1:8000${room.image_url}`
            : "/placeholder.png"
        }
        alt="room"
        className="aspect-[3/2] object-cover object-center"
      />
      <span className="justify-self-start py-4">{room.room_number}</span>
      <span className="justify-self-start py-4 text-sm">
        {room.room_type.toUpperCase()}
      </span>
      <span className="justify-self-start py-4 text-sm ">
        {room.bed_type.toUpperCase()}
      </span>
      <span className="justify-self-start py-4 ml-2">
        ${room.price_per_night}
      </span>
      <EllipsisVerticalIcon
        ref={iconRef}
        className="w-5 cursor-pointer hover:bg-[#f9fafb] rounded-sm"
        onClick={handlePopup}
      />
      <BookingOption
        popup={popup}
        popupRef={popupRef}
        room={room}
        handleEditRoom={handleEditRoom}
        handleOpenDelete={handleOpenDelete}
      />
    </div>
  );
}

function BookingOption({
  popup,
  popupRef,
  room,
  handleEditRoom,
  handleOpenDelete,
}) {
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
      <IconDetail
        icon={TrashIcon}
        detail={"Delete"}
        onClick={() => handleOpenDelete(room)}
      />
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

function WarningPopup({ handleCloseDelete, handleDelete }) {
  return (
    <div
      className="fixed bg-white z-[1001] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
      rounded-xl shadow-lg w-64 mx-auto flex flex-col items-center gap-4 py-3 px-2"
    >
      <p className="text-tSecondary self-center font-medium font-heading text-xl">
        Are you sure?
      </p>
      <div className="flex items-center justify-center gap-8 w-full p-3 ">
        <Button
          type="button"
          className=" text-tSecondary border border-[#e5e7eb] hover:bg-[#f9fafb] py-2 px-5 rounded-xl text-xl"
          onClick={handleCloseDelete}
        >
          No
        </Button>

        <Button
          className="text-white py-2 px-5 rounded-xl text-xl bg-error hover:bg-[#a71919]"
          type="button"
          onClick={handleDelete}
        >
          Yes
        </Button>
      </div>
    </div>
  );
}
export default ManagerRooms;
