import Page from "../layout/Page";
import Navbar from "../ui/Navbar";
import Sticky from "../layout/Sticky";
import Main from "../layout/MainLayout";
import BottomNav from "../ui/BottomNav";
import { useEffect, useState } from "react";
import { getGuestProfile, getHotel } from "../../services/getAPi";
import { getCookie } from "../../utils/getCookie";
import { Loader } from "../ui/Loader";
import { useParams } from "react-router-dom";

// Leaflet
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";
import { Map } from "../ui/Map";
import { HotelDetail } from "./HotelDetail";

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
  const accessToken = getCookie("access_token");
  const authenticated = Boolean(guest);
  const { id } = useParams();

  useEffect(() => {
    const load = async () => {
      setLoading(true);

      try {
        const guestData = await getGuestProfile(accessToken);
        setGuest(guestData);
      } catch (e) {
        setGuest(null);
        setError(e);
        console.log("User not authenticated, booking disabled");
      }

      try {
        const hotelData = await getHotel(id);
        setHotel(hotelData);
      } catch (e) {
        setHotel(null);
        setError(e);
        console.log("Hotel not found");
      }

      setLoading(false);
    };

    load();
  }, [accessToken, id]);

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
