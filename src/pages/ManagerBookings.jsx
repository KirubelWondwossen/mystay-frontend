import { useState } from "react";
import { ManagerFilter } from "../components/ManagerFilter";
import ManagerLayout from "../components/ManagerLayout";
import ManagerTopComponents from "../components/ManagerTopComponents";
import { ManagerFilterBy } from "../components/ManagerFilterBy";

const filterOptions = [
  { value: 1, type: "All" },
  { value: 2, type: "Queen" },
  { value: 3, type: "King" },
  { value: 4, type: "Twin" },
];

const bookings = [
  {
    cabin: "007",
    guest: "Nina Williams",
    dates: "Jan 06 2026 — Jan 16 2026",
    type: "queen",
    amount: 6050.0,
  },
  {
    cabin: "002",
    guest: "Emma Watson",
    dates: "Dec 30 2025 — Jan 14 2026",
    type: "king",
    amount: 5325.0,
  },
  {
    cabin: "007",
    guest: "Taro Tanaka",
    dates: "Dec 29 2025 — Jan 03 2026",
    type: "twin",
    amount: 2950.0,
  },
  {
    cabin: "004",
    guest: "Maria Gomez",
    dates: "Dec 15 2025 — Dec 16 2025",
    type: "queen",
    amount: 450.0,
  },
  {
    cabin: "007",
    guest: "Fatimah Al-Sayed",
    dates: "Dec 14 2025 — Dec 20 2025",
    type: "king",
    amount: 3000.0,
  },
  {
    cabin: "002",
    guest: "Jonathan Williams",
    dates: "Dec 12 2025 — Dec 15 2025",
    type: "twin",
    amount: 1065.0,
  },
  {
    cabin: "005",
    guest: "Ahmed Hassan",
    dates: "Dec 11 2025 — Dec 18 2025",
    type: "queen",
    amount: 2975.0,
  },
  {
    cabin: "001",
    guest: "Jonas Mueller",
    dates: "Dec 09 2025 — Dec 15 2025",
    type: "king",
    amount: 1500.0,
  },
  {
    cabin: "004",
    guest: "Gabriel Silva",
    dates: "Dec 09 2025 — Dec 14 2025",
    type: "twin",
    amount: 2550.0,
  },
  {
    cabin: "008",
    guest: "Julie Nguyen",
    dates: "Dec 07 2025 — Dec 10 2025",
    type: "queen",
    amount: 4200.0,
  },
];

function ManagerBookings() {
  const [active, setActive] = useState(1);
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
                />
              ))}
            </ManagerFilter>
            <SortBy />
          </div>
        </ManagerTopComponents>
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

function Bookings() {
  return <div className="grid grid-cols-5"></div>;
}

export default ManagerBookings;
