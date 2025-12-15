import AdminLayoutNav from "../admin/AdminLayoutNav";
import AdminSidebar from "../admin/AdminSidebar";

function AdminDashboardLayout({ children, user }) {
  return (
    <div className="flex w-full h-screen overflow-hidden bg-background2">
      <div className="w-1/5 h-full">
        <AdminSidebar />
      </div>
      <div className="flex flex-col flex-1 h-full">
        <AdminLayoutNav user={user} />
        <main className="flex-1 overflow-scroll min-h-full pt-8 px-12 pb-28">
          {children}
        </main>
      </div>
    </div>
  );
}

export default AdminDashboardLayout;
