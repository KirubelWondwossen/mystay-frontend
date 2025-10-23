import Logo from "./Logo";

import { Link, useLocation } from "react-router-dom";

function Navbar() {
  return (
    <nav className="flex justify-between w-full">
      <Logo />
      <NavBtns />
    </nav>
  );
}

function NavBtns({ isOpen }) {
  const location = useLocation();

  return (
    <ul
      className={`${
        !isOpen && "invisible absolute"
      } md:visible flex-col flex md:justify-between md:gap-7 md:flex-row right-4 sm:right-0 top-0 gap-2 items-start md:static`}
    >
      <BtnList path={""}>Home</BtnList>
      <BtnList path={"/about"}>About</BtnList>
      <BtnList path={"/guest"}>Guest Area</BtnList>
    </ul>
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
