import { HomeIcon } from "@heroicons/react/24/solid";
import BottomNav from "./BottomNav";
import BtnList from "./BtnList";
import Navbar from "./Navbar";
import Page from "./Page";
import Sticky from "./Sticky";
import { Icon } from "./Icon";
import { NavBtnName } from "./NavBtnName";
import { useLocation } from "react-router-dom";
import {
  CalendarDateRangeIcon,
  InformationCircleIcon,
} from "@heroicons/react/16/solid";

function ProfileLayout({ children }) {
  return (
    <Page>
      <Sticky pos={"top"}>
        <Navbar />
      </Sticky>
      <main className="overflow-y-auto h-screen container mx-auto no-scrollbar grid grid-cols-[1fr_4fr] my-6">
        <Sidebar />
        <div className="p-6 flex flex-col items-start gap-6">{children}</div>
      </main>
      <Sticky pos={"bottom"}>
        <BottomNav />
      </Sticky>
    </Page>
  );
}

function Sidebar() {
  const location = useLocation();

  return (
    <nav className="flex flex-col gap-2 border-r items-start">
      <BtnList
        path={"/profilehome"}
        className={"w-full"}
        loc={location.pathname === "/profilehome"}
      >
        <Icon icon={HomeIcon} />
        <NavBtnName>Home</NavBtnName>
      </BtnList>
      <BtnList
        path={"/profilereservations"}
        className={"w-full"}
        loc={location.pathname === "/profilereservations"}
      >
        <Icon icon={CalendarDateRangeIcon} />
        <NavBtnName>Reservations</NavBtnName>
      </BtnList>
      <BtnList
        path={"/profileinfo"}
        className={"w-full"}
        loc={location.pathname === "/profileinfo"}
      >
        <Icon icon={InformationCircleIcon} />
        <NavBtnName>User Info</NavBtnName>
      </BtnList>
    </nav>
  );
}

export default ProfileLayout;
