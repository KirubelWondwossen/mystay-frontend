import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

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
import Main from "../components/layout/Main";

const hotelRooms = [
  {
    id: 1,
    img: "/images/img-1.jpg",
    title: "Deluxe King Room",
    type: "King",
    price: "$100",
    rating: 4.5,
  },
  {
    id: 2,
    img: "/images/img-2.jpg",
    title: "Ocean View Suite",
    type: "King",
    price: "$100",
    rating: 4.5,
  },
  {
    id: 3,
    img: "/images/img-3.jpg",
    title: "Executive Twin Room",
    type: "Twin",
    price: "$100",
    rating: 4.5,
  },
  {
    id: 4,
    img: "/images/img-1.jpg",
    title: "Cozy Family Room",
    type: "Queen",
    price: "$100",
    rating: 4.5,
  },
  {
    id: 5,
    img: "/images/img-2.jpg",
    title: "Luxury Penthouse Suite",
    type: "King",
    price: "$100",
    rating: 4.5,
  },
  {
    id: 6,
    img: "/images/img-3.jpg",
    title: "Standard Queen Room",
    type: "Queen",
    price: "$100",
    rating: 4.5,
  },
  {
    id: 7,
    img: "/images/img-2.jpg",
    title: "City View Twin Room",
    type: "Twin",
    price: "$100",
    rating: 4.5,
  },
  {
    id: 8,
    img: "/images/img-3.jpg",
    title: "Classic Queen Room",
    type: "Queen",
    price: "$100",
    rating: 4.5,
  },
];

function UserDasboard() {
  const [openModal, setOpenModal] = useState(false);
  const [rooms, setRooms] = useState([]);
  const [filteredRooms, setFilteredRooms] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const filterType = searchParams.get("filter") || "All";

  // API call
  useEffect(() => {
    setRooms(hotelRooms);
  }, []);

  useEffect(() => {
    let updatedRooms = [...rooms];

    if (filterType !== "All") {
      updatedRooms = updatedRooms.filter((room) => room.type === filterType);
    }
    setFilteredRooms(updatedRooms);
  }, [rooms, filterType]);

  function handleFilter(selectedFilter) {
    if (selectedFilter === "All") searchParams.delete("filter");
    else searchParams.set("filter", selectedFilter);

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
        <Navbar handleOpenModal={handleOpenModal} />
      </Sticky>
      <Main>
        <Search />
        <RoomCardContainer>
          {filteredRooms.map((room) => (
            <RoomCard key={room.id} room={room} />
          ))}
        </RoomCardContainer>
        <Footer />
      </Main>
      <Sticky pos={"bottom"}>
        <BottomNav />
      </Sticky>
    </Page>
  );
}

export default UserDasboard;
