import { API_URL } from "../services/apiURl";
import LoginForm from "../components/auth/LoginForm";

function AdminLogin() {
  return (
    <LoginForm
      endpoint={`${API_URL}/admin/login`}
      role="admin"
      redirectTo="/admin/application"
    />
  );
}

export default AdminLogin;
