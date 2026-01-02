import { Link } from "react-router-dom";
import { HomeModernIcon, MapPinIcon } from "@heroicons/react/24/outline";
import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

import AdminDashboardLayout from "../components/layout/AdminDashboardLayout";
import ManagerTopComponents from "../components/manager/ManagerTopComponents";
import Button from "../components/ui/Button";
import { formatDate } from "../utils/formatDate";
import { useAuth } from "../context/AuthContext";
import { HoteDescription } from "../components/ui/HoteDescription";
import { TextIcon } from "../components/ui/TextIcon";
import { AdminAppTitleValue } from "../components/admin/AdminAppTitleValue";
import { API_URL } from "../services/apiURl";

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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { token } = useAuth();

  const { id } = useParams();
  const { isAuthenticated } = useAuth();

  const getData = useCallback(
    async (token) => {
      setLoading(true);
      setError(null);

      try {
        const res = await fetch(`${API_URL}/hotel/application/${id}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
            "ngrok-skip-browser-warning": true,
          },
        });

        if (!res.ok) {
          if (res.status === 401) {
            throw new Error("Unauthorized. Please login again.");
          }

          throw new Error(res.statusText || "Failed to fetch data");
        }

        const data = await res.json();
        setApplication(data);
      } catch (err) {
        console.error(err);
        setError(err.message || "Something went wrong");
        toast.error(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    },
    [id]
  );

  async function updateApplicationStatus({ token, id, action }) {
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/admin/${id}/${action}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "ngrok-skip-browser-warning": true,
        },
      });

      if (!res.ok) {
        if (res.status === 401) {
          throw new Error("Unauthorized. Please login again.");
        }
        const errorText = await res.text();
        throw new Error(errorText || `Failed to ${action} application`);
      }

      toast.success(
        `Application ${
          action === "approve" ? "approved" : "rejected"
        } successfully`
      );

      await getData(token);
    } catch (err) {
      toast.error(err.message || "Network error, please try again");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (!token) return;
    getData(token);
  }, [token, getData]);

  if (!isAuthenticated) return <Navigate to="/adminlogin" replace />;
  return (
    <AdminDashboardLayout loading={loading} getData={getData} error={error}>
      {!loading && (
        <div className="max-w-[120rem] mx-auto flex flex-col gap-6">
          <ManagerTopComponents header={`Application ${id}`}>
            <Status data={application} />
            <Link
              to={"/admin/application"}
              className="font-heading text-primary"
            >
              ← Back
            </Link>
          </ManagerTopComponents>
          <ApplicationDetails app={application} />
          <DetailButtons
            status={application.status}
            updateApplicationStatus={updateApplicationStatus}
            token={token}
            id={id}
          />
        </div>
      )}
      <Toaster
        position="top-center"
        reverseOrder={false}
        toastOptions={{
          duration: 5000,
          style: {
            minWidth: "250px",
            maxWidth: "600px",
          },
        }}
      />
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
      <AdminAppTitleValue title={"Manager Name"} value={app.manager_name} />
      <AdminAppTitleValue title={"Manager Email"} value={app.manager_email} />
      <AdminAppTitleValue title={"Manager Phone"} value={app.manager_phone} />
      <AdminAppTitleValue title={"Hotel Star"} star={app.hotel_star_rating} />
      <HoteDescription description={app.hotel_description} />
      <span className="text-xs self-end mb-4 font-body text-tSecondary p-4">
        {`Booked on ${formatDate(app.created_at).date} at ${
          formatDate(app.created_at).time
        } `}
      </span>
    </div>
  );
}

function DetailButtons({ status, updateApplicationStatus, id, token }) {
  const handleApprove = () => {
    updateApplicationStatus({ token, id, action: "approve" });
  };

  const handleReject = () => {
    updateApplicationStatus({ token, id, action: "reject" });
  };
  return (
    <div className="flex gap-2 self-end">
      {status === "pending" && (
        <>
          <Button
            className={
              "bg-primary rounded-lg p-2 text-white hover:bg-[#4338ca]"
            }
            onClick={handleApprove}
          >
            Approve
          </Button>
          <Button
            className={"bg-error rounded-lg p-2 text-white hover:bg-[#a71919]"}
            onClick={handleReject}
          >
            Reject
          </Button>
        </>
      )}

      <Link to={"/admin/application"} className="font-heading text-primary">
        <Button
          className={"border border-tSecondary rounded-lg p-2 text-tSecondary"}
        >
          Back
        </Button>
      </Link>
    </div>
  );
}

function Status({ data }) {
  return (
    <span
      className="py-1 px-3 justify-self-start text-sm w-fit font-heading font-medium rounded-full absolute left-[25%]"
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
