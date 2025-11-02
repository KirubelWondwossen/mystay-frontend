import { Link } from "react-router-dom";

function Logo() {
  return (
    <Link to="/" className="cursor-pointer">
      <span className="font-heading text-3xl font-bold text-primary">
        MyStay
      </span>
    </Link>
  );
}

export default Logo;
