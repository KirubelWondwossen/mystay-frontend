import ManagerBtnList from "./ManagerBtnList";
import { useLocation } from "react-router-dom";
import Logo from "../ui/Logo";
import {
  HomeModernIcon,
  CalendarDateRangeIcon,
  HomeIcon,
  UsersIcon,
  BuildingOffice2Icon,
} from "@heroicons/react/24/outline";
import { useAuth } from "../../context/AuthContext";

function ManagerSidebar() {
  const location = useLocation();
  const { user } = useAuth();
  const id = user.id;

  return (
    <aside className="w-42 py-5 flex flex-col gap-2 border-r items-start sticky top-[5rem] h-screen overflow-hidden bg-white">
      <Logo className={"p-3"} />
      <ManagerBtnList
        path={"/manager/home"}
        className={"w-full"}
        loc={location.pathname === "/manager/home"}
      >
        <Icon icon={HomeIcon} color={location.pathname === "/manager/home"} />
        <SideBtnName>Home</SideBtnName>
      </ManagerBtnList>

      <ManagerBtnList
        path={"/manager/bookings"}
        className={"w-full"}
        loc={location.pathname === "/manager/bookings"}
      >
        <Icon
          icon={CalendarDateRangeIcon}
          color={location.pathname === "/manager/bookings"}
        />
        <SideBtnName>Bookings</SideBtnName>
      </ManagerBtnList>

      <ManagerBtnList
        path={"/manager/rooms"}
        className={"w-full"}
        loc={location.pathname === "/manager/rooms"}
      >
        <Icon
          icon={HomeModernIcon}
          color={location.pathname === "/manager/rooms"}
        />
        <SideBtnName>Rooms</SideBtnName>
      </ManagerBtnList>
      <ManagerBtnList
        path={`/manager/profile/${id}`}
        className={"w-full"}
        loc={location.pathname === `/manager/profile/${id}`}
      >
        <Icon
          icon={UsersIcon}
          color={location.pathname === `/manager/profile/${id}`}
        />
        <SideBtnName>Profile</SideBtnName>
      </ManagerBtnList>
      <ManagerBtnList
        path={"/manager/hotel/info"}
        className={"w-full"}
        loc={location.pathname === "/manager/hotel/info"}
      >
        <Icon
          icon={BuildingOffice2Icon}
          color={location.pathname === "/manager/hotel/info"}
        />
        <SideBtnName>Hotel Info</SideBtnName>
      </ManagerBtnList>
    </aside>
  );
}
function SideBtnName({ children }) {
  return (
    <span className={`text-sm cursor-pointer no-underline font-heading`}>
      {children}
    </span>
  );
}

// eslint-disable-next-line
function Icon({ icon: Icon, color }) {
  return <Icon className={`w-6 ${color && "text-primary"}`} />;
}

export default ManagerSidebar;
