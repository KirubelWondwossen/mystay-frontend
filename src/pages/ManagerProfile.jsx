import { useEffect, useState } from "react";
import ManagerLayout from "../components/layout/ManagerLayout";

const applicationsTemp = {
  manager_name: "John Doe",
  manager_email: "john@example.com",
  hotel_name: "Sunrise Hotel",
  hotel_address: "123 Main St, City",
  manager_phone: "+251900000001",
  hotel_description: "A cozy hotel near the beach.",
  hotel_star_rating: 4,
  created_at: "2025-12-01T10:00:00Z",
  status: "approved",
};

function ManagerProfile() {
  const [manager, setManager] = useState([]);

  // For API call
  useEffect(() => {
    setManager(applicationsTemp);
  }, []);

  return (
    <ManagerLayout>
      <div className="max-w-[120rem] mx-auto flex flex-col gap-5">
        <div className="flex justify-between w-full items-center">
          <h1 className="font-heading text-tSecondary font-semibold text-3xl text-start">
            Manager Account
          </h1>
        </div>
        <HeaderT> Manager Info</HeaderT>
        <ManagerInfo data={manager} />
      </div>
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
        value={data.manager_email}
        className={"bg-[#e5e7eb] text-[#6b7280]"}
        name="email"
      />
      <LabelInput
        label={"Full Name"}
        type={"text"}
        readOnly
        value={data.manager_name}
        name="name"
        className={"text-tSecondary"}
      />
      <LabelInput
        label={"Phone Number"}
        type={"text"}
        readOnly
        value={data.manager_phone}
        name="name"
        className={"text-tSecondary"}
      />
      <LabelInput
        label={"Hotel Name"}
        type={"text"}
        readOnly
        value={data.hotel_name}
        name="name"
        className={"text-tSecondary"}
      />
    </div>
  );
}

function LabelInput({ className, label, ...props }) {
  return (
    <div className="border-b py-3 border-[#f3f4f6]">
      <div className="flex items-center justify-between w-1/2">
        <label
          htmlFor={props.id || props.name}
          className="font-body font-medium text-tSecondary"
        >
          {label}
        </label>

        <input
          {...props}
          className={`border text-sm text-body border-[#d1d5db] rounded-sm shadow-sm focus:outline-primary w-72 px-2 py-1 ${className}`}
        />
      </div>
    </div>
  );
}

export default ManagerProfile;
