import { useAuth } from "../context/AuthContext";
import Button from "../components/ui/Button";
import Logo from "../components/ui/Logo";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { login } = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    const res = await fetch("http://127.0.0.1:8000/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    const data = await res.json();

    login(data);
    console.log("Success:", data);
    navigate("/adminapplication");
  }

  return (
    <main className="bg-[#f9fafb] flex flex-col gap-5 items-center justify-center h-screen">
      <Logo />
      <h4 className="font-heading text-tSecondary text-2xl font-semibold ">
        Log in to your account
      </h4>
      <Form
        setFormData={setFormData}
        formData={formData}
        handleSubmit={handleSubmit}
      />
    </main>
  );
}

function Form({ formData, setFormData, handleSubmit }) {
  function handleChange(e) {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white px-4 py-6 rounded-md overflow-hidden border border-[#f3f4f6]"
    >
      <LabelInput
        type={"email"}
        name={"email"}
        label={"Email Address"}
        value={formData.email}
        onChange={(e) => {
          handleChange(e);
        }}
      />
      <LabelInput
        value={formData.password}
        type={"password"}
        name={"password"}
        label={"Password"}
        onChange={(e) => {
          handleChange(e);
        }}
      />
      <Button
        type={"submit"}
        className={
          "text-white w-full px-2 py-2 rounded-lg text-sm bg-primary hover:bg-[#4338ca]"
        }
      >
        Log in
      </Button>
    </form>
  );
}

function LabelInput({ label, ...props }) {
  return (
    <div className="flex flex-col items-start p-3 gap-2">
      <label
        htmlFor={props.id || props.name}
        className="font-body font-medium text-tSecondary"
      >
        {label}
      </label>

      <input
        {...props}
        className="border border-[#d1d5db] rounded-sm shadow-sm focus:outline-primary w-72 px-2 py-1"
      />
    </div>
  );
}

export default Login;
