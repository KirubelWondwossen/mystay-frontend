import { AdjustmentsHorizontalIcon } from "@heroicons/react/24/outline";
import Logo from "./Logo";
import { Link } from "react-router-dom";
import { MoonIcon, SunIcon } from "@heroicons/react/16/solid";

function Navbar() {
  return (
    <nav className="flex justify-between w-full">
      <Logo />
      <NavBtns />
    </nav>
  );
}

function NavBtns({ isOpen }) {
  // const location = useLocation();

  return (
    <ul
      className={`${
        !isOpen && "invisible absolute"
      } md:visible flex-col flex md:justify-between md:gap-7 md:flex-row right-4 sm:right-0 top-0 gap-2 items-start md:static`}
    >
      {/* <BtnList path={""}>Home</BtnList>
      <BtnList path={"/about"}>About</BtnList>
      <BtnList path={"/guest"}>Guest Area</BtnList> */}
      {/* <Filter /> */}
      <FilterBtn />
      <DarkLightModeBtns />
    </ul>
  );
}

function DarkLightModeBtns() {
  return (
    <div className="flex border rounded-xl">
      <IconHolder>
        <SunIcon className="w-6 self-center cursor-pointer " />
      </IconHolder>
      <IconHolder>
        <MoonIcon className="w-6 self-center cursor-pointer" />
      </IconHolder>
    </div>
  );
}

function IconHolder({ children }) {
  return (
    <span className="rounded-xl cursor-pointer duration-200 p-3 hover:bg-gray-200 hover:border-slate-950 w-full">
      {children}
    </span>
  );
}

function FilterBtn() {
  return (
    <div className="flex gap-1 border p-3 rounded-xl cursor-pointer duration-200 hover:bg-gray-200 hover:border-slate-950">
      <AdjustmentsHorizontalIcon className="w-6" />
      <h3 className="sm:text-lg md:text-xl font-heading font-semibold">
        Filters
      </h3>
    </div>
  );
}

function BtnList({ children, path }) {
  return (
    <li>
      <Link
        to={`/${path}`}
        className={`${
          location.pathname === "/" + path ? "underline" : "no-underline"
        } md:text-2xl font-semibold cursor-pointer font-heading`}
      >
        {children}
      </Link>
    </li>
  );
}
export default Navbar;
