import Logo from "../components/ui/Logo";

function ManagerLogin() {
  return (
    <main className="bg-[#f9fafb] flex flex-col gap-5 items-center justify-center h-screen">
      <Logo />
      <h4 className="font-heading text-tSecondary text-2xl font-semibold ">
        Log in to your account
      </h4>
    </main>
  );
}

export default ManagerLogin;
