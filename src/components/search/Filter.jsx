import { XMarkIcon } from "@heroicons/react/16/solid";
import Button from "../ui/Button";

const filterOptions = [
  { value: 1, type: "All" },
  { value: 2, type: "Queen" },
  { value: 3, type: "King" },
  { value: 4, type: "Twin" },
];

function Filter({ handleOpenModal, setSelFilterType, selectedType }) {
  return (
    <div
      className="fixed bg-white z-[1001] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
    rounded-xl shadow-lg w-96 mx-auto flex flex-col items-start gap-4 py-3"
    >
      <FilterHeader handleOpenModal={handleOpenModal} />
      <Filters
        selectedType={selectedType}
        setSelFilterType={setSelFilterType}
        handleOpenModal={handleOpenModal}
      />
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

function Filters({ handleOpenModal, selectedType, setSelFilterType }) {
  return (
    <form className="flex flex-col gap-4 items-start w-fit px-3">
      <h4 className="sm:text-xs md:text-base font-heading font-medium text-left">
        Room Category
      </h4>
      <div className="flex flex-col">
        {filterOptions.map((item, i) => (
          <FilterList
            setSelFilterType={setSelFilterType}
            value={item.type}
            selectedType={selectedType}
            key={i}
          >
            {item.type}
          </FilterList>
        ))}
      </div>
      <div className="flex gap-1 self-end w-full">
        <Button
          className={
            "text-white p-2 rounded-lg text-sm bg-primary hover:bg-[#4338ca]"
          }
          type={"button"}
        >
          Filter
        </Button>
        <Button
          type={"button"}
          className={"add-room-btn"}
          onClick={handleOpenModal}
        >
          Cancel
        </Button>
      </div>
    </form>
  );
}

function FilterList({ children, setSelFilterType, selectedType, ...props }) {
  return (
    <span className="flex gap-2 items-center">
      <input
        className="h-4 w-4 text-logo cursor-pointer"
        {...props}
        type="radio"
        name="roomType"
        checked={selectedType === props.value}
        onChange={(e) => {
          e.target.checked && setSelFilterType(e.target.value);
        }}
      />
      <span className="text-lg font-body font-medium">{children}</span>
    </span>
  );
}

export default Filter;
