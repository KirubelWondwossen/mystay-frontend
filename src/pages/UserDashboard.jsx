import Navbar from "../components/Navbar";
import RoomCard from "../components/RoomCard";
import RoomCardContainer from "../components/RoomCardContainer";
import Search from "../components/Search";

const hotelRooms = [
  {
    id: 1,
    img: "/images/img-1.jpeg",
    title: "Deluxe King Room",
  },
  {
    id: 2,
    img: "/images/img-2.jpeg",
    title: "Ocean View Suite",
  },
  {
    id: 3,
    img: "/images/img-3.jpeg",
    title: "Executive Twin Room",
  },
  {
    id: 4,
    img: "/images/img-1.jpeg",
    title: "Cozy Family Room",
  },
  {
    id: 5,
    img: "/images/img-2.jpeg",
    title: "Luxury Penthouse Suite",
  },
  {
    id: 6,
    img: "/images/img-3.jpeg",
    title: "Standard Queen Room",
  },
];

function UserDasboard() {
  return (
    <div className="container mx-auto flex flex-col items-center">
      <Navbar />
      <Search />
      <RoomCardContainer>
        {/* {hotelRooms.forEach((room) => {
          <RoomCard room={room} key={room.id} />;
        })} */}
        <RoomCard />
        <RoomCard />
      </RoomCardContainer>
    </div>
  );
}

export default UserDasboard;
