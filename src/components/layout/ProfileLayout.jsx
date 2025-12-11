import BottomNav from "../ui/BottomNav";
import Navbar from "../manager/Navbar";
import Page from "./Page";
import ProfileSidebar from "./ProfileSidebar";
import Sticky from "./Sticky";

function ProfileLayout({ children }) {
  return (
    <Page>
      <Sticky pos={"top"}>
        <Navbar />
      </Sticky>

      <main className="grid grid-cols-[250px_1fr] w-full h-full my-6 overflow-hidden">
        <ProfileSidebar />

        <div className="p-6 flex flex-col items-start gap-6 overflow-y-auto h-[calc(100vh-8rem)] no-scrollbar">
          {children}
        </div>
      </main>

      <Sticky pos={"bottom"}>
        <BottomNav />
      </Sticky>
    </Page>
  );
}
export default ProfileLayout;
