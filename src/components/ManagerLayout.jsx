import ManagerSidebar from "./ManagerSidebar";

function AdminLayout({ children }) {
  return (
    <div className="container mx-auto grid grid-cols-[1fr_4fr]">
      <ManagerSidebar />
      {children}
    </div>
  );
}

export default AdminLayout;
