import { XMarkIcon } from "@heroicons/react/16/solid";
import Button from "../ui/Button";

const formEl = [
  {
    label: "Room name",
    type: "text",
    name: "roomName",
    formElement: "input",
  },
  {
    label: "Maximum capacity",
    type: "number",
    name: "maxCapacity",
    formElement: "input",
  },
  {
    label: "Price",
    type: "number",
    name: "price",
    formElement: "input",
  },
  {
    label: "Description for website",
    type: "text",
    name: "description",
    formElement: "textarea",
  },
  {
    label: "Cabin photo",
    type: "file",
    name: "image",
    formElement: "input",
  },
];

function Popup({ handleOpenModal }) {
  return (
    <form
      className="fixed bg-white z-[1001] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
    rounded-xl shadow-lg w-[35rem] mx-auto flex flex-col items-start gap-4 py-3 px-2"
    >
      <PopupHeader handleOpenModal={handleOpenModal} />
      {formEl.map((item, i) => (
        <LabelInput
          key={i}
          label={item.label}
          name={item.name}
          type={item.type}
          formElement={item.formElement}
        />
      ))}
      <div className="flex items-start self-end p-3 gap-3">
        <Button className={"add-room-btn"} onClick={handleOpenModal}>
          Cancel
        </Button>
        <Button
          className={
            "text-white p-2 rounded-lg text-sm bg-primary hover:bg-[#4338ca]"
          }
          onClick={handleOpenModal}
        >
          Create new room
        </Button>
      </div>
    </form>
  );
}

function PopupHeader({ handleOpenModal }) {
  return (
    <div className="w-full p-2 relative">
      <XMarkIcon
        className="w-6 mt-4 absolute right-[2%] bottom-[25%] cursor-pointer"
        onClick={handleOpenModal}
      />
    </div>
  );
}

function LabelInput({ label, name, type, formElement: Element }) {
  return (
    <div className="flex items-center justify-between p-3 border-b border-[#f3f4f6] w-full">
      <label
        htmlFor="name"
        className="font-heading font-medium text-tSecondary"
      >
        {label}
      </label>
      {type === "file" ? (
        <input
          type={type}
          name={name}
          id={name}
          className="font-heading font-medium text-tSecondary text-sm custom-file px-2 py-1"
        />
      ) : (
        <Element
          className={`border border-[#d1d5db] rounded-sm shadow-sm focus:outline-primary 
           ${Element === "textarea" ? "px-4 py-1" : "px-2 py-1"}`}
          type={type}
          name={name}
          id={name}
        />
      )}
    </div>
  );
}

function FilterList({ children }) {
  return (
    <span className="flex gap-2 items-center">
      <input className="h-4 w-4 text-logo cursor-pointer" type="checkbox" />
      <span className="text-lg font-body font-medium">{children}</span>
    </span>
  );
}

export default Popup;
