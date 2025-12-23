import BottomNav from "../components/ui/BottomNav";
import Navbar from "../components/ui/Navbar";
import Page from "../components/layout/Page";
import Sticky from "../components/layout/Sticky";
import Main from "../components/layout/MainLayout";
import RoomCardContainer from "../components/cards/RoomCardContainer";
import RoomCard from "../components/cards/RoomCard";
import SectionHeader from "../components/ui/SectionHeader";

function WishList() {
  return (
    <Page>
      <Sticky pos={"top"}>
        <Navbar />
      </Sticky>
      <Main>
        <SectionHeader style={"mt-4"}>WishList</SectionHeader>
        <RoomCardContainer>
          {/* {hotelRooms.map((room, i) => (
            <RoomCard room={room} key={i} />
          ))} */}
        </RoomCardContainer>
      </Main>
      <Sticky pos={"bottom"}>
        <BottomNav />
      </Sticky>
    </Page>
  );
}

export default WishList;
