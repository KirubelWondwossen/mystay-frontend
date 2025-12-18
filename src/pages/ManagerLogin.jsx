import LoginForm from "../components/auth/LoginForm";

function ManagerLogin() {
  return (
    <LoginForm
      endpoint="http://127.0.0.1:8000/api/hotelmanager/login"
      role="manager"
      redirectTo="/managerhome"
    />
  );
}

export default ManagerLogin;
