import { Link } from "react-router-dom";
import {
  ArrowRightStartOnRectangleIcon,
  MoonIcon,
  SunIcon,
  UserIcon,
} from "@heroicons/react/24/outline";

function ManagerLayoutNav({ isDark, handleDarkMode }) {
  return (
    <nav className="bg-white border-b flex justify-end w-full px-2 h-12">
      <ManagerProfile />
      <ManagerNavIcons isDark={isDark} handleDarkMode={handleDarkMode} />
    </nav>
  );
}

function ManagerNavContainer({ children, className }) {
  return <div className={`${className} flex items-center`}>{children}</div>;
}

function ManagerProfile() {
  return (
    <ManagerNavContainer className={"gap-2 px-3"}>
      <img
        src="/profile-pic.jpg"
        alt="profile picture"
        className="w-8 rounded-full"
      />
      <p className="font-body text-sm">Manager</p>
    </ManagerNavContainer>
  );
}

function ManagerNavIcons({ isDark, handleDarkMode }) {
  return (
    <ManagerNavContainer className="gap-1">
      <Link
        to={"/managerprofile"}
        className="px-1 hover:bg-background rounded-sm"
      >
        <Icon icon={UserIcon} />
      </Link>
      <LightDarkIcons isDark={isDark} handleDarkMode={handleDarkMode} />
      <Icon icon={ArrowRightStartOnRectangleIcon} />
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
