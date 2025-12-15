import BottomNav from "../components/ui/BottomNav";
import Navbar from "../components/ui/Navbar";
import Page from "../components/layout/Page";
import Sticky from "../components/layout/Sticky";
import Main from "../components/layout/Main";
import RoomCardContainer from "../components/cards/RoomCardContainer";
import RoomCard from "../components/cards/RoomCard";
import SectionHeader from "../components/ui/SectionHeader";

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
];

function WishList() {
  return (
    <Page>
      <Sticky pos={"top"}>
        <Navbar />
      </Sticky>
      <Main>
        <SectionHeader style={"mt-4"}>WishList</SectionHeader>
        <RoomCardContainer>
          {hotelRooms.map((room, i) => (
            <RoomCard room={room} key={i} />
          ))}
        </RoomCardContainer>
      </Main>
      <Sticky pos={"bottom"}>
        <BottomNav />
      </Sticky>
    </Page>
  );
}

export default WishList;
