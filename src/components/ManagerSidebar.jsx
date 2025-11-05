import ManagerBtnList from "./ManagerBtnList";
import { useLocation } from "react-router-dom";
import Logo from "./Logo";
import {
  HomeModernIcon,
  CalendarDateRangeIcon,
  HomeIcon,
  UsersIcon,
  Cog6ToothIcon,
} from "@heroicons/react/24/outline";

function ManagerSidebar() {
  const location = useLocation();

  return (
    <aside className="w-52 py-5 flex flex-col gap-2 border-r items-start sticky top-[5rem] h-screen overflow-hidden">
      <Logo className={"p-3"} />
      <ManagerBtnList
        path={"/managerhome"}
        className={"w-full"}
        loc={location.pathname === "/managerhome"}
      >
        <Icon icon={HomeIcon} />
        <SideBtnName>Home</SideBtnName>
      </ManagerBtnList>

      <ManagerBtnList
        path={"/managerbookings"}
        className={"w-full"}
        loc={location.pathname === "/managerbookings"}
      >
        <Icon icon={CalendarDateRangeIcon} />
        <SideBtnName>Bookings</SideBtnName>
      </ManagerBtnList>

      <ManagerBtnList
        path={"/managercabins"}
        className={"w-full"}
        loc={location.pathname === "/managercabins"}
      >
        <Icon icon={HomeModernIcon} />
        <SideBtnName>Cabins</SideBtnName>
      </ManagerBtnList>
      <ManagerBtnList
        path={"/managerusers"}
        className={"w-full"}
        loc={location.pathname === "/managerusers"}
      >
        <Icon icon={UsersIcon} />
        <SideBtnName>Users</SideBtnName>
      </ManagerBtnList>
      <ManagerBtnList
        path={"/managersettings"}
        className={"w-full"}
        loc={location.pathname === "/managersettings"}
      >
        <Icon icon={Cog6ToothIcon} />
        <SideBtnName>Settings</SideBtnName>
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

function Icon({ icon: Icon }) {
  return <Icon className="w-6 " />;
}

export default ManagerSidebar;
