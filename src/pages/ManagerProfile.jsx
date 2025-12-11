import ManagerLayout from "../components/layout/ManagerLayout";

function ManagerProfile() {
  return (
    <ManagerLayout>
      <div className="max-w-[120rem] mx-auto flex flex-col gap-5">
        <div className="flex justify-between w-full items-center">
          <h1 className="font-heading text-tSecondary font-semibold text-3xl text-start">
            Manager Account
          </h1>
        </div>
        <HeaderT> Manager Info</HeaderT>
        <ManagerInfo />
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

function ManagerInfo() {
  return (
    <div className="bg-white shadow-md rounded-sm flex flex-col gap-3 p-3">
      <LabelInput
        label={"Email address"}
        type={"email"}
        readOnly
        value={"test@example.com"}
        className={"bg-[#e5e7eb] text-[#6b7280]"}
        name="email"
      />
      <LabelInput
        label={"Full Name"}
        type={"text"}
        readOnly
        value={"test"}
        name="name"
        className={"text-tSecondary"}
      />
      <LabelInput
        label={"Phone Number"}
        type={"text"}
        readOnly
        value={"0942065501"}
        name="name"
        className={"text-tSecondary"}
      />
      <LabelInput
        label={"Hotel Name"}
        type={"text"}
        readOnly
        value={"Hilton Hotel"}
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
