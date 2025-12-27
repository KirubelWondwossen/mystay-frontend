import LoginForm from "../components/auth/LoginForm";

function AdminLogin() {
  return (
    <LoginForm
      endpoint="http://127.0.0.1:8000/api/admin/login"
      role="admin"
      redirectTo="/admin/application"
    />
  );
}

export default AdminLogin;
