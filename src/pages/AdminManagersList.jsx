import { useEffect, useState } from "react";
import AdminDashboardLayout from "../components/layout/AdminDashboardLayout";
import toast, { Toaster } from "react-hot-toast";
import { EmptyState } from "../components/ui/EmptyState";
import ManagerTopComponents from "../components/manager/ManagerTopComponents";
import AdminManagerListTable from "../components/admin/AdminManagerListTable";
import { getManagers } from "../services/getAPi";
import { useAuth } from "../context/AuthContext";
const fields = ["Manager Name", "Hotel Name", "Phone"];

function AdminManagerList() {
  const [managers, setManagers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const hasData = managers.length > 0;
  const { token } = useAuth();
  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        const manager = await getManagers(token);
        setManagers(manager);
      } catch (e) {
        setError(e.message);
        toast.error(e.message);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [token]);

  //   if (!token) return;
  //   getData(token);
  // }, [token]);

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
          <div>
            <Fields fields={fields} />
            {managers.map((items, index) => (
              <AdminManagerListTable
                data={items}
                key={items.id ?? `${items.email}-${index}`}
              />
            ))}
          </div>
        </div>
      )}
      <Toaster position="top-center" />
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
