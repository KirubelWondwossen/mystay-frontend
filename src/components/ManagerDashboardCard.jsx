function ManagerDashboardCard({ children, className }) {
  return (
    <div
      className={`border bg-white border-border rounded-md w-full ${className}`}
    >
      {children}
    </div>
  );
}

export default ManagerDashboardCard;
