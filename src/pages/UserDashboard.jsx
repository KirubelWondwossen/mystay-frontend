import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import BottomNav from "../components/BottomNav";
import RoomCard from "../components/RoomCard";
import RoomCardContainer from "../components/RoomCardContainer";
import Search from "../components/Search";
import Sticky from "../components/Sticky";
import Backdrop from "../components/Backdrop";
import Filter from "../components/Filter";
import { useState } from "react";
import Page from "../components/Page";

const hotelRooms = [
  {
    id: 1,
    img: "/images/img-1.jpg",
    title: "Deluxe King Room",
    price: "$100",
    rating: 4.5,
  },
  {
    id: 2,
    img: "/images/img-2.jpg",
    title: "Ocean View Suite",
    price: "$100",
    rating: 4.5,
  },
  {
    id: 3,
    img: "/images/img-3.jpg",
    title: "Executive Twin Room",
    price: "$100",
    rating: 4.5,
  },
  {
    id: 4,
    img: "/images/img-1.jpg",
    title: "Cozy Family Room",
    price: "$100",
    rating: 4.5,
  },
  {
    id: 5,
    img: "/images/img-2.jpg",
    title: "Luxury Penthouse Suite",
    price: "$100",
    rating: 4.5,
  },
  {
    id: 6,
    img: "/images/img-3.jpg",
    title: "Standard Queen Room",
    price: "$100",
    rating: 4.5,
  },
  {
    id: 5,
    img: "/images/img-2.jpg",
    title: "Luxury Penthouse Suite",
    price: "$100",
    rating: 4.5,
  },
  {
    id: 6,
    img: "/images/img-3.jpg",
    title: "Standard Queen Room",
    price: "$100",
    rating: 4.5,
  },
];

function UserDasboard() {
  const [openModal, setOpenModal] = useState(false);

  function handleOpenModal() {
    setOpenModal((openModal) => !openModal);
  }
  return (
    <Page>
      {openModal && <Backdrop handleOpenModal={handleOpenModal} />}
      {openModal && <Filter handleOpenModal={handleOpenModal} />}
      <Sticky pos={"top"}>
        <Navbar handleOpenModal={handleOpenModal} />
      </Sticky>
      <main className="flex-1 overflow-y-auto container mx-auto flex flex-col items-center no-scrollbar">
        <Search />
        <RoomCardContainer>
          {hotelRooms.map((room, i) => (
            <RoomCard room={room} key={i} />
          ))}
        </RoomCardContainer>
        <Footer />
      </main>
      <Sticky pos={"bottom"}>
        <BottomNav />
      </Sticky>
    </Page>
  );
}

export default UserDasboard;
