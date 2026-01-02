import ManagerTopComponents from "../components/manager/ManagerTopComponents";
import AdminDashboardLayout from "../components/layout/AdminDashboardLayout";
import SortBy from "../components/ui/SortBy";
import { ManagerFilter } from "../components/manager/ManagerFilter";
import { ManagerFilterBy } from "../components/manager/ManagerFilterBy";
import AdminAppTable from "../components/admin/AdminAppTable";

import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import toast, { Toaster } from "react-hot-toast";
import { Loader } from "../components/ui/Loader";
import { EmptyState } from "../components/ui/EmptyState";
import { API_URL } from "../services/apiURl";

const filterOptions = [
  { value: 1, type: "All" },
  { value: 2, type: "Pending" },
  { value: 3, type: "Rejected" },
  { value: 4, type: "Approved" },
];

const sortOptions = [
  { value: "name-asc", text: "Sort by name (A-Z)" },
  { value: "name-desc", text: "Sort by name (Z-A)" },
];

const fields = ["Manager Name", "Hotel Name", "Status", "Date"];
const PAGE_SIZE = 9;

function AdminApplication() {
  const { user, isAuthenticated } = useAuth();

  const [applications, setApplications] = useState([]);
  const [filteredApps, setFilteredApps] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();

  const sortBy = searchParams.get("sortBy") || "name-asc";
  const filter = searchParams.get("filter") || "All";
  const { token } = useAuth();
  const hasData = applications.length > 0;
  const [page, setPage] = useState(1);
  const startIndex = (page - 1) * PAGE_SIZE;
  const endIndex = startIndex + PAGE_SIZE;
  const paginatedApps = filteredApps.slice(startIndex, endIndex);
  useEffect(() => {
    setPage(1);
  }, [filter, sortBy]);
  async function getData(token) {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`${API_URL}/hotel/application/`, {
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

        const message = res.statusText;
        throw new Error(message || "Failed to fetch data");
      }

      const data = await res.json();
      setApplications([...data]);
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

  useEffect(() => {
    let updatedApps = [...applications];

    if (filter !== "All") {
      updatedApps = updatedApps.filter(
        (app) => app.status === filter.toLowerCase()
      );
    }

    if (sortBy === "name-asc") {
      updatedApps.sort((a, b) => a.manager_name.localeCompare(b.manager_name));
    }
    if (sortBy === "name-desc")
      updatedApps.sort((a, b) => b.manager_name.localeCompare(a.manager_name));

    setFilteredApps(updatedApps);
  }, [sortBy, filter, applications]);

  if (isAuthenticated === null) return <Loader loading page={true} />;
  if (!isAuthenticated) return <Navigate to="/adminlogin" replace />;

  function handleFilter(selectedFilter) {
    const params = new URLSearchParams(searchParams);

    if (selectedFilter === "All") {
      params.delete("filter");
    } else {
      params.set("filter", selectedFilter);
    }

    setSearchParams(params);
  }

  function handleSort(option) {
    const params = new URLSearchParams(searchParams);
    params.set("sortBy", option);
    setSearchParams(params);
  }

  return (
    <AdminDashboardLayout user={user}>
      {!hasData && !loading && (
        <EmptyState
          title={"No applications"}
          description={"Wait for applications"}
        />
      )}
      {loading && <Loader loading={loading} />}
      {!loading && !error && hasData && (
        <div className="max-w-[120rem] mx-auto flex flex-col gap-5">
          <ManagerTopComponents header={"All Application"}>
            <div className="flex gap-3">
              <ManagerFilter>
                {filterOptions.map((item, index) => (
                  <ManagerFilterBy
                    key={index}
                    filters={item.type}
                    handleFilter={handleFilter}
                  />
                ))}
              </ManagerFilter>
              <SortBy
                sortOptions={sortOptions}
                sortBy={sortBy}
                onChange={handleSort}
              />
            </div>
          </ManagerTopComponents>
          <div>
            {filteredApps.length === 0 ? (
              <EmptyState
                title={"No Applications"}
                description={"Change your filter options"}
              />
            ) : (
              <>
                <Fields fields={fields} />
                {filteredApps.map((items, index) => (
                  <AdminAppTable
                    data={items}
                    key={items.id ?? `${items.manager_email}-${index}`}
                  />
                ))}
              </>
            )}
          </div>
        </div>
      )}

      <Toaster position="top-center" />
    </AdminDashboardLayout>
  );
}

function Fields({ fields }) {
  return (
    <div className="grid grid-cols-[1.6fr_1.6fr_0.6fr_2fr_0.6fr] gap-2 border border-[#e5e7eb] rounded-t-sm">
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

export default AdminApplication;
