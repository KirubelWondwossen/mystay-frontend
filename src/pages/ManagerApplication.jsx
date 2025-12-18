import LabelInput from "../components/ui/LabelInput";
import Button from "../components/ui/Button";
import Logo from "../components/ui/Logo";
import toast, { Toaster } from "react-hot-toast";
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
  const [submitted, setSubmitted] = useState(false);

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

  const isNotEmpty = (value) => {
    if (value === null || value === undefined) return false;

    if (typeof value === "string") {
      return value.trim() !== "";
    }

    if (typeof value === "object") {
      return Object.values(value).every(isNotEmpty);
    }

    return true;
  };

  // For POST
  async function handleSubmit(e) {
    e.preventDefault();

    const isFormValid = isNotEmpty(formData);
    if (!isFormValid)
      return toast.error("Invalid data please fill all the inputs correctly");

    try {
      const res = await fetch("http://127.0.0.1:8000/api/hotel/application/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success("Registration Succesfull Please wait for an email");
        setFormData({
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
        setSubmitted(true);
      } else {
        toast.error(
          data.detail || "Invalid data please fill all the inputs correctly"
        );
      }
    } catch (err) {
      toast.error("Network error, please try again");
      console.error(err);
    }
  }

  return (
    <main className="bg-[#f9fafb] flex flex-col gap-5 items-center justify-center h-screen">
      <Logo />
      {!submitted ? (
        <>
          <h4 className="font-heading text-tSecondary text-2xl font-semibold ">
            Hotel application form
          </h4>
          <Form setFormData={setFormData} handleSubmit={handleSubmit} />
        </>
      ) : (
        <SuccessMessage />
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

function SuccessMessage() {
  return (
    <div className="bg-white p-8 rounded-md shadow-md text-center max-w-md">
      <h3 className="font-heading text-xl text-primary font-semibold">
        Application sent successfully
      </h3>
      <p className="font-body text-sm text-tSecondary mt-3">
        Thank you for your application. Please wait for a confirmation email.
      </p>
    </div>
  );
}

export default ManagerApplication;
