import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";

import Button from "../ui/Button";
import Logo from "../ui/Logo";

function LoginForm({ endpoint, role, redirectTo }) {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { login } = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success("Login Successful");
        login(data, role);

        setTimeout(() => {
          navigate(redirectTo);
        }, 800);
      } else {
        toast.error(data.detail || "Wrong email or password");
      }
    } catch (err) {
      toast.error("Network error, please try again");
      console.error(err);
    }
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  return (
    <main className="bg-[#f9fafb] flex flex-col gap-5 items-center justify-center h-screen">
      <Logo />

      <h4 className="font-heading text-tSecondary text-2xl font-semibold">
        Log in to your account
      </h4>

      <form
        onSubmit={handleSubmit}
        className="bg-white px-4 py-6 rounded-md border border-[#f3f4f6]"
      >
        <LabelInput
          label="Email Address"
          type="email"
          name="email"
          value={formData.email}
          required
          onChange={handleChange}
        />

        <LabelInput
          label="Password"
          type="password"
          name="password"
          value={formData.password}
          required
          onChange={handleChange}
        />

        <Button
          type="submit"
          className="text-white w-full px-2 py-2 rounded-lg text-sm bg-primary"
        >
          Log in
        </Button>
      </form>

      <Toaster position="top-center" />
    </main>
  );
}

function LabelInput({ label, ...props }) {
  const [showPass, setShowPass] = useState(false);

  return (
    <div className="flex flex-col items-start p-3 gap-2 relative">
      <label className="font-body font-medium text-tSecondary ">{label}</label>

      <input
        {...props}
        type={props.type === "password" && showPass ? "text" : props.type}
        className="border border-[#d1d5db] rounded-sm shadow-sm w-72 px-2 py-1"
      />
      {props.type === "password" && (
        <>
          {showPass === false && (
            <EyeIcon
              className="w-4 absolute z-50 right-[7%] bottom-[23%] cursor-pointer"
              onClick={() => setShowPass(!showPass)}
            />
          )}
          {showPass === true && (
            <EyeSlashIcon
              className="w-4 absolute z-50 right-[7%] bottom-[23%] cursor-pointer"
              onClick={() => setShowPass(!showPass)}
            />
          )}
        </>
      )}
    </div>
  );
}

export default LoginForm;
