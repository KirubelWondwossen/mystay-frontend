import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import Button from "../ui/Button";
import { XMarkIcon } from "@heroicons/react/16/solid";

export function MobilePaymentPopup({
  handleClose,
  setSuccessPayment,
  totalPrice,
}) {
  const [mobile, setMobile] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!mobile || mobile.length < 9) {
      setError("Enter a valid mobile number");
      return;
    }

    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      toast.success("Payment Successful!");
      handleClose();
      setSuccessPayment(true);
    }, 1500);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="fixed bg-white z-[1001] top-1/2 left-1/2 transform 
      -translate-x-1/2 -translate-y-1/2 rounded-xl shadow-lg 
      w-[30rem] flex flex-col gap-4 py-4 px-3"
    >
      <div className="w-full relative">
        <h2 className="font-heading text-lg text-tSecondary">Mobile Payment</h2>
        <XMarkIcon
          className="w-6 absolute right-0 top-0 cursor-pointer"
          onClick={handleClose}
        />
      </div>

      <div className="flex flex-col gap-2">
        <label className="font-heading text-sm">Mobile Number</label>
        <input
          type="tel"
          value={mobile}
          onChange={(e) => setMobile(e.target.value)}
          placeholder="09XXXXXXXX"
          className="border border-[#d1d5db] rounded-sm px-3 py-2 focus:outline-primary"
        />
        <div className="flex px-3 items-center gap-4">
          <span className="font-heading font-semibold text-lg justify-self-start text-tSecondary">
            Total price to paid
          </span>

          <span className="bg-background2 p-2 rounded-lg shadow-sm font-heading">
            {totalPrice > 0 ? "$" + totalPrice : "Select check in/out dates"}
          </span>
        </div>
        {error && <span className="text-xs text-red-500">{error}</span>}
      </div>

      <p className="text-xs text-gray-500">
        This is a simulated mobile payment. No real transaction will occur.
      </p>

      <div className="flex self-end gap-3 mt-2">
        <Button type="button" onClick={handleClose}>
          Cancel
        </Button>
        <Button className="bg-primary text-white px-4 py-2">
          {loading ? "Processing..." : "Confirm Payment"}
        </Button>
      </div>
    </form>
  );
}
