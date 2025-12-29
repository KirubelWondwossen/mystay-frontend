import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import toast, { Toaster } from "react-hot-toast";
import { Link } from "react-router-dom";

import ManagerTopComponents from "../components/manager/ManagerTopComponents";
import AdminDashboardLayout from "../components/layout/AdminDashboardLayout";
import { getHotel, getManager } from "../services/getAPi";
import { AdminManagerListDetails } from "../components/admin/AdminManagerListDetails";
import Button from "../components/ui/Button";

function AdminManagerDetail() {
  const [manager, setManager] = useState({});
  const [hotel, setHotel] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { id } = useParams();
  const { isAuthenticated } = useAuth();
  const { token } = useAuth();

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        const manager = await getManager(id, token);
        setManager(manager);
        const hotel = await getHotel(manager.hotel.id);
        setHotel(hotel);
      } catch (e) {
        setError(e.message);
        toast.error(e.message);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [id, token]);

  if (!isAuthenticated) return <Navigate to="/adminlogin" replace />;
  return (
    <AdminDashboardLayout loading={loading} error={error} getData={getManager}>
      {!loading && (
        <div className="max-w-[120rem] mx-auto flex flex-col gap-6">
          <ManagerTopComponents header={`Manager ${id}`}>
            <Link
              to={"/admin/managerslist"}
              className="font-heading text-primary"
            >
              ← Back
            </Link>
          </ManagerTopComponents>
          <AdminManagerListDetails hotel={hotel} manager={manager} />
          <Link
            to={"/admin/managerslist"}
            className="font-heading text-primary self-end"
          >
            <Button
              className={
                "border border-tSecondary rounded-lg p-2 text-tSecondary"
              }
            >
              Back
            </Button>
          </Link>
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

export default AdminManagerDetail;
