import {
  AdjustmentsHorizontalIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import Logo from "./Logo";
import { Link, useLocation } from "react-router-dom";
import { MoonIcon, SunIcon } from "@heroicons/react/16/solid";
import { useState, useEffect } from "react";
import SortBy from "./UserSortBy";
import Button from "./Button";
import { getCookie } from "../../utils/getCookie";
import { API_URL } from "../../services/apiURl";
import { useNavigate } from "react-router-dom";
function Navbar({
  handleOpenModal,
  filterTxt,
  sortOptions,
  sortBy,
  handleSort,
  guest,
}) {
  const location = useLocation();
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    setAuthenticated(!!getCookie("access_token"));
  }, [location.pathname]);

  return (
    <nav
      className={`flex justify-between w-full p-3 ${
        location.pathname !== "/" ? "border-b" : ""
      }`}
    >
      <Logo />
      <NavBtns
        location={location}
        handleOpenModal={handleOpenModal}
        filterTxt={filterTxt}
        sortBy={sortBy}
        sortOptions={sortOptions}
        handleSort={handleSort}
        authenticated={authenticated}
        guest={guest}
      />
    </nav>
  );
}

function NavBtns({
  location,
  handleOpenModal,
  filterTxt,
  sortOptions,
  sortBy,
  handleSort,
  authenticated,
  guest,
}) {
  return (
    <ul className="flex gap-2 items-center">
      {location.pathname === "/" ? (
        <>
          <FilterSearchBtn
            handleOpenModal={handleOpenModal}
            filterTxt={filterTxt}
          />
          <SortBy
            sortOptions={sortOptions}
            sortBy={sortBy}
            onChange={handleSort}
          />
        </>
      ) : (
        <Link to="/">
          <FilterSearchBtn filterTxt={filterTxt} />
        </Link>
      )}

      {location.pathname === "/" && <BecomeHostBtn />}

      {authenticated && <ManagerProfile guest={guest} />}
      {authenticated && <LogoutBtn />}
      {!authenticated && <LoginBtn location={location} />}
    </ul>
  );
}

function FilterSearchBtn({ handleOpenModal, filterTxt }) {
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
        {useLocation().pathname === "/" ? `Filter by ${filterTxt}` : "Search"}
      </h3>
    </div>
  );
}

function BecomeHostBtn() {
  return (
    <Link
      to="manager/application"
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
function LoginBtn({ location }) {
  const handleGoogleLogin = () => {
    window.location.href =
      `${API_URL}/auth/google/login` +
      `?redirect=http://127.0.0.1:5173${location.pathname}`;
  };

  return (
    <Button className="border p-2 rounded-xl" onClick={handleGoogleLogin}>
      Login
    </Button>
  );
}
function LogoutBtn() {
  async function deleteCookieStore(name, options) {
    try {
      await cookieStore.delete(name, options);
      console.log(`Cookie "${name}" deleted successfully.`);
    } catch (error) {
      console.error(`Error deleting cookie "${name}": ${error}`);
    }
  }
  const navigate = useNavigate();
  const handleLogout = () => {
    deleteCookieStore("access_token", { path: "/" });
    navigate(0);
  };

  return (
    <Button className="border p-2 rounded-xl" onClick={handleLogout}>
      Logout
    </Button>
  );
}

function ManagerProfile({ guest }) {
  if (!guest) {
    return <div className="w-8 h-8 rounded-full bg-gray-300 animate-pulse" />;
  }

  return (
    <div className="flex gap-2 items-center cursor-pointer">
      <img src={guest.avater_url} alt="profile" className="w-8 rounded-full" />
      <span className="font-heading">{guest.full_name.split(" ")[0]}</span>
    </div>
  );
}

export default Navbar;
