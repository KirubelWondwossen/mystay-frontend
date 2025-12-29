import { API_URL } from "../services/apiURl";
import LoginForm from "../components/auth/LoginForm";

function ManagerLogin() {
  return (
    <LoginForm
      endpoint={`${API_URL}/hotelmanager/login`}
      role="manager"
      redirectTo="/manager/home"
    />
  );
}

export default ManagerLogin;
