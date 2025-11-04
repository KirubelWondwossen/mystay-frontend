import { Link } from "react-router-dom";

function Logo({ className }) {
  return (
    <Link to="/" className="cursor-pointer">
      <span
        className={`${className} font-heading text-3xl font-bold text-primary`}
      >
        MyStay
      </span>
    </Link>
  );
}

export default Logo;
