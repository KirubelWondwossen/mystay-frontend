import {
  InformationCircleIcon,
  UserCircleIcon,
} from "@heroicons/react/16/solid";
import { HeartIcon } from "@heroicons/react/24/outline";
import { HomeIcon } from "@heroicons/react/24/solid";
import { useLocation } from "react-router-dom";
import BtnList from "./BtnList";

function BottomNav() {
  const location = useLocation();
  return (
    <nav className="shadow-sm flex gap-6 border-t w-full justify-center">
      <BtnList path={"/"} loc={location.pathname === "/"}>
        <Icon icon={HomeIcon} />
        <BtnName>Home</BtnName>
      </BtnList>
      <BtnList path={"/about"} loc={location.pathname === "/about"}>
        <Icon icon={InformationCircleIcon} />
        <BtnName>About</BtnName>
      </BtnList>
      <BtnList path={"/profile"} loc={location.pathname === "/profile"}>
        <Icon icon={UserCircleIcon} />
        <BtnName>Profile</BtnName>
      </BtnList>
      <BtnList path={"/wishlist"} loc={location.pathname === "/wishlist"}>
        <Icon icon={HeartIcon} />
        <BtnName>WishList</BtnName>
      </BtnList>
    </nav>
  );
}

function Icon({ icon: Icon }) {
  return <Icon className="w-6" />;
}

function BtnName({ children }) {
  return (
    <span className="font-semibold cursor-pointer no-underline font-heading">
      {children}
    </span>
  );
}
export default BottomNav;
