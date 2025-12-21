import { XMarkIcon } from "@heroicons/react/16/solid";
import Button from "../ui/Button";
import { useState } from "react";
import { Loader } from "../ui/Loader";
import toast from "react-hot-toast";
import { postRooms } from "../../services/postAPI";
import { useAuth } from "../../context/AuthContext";
import { SuccessMessage } from "../ui/SuccessMessage";

const formEl = [
  {
    label: "Room number",
    type: "text",
    name: "room_number",
    formElement: "input",
  },
  {
    label: "Room type",
    name: "room_type",
    formElement: "select",
    options: [
      { value: "", label: "Select room type" },
      { value: "standard", label: "Standard" },
      { value: "single", label: "Single" },
      { value: "double", label: "Double" },
      { value: "suite", label: "Suite" },
      { value: "deluxe", label: "Deluxe" },
    ],
  },
  {
    label: "Price per night",
    type: "number",
    name: "price_per_night",
    formElement: "input",
  },
  {
    label: "Bed type",
    name: "bed_type",
    formElement: "select",
    options: [
      { value: "", label: "Select bed type" },
      { value: "king", label: "King" },
      { value: "queen", label: "Queen" },
      { value: "twin", label: "Twin" },
    ],
  },
  {
    label: "Description for website",
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

const requiredFields = [
  "room_number",
  "room_type",
  "price_per_night",
  "bed_type",
  "description",
  "image",
];

const initialFormData = {
  room_number: "",
  room_type: "",
  price_per_night: "",
  bed_type: "",
  description: "",
  image: null,
};

function Popup({ handleOpenModal, id }) {
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState(initialFormData);
  const { token } = useAuth();

  const handleChange = (e) => {
    const { name, value, files, type } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "file" ? files[0] : value,
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    requiredFields.forEach((field) => {
      if (
        !formData[field] ||
        (typeof formData[field] === "string" && !formData[field].trim())
      ) {
        newErrors[field] = "This field is required";
      }
    });

    if (formData.price_per_night && Number(formData.price_per_night) <= 0) {
      newErrors.price_per_night = "Price must be greater than 0";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const resetForm = () => {
    setFormData(initialFormData);
    setErrors({});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});

    if (!validateForm()) {
      toast.error("Please fix validation errors!");
      setLoading(false);
      return;
    }

    try {
      const payload = {
        room_number: formData.room_number.toString(),
        room_type: formData.room_type,
        price_per_night: formData.price_per_night,
        bed_type: formData.bed_type,
        description: formData.description,
        image: formData.image,
      };

      const res = await postRooms(id, token, payload);
      toast.success(res.msg || "Room created successfully!");
      resetForm();
    } catch (err) {
      if (err.type === "validation" && err.errors) {
        const backendErrors = {};
        Object.keys(err.errors).forEach((key) => {
          backendErrors[key] = err.errors[key][0];
        });
        setErrors(backendErrors);
        toast.error("Please fix the highlighted fields");
      } else {
        toast.error(err.message || "Failed to create room");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      className="fixed bg-white z-[1001] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
      rounded-xl shadow-lg w-[35rem] mx-auto flex flex-col items-start gap-4 py-3 px-2"
      onSubmit={handleSubmit}
    >
      {loading && <Loader loading={loading} className="self-center" />}
      {!loading && (
        <>
          <PopupHeader handleOpenModal={handleOpenModal} />
          {formEl.map((item, i) => (
            <LabelInput
              key={i}
              label={item.label}
              name={item.name}
              type={item.type}
              formElement={item.formElement}
              value={formData[item.name]}
              options={item.options}
              onChange={handleChange}
              error={errors[item.name]}
            />
          ))}

          <div className="flex items-start self-end p-3 gap-3">
            <Button
              type="button"
              className="add-room-btn"
              onClick={handleOpenModal}
            >
              Cancel
            </Button>
            <Button
              className="text-white p-2 rounded-lg text-sm bg-primary hover:bg-[#4338ca]"
              type="submit"
            >
              Create new room
            </Button>
          </div>
        </>
      )}
    </form>
  );
}

function PopupHeader({ handleOpenModal }) {
  return (
    <div className="w-full p-2 relative">
      <XMarkIcon
        className="w-6 mt-4 absolute right-[2%] bottom-[25%] cursor-pointer z-50"
        onClick={(e) => {
          e.preventDefault();
          handleOpenModal();
        }}
      />
    </div>
  );
}

function LabelInput({
  label,
  name,
  type = "text",
  formElement,
  value,
  onChange,
  options = [],
  error,
}) {
  return (
    <div className="flex flex-col gap-1 p-3 border-b border-[#f3f4f6] w-full">
      <div className="flex items-center justify-between">
        <label
          htmlFor={name}
          className="font-heading font-medium text-tSecondary"
        >
          {label}
        </label>

        {formElement === "input" && type === "file" && (
          <input
            type="file"
            name={name}
            id={name}
            onChange={onChange}
            className="font-heading font-medium text-tSecondary text-sm custom-file px-2 py-1"
          />
        )}

        {formElement === "select" && (
          <select
            name={name}
            id={name}
            value={value}
            onChange={onChange}
            className="border-[#d1d5db] px-4 py-1 rounded-sm shadow-sm font-body text-sm focus:outline-primary focus:ring-2 focus:ring-primary"
          >
            {options.map((opt, i) => (
              <option key={i} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        )}

        {formElement === "textarea" && (
          <textarea
            name={name}
            id={name}
            value={value}
            onChange={onChange}
            className="border border-[#d1d5db] rounded-sm shadow-sm focus:outline-primary px-4 py-1"
          />
        )}

        {formElement === "input" && type !== "file" && (
          <input
            type={type}
            name={name}
            id={name}
            value={value}
            onChange={onChange}
            className="border border-[#d1d5db] rounded-sm shadow-sm focus:outline-primary px-2 py-1"
          />
        )}
      </div>

      {error && (
        <span className="text-xs text-red-500 font-body mt-1">{error}</span>
      )}
    </div>
  );
}

export default Popup;
