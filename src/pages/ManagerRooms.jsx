import { ManagerFilterBy } from "../components/manager/ManagerFilterBy";
import ManagerLayout from "../components/layout/ManagerLayout";
import ManagerTopComponents from "../components/manager/ManagerTopComponents";
import { ManagerFilter } from "../components/manager/ManagerFilter";
import { useState } from "react";
import SortBy from "../components/ui/SortBy";

const rooms = [
  {
    id: "001",
    fits: "Fits up to 2",
    price: 250.0,
    type: "Queen",
    img: "/images/img-1.jpg",
  },
  {
    id: "002",
    fits: "Fits up to 2",
    price: 350.0,
    type: "King",
    img: "/images/img-2.jpg",
  },
  {
    id: "003",
    fits: "Fits up to 4",
    price: 300.0,
    type: "Twin",
    img: "/images/img-3.jpg",
  },
  {
    id: "004",
    fits: "Fits up to 4",
    price: 500.0,
    type: "Queen",
    img: "/images/img-1.jpg",
  },
  {
    id: "005",
    fits: "Fits up to 6",
    price: 350.0,
    type: "Twin",
    img: "/images/img-2.jpg",
  },
  {
    id: "006",
    fits: "Fits up to 6",
    price: 800.0,
    type: "King",
    img: "/images/img-3.jpg",
  },
  {
    id: "007",
    fits: "Fits up to 8",
    price: 600.0,
    type: "Queen",
    img: "/images/img-1.jpg",
  },
  {
    id: "008",
    fits: "Fits up to 10",
    price: 1400.0,
    type: "King",
    img: "/images/img-2.jpg",
  },
];

const filterOptions = [
  { value: 1, type: "All" },
  { value: 2, type: "Queen" },
  { value: 3, type: "King" },
  { value: 4, type: "Twin" },
];

const sortOptions = [
  {
    value: "name-asc",
    text: "Sort by name (A-Z)",
  },
  {
    value: "name-desc",
    text: "Sort by name (Z-A)",
  },
  {
    value: "regularPrice-asc",
    text: "Sort by price (low first)",
  },
  {
    value: "regularPrice-desc",
    text: "Sort by price (high first)",
  },
];

function ManagerRooms() {
  const [active, setActive] = useState(1);
  const [filteredRooms, setFilteredRooms] = useState(rooms);

  function handleFilter(filter) {
    if (filter === "All") return setFilteredRooms(rooms);
    const newRooms = rooms.filter((el) => el.type === filter.toLowerCase());
    setFilteredRooms(newRooms);
  }
  return (
    <ManagerLayout>
      <div className="max-w-[120rem] mx-auto flex flex-col gap-[3.2rem]">
        <ManagerTopComponents header={"All Bookings"}>
          <div className="flex gap-3">
            <ManagerFilter>
              {filterOptions.map((item, index) => (
                <ManagerFilterBy
                  key={index}
                  value={item.value}
                  active={active}
                  setActive={setActive}
                  filters={item.type}
                  handleFilter={handleFilter}
                />
              ))}
            </ManagerFilter>
            <SortBy sortOptions={sortOptions} />
          </div>
        </ManagerTopComponents>
      </div>
    </ManagerLayout>
  );
}

export default ManagerRooms;
