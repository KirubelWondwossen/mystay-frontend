import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

import Footer from "../components/layout/Footer";
import Navbar from "../components/ui/Navbar";
import BottomNav from "../components/ui/BottomNav";
import RoomCard from "../components/cards/RoomCard";
import RoomCardContainer from "../components/cards/RoomCardContainer";
import Search from "../components/search/Search";
import Sticky from "../components/layout/Sticky";
import Backdrop from "../components/ui/Backdrop";
import Filter from "../components/search/Filter";
import Page from "../components/layout/Page";
import Main from "../components/layout/MainLayout";
import { Loader } from "../components/ui/Loader";
import { getGuestProfile, getRooms } from "../services/getAPi";
import { EmptyState } from "../components/ui/EmptyState";
import { getCookie } from "../utils/getCookie";

const sortOptions = [
  { value: "name-asc", text: "A–Z" },
  { value: "name-desc", text: "Z–A" },
  { value: "regularPrice-asc", text: "Price ↑" },
  { value: "regularPrice-desc", text: "Price ↓" },
];

function UserDasboard() {
  const [openModal, setOpenModal] = useState(false);
  const [rooms, setRooms] = useState([]);
  const [filteredRooms, setFilteredRooms] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [guest, setGuest] = useState();
  const filterType = searchParams.get("filter") || "all";
  const sortBy = searchParams.get("sortBy") || "name-asc";
  const accessToken = getCookie("access_token");
  useEffect(() => {
    const loadGuest = async () => {
      if (!accessToken) return;

      setLoading(true);
      try {
        const guestData = await getGuestProfile(accessToken);
        setGuest(guestData);
      } catch (e) {
        setGuest(null);
        setError("User not authenticated, booking disabled");
        console.log("User not authenticated", e);
      } finally {
        setLoading(false);
      }
    };

    loadGuest();
  }, [accessToken]);

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        const roomData = await getRooms();
        setRooms(roomData);
      } catch (e) {
        setError(e.message);
        toast.error(e.message);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  useEffect(() => {
    let updatedRooms = [...rooms];

    if (filterType.toLowerCase() !== "all") {
      updatedRooms = updatedRooms.filter(
        (room) => room.bed_type?.toLowerCase() === filterType.toLowerCase()
      );
    }

    if (sortBy === "name-asc")
      updatedRooms.sort((a, b) => a.hotel.name.localeCompare(b.hotel.name));
    if (sortBy === "name-desc")
      updatedRooms.sort((a, b) => b.hotel.name.localeCompare(a.hotel.name));
    if (sortBy === "regularPrice-asc")
      updatedRooms.sort((a, b) => a.price_per_night - b.price_per_night);
    if (sortBy === "regularPrice-desc")
      updatedRooms.sort((a, b) => b.price_per_night - a.price_per_night);
    setFilteredRooms(updatedRooms);
  }, [rooms, filterType, sortBy]);

  function handleFilter(selectedFilter) {
    if (selectedFilter.toLowerCase() === "all") searchParams.delete("filter");
    else searchParams.set("filter", selectedFilter);
    setSearchParams(searchParams);
  }

  function handleSort(option) {
    searchParams.set("sortBy", option);
    setSearchParams(searchParams);
  }

  function handleOpenModal() {
    setOpenModal((openModal) => !openModal);
  }

  return (
    <Page>
      {openModal && <Backdrop handleOpenModal={handleOpenModal} />}
      {openModal && (
        <Filter
          filterType={filterType}
          handleOpenModal={handleOpenModal}
          handleFilter={handleFilter}
        />
      )}
      <Sticky pos={"top"}>
        <Navbar
          handleOpenModal={handleOpenModal}
          filterTxt={filterType[0].toUpperCase() + filterType.slice(1)}
          sortBy={sortBy}
          sortOptions={sortOptions}
          handleSort={handleSort}
          guest={guest}
        />
      </Sticky>
      {loading && !error && <Loader loading />}

      <>
        <Main>
          {!loading && !error && (
            <>
              <Search />
              {filteredRooms.length === 0 && (
                <EmptyState
                  title={`There are no rooms by ${
                    filterType[0].toUpperCase() + filterType.slice(1)
                  } bed filter`}
                  description={"Please try another filter"}
                />
              )}
              {filteredRooms.length > 0 && (
                <RoomCardContainer>
                  {filteredRooms.map((room) => (
                    <RoomCard key={room.id} room={room} />
                  ))}
                </RoomCardContainer>
              )}
              <Footer />
            </>
          )}
        </Main>
        <Sticky pos={"bottom"}>
          <BottomNav />
        </Sticky>
      </>
    </Page>
  );
}

export default UserDasboard;
