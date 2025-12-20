import { HomeModernIcon, MapPinIcon } from "@heroicons/react/24/outline";
import { AdminManagerTitleValue } from "./AdminManagerTitleValue";
import { HoteDescription } from "../ui/HoteDescription";
import { TextIcon } from "../ui/TextIcon";

export function AdminManagerListDetails({ manager, hotel }) {
  return (
    <div className="bg-white shadow-md flex flex-col gap-3">
      <div className="flex justify-between items-center rounded-t-sm p-4 bg-[#6366f1] text-[#e0e7ff] font-heading">
        <TextIcon text={hotel.name} icon={HomeModernIcon} />
        <TextIcon text={hotel.address} icon={MapPinIcon} />
      </div>
      <AdminManagerTitleValue title={"Manager Name"} value={manager.name} />
      <AdminManagerTitleValue title={"Manager Email"} value={manager.email} />
      <AdminManagerTitleValue title={"Manager Phone"} value={manager.phone} />
      <AdminManagerTitleValue title={"Hotel Star"} star={hotel.rating} />
      <HoteDescription description={hotel.description} />
    </div>
  );
}
