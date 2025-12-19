import { useEffect, useState } from "react";
import AdminDashboardLayout from "../components/layout/AdminDashboardLayout";

function AdminManagerList() {
  const [managers, setManagers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const token = localStorage.getItem("token");
  const hasData = managers.length > 0;

  async function getData(token) {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("http://127.0.0.1:8000/api/hotel/application/", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      });

      if (!res.ok) {
        if (res.status === 401) {
          throw new Error("Unauthorized. Please login again.");
        }

        const message = res.statusText;
        throw new Error(message || "Failed to fetch data");
      }

      const data = await res.json();
      setManagers([...data]);
    } catch (err) {
      console.error(err);
      setError(err.message || "Something went wrong");
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (!token) return;
    // getData(token);
  }, [token]);

  return (
    <AdminDashboardLayout
      loading={loading}
      error={error}
    ></AdminDashboardLayout>
  );
}
export default AdminManagerList;
