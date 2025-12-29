import { useEffect, useState } from "react";
import BottomNav from "../ui/BottomNav";
import Navbar from "../ui/Navbar";
import Page from "./Page";
import ProfileSidebar from "./ProfileSidebar";
import Sticky from "./Sticky";
import { getGuestProfile } from "../../services/getAPi";
import { Loader } from "../../components/ui/Loader";
import Button from "../ui/Button";
import { API_URL } from "../../services/apiURl";

function ProfileLayout({ children }) {
  const [guest, setGuest] = useState(null);
  const [loading, setLoading] = useState(true);

  const params = new URLSearchParams(window.location.search);
  const token = params.get("token");

  if (token) {
    localStorage.setItem("access_token", token);
    window.history.replaceState({}, "", "/");
  }
  const accessToken = localStorage.getItem("access_token");

  useEffect(() => {
    const loadGuest = async () => {
      if (!accessToken) {
        setLoading(false);
        return;
      }

      try {
        const guestData = await getGuestProfile(accessToken);
        setGuest(guestData);
      } catch {
        setGuest(null);
      } finally {
        setLoading(false);
      }
    };

    loadGuest();
  }, [accessToken]);

  const handleGoogleLogin = () => {
    window.location.href =
      `${API_URL}/auth/google/login` +
      `?redirect=http://127.0.0.1:5173${location.pathname}`;
  };

  return (
    <Page>
      <Sticky pos="top">
        <Navbar guest={guest} />
      </Sticky>

      <main className="grid grid-cols-[250px_1fr] w-full h-full my-6 overflow-hidden">
        <ProfileSidebar guest={guest} />

        <div className="p-6 flex flex-col gap-6 overflow-y-auto h-[calc(100vh-8rem)] no-scrollbar">
          {loading && <Loader loading />}

          {!loading && !guest && (
            <div className="flex flex-col items-center gap-4 mt-20">
              <h2 className="text-xl font-heading font-semibold">
                Login to access your profile
              </h2>

              <Button
                onClick={handleGoogleLogin}
                className="
    px-6 py-3
    rounded-xl
    border border-gray-300
    bg-white
    font-heading font-semibold
    text-gray-800
    hover:bg-gray-100
    hover:border-gray-400
    transition-colors
  "
              >
                Continue with Google
              </Button>
            </div>
          )}

          {!loading && guest && children}
        </div>
      </main>

      <Sticky pos="bottom">
        <BottomNav />
      </Sticky>
    </Page>
  );
}

export default ProfileLayout;
