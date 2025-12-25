import { getCookie } from "../utils/getCookie";
import ProfileLayout from "../components/layout/ProfileLayout";
import Subheader from "../components/ui/Subheader";
import { useEffect, useState } from "react";
import { getGuestProfile } from "../services/getAPi";
import { Loader } from "../components/ui/Loader";
import ErrorMessage from "../components/ui/ErrorMessage";

function ProfileHome() {
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
    <ProfileLayout>
      {loading && <Loader loading={loading} />}
      {!loading && error && <ErrorMessage message={error} />}
      {!loading && guest && !error && (
        <Subheader>Hello, {guest.full_name}</Subheader>
      )}
    </ProfileLayout>
  );
}

export default ProfileHome;
