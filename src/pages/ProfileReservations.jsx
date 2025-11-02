import { Link } from "react-router-dom";
import ProfileLayout from "../components/ProfileLayout";
import Subheader from "../components/Subheader";

function ProfileReservations() {
  return (
    <ProfileLayout>
      <Subheader>Your reservations</Subheader>
      <p className="font-body text-lg font-semibold">
        You have no reservations yet. Check out{" "}
        <Link to={"/"} className="text-primary font-heading underline">
          Luxury rooms →
        </Link>
      </p>
    </ProfileLayout>
  );
}

export default ProfileReservations;
