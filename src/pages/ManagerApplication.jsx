import LabelInput from "../components/ui/LabelInput";
import Button from "../components/ui/Button";
import Logo from "../components/ui/Logo";

const formEL = [
  {
    label: "Manager Name",
    type: "text",
    name: "managerName",
  },
  {
    label: "Email",
    type: "email",
    name: "email",
  },
  {
    label: "Phone Number",
    type: "tel",
    name: "phoneNumber",
  },
  {
    label: "Hotel Name",
    type: "text",
    name: "hotelName",
  },
  {
    label: "Hotel Address",
    type: "text",
    name: "hotelAddress",
  },

  {
    label: "Hotel Star Rating",
    type: "number",
    name: "hotelStarRating",
    min: 1,
    max: 5,
  },
  {
    label: "Hotel Description",
    type: "textarea",
    name: "hotelDescription",
  },
];

function ManagerApplication() {
  return (
    <main className="bg-[#f9fafb] flex flex-col gap-5 items-center justify-center h-screen">
      <Logo />
      <h4 className="font-heading text-tSecondary text-2xl font-semibold ">
        Manager application form
      </h4>
      <Form />
    </main>
  );
}

function Form() {
  return (
    <form className="bg-white px-4 py-6 grid grid-cols-2 rounded-md overflow-hidden border border-[#f3f4f6]">
      {formEL.map((item, i) => (
        <LabelInput
          type={item.type}
          label={item.label}
          name={item.name}
          key={i}
          min={item.min}
          max={item.max}
        />
      ))}
      <Button className="text-white px-4 w-full py-2 rounded-lg text-sm bg-primary hover:bg-[#4338ca] col-span-2 justify-self-center">
        Submit
      </Button>
    </form>
  );
}
export default ManagerApplication;
