import ProfileLayout from "../components/ProfileLayout";
import SectionHeader from "../components/SectionHeader";

function ProfileHome() {
  return (
    <ProfileLayout>
      <SectionHeader style={"text-start"}>Hello, User</SectionHeader>
    </ProfileLayout>
  );
}

export default ProfileHome;
