import Button from "../components/ui/Button";
import Logo from "../components/ui/Logo";
import LabelInput from "../components/ui/LabelInput";

function ManagerLogin() {
  return (
    <main className="bg-[#f9fafb] flex flex-col gap-5 items-center justify-center h-screen">
      <Logo />
      <h4 className="font-heading text-tSecondary text-2xl font-semibold ">
        Log in to your account
      </h4>
      <Form />
    </main>
  );
}

function Form() {
  return (
    <form className="bg-white px-4 py-6 rounded-md overflow-hidden border border-[#f3f4f6]">
      <LabelInput type={"email"} name={"email"} label={"Email Address"} />
      <LabelInput type={"password"} name={"password"} label={"Password"} />
      <Button
        type={"button"}
        className={
          "text-white w-72 px-2 py-2 rounded-lg text-sm bg-primary hover:bg-[#4338ca] "
        }
      >
        Log in
      </Button>
    </form>
  );
}

export default ManagerLogin;
