import {
  AdjustmentsHorizontalIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import Logo from "./Logo";
import { Link, useLocation } from "react-router-dom";
import { MoonIcon, SunIcon } from "@heroicons/react/16/solid";
import { useState, useEffect } from "react";

function Navbar({ handleOpenModal }) {
  return (
    <nav
      className={`flex justify-between w-full p-3 ${
        useLocation().pathname !== "/" ? "border-b" : ""
      }`}
    >
      <Logo />
      <NavBtns handleOpenModal={handleOpenModal} />
    </nav>
  );
}

function NavBtns({ isOpen, handleOpenModal }) {
  return (
    <ul
      className={`${
        !isOpen && "invisible absolute"
      } relative md:visible flex-col flex md:justify-between md:gap-3 md:flex-row right-4 sm:right-0 top-0 gap-2 items-start md:static`}
    >
      {useLocation().pathname === "/" ? (
        <FilterSearchBtn handleOpenModal={handleOpenModal} />
      ) : (
        <Link to={"/"}>
          <FilterSearchBtn />
        </Link>
      )}
      <DarkLightModeBtns />
      <BecomeHostBtn />
    </ul>
  );
}

function FilterSearchBtn({ handleOpenModal }) {
  return (
    <div
      onClick={handleOpenModal}
      className="flex gap-1 border p-2 rounded-xl cursor-pointer duration-200 hover:bg-gray-200 hover:border-slate-950"
    >
      {useLocation().pathname === "/" ? (
        <AdjustmentsHorizontalIcon className="w-5 text-textSecondary" />
      ) : (
        <MagnifyingGlassIcon className="w-5" />
      )}
      <h3 className="font-heading font-semibold">
        {useLocation().pathname === "/" ? "Filters" : "Search"}
      </h3>
    </div>
  );
}

function BecomeHostBtn() {
  return (
    <Link
      to="managerapplication"
      className="font-heading font-semibold border p-2 rounded-xl cursor-pointer duration-200 hover:bg-gray-200 hover:border-slate-950"
    >
      Become a Host
    </Link>
  );
}

function DarkLightModeBtns() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      setIsDarkMode(true);
      document.documentElement.classList.add("dark");
    }
  }, []);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDarkMode]);

  return (
    <div className="flex border rounded-xl overflow-hidden">
      <IconHolder active={!isDarkMode} onClick={() => setIsDarkMode(false)}>
        <SunIcon className="w-5" />
      </IconHolder>
      <IconHolder active={isDarkMode} onClick={() => setIsDarkMode(true)}>
        <MoonIcon className="w-5" />
      </IconHolder>
    </div>
  );
}

function IconHolder({ children, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`p-2 w-full transition-colors duration-200
        ${
          active
            ? "bg-gray-200 dark:bg-slate-700 overflow-hidden rounded-xl"
            : "bg-transparent"
        }
        hover:bg-gray-300 dark:hover:bg-slate-600 rounded-xl
      `}
    >
      {children}
    </button>
  );
}
export default Navbar;
