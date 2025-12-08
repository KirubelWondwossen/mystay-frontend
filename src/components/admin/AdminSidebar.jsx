import ManagerBtnList from "../manager/ManagerBtnList";
import { useLocation } from "react-router-dom";
import Logo from "../ui/Logo";
import { HomeIcon } from "@heroicons/react/24/outline";

function AdminSidebar() {
  const location = useLocation();

  return (
    <aside className="w-42 py-5 flex flex-col gap-2 border-r items-start sticky top-[5rem] h-screen overflow-hidden bg-white">
      <Logo className={"p-3"} />
      <ManagerBtnList
        path={"/adminapplication"}
        className={"w-full"}
        loc={location.pathname === "/adminapplication"}
      >
        <Icon icon={HomeIcon} />
        <SideBtnName>Applications</SideBtnName>
      </ManagerBtnList>
    </aside>
  );
}
function SideBtnName({ children }) {
  return (
    <span className={`text-sm cursor-pointer no-underline font-heading`}>
      {children}
    </span>
  );
}

// eslint-disable-next-line
function Icon({ icon: Icon }) {
  return <Icon className="w-6 " />;
}

export default AdminSidebar;
