function Filter() {
  return (
    <div className="container mx-auto flex flex-col items-start my-4 gap-4">
      <h3 className="sm:text-xl md:text-2xl font-heading font-semibold">
        Filters
      </h3>
      <Filters />
    </div>
  );
}

function Filters() {
  return (
    <div className="fex flex-col gap-4 items-start w-fit">
      <h4 className="sm:text-xs md:text-base font-heading font-medium text-left">
        Room Category
      </h4>
      <span className="flex gap-2 items-center">
        <input className="h-4 w-4 text-logo cursor-pointer" type="checkbox" />
        <span className="text-lg font-body font-medium">King Size</span>
        <span className="text-lg font-body font-medium">Queen Size</span>
      </span>
    </div>
  );
}

export default Filter;
