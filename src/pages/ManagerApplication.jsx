import LabelInput from "../components/ui/LabelInput";
import Button from "../components/ui/Button";
import Logo from "../components/ui/Logo";
import { useEffect, useState } from "react";
const formEL = [
  {
    label: "Manager Name",
    type: "text",
    name: "manager_name",
  },
  {
    label: "Email",
    type: "email",
    name: "manager_email",
  },
  {
    label: "Phone Number",
    type: "tel",
    name: "manager_phone",
  },
  {
    label: "Hotel Name",
    type: "text",
    name: "hotel_name",
  },
  {
    label: "Hotel Address",
    type: "text",
    name: "hotel_address",
  },
  {
    label: "Hotel Star Rating",
    type: "number",
    name: "hotel_star_rating",
    min: 1,
    max: 5,
  },
  {
    label: "Hotel Description",
    type: "textarea",
    name: "hotel_description",
  },
];

function ManagerApplication() {
  const [coords, setCoords] = useState(null);
  const [formData, setFormData] = useState({
    manager_name: "",
    manager_email: "",
    hotel_name: "",
    hotel_address: "",
    manager_phone: "",
    hotel_description: "",
    hotel_star_rating: "",
    hotel_exact_location: {
      latitude: "",
      longitude: "",
    },
  });
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCoords({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        (error) => {
          console.error(error);
        }
      );
    }
  }, []);

  useEffect(() => {
    if (!coords) return;

    setFormData((prev) => ({
      ...prev,
      hotel_exact_location: coords,
    }));
  }, [coords]);

  // For POST
  function handleSubmit(e) {
    e.preventDefault();
    console.log("Sending:", formData);

    // fetch("/api/manager/application", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify(formData),
    // });
  }

  return (
    <main className="bg-[#f9fafb] flex flex-col gap-5 items-center justify-center h-screen">
      <Logo />
      <h4 className="font-heading text-tSecondary text-2xl font-semibold ">
        Manager application form
      </h4>
      <Form setFormData={setFormData} handleSubmit={handleSubmit} />
    </main>
  );
}

function Form({ setFormData, handleSubmit }) {
  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white px-4 py-6 grid grid-cols-2 rounded-md overflow-hidden border border-[#f3f4f6]"
    >
      {formEL.map((item, i) => (
        <LabelInput
          type={item.type}
          label={item.label}
          name={item.name}
          key={i}
          min={item.min}
          max={item.max}
          setFormData={setFormData}
        />
      ))}
      <Button
        type={"submit"}
        className="text-white px-4 w-full py-2 rounded-lg text-sm bg-primary hover:bg-[#4338ca] col-span-2 justify-self-center"
      >
        Submit
      </Button>
    </form>
  );
}
export default ManagerApplication;
