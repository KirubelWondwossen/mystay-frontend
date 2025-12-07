import { useSearchParams } from "react-router-dom";

export function ManagerFilterBy({
  value,
  active: active,
  setActive: setActive,
  filters,
  handleFilter,
}) {
  const [searchParams] = useSearchParams();
  const currentFilter = searchParams.get("filter") || "All";
  const isActive = currentFilter === filters;

  return (
    <span
      onClick={() => {
        setActive(value);
        handleFilter(filters);
      }}
      className={`
    ${isActive ? "bg-primary text-white" : "bg-white text-black"}
    font-body text-sm px-2 py-1 cursor-pointer rounded-sm 
    hover:bg-primary hover:text-white transition duration-300
  `}
    >
      {filters}
    </span>
  );
}
