import { Link } from "react-router-dom";

function ManagerBtnList({ children, path, loc, className }) {
  return (
    <Link to={`${path}`} className={`cursor-pointer ${className} px-3`}>
      <div
        className={`flex items-center gap-1 rounded-lg
           hover:bg-[#f9fafb] p-3 ${loc ? "bg-[#f9fafb]" : ""}`}
      >
        {children}
      </div>
    </Link>
  );
}
export default ManagerBtnList;
