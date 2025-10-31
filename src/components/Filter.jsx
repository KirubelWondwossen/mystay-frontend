import { XMarkIcon } from "@heroicons/react/16/solid";

function Filter({ handleOpenModal }) {
  return (
    <div
      className="fixed bg-white z-[1001] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
    rounded-xl shadow-lg w-96 mx-auto flex flex-col items-start gap-4"
    >
      <FilterHeader handleOpenModal={handleOpenModal} />
      <Filters />
    </div>
  );
}

function FilterHeader({ handleOpenModal }) {
  return (
    <div className="border-b w-full p-2 relative">
      <h3 className="sm:text-xl md:text-2xl font-heading font-semibold">
        Filters
      </h3>
      <XMarkIcon
        className="w-6 absolute right-[2%] bottom-[25%] cursor-pointer"
        onClick={handleOpenModal}
      />
    </div>
  );
}

function Filters() {
  return (
    <div className="flex flex-col gap-4 items-start w-fit px-3">
      <h4 className="sm:text-xs md:text-base font-heading font-medium text-left">
        Room Category
      </h4>
      <div className="flex flex-col">
        <FilterList>King Size</FilterList>
        <FilterList>Queen Size</FilterList>
      </div>
    </div>
  );
}

function FilterList({ children }) {
  return (
    <span className="flex gap-2 items-center">
      <input className="h-4 w-4 text-logo cursor-pointer" type="checkbox" />
      <span className="text-lg font-body font-medium">{children}</span>
    </span>
  );
}

export default Filter;
