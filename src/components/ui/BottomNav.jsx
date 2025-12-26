import {
  InformationCircleIcon,
  UserCircleIcon,
} from "@heroicons/react/16/solid";
import { HeartIcon } from "@heroicons/react/24/outline";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { useLocation } from "react-router-dom";
import BtnList from "./BtnList";
import { Icon } from "./Icon";
import { NavBtnName } from "./NavBtnName";

function BottomNav() {
  const location = useLocation();
  return (
    <nav className="shadow-sm flex gap-6 border-t w-full justify-center">
      <BtnList path={"/"} loc={location.pathname === "/"}>
        <Icon icon={MagnifyingGlassIcon} />
        <NavBtnName>Explore</NavBtnName>
      </BtnList>
      <BtnList path={"/about"} loc={location.pathname === "/about"}>
        <Icon icon={InformationCircleIcon} />
        <NavBtnName>About</NavBtnName>
      </BtnList>
      <BtnList
        path={"/profile/home"}
        loc={location.pathname === "/profile/home"}
      >
        <Icon icon={UserCircleIcon} />
        <NavBtnName>Profile</NavBtnName>
      </BtnList>
      <BtnList path={"/wishlist"} loc={location.pathname === "/wishlist"}>
        <Icon icon={HeartIcon} />
        <NavBtnName>WishList</NavBtnName>
      </BtnList>
    </nav>
  );
}

export default BottomNav;
