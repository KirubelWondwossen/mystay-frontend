import AdminBtnList from "./AdminBtnList";
import { useLocation } from "react-router-dom";
import Logo from "./Logo";
import {
  HomeModernIcon,
  CalendarDateRangeIcon,
  HomeIcon,
  UsersIcon,
  Cog6ToothIcon,
} from "@heroicons/react/24/outline";

function AdminSidebar() {
  const location = useLocation();

  return (
    <aside className="w-52 py-5 flex flex-col gap-2 border-r items-start sticky top-[5rem] h-screen overflow-hidden">
      <Logo className={"p-3"} />
      <AdminBtnList
        path={"/adminhome"}
        className={"w-full"}
        loc={location.pathname === "/adminhome"}
      >
        <Icon icon={HomeIcon} />
        <SideBtnName>Home</SideBtnName>
      </AdminBtnList>

      <AdminBtnList
        path={"/adminbookings"}
        className={"w-full"}
        loc={location.pathname === "/adminbookings"}
      >
        <Icon icon={CalendarDateRangeIcon} />
        <SideBtnName>Bookings</SideBtnName>
      </AdminBtnList>

      <AdminBtnList
        path={"/admincabins"}
        className={"w-full"}
        loc={location.pathname === "/admincabins"}
      >
        <Icon icon={HomeModernIcon} />
        <SideBtnName>Cabins</SideBtnName>
      </AdminBtnList>
      <AdminBtnList
        path={"/adminusers"}
        className={"w-full"}
        loc={location.pathname === "/adminusers"}
      >
        <Icon icon={UsersIcon} />
        <SideBtnName>Users</SideBtnName>
      </AdminBtnList>
      <AdminBtnList
        path={"/adminsettings"}
        className={"w-full"}
        loc={location.pathname === "/adminsettings"}
      >
        <Icon icon={Cog6ToothIcon} />
        <SideBtnName>Settings</SideBtnName>
      </AdminBtnList>
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

export default AdminSidebar;
