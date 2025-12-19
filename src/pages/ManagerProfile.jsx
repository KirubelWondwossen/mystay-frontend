import { useEffect, useState } from "react";
import ManagerLayout from "../components/layout/ManagerLayout";
import Button from "../components/ui/Button";
import toast, { Toaster } from "react-hot-toast";
import { useParams } from "react-router-dom";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";

// const applicationsTemp = {
//   manager_name: "John Doe",
//   manager_email: "john@example.com",
//   hotel_name: "Sunrise Hotel",
//   hotel_address: "123 Main St, City",
//   manager_phone: "+251900000001",
//   hotel_description: "A cozy hotel near the beach.",
//   hotel_star_rating: 4,
//   created_at: "2025-12-01T10:00:00Z",
//   status: "approved",
// };

function ManagerProfile() {
  const [manager, setManager] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const token = localStorage.getItem("token");
  const { id } = useParams();

  async function getData(token) {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`http://127.0.0.1:8000/api/hotelmanager/me`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      });

      if (!res.ok) {
        if (res.status === 401) {
          throw new Error("Unauthorized. Please login again.");
        }

        const message = res.statusText;
        throw new Error(message || "Failed to fetch data");
      }

      const data = await res.json();

      setManager(data);
    } catch (err) {
      console.error(err);
      setError(err.message || "Something went wrong");
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  // For API call
  useEffect(() => {
    getData(token);
  }, [token]);

  return (
    <ManagerLayout
      loading={loading}
      error={error}
      getData={getData}
      token={token}
    >
      {!loading && !error && (
        <>
          <div className="max-w-[120rem] mx-auto flex flex-col gap-5">
            <div className="flex justify-between w-full items-center">
              <h1 className="font-heading text-tSecondary font-semibold text-3xl text-start">
                Manager Account
              </h1>
            </div>
            <HeaderT> Manager Info</HeaderT>
            <ManagerInfo data={manager} />
            <HeaderT> Update Password</HeaderT>
            <ManagerPassword id={id} token={token} />
          </div>
        </>
      )}
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
    </ManagerLayout>
  );
}

// Manager Info

function HeaderT({ children }) {
  return (
    <h3 className="text-start font-heading text-xl font-semibold text-[#4b5563]">
      {children}
    </h3>
  );
}

function ManagerInfo({ data }) {
  return (
    <div className="bg-white shadow-md rounded-sm flex flex-col gap-3 p-3">
      <LabelInput
        label={"Email address"}
        type={"email"}
        readOnly
        value={data.email}
        className={"bg-[#e5e7eb] text-[#6b7280]"}
        name="email"
      />
      <LabelInput
        label={"Full Name"}
        type={"text"}
        readOnly
        value={data.name}
        name="name"
        className={"text-tSecondary"}
      />
      <LabelInput
        label={"Phone Number"}
        type={"text"}
        readOnly
        value={data.phone}
        name="name"
        className={"text-tSecondary"}
      />
    </div>
  );
}

function ManagerPassword({ id, token }) {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    if (password !== confirmPassword)
      return toast.error("Passwords do not match please try again!");

    const formData = {
      current_password: currentPassword,
      new_password: password,
    };

    try {
      const res = await fetch(
        `http://127.0.0.1:8000/api/hotelmanager/${id}/update-password`,
        {
          method: "PATCH",

          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await res.json();

      if (res.ok) {
        toast.success("Password Updated Successfully");
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
        label={"Current Password"}
        type="password"
        value={currentPassword}
        name="currentPassword"
        required
        onChange={(e) => setCurrentPassword(e.target.value)}
      />
      <LabelInput
        label={"New password"}
        type="password"
        value={password}
        name="newPassword"
        required
        onChange={(e) => setPassword(e.target.value)}
      />
      <LabelInput
        label={"Confirm password"}
        type="password"
        value={confirmPassword}
        name="confirmPassword"
        required
        onChange={(e) => setConfirmPassword(e.target.value)}
      />
      <Button
        className={
          "text-white px-4 py-2 rounded-lg text-sm bg-primary hover:bg-[#4338ca] self-end "
        }
      >
        Update password
      </Button>
    </form>
  );
}

function LabelInput({ className, label, ...props }) {
  const [showPass, setShowPass] = useState(false);
  const safeValue = props.value !== undefined ? props.value : "";

  return (
    <div className="border-b py-3 border-[#f3f4f6]">
      <div className="flex items-center justify-between w-1/2 relative">
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
                className="w-4 absolute z-50 right-[2%] cursor-pointer"
                onClick={() => setShowPass(!showPass)}
              />
            )}
            {showPass === true && (
              <EyeSlashIcon
                className="w-4 absolute z-50 right-[2%] cursor-pointer"
                onClick={() => setShowPass(!showPass)}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default ManagerProfile;
