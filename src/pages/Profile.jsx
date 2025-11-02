import { HomeIcon } from "@heroicons/react/24/solid";
import BottomNav from "../components/BottomNav";
import BtnList from "../components/BtnList";
import Navbar from "../components/Navbar";
import Page from "../components/Page";
import Sticky from "../components/Sticky";
import { Icon } from "../components/Icon";
import { NavBtnName } from "../components/NavBtnName";
import { useLocation } from "react-router-dom";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {
  CalendarDateRangeIcon,
  InformationCircleIcon,
} from "@heroicons/react/16/solid";

function Profile() {
  return (
    <Page>
      <Sticky pos={"top"}>
        <Navbar />
      </Sticky>
      <main className="overflow-y-auto h-screen container mx-auto no-scrollbar grid grid-cols-[1fr_4fr] my-6">
        <Sidebar />
        <Routes>
          {/* <Route path="/profilehome" element={<ProfileHome />} /> */}
        </Routes>
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
    <nav className="flex flex-col gap-3 border-r items-start">
      <BtnList
        path={"/profilehome"}
        className={"w-full"}
        loc={location.pathname === "/profilehome"}
      >
        <Icon icon={HomeIcon} />
        <NavBtnName>Home</NavBtnName>
      </BtnList>
      <BtnList
        path={"/profilehome"}
        className={"w-full"}
        loc={location.pathname === "/reservations"}
      >
        <Icon icon={CalendarDateRangeIcon} />
        <NavBtnName>Reservations</NavBtnName>
      </BtnList>
      <BtnList
        path={"/profilehome"}
        className={"w-full"}
        loc={location.pathname === "/userinfo"}
      >
        <Icon icon={InformationCircleIcon} />
        <NavBtnName>User Info</NavBtnName>
      </BtnList>
    </nav>
  );
}

export default Profile;
