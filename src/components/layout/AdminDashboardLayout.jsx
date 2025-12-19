import AdminLayoutNav from "../admin/AdminLayoutNav";
import AdminSidebar from "../admin/AdminSidebar";
import { Loader } from "../../components/ui/Loader";
import { RetryError } from "../../components/ui/RetryError";
import { useAuth } from "../../context/AuthContext";

function AdminDashboardLayout({ children, loading, error, getData }) {
  const { user, isAuthenticated } = useAuth();
  if (!isAuthenticated) return <Navigate to="/adminlogin" replace />;

  return (
    <div className="flex w-full h-screen overflow-hidden bg-background2">
      <div className="w-1/5 h-full">
        <AdminSidebar />
      </div>
      <div className="flex flex-col flex-1 h-full">
        <AdminLayoutNav user={user} />
        <main className="flex-1 overflow-scroll min-h-full pt-8 px-12 pb-28">
          {loading && <Loader loading />}
          {!loading && error && <RetryError getData={getData} error={error} />}
          {children}
        </main>
      </div>
    </div>
  );
}

export default AdminDashboardLayout;
