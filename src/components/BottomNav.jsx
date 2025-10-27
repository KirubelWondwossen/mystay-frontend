import {
  InformationCircleIcon,
  UserCircleIcon,
} from "@heroicons/react/16/solid";
import { HeartIcon } from "@heroicons/react/24/outline";
import { HomeIcon } from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";

function BottomNav() {
  return (
    <nav className="shadow-sm flex gap-6 border-t w-full justify-center">
      <BtnList path={""}>
        <Icon icon={HomeIcon} />
        <BtnName>Home</BtnName>
      </BtnList>
      <BtnList path={"/about"}>
        <Icon icon={InformationCircleIcon} />
        <BtnName>About</BtnName>
      </BtnList>
      <BtnList path={"/profile"}>
        <Icon icon={UserCircleIcon} />
        <BtnName>Profile</BtnName>
      </BtnList>
      <BtnList path={"/wishlist"}>
        <Icon icon={HeartIcon} />
        <BtnName>WishList</BtnName>
      </BtnList>
    </nav>
  );
}

function Icon({ icon: Icon }) {
  return <Icon className="w-6" />;
}

function BtnList({ children, path }) {
  return (
    <Link to={`/${path}`} className={`cursor-pointer`}>
      <div className="flex items-center gap-1 hover:bg-gray-200 p-2">
        {children}
      </div>
    </Link>
  );
}

function BtnName({ children }) {
  return (
    <span className="font-semibold cursor-pointer no-underline font-heading">
      {children}
    </span>
  );
}
export default BottomNav;
