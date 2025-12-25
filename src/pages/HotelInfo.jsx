import Page from "../components/layout/Page";
import Navbar from "../components/ui/Navbar";
import Sticky from "../components/layout/Sticky";
import Main from "../components/layout/MainLayout";
import BottomNav from "../components/ui/BottomNav";
import { useEffect, useState } from "react";
import { getGuestProfile, getHotel, getRooms } from "../services/getAPi";
import { getCookie } from "../utils/getCookie";
import { Loader } from "../components/ui/Loader";
import { useParams } from "react-router-dom";

// Leaflet
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";
import { Map } from "../components/ui/Map";
import { HotelDetail } from "../components/hotel/HotelDetail";
import RoomCardContainer from "../components/cards/RoomCardContainer";
import RoomCard from "../components/cards/RoomCard";

import { EmptyState } from "../components/ui/EmptyState";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: icon,
  shadowUrl: iconShadow,
});

function HotelInfo() {
  const [guest, setGuest] = useState(null);
  const [hotel, setHotel] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [rooms, setRooms] = useState([]);

  const accessToken = getCookie("access_token");
  const authenticated = Boolean(guest);
  const { id } = useParams();

  useEffect(() => {
    const load = async () => {
      setLoading(true);

      if (!authenticated) return;
      try {
        const guestData = await getGuestProfile(accessToken);
        setGuest(guestData);
      } catch (e) {
        setGuest(null);
        setError(e);
        console.log("User not authenticated, booking disabled");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [accessToken, authenticated]);

  useEffect(() => {
    const load = async () => {
      setLoading(true);

      try {
        const hotelData = await getHotel(id);
        setHotel(hotelData);
      } catch (e) {
        setHotel(null);
        setError(e);
        console.log("Hotel not found");
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [id]);

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        const roomData = await getRooms();
        setRooms(roomData);
      } catch (e) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  return (
    <Page>
      <Sticky pos={"top"}>
        <Navbar guest={guest} authenticated={authenticated} />
      </Sticky>

      {loading && <Loader loading={loading} />}
      {!loading && error && <p className="text-center text-red-500">{error}</p>}

      {!loading && !error && (
        <Main>
          <ImageDetail>
            {hotel && hotel.exact_location && (
              <Map
                latitude={Number(hotel.exact_location.latitude)}
                longitude={Number(hotel.exact_location.longitude)}
                location={hotel.address}
              />
            )}
            <HotelDetail hotel={hotel} />
          </ImageDetail>
          <h3 className="font-heading text-4xl self-start text-tSecondary font-bold mb-6">
            Hotel Rooms
          </h3>
          {rooms.length ===
          (
            <EmptyState
              title={"No rooms"}
              description={"This hotel does not have rooms"}
            />
          )}
          <RoomCardContainer>
            {rooms.length > 0 &&
              rooms.map((room) => <RoomCard key={room.id} room={room} />)}
          </RoomCardContainer>
        </Main>
      )}

      <Sticky pos={"bottom"}>
        <BottomNav />
      </Sticky>
    </Page>
  );
}

function ImageDetail({ children }) {
  return (
    <div className="w-full grid grid-cols-[1fr_0.8fr] gap-20 border border-primary-800 py-3 px-10 mt-7 mb-8 relative">
      {children}
    </div>
  );
}

export default HotelInfo;
