import { AdjustmentsHorizontalIcon } from "@heroicons/react/24/outline";
import Logo from "./Logo";
import { Link } from "react-router-dom";
import { MoonIcon, SunIcon } from "@heroicons/react/16/solid";
import { useState, useEffect } from "react";

function Navbar({ handleOpenModal }) {
  return (
    <nav className="flex justify-between w-full p-3">
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
      } relative md:visible flex-col flex md:justify-between md:gap-7 md:flex-row right-4 sm:right-0 top-0 gap-2 items-start md:static`}
    >
      <FilterBtn handleOpenModal={handleOpenModal} />
      <DarkLightModeBtns />
    </ul>
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
        <SunIcon className="w-6 h-6" />
      </IconHolder>
      <IconHolder active={isDarkMode} onClick={() => setIsDarkMode(true)}>
        <MoonIcon className="w-6 h-6" />
      </IconHolder>
    </div>
  );
}

function IconHolder({ children, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`p-3 w-full transition-colors duration-200
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

function FilterBtn({ handleOpenModal }) {
  return (
    <div
      onClick={handleOpenModal}
      className="flex gap-1 border p-3 rounded-xl cursor-pointer duration-200 hover:bg-gray-200 hover:border-slate-950"
    >
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
