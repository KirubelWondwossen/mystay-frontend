import { useEffect, useState } from "react";
import ProfileLayout from "../components/layout/ProfileLayout";
import Subheader from "../components/ui/Subheader";
import ErrorMessage from "../components/ui/ErrorMessage";
import { getCookie } from "../utils/getCookie";
import { getGuestProfile } from "../services/getAPi";
import { Loader } from "../components/ui/Loader";

function ProfileInfo() {
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
      {error && <ErrorMessage message={error} />}
      {!loading && !error && (
        <div>
          <Subheader>Update your profile</Subheader>
          <p className="font-body text-lg mt-4">
            Providing the following information will make your check-in process
            faster and smoother. See you soon!
          </p>
        </div>
      )}
      <Form guest={guest} />
    </ProfileLayout>
  );
}

function Form({ guest }) {
  if (!guest) return null;
  return (
    <form className="bg-gray-200 p-2 flex flex-col gap-4 w-full">
      <LabelInput label={"Full Name"} input={guest.full_name} />
      <LabelInput label={"Email"} input={guest.email} />
    </form>
  );
}

function LabelInput({ label, input, children }) {
  return (
    <div className="flex flex-col gap-2 items-start font-heading md:text-lg">
      <label>{label}</label>
      {input && (
        <input
          className="w-full bg-gray-300 placeholder-gray-800 p-2"
          type="text"
          placeholder={input}
          readOnly
        />
      )}
      {!input && children}
    </div>
  );
}

function Select({ country }) {
  return (
    <select className="w-full bg-gray-300 placeholder-gray-800 p-2">
      <option value="">Select Country</option>
      {country.map((el, i) => (
        <option key={i} value={el}>
          {el.name.common}
        </option>
      ))}
    </select>
  );
}

export default ProfileInfo;
