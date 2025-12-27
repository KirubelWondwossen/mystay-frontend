import { Link } from "react-router-dom";

export default function Unauthorized() {
  return (
    <div className="flex items-center justify-center w-screen h-screen bg-background">
      <div className="max-w-md text-center px-6">
        <h1 className="text-7xl font-heading font-extrabold text-red-500">
          401
        </h1>

        <h2 className="mt-4 text-3xl font-heading font-bold text-text">
          Unauthorized Access
        </h2>

        <p className="mt-3 text-base text-gray-600">
          You don’t have permission to view this page. Please log in with an
          authorized account to continue.
        </p>

        <Link
          to="/manager/login"
          className="inline-block mt-6 rounded-md bg-red-500 px-6 py-2 text-white font-medium hover:bg-red-600 transition"
        >
          Go to Login
        </Link>
      </div>
    </div>
  );
}
