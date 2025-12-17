import { Link } from "react-router-dom";
import { HomeModernIcon, MapPinIcon } from "@heroicons/react/24/outline";
import { StarIcon } from "@heroicons/react/24/solid";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { Loader } from "../components/ui/Loader";
import { RetryError } from "../components/ui/RetryError";

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

const statusColors = {
  approved: "#dcfce7",
  pending: "#FEF9C3",
  rejected: "#FECACA",
};
const statusTxtColors = {
  pending: "#D97706",
  approved: "#15803d",
  rejected: "#B91C1C",
};

function AdminApplicationDetails() {
  const [application, setApplication] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const token = localStorage.getItem("token");
  const { id } = useParams();

  useEffect(() => {
    async function getData(token) {
      setLoading(true);
      setError(null);

      try {
        const res = await fetch(
          `http://127.0.0.1:8000/api/hotel/application/${id}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              Accept: "application/json",
            },
          }
        );

        if (!res.ok) {
          if (res.status === 401) {
            throw new Error("Unauthorized. Please login again.");
          }

          const message = res.statusText;
          throw new Error(message || "Failed to fetch data");
        }

        const data = await res.json();
        console.log(data);

        setApplication(data);
      } catch (err) {
        console.error(err);
        setError(err.message || "Something went wrong");
        toast.error("Something went wrong");
      } finally {
        setLoading(false);
      }
    }

    getData(token);
  }, [token, id]);

  return (
    <AdminDashboardLayout>
      <div className="max-w-[120rem] mx-auto flex flex-col gap-6">
        <ManagerTopComponents header={"Application #524655"}>
          <Status data={application} />
          <Link to={"/adminapplication"} className="font-heading text-primary">
            ← Back
          </Link>
        </ManagerTopComponents>
        <ApplicationDetails app={application} />
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
        description?.length > 77 ? "items-start" : "items-center"
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

function Status({ data }) {
  return (
    <span
      className="py-1 px-3 justify-self-start text-sm w-fit font-heading font-medium rounded-full absolute left-[38%]"
      style={{
        backgroundColor: statusColors[data.status],
        color: statusTxtColors[data.status],
      }}
    >
      {data.status?.toUpperCase()}
    </span>
  );
}

export default AdminApplicationDetails;
