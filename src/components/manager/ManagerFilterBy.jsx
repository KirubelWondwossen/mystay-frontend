export function ManagerFilterBy({
  value,
  active: active,
  setActive: setActive,
  filters,
}) {
  const isActive = active === value;

  return (
    <span
      onClick={() => setActive(value)}
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
