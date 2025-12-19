import { useEffect, useState } from "react";
import AdminDashboardLayout from "../components/layout/AdminDashboardLayout";
import toast, { Toaster } from "react-hot-toast";
import { EmptyState } from "../components/ui/EmptyState";
import ManagerTopComponents from "../components/manager/ManagerTopComponents";
const fields = ["Manager Name", "Hotel Name", "Phone"];

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
      const res = await fetch("http://127.0.0.1:8000/api/hotelmanager/", {
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
      console.log(data);

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
    getData(token);
  }, [token]);

  return (
    <AdminDashboardLayout loading={loading} error={error}>
      {!hasData && (
        <EmptyState
          title={"No mangers yet"}
          description={"Wait for managers"}
        />
      )}
      {!loading && !error && hasData && (
        <div className="max-w-[120rem] mx-auto flex flex-col gap-5">
          <ManagerTopComponents header={"Managers"}></ManagerTopComponents>
          <Fields fields={fields} />
        </div>
      )}
    </AdminDashboardLayout>
  );
}

function Fields({ fields }) {
  return (
    <div className="grid grid-cols-[2fr_1.6fr_1.6fr_2fr_0.6fr] gap-2 border border-[#e5e7eb] rounded-t-sm">
      {fields.map((el, i) => (
        <div
          className="justify-self-start text-sm font-heading p-2 text-tSecondary font-semibold"
          key={i}
        >
          {el.toUpperCase()}
        </div>
      ))}
    </div>
  );
}

export default AdminManagerList;
