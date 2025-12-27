import { Link } from "react-router-dom";
import {
  ArrowRightStartOnRectangleIcon,
  MoonIcon,
  SunIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import { useAuth } from "../../context/AuthContext";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function ManagerLayoutNav({ isDark, handleDarkMode, user }) {
  const { logout } = useAuth();
  const navigate = useNavigate();

  return (
    <nav className="bg-white border-b flex justify-end w-full px-2 h-12">
      <ManagerProfile user={user} />
      <ManagerNavIcons
        isDark={isDark}
        handleDarkMode={handleDarkMode}
        logout={logout}
        navigate={navigate}
        id={user.id}
      />
    </nav>
  );
}

function ManagerNavContainer({ children, className }) {
  return <div className={`${className} flex items-center`}>{children}</div>;
}

function ManagerProfile({ user }) {
  return (
    <ManagerNavContainer className={"gap-2 px-3"}>
      <img
        src="/profile-pic.jpg"
        alt="profile picture"
        className="w-8 rounded-full"
      />
      <p className="font-body text-sm">{user.name.split(" ")[0]}</p>
    </ManagerNavContainer>
  );
}

function ManagerNavIcons({ isDark, handleDarkMode, logout, navigate, id }) {
  function handleLogout() {
    logout();
    navigate("/manager/login");
    toast.success("You have logged out");
  }
  return (
    <ManagerNavContainer className="gap-1 py-3">
      <Link to={`/manager/profile/${id}`}>
        <UserIcon className="w-5  text-primary" />
      </Link>
      {/* <LightDarkIcons isDark={isDark} handleDarkMode={handleDarkMode} /> */}
      <Icon onClick={handleLogout} icon={ArrowRightStartOnRectangleIcon} />
      <Toaster
        position="top-center"
        reverseOrder={false}
        toastOptions={{
          duration: 1000,
        }}
      />
    </ManagerNavContainer>
  );
}

// eslint-disable-next-line
function Icon({ icon: Icon, onClick }) {
  return (
    <span
      className="p-1 cursor-pointer hover:bg-background rounded-sm"
      onClick={onClick}
    >
      <Icon className="w-5 text-primary" />
    </span>
  );
}

function LightDarkIcons({ isDark, handleDarkMode }) {
  return (
    <>
      {!isDark ? (
        <Icon icon={MoonIcon} onClick={handleDarkMode} />
      ) : (
        <Icon icon={SunIcon} onClick={handleDarkMode} />
      )}
    </>
  );
}

export default ManagerLayoutNav;
