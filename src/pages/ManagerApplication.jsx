import LabelInput from "../components/ui/LabelInput";
import Button from "../components/ui/Button";
import Logo from "../components/ui/Logo";
import toast, { Toaster } from "react-hot-toast";
import { useEffect, useState } from "react";
import { SuccessMessage } from "../components/ui/SuccessMessage";
import { API_URL } from "../services/apiURl";
import ClipLoader from "react-spinners/ClipLoader";

const formEL = [
  {
    label: "Manager Name",
    type: "text",
    name: "manager_name",
    placeholder: "Enter manager full name",
  },
  {
    label: "Email",
    type: "email",
    name: "manager_email",
    placeholder: "manager@example.com",
  },
  {
    label: "Phone Number",
    type: "tel",
    name: "manager_phone",
    placeholder: "+251 9XX XXX XXX",
  },
  {
    label: "Hotel Name",
    type: "text",
    name: "hotel_name",
    placeholder: "Enter hotel name",
  },
  {
    label: "Hotel Address",
    type: "text",
    name: "hotel_address",
    placeholder: "Addis Ababa, Ethiopia",
  },
  {
    label: "Hotel Star Rating",
    type: "number",
    name: "hotel_star_rating",
    min: 1,
    max: 5,
    placeholder: "1 - 5",
  },
  {
    label: "Hotel Description",
    type: "textarea",
    name: "hotel_description",
    placeholder: "Briefly describe the hotel and its services",
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
  const [loading, setLoading] = useState(false);

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

  const LENGTH_RULES = {
    manager_name: { min: 3, max: 60, label: "Manager name" },
    manager_email: { min: 5, max: 100, label: "Email" },
    manager_phone: { min: 9, max: 15, label: "Phone number" },
    hotel_name: { min: 3, max: 80, label: "Hotel name" },
    hotel_address: { min: 5, max: 120, label: "Hotel address" },
    hotel_description: {
      min: 30,
      max: 500,
      label: "Hotel description",
    },
    hotel_star_rating: { min: 1, max: 1, label: "Star rating" },
  };

  const isValidLength = (value, key = null) => {
    if (value === null || value === undefined) {
      return "Some fields are missing";
    }

    if (typeof value === "string") {
      const trimmed = value.trim();

      if (trimmed === "") {
        return `${LENGTH_RULES[key]?.label || "This field"} is required`;
      }

      if (key && LENGTH_RULES[key]) {
        const { min, max, label } = LENGTH_RULES[key];
        const len = trimmed.length;

        if (len < min) {
          return `${label} must be at least ${min} characters`;
        }

        if (max && len > max) {
          return `${label} must be at most ${max} characters`;
        }
      }

      return true;
    }

    if (typeof value === "object") {
      for (const [k, v] of Object.entries(value)) {
        const result = isValidLength(v, k);
        if (result !== true) return result;
      }
      return true;
    }

    return true;
  };

  // For POST
  async function handleSubmit(e) {
    e.preventDefault();

    const validationResult = isValidLength(formData);

    if (validationResult !== true) {
      return toast.error(validationResult);
    }
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/hotel/application/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "ngrok-skip-browser-warning": true,
        },
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
    } finally {
      setLoading(false);
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
          <Form
            setFormData={setFormData}
            handleSubmit={handleSubmit}
            loading={loading}
          />
        </>
      ) : (
        <SuccessMessage
          title={"Application sent successfully"}
          description={
            "Thank you for your application. Please wait for a confirmation email."
          }
        />
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

function Form({ setFormData, handleSubmit, loading }) {
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
          placeholder={item.placeholder}
        />
      ))}
      <Button
        type={"submit"}
        className="text-white px-4 w-full py-2 rounded-lg text-sm bg-primary hover:bg-[#4338ca] col-span-2 justify-self-center"
      >
        {!loading && "Submit"}
        {loading && <ClipLoader color="#fff" loading={loading} size={20} />}
      </Button>
    </form>
  );
}

export default ManagerApplication;
