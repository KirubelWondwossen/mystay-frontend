import { Link } from "react-router-dom";
import ManagerSidebar from "./ManagerSidebar";
import {
  ArrowRightStartOnRectangleIcon,
  MoonIcon,
  UserIcon,
} from "@heroicons/react/24/outline";

function AdminLayout({ children }) {
  return (
    <div className="flex w-full h-screen overflow-hidden bg-background2">
      <div className="w-1/5 h-full">
        <ManagerSidebar />
      </div>

      <div className="flex flex-col flex-1 h-full">
        <ManagerNav />
        <main className="flex-1">{children}</main>
      </div>
    </div>
  );
}

function ManagerNav() {
  return (
    <nav className="bg-white border-b flex justify-end w-full">
      <ManagerProfile />
      <ManagerNavIcons />
    </nav>
  );
}

function ManagerNavContainer({ children, className }) {
  return <div className={`${className} flex items-center`}>{children}</div>;
}

function ManagerProfile() {
  return (
    <ManagerNavContainer className={"gap-2 p-3"}>
      <img
        src="/profile-pic.jpg"
        alt="profile picture"
        className="w-8 rounded-full"
      />
      <p className="font-body text-sm">Manager</p>
    </ManagerNavContainer>
  );
}

function ManagerNavIcons() {
  return (
    <ManagerNavContainer className="gap-1">
      <Link
        to={"/managerprofile"}
        className="p-1 hover:bg-background rounded-sm"
      >
        <Icon icon={UserIcon} />
      </Link>
      <Icon icon={MoonIcon} />
      <Icon icon={ArrowRightStartOnRectangleIcon} />
    </ManagerNavContainer>
  );
}

function Icon({ icon: Icon }) {
  return (
    <span className="p-1 cursor-pointer hover:bg-background rounded-sm">
      <Icon className="w-5 text-primary" />
    </span>
  );
}

export default AdminLayout;
