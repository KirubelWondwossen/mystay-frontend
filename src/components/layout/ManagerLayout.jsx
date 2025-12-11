import ManagerSidebar from "../manager/ManagerSidebar";
import {
  ArrowRightStartOnRectangleIcon,
  MoonIcon,
  SunIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import { useState } from "react";
import ManagerLayoutNav from "../manager/ManagerLayoutNav";

function ManagerLayout({ children }) {
  const [isDark, setIsDark] = useState(false);
  function handleDarkMode() {
    setIsDark((dark) => !dark);
  }
  return (
    <div className="flex w-full h-screen overflow-hidden bg-background2">
      <div className="w-1/5 h-full">
        <ManagerSidebar />
      </div>

      <div className="flex flex-col flex-1 h-full">
        <ManagerLayoutNav isDark={isDark} handleDarkMode={handleDarkMode} />
        <main className="flex-1 overflow-scroll min-h-full pt-8 px-12 pb-28">
          {children}
        </main>
      </div>
    </div>
  );
}

export default ManagerLayout;
