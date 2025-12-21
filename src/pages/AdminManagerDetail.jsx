import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import toast, { Toaster } from "react-hot-toast";
import { Link } from "react-router-dom";

import ManagerTopComponents from "../components/manager/ManagerTopComponents";
import AdminDashboardLayout from "../components/layout/AdminDashboardLayout";
import { getHotel, getManager } from "../services/getAPi";
import { AdminManagerListDetails } from "../components/admin/AdminManagerListDetails";

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
        const hotel = await getHotel(manager.hotel.id, token);
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
      <div className="max-w-[120rem] mx-auto flex flex-col gap-6">
        <ManagerTopComponents header={`Manager ${id}`}>
          <Link to={"/adminmanagerslist"} className="font-heading text-primary">
            ← Back
          </Link>
        </ManagerTopComponents>
        <AdminManagerListDetails hotel={hotel} manager={manager} />
      </div>
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
