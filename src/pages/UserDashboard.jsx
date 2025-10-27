import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import RoomCard from "../components/RoomCard";
import RoomCardContainer from "../components/RoomCardContainer";
import Search from "../components/Search";

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
  return (
    <div className="container mx-auto flex flex-col items-center dark:bg-black">
      <Navbar />
      <Search />
      <RoomCardContainer>
        {hotelRooms.map((room) => (
          <RoomCard room={room} key={room.id} />
        ))}
      </RoomCardContainer>
      <Footer />
    </div>
  );
}

export default UserDasboard;
