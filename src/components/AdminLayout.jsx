import AdminSidebar from "./AdminSidebar";

function AdminLayout({ children }) {
  return (
    <div className="container mx-auto grid grid-cols-[1fr_4fr]">
      <AdminSidebar />
      {children}
    </div>
  );
}

export default AdminLayout;
