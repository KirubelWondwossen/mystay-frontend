import ClipLoader from "react-spinners/ClipLoader";

export function Loader({ loading, page }) {
  return (
    <div
      className={
        page
          ? "fixed inset-0 flex items-center justify-center bg-white/50"
          : "flex flex-col justify-center items-center gap-2 py-6"
      }
    >
      <ClipLoader color="#4F46E5" loading={loading} size={40} />
      <span
        className={`text-lg font-heading font-semibold text-primary ${
          page && "ml-3"
        }`}
      >
        Loading
      </span>
    </div>
  );
}
