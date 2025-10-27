import {
  InformationCircleIcon,
  UserCircleIcon,
} from "@heroicons/react/16/solid";
import { HeartIcon } from "@heroicons/react/24/outline";
import { HomeIcon } from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";

function BottomNav() {
  return (
    <nav className="shadow-xl rounded-xl flex gap-6 border w-full justify-center">
      <BtnList path={""}>
        <HomeIcon className="w-7" />
        <BtnName>Home</BtnName>
      </BtnList>
      <BtnList path={"/about"}>
        <InformationCircleIcon className="w-7" />
        <BtnName>About</BtnName>
      </BtnList>
      <BtnList path={"/profile"}>
        <UserCircleIcon className="w-7" />
        <BtnName>Profile</BtnName>
      </BtnList>
      <BtnList path={"/wishlist"}>
        <HeartIcon className="w-7" />
        <BtnName>WishList</BtnName>
      </BtnList>
    </nav>
  );
}

function BtnList({ children, path }) {
  return (
    <Link to={`/${path}`} className={`cursor-pointer`}>
      <div className="flex gap-1 hover:bg-gray-200 p-3">{children}</div>
    </Link>
  );
}

function BtnName({ children }) {
  return (
    <span className="lg:text-lg sm:p-3 sm:text-base font-semibold cursor-pointer no-underline font-heading">
      {children}
    </span>
  );
}
export default BottomNav;
