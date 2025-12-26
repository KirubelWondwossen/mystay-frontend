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
        path={"/managerhome"}
        className={"w-full"}
        loc={location.pathname === "/managerhome"}
      >
        <Icon icon={HomeIcon} color={location.pathname === "/managerhome"} />
        <SideBtnName>Home</SideBtnName>
      </ManagerBtnList>

      <ManagerBtnList
        path={"/managerbookings"}
        className={"w-full"}
        loc={location.pathname === "/managerbookings"}
      >
        <Icon
          icon={CalendarDateRangeIcon}
          color={location.pathname === "/managerbookings"}
        />
        <SideBtnName>Bookings</SideBtnName>
      </ManagerBtnList>

      <ManagerBtnList
        path={"/managerrooms"}
        className={"w-full"}
        loc={location.pathname === "/managerrooms"}
      >
        <Icon
          icon={HomeModernIcon}
          color={location.pathname === "/managerrooms"}
        />
        <SideBtnName>Rooms</SideBtnName>
      </ManagerBtnList>
      <ManagerBtnList
        path={`/managerprofile/${id}`}
        className={"w-full"}
        loc={location.pathname === `/managerprofile/${id}`}
      >
        <Icon
          icon={UsersIcon}
          color={location.pathname === `/managerprofile/${id}`}
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
