import ManagerLayoutNav from "./AdminLayoutNav";
import AdminSidebar from "./AdminSidebar";

function AdminDashboardLayout({ children }) {
  return (
    <div className="flex w-full h-screen overflow-hidden bg-background2">
      <div className="w-1/5 h-full">
        <AdminSidebar />
      </div>
      <div className="flex flex-col flex-1 h-full">
        <ManagerLayoutNav />
        <main className="flex-1 overflow-scroll min-h-full pt-8 px-12 pb-28">
          {children}
        </main>
      </div>
    </div>
  );
}

export default AdminDashboardLayout;
