import { useState } from "react";
import Logo from "../components/ui/Logo";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import Button from "../components/ui/Button";
import toast, { Toaster } from "react-hot-toast";
import { useSearchParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../services/apiURl";

export default function ResetPassword() {
  const [params] = useSearchParams();
  const token = params.get("token");
  return (
    <main className="bg-[#f9fafb] flex flex-col gap-5 items-center justify-center h-screen">
      <Logo />

      <h4 className="font-heading text-tSecondary text-2xl font-semibold">
        Reset Password
      </h4>
      <ManagerPassword token={token} />
      <Toaster
        position="top-center"
        reverseOrder={false}
        toastOptions={{
          duration: 5000,
          style: {
            minWidth: "250px",
            maxWidth: "600px",
          },
        }}
      />
    </main>
  );
}

function ManagerPassword({ token }) {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const passwordPattern =
    "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$";
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    if (password !== confirmPassword)
      return toast.error("Passwords do not match please try again!");

    const formData = {
      new_password: password,
      token: token,
    };
    toast.success("Password changed successfully");
    try {
      const res = await fetch(`${API_URL}/hotelmanager/reset-password`, {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
          "ngrok-skip-browser-warning": true,
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success("Password Updated Successfully");
        setConfirmPassword("");
        setPassword("");
        setTimeout(() => {
          navigate("/manager/login");
        }, 1500);
      } else {
        toast.error(data.detail || "Current password is incorrect");
      }
    } catch (err) {
      toast.error("Network error, please try again");
      console.error(err);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white shadow-md rounded-sm flex flex-col gap-3 p-3"
    >
      <LabelInput
        label={"New password"}
        type="password"
        value={password}
        name="newPassword"
        required
        pattern={passwordPattern}
        onChange={(e) => setPassword(e.target.value)}
      />
      <LabelInput
        label={"Confirm password"}
        type="password"
        value={confirmPassword}
        name="confirmPassword"
        required
        title="Password must be at least 8 characters and include uppercase, lowercase, number, and special character"
        onChange={(e) => setConfirmPassword(e.target.value)}
      />
      <Button
        className={
          "text-white px-4 py-2 rounded-lg text-sm bg-primary hover:bg-[#4338ca] self-end "
        }
      >
        Reset password
      </Button>
    </form>
  );
}
function LabelInput({ className, label, ...props }) {
  const [showPass, setShowPass] = useState(false);
  const safeValue = props.value !== undefined ? props.value : "";

  return (
    <div className="border-b py-3 border-[#f3f4f6]">
      <div className="flex flex-col items-start px-3 relative">
        <label
          htmlFor={props.id || props.name}
          className="font-body font-medium text-tSecondary"
        >
          {label}
        </label>
        <input
          {...props}
          value={safeValue}
          type={props.type === "password" && showPass ? "text" : props.type}
          className={`border text-sm text-body border-[#d1d5db] rounded-sm shadow-sm focus:outline-primary w-72 px-2 py-1 ${className}`}
        />
        {props.type === "password" && (
          <>
            {showPass === false && (
              <EyeIcon
                className="w-4 absolute z-50 right-[8%] top-[55%] cursor-pointer"
                onClick={() => setShowPass(!showPass)}
              />
            )}
            {showPass === true && (
              <EyeSlashIcon
                className="w-4 absolute z-50 right-[8%] top-[55%] cursor-pointer"
                onClick={() => setShowPass(!showPass)}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
}
