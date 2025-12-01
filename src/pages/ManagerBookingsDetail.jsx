import ManagerLayout from "../components/layout/ManagerLayout";
import ManagerTopComponents from "../components/manager/ManagerTopComponents";
import { Link } from "react-router-dom";
import { HomeModernIcon } from "@heroicons/react/24/outline";
function ManagerBookingDetails() {
  return (
    <ManagerLayout>
      <div className="max-w-[120rem] mx-auto flex flex-col gap-[3.2rem]">
        <ManagerTopComponents header={"Booking #"}>
          <Link to={"/managerbookings"} className="font-heading text-primary">
            ← Back
          </Link>
        </ManagerTopComponents>
        <BookingDetails />
      </div>
    </ManagerLayout>
  );
}

function BookingDetails() {
  return (
    <div className="bg-white shadow-md flex flex-col gap-3">
      <div className="flex justify-between items-center rounded-t-sm p-4 bg-[#6366f1] text-[#e0e7ff] font-heading">
        <div className="flex gap-3 items-center">
          <HomeModernIcon className="w-8" />
          <span className="">10 nights in cabin 007</span>
        </div>
        <span className="">
          Sat, Jan 10 2026 (In 1 month) — Tue, Jan 20 2026
        </span>
      </div>
      <ul className="flex gap-3 p-4 font-body">
        <li>🏁</li>
        <li>Nina Williams</li>
        <li> + 6 guests</li>
        <li className="text-tTertiary">nina@hotmail.com</li>
      </ul>

      <div className="text-[#15803d] p-4 bg-[#dcfce7] flex justify-between mx-4 rounded-sm font-body">
        <div className="flex gap-3">
          <span className="font-semibold">Total Price</span>
          <span>$6,050.00 </span>
        </div>
        <span className="font-semibold">PAID</span>
      </div>

      <span className="text-xs self-end mb-4 font-body text-tSecondary p-4">
        Booked Mon, Nov 24 2025, 6:02 AM
      </span>
    </div>
  );
}

export default ManagerBookingDetails;
