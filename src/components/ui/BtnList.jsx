import { Link } from "react-router-dom";

function BtnList({ children, path, loc, className }) {
  return (
    <Link to={`${path}`} className={`cursor-pointer ${className}`}>
      <div
        className={`flex items-center gap-1
           hover:bg-gray-200 p-3 ${loc ? "bg-gray-200" : ""}`}
      >
        {children}
      </div>
    </Link>
  );
}
export default BtnList;
