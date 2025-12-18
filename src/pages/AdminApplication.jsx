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
import { RetryError } from "../components/ui/RetryError";
import { EmptyState } from "../components/ui/EmptyState";

// const applicationsTemp = [
//   {
//     manager_name: "John Doe",
//     manager_email: "john@example.com",
//     hotel_name: "Sunrise Hotel",
//     hotel_address: "123 Main St, City",
//     manager_phone: "+251900000001",
//     hotel_description: "A cozy hotel near the beach.",
//     hotel_star_rating: 4,
//     created_at: "2025-12-01T10:00:00Z",
//     status: "approved",
//   },
//   {
//     manager_name: "Jane Smith",
//     manager_email: "jane@example.com",
//     hotel_name: "Mountain View Inn",
//     hotel_address: "456 Hill Rd, City",
//     manager_phone: "+251900000002",
//     hotel_description: "A scenic hotel in the mountains.",
//     hotel_star_rating: 3,
//     created_at: "2025-12-03T14:30:00Z",
//     status: "pending",
//   },
//   {
//     manager_name: "Michael Brown",
//     manager_email: "michael@example.com",
//     hotel_name: "City Center Lodge",
//     hotel_address: "789 Center Ave, City",
//     manager_phone: "+251900000003",
//     hotel_description: "Hotel in the heart of the city.",
//     hotel_star_rating: 5,
//     created_at: "2025-12-05T08:15:00Z",
//     status: "rejected",
//   },
//   {
//     manager_name: "Emily White",
//     manager_email: "emily@example.com",
//     hotel_name: "Riverside Suites",
//     hotel_address: "321 River Rd, City",
//     manager_phone: "+251900000004",
//     hotel_description: "Luxury suites with river views.",
//     hotel_star_rating: 4,
//     created_at: "2025-12-07T12:45:00Z",
//     status: "approved",
//   },
//   {
//     manager_name: "David Green",
//     manager_email: "david@example.com",
//     hotel_name: "Garden Paradise",
//     hotel_address: "654 Garden St, City",
//     manager_phone: "+251900000005",
//     hotel_description: "Relaxing hotel with beautiful gardens.",
//     hotel_star_rating: 3,
//     created_at: "2025-12-08T09:20:00Z",
//     status: "pending",
//   },
// ];

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

function AdminApplication() {
  const { user, isAuthenticated } = useAuth();

  const [applications, setApplications] = useState([]);
  const [filteredApps, setFilteredApps] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();

  const sortBy = searchParams.get("sortBy") || "name-asc";
  const filter = searchParams.get("filter") || "All";
  const token = localStorage.getItem("token");
  const hasData = applications.length > 0;

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
      {loading && <Loader loading />}

      {!loading && error && <RetryError getData={getData} error={error} />}
      {!hasData && (
        <EmptyState title={"No data"} description={"Wait for applications"} />
      )}
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
            <Fields fields={fields} />
            {filteredApps.map((items, index) => (
              <AdminAppTable
                data={items}
                key={items.id ?? `${items.manager_email}-${index}`}
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
