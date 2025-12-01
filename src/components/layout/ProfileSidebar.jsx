import { Icon } from "../ui/Icon";
import { NavBtnName } from "../ui/NavBtnName";
import BtnList from "../ui/BtnList";
import { HomeIcon } from "@heroicons/react/24/solid";
import {
  CalendarDateRangeIcon,
  InformationCircleIcon,
} from "@heroicons/react/16/solid";
import { useLocation } from "react-router-dom";

function ProfileSidebar() {
  const location = useLocation();

  return (
    <aside className="flex flex-col gap-2 border-r items-start sticky top-[5rem] h-[calc(100vh-10rem)] overflow-hidden">
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
    </aside>
  );
}

export default ProfileSidebar;
