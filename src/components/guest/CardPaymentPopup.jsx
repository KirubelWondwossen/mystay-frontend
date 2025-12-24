import { useState } from "react";
import toast from "react-hot-toast";
import Button from "../ui/Button";
import { XMarkIcon } from "@heroicons/react/16/solid";

export function CardPaymentPopup({
  handleClose,
  setSuccessPayment,
  totalPrice,
}) {
  const [form, setForm] = useState({
    cardNumber: "",
    holder: "",
    expiry: "",
    cvv: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!form.cardNumber || !form.holder || !form.expiry || !form.cvv) {
      setError("All fields are required");
      return;
    }

    setTimeout(() => {
      toast.success("Payment Successful!");
      // onSuccess({
      //   payment_method: "card",
      //   payment_status: "paid",
      //   transaction_ref: "CARD-" + Date.now(),
      // });
      handleClose();
      setSuccessPayment(true);
      handleClose();
    }, 1500);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="fixed bg-white z-[1001] top-1/2 left-1/2 transform 
      -translate-x-1/2 -translate-y-1/2 rounded-xl shadow-lg 
      w-[32rem] flex flex-col gap-4 py-4 px-3"
    >
      <div className="w-full relative">
        <h2 className="font-heading text-lg text-tSecondary">Card Payment</h2>
        <XMarkIcon
          className="w-6 absolute right-0 top-0 cursor-pointer"
          onClick={handleClose}
        />
      </div>

      <input
        name="cardNumber"
        placeholder="4242 4242 4242 4242"
        onChange={handleChange}
        className="border px-3 py-2 rounded-sm focus:outline-primary"
      />

      <input
        name="holder"
        placeholder="Card Holder Name"
        onChange={handleChange}
        className="border px-3 py-2 rounded-sm focus:outline-primary"
      />

      <div className="flex gap-3">
        <input
          name="expiry"
          placeholder="MM/YY"
          onChange={handleChange}
          className="border px-3 py-2 rounded-sm w-1/2"
        />
        <input
          name="cvv"
          placeholder="CVV"
          onChange={handleChange}
          className="border px-3 py-2 rounded-sm w-1/2"
        />
      </div>
      <div className="flex px-3 items-center gap-4">
        <span className="font-heading font-semibold text-lg justify-self-start text-tSecondary">
          Total price to paid
        </span>

        <span className="bg-background2 p-2 rounded-lg shadow-sm font-heading">
          {totalPrice > 0 ? "$" + totalPrice : "Select check in/out dates"}
        </span>
      </div>
      {error && <span className="text-xs text-red-500">{error}</span>}

      <p className="text-xs text-gray-500">
        Use test card: <strong>4242 4242 4242 4242</strong>
      </p>

      <div className="flex self-end gap-3 mt-2">
        <Button type="button" onClick={handleClose}>
          Cancel
        </Button>
        <Button className="bg-primary text-white px-4 py-2">
          Confirm Payment
        </Button>
      </div>
    </form>
  );
}
