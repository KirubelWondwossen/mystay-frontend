import { useEffect, useState } from "react";
import BottomNav from "../ui/BottomNav";
import Navbar from "../ui/Navbar";
import Page from "./Page";
import ProfileSidebar from "./ProfileSidebar";
import Sticky from "./Sticky";
import { getCookie } from "../../utils/getCookie";
import { getGuestProfile } from "../../services/getAPi";
import { Loader } from "../../components/ui/Loader";
import ErrorMessage from "../ui/ErrorMessage";

function ProfileLayout({ children }) {
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
  return (
    <Page>
      <Sticky pos={"top"}>
        <Navbar guest={guest} />
      </Sticky>

      <main className="grid grid-cols-[250px_1fr] w-full h-full my-6 overflow-hidden">
        <ProfileSidebar />

        <div className="p-6 flex flex-col items-start gap-6 overflow-y-auto h-[calc(100vh-8rem)] no-scrollbar">
          {loading && <Loader loading={loading} />}
          {!loading && error && <ErrorMessage message={error} />}
          {!loading && !error && children}
        </div>
      </main>

      <Sticky pos={"bottom"}>
        <BottomNav />
      </Sticky>
    </Page>
  );
}
export default ProfileLayout;
