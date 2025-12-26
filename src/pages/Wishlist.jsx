import { useEffect, useState } from "react";
import BottomNav from "../components/ui/BottomNav";
import Navbar from "../components/ui/Navbar";
import Page from "../components/layout/Page";
import Sticky from "../components/layout/Sticky";
import Main from "../components/layout/MainLayout";
import RoomCardContainer from "../components/cards/RoomCardContainer";
import RoomCard from "../components/cards/RoomCard";
import { EmptyState } from "../components/ui/EmptyState";
import { getCookie } from "../utils/getCookie";
import { getGuestProfile } from "../services/getAPi";
import { Loader } from "../components/ui/Loader";
import ErrorMessage from "../components/ui/ErrorMessage";

function WishList() {
  const [rooms, setRooms] = useState([]);
  const [guest, setGuest] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
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
    const stored = JSON.parse(localStorage.getItem("hotelRooms") || "[]");
    setRooms(stored);
  }, []);

  const handleRemove = (id) => {
    setRooms((prev) => prev.filter((room) => room.id !== id));
  };

  return (
    <Page>
      <Sticky pos={"top"}>
        <Navbar guest={guest} />
      </Sticky>

      <Main>
        {loading && <Loader loading={loading} />}
        {error && <ErrorMessage message={error} />}
        {!loading && !error && (
          <>
            <h3 className="font-heading text-4xl text-start text-tSecondary font-bold mt-10">
              Wishlist
            </h3>
            {rooms.length === 0 && (
              <EmptyState
                title={"No favorite rooms"}
                description={"Add rooms to favorite"}
              />
            )}
            {rooms.length > 0 && (
              <RoomCardContainer>
                {rooms.map((room) => (
                  <RoomCard key={room.id} room={room} onRemove={handleRemove} />
                ))}
              </RoomCardContainer>
            )}
          </>
        )}
      </Main>

      <Sticky pos={"bottom"}>
        <BottomNav />
      </Sticky>
    </Page>
  );
}

export default WishList;
