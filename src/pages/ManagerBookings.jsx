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

function ManagerBookings() {
  const [active, setActive] = useState(1);
  return (
    <ManagerLayout>
      <div className="max-w-[120rem] mx-auto flex flex-col gap-[3.2rem]">
        <ManagerTopComponents header={"All Bookings"}>
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
        </ManagerTopComponents>
      </div>
    </ManagerLayout>
  );
}

export default ManagerBookings;
