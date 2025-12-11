import { Link } from "react-router-dom";
import { HomeModernIcon, MapPinIcon } from "@heroicons/react/24/outline";
import { StarIcon } from "@heroicons/react/24/solid";

import AdminDashboardLayout from "../components/layout/AdminDashboardLayout";
import ManagerTopComponents from "../components/manager/ManagerTopComponents";
import Button from "../components/ui/Button";

const applicationsTemp = {
  manager_name: "John Doe",
  manager_email: "john@example.com",
  hotel_name: "Sunrise Hotel",
  hotel_address: "123 Main St, City",
  manager_phone: "+251900000001",
  hotel_description: "A cozy hotel near the beach.",
  hotel_star_rating: 4,
  created_at: "2025-12-01T10:00:00Z",
  status: "approved",
};

function AdminApplicationDetails() {
  return (
    <AdminDashboardLayout>
      <div className="max-w-[120rem] mx-auto flex flex-col gap-6">
        <ManagerTopComponents header={"Application #"}>
          <Link to={"/adminapplication"} className="font-heading text-primary">
            ← Back
          </Link>
        </ManagerTopComponents>
        <ApplicationDetails app={applicationsTemp} />
        <DetailButtons />
      </div>
    </AdminDashboardLayout>
  );
}

function ApplicationDetails({ app }) {
  return (
    <div className="bg-white shadow-md flex flex-col gap-3">
      <div className="flex justify-between items-center rounded-t-sm p-4 bg-[#6366f1] text-[#e0e7ff] font-heading">
        <TextIcon text={app.hotel_name} icon={HomeModernIcon} />
        <TextIcon text={app.hotel_address} icon={MapPinIcon} />
      </div>
      <TitleValue title={"Manager Name"} value={app.manager_name} />
      <TitleValue title={"Manager Email"} value={app.manager_email} />
      <TitleValue title={"Manager Phone"} value={app.manager_phone} />
      <TitleValue title={"Hotel Star"} star={app.hotel_star_rating} />
      <HoteDescription description={app.hotel_description} />
      <span className="text-xs self-end mb-4 font-body text-tSecondary p-4">
        Booked Mon, Nov 24 2025, 6:02 AM
      </span>
    </div>
  );
}

function DetailButtons() {
  return (
    <div className="flex gap-2 self-end">
      <Button
        className={"bg-primary rounded-lg p-2 text-white hover:bg-[#4338ca]"}
      >
        Approve
      </Button>
      <Button
        className={"bg-error rounded-lg p-2 text-white hover:bg-[#4338ca]"}
      >
        Reject
      </Button>
      <Link to={"/adminapplication"} className="font-heading text-primary">
        <Button
          className={"border border-tSecondary rounded-lg p-2 text-tSecondary"}
        >
          Back
        </Button>
      </Link>
    </div>
  );
}

function TitleValue({ title, value, star }) {
  return (
    <div className="flex gap-3 items-center px-4 py-">
      <span className="font-heading text-tSecondary font-semibold bg-[#f9fafb] p-3 rounded-md">
        {title}
      </span>
      {star ? (
        <div className="flex items-center">
          {Array.from({ length: star }, (_, i) => i + 1).map((_, i) => (
            <StarIcon className="w-5 text-[#FFD700]" key={i} />
          ))}
        </div>
      ) : (
        <span className="font-body text-tPrimary font-medium text-sm">
          {value}
        </span>
      )}
    </div>
  );
}

// eslint-disable-next-line
function TextIcon({ text, icon: Icon }) {
  return (
    <div className="flex gap-3 items-center px-4">
      <div className="flex gap-3 items-center">
        <Icon className="w-8" />
        <span className="text-lg">{text}</span>
      </div>
    </div>
  );
}

function HoteDescription({ description }) {
  return (
    <div
      className={`flex gap-3 ${
        description.length > 77 ? "items-start" : "items-center"
      }  px-4`}
    >
      <span className="font-heading text-tSecondary font-semibold bg-[#f9fafb] p-3 rounded-md">
        Hotel Description
      </span>
      <p
        className={`font-body text-sm text-tPrimary text-start max-w-lg leading-relaxed `}
      >
        {description}
      </p>
    </div>
  );
}

export default AdminApplicationDetails;
