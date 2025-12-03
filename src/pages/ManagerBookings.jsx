import { useState } from "react";
import { ManagerFilter } from "../components/manager/ManagerFilter";
import ManagerLayout from "../components/layout/ManagerLayout";
import ManagerTopComponents from "../components/manager/ManagerTopComponents";
import { ManagerFilterBy } from "../components/manager/ManagerFilterBy";
import ManagerBookingsTable from "../components/manager/ManagerBookingsTable";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";

const filterOptions = [
  { value: 1, type: "All" },
  { value: 2, type: "Checked in" },
  { value: 3, type: "Checked out" },
  { value: 4, type: "Unconfirmed" },
];

const bookings = [
  {
    room: "007",
    guest: "Nina Williams",
    email: "nina@hotmail.com",
    stay: "In 1 month → 10 night stay",
    dates: "Jan 06 2026 — Jan 16 2026",
    status: "UNCONFIRMED",
    amount: 6050.0,
  },
  {
    room: "002",
    guest: "Emma Watson",
    email: "emma@gmail.com",
    stay: "In 29 days → 15 night stay",
    dates: "Dec 30 2025 — Jan 14 2026",
    status: "CHECKED OUT",
    amount: 5325.0,
  },
  {
    room: "007",
    guest: "Taro Tanaka",
    email: "taro@gmail.com",
    stay: "In 28 days → 5 night stay",
    dates: "Dec 29 2025 — Jan 03 2026",
    status: "CHECKED IN",
    amount: 2950.0,
  },
  {
    room: "004",
    guest: "Maria Gomez",
    email: "maria@example.com",
    stay: "In 14 days → 1 night stay",
    dates: "Dec 15 2025 — Dec 16 2025",
    status: "UNCONFIRMED",
    amount: 450.0,
  },
  {
    room: "007",
    guest: "Fatimah Al-Sayed",
    email: "fatimah@gmail.com",
    stay: "In 13 days → 6 night stay",
    dates: "Dec 14 2025 — Dec 20 2025",
    status: "CHECKED IN",
    amount: 3000.0,
  },
  {
    room: "002",
    guest: "Jonathan Williams",
    email: "jowi@gmail.com",
    stay: "In 11 days → 3 night stay",
    dates: "Dec 12 2025 — Dec 15 2025",
    status: "CHECKED OUT",
    amount: 1065.0,
  },
  {
    room: "005",
    guest: "Ahmed Hassan",
    email: "ahmed@gmail.com",
    stay: "In 10 days → 7 night stay",
    dates: "Dec 11 2025 — Dec 18 2025",
    status: "UNCONFIRMED",
    amount: 2975.0,
  },
  {
    room: "001",
    guest: "Jonas Mueller",
    email: "jonas@example.eu",
    stay: "In 8 days → 6 night stay",
    dates: "Dec 09 2025 — Dec 15 2025",
    status: "CHECKED IN",
    amount: 1500.0,
  },
  {
    room: "004",
    guest: "Gabriel Silva",
    email: "gabriel@gmail.com",
    stay: "In 8 days → 5 night stay",
    dates: "Dec 09 2025 — Dec 14 2025",
    status: "CHECKED OUT",
    amount: 2550.0,
  },
  {
    room: "008",
    guest: "Julie Nguyen",
    email: "julie@gmail.com",
    stay: "In 6 days → 3 night stay",
    dates: "Dec 07 2025 — Dec 10 2025",
    status: "UNCONFIRMED",
    amount: 4200.0,
  },
];

const fields = ["Room", "Guest", "Dates", "Type", "Amount"];

function ManagerBookings() {
  const [active, setActive] = useState(1);
  const [filteredBookings, setFilteredBookings] = useState(bookings);

  function handleFilter(filter) {
    if (filter === "All") return setFilteredBookings(bookings);
    const newBookings = bookings.filter(
      (el) => el.status === filter.toUpperCase()
    );
    setFilteredBookings(newBookings);
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
            <SortBy />
          </div>
        </ManagerTopComponents>
        <div>
          <Fields />
          {filteredBookings.map((el, i) => (
            <ManagerBookingsTable data={el} key={i} />
          ))}
          <PrevNext />
        </div>
      </div>
    </ManagerLayout>
  );
}

function SortBy() {
  return (
    <select className="bg-white p-1 rounded-md shadow-sm font-body text-sm  focus:outline-none focus:ring-2 focus:ring-primary">
      <option value="recent">Sort by date(recent first)</option>
      <option value="earlier">Sort by date(earlier first)</option>
      <option value="high">Sort by amount(high first)</option>
      <option value="recent">Sort by amount(low first)</option>
    </select>
  );
}

function Fields() {
  return (
    <div className="grid grid-cols-[0.6fr_2fr_2.4fr_1.4fr_1fr_3.2rem] gap-2 border border-[#e5e7eb] rounded-t-sm">
      {fields.map((el, i) => (
        <div
          className="justify-self-start text-sm font-heading p-2 text-tSecondary font-semibold"
          key={i}
        >
          {el}
        </div>
      ))}
    </div>
  );
}

function PrevNext() {
  return (
    <div className="p-2 border border-[#e5e7eb] rounded-b-sm flex gap-4 justify-end font-heading text-tSecondary text-sm">
      <div
        className="flex items-center px-2 py-1 cursor-pointer rounded-sm 
        hover:bg-primary hover:text-white transition duration-300"
      >
        <ChevronLeftIcon className="w-4" />
        <span>Previous</span>
      </div>
      <div
        className="flex items-center px-2 py-1 cursor-pointer rounded-sm 
        hover:bg-primary hover:text-white transition duration-300"
      >
        <span>Next</span>
        <ChevronRightIcon className="w-4" />
      </div>
    </div>
  );
}

export default ManagerBookings;
