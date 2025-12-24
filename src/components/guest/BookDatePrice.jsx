import { useEffect } from "react";
import { getDaysFromRange } from "../../utils/getDaysFromRange";
import { DayPicker } from "react-day-picker";
import { FaGoogle } from "react-icons/fa";
import Button from "../ui/Button";

export function BookDatePrice({
  range,
  setRange,
  price,
  unavDates,
  authenticated,
  totalPrice,
  setTotalPrice,
  handleBook,
  setPayment,
  payment,
}) {
  return (
    <div className="grid grid-cols-[1.2fr_1fr] w-full">
      <DateSelector
        range={range}
        setRange={setRange}
        price={price}
        unavDates={unavDates}
        setTotalPrice={setTotalPrice}
      />
      <BookInfo
        authenticated={authenticated}
        range={range}
        totalPrice={totalPrice}
        handleBook={handleBook}
        setPayment={setPayment}
        payment={payment}
      />
    </div>
  );
}

export function DateSelector({
  range,
  setRange,
  price,
  unavDates,
  setTotalPrice,
}) {
  function handleClear() {
    setRange(undefined);
    setTotalPrice(0);
  }
  const days = range?.from && range?.to ? getDaysFromRange(range) : 0;

  useEffect(() => {
    if (days >= 1) {
      setTotalPrice(price * days);
    } else {
      setTotalPrice(0);
    }
  }, [days, price, setTotalPrice]);

  const unavailableDates = unavDates.unavailable_dates.map((date) => {
    const d = new Date(date);
    d.setHours(0, 0, 0, 0);
    return d;
  });

  const disabledDays = [{ before: new Date() }, ...unavailableDates];

  return (
    <div className="flex flex-col w-fit">
      <DayPicker
        mode="range"
        selected={range}
        onSelect={setRange}
        numberOfMonths={2}
        disabled={disabledDays}
        className="font-heading"
        classNames={{
          today: "",
          selected: "bg-primary text-white hover:bg-primary",
          range_start: "bg-primary text-white rounded-l-full",
          range_middle: "bg-primary text-white",
          range_end: "bg-primary text-white rounded-r-full",
        }}
      />

      <div className="bg-background2 p-6 flex gap-4 items-center">
        <span className="text-xl text-tSecondary font-heading">
          ${price} <span className="text-sm">/night</span>
        </span>

        {range && (
          <>
            {days === 0 && (
              <span className="p-2 text-xl font-heading text-tSecondary">
                Add checkout day
              </span>
            )}

            {days >= 1 && (
              <>
                <span className="text-xl font-heading text-tSecondary">
                  {days} night{days > 1 ? "s" : ""}
                </span>

                <span className="text-xl font-heading text-tSecondary">
                  Total ${price * days}
                </span>

                <Button
                  onClick={handleClear}
                  className="py-1 px-2 ml-10 text-lg font-heading text-tSecondary border border-tSecondary rounded-lg"
                >
                  Clear
                </Button>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export function BookInfo({
  authenticated,
  range,
  totalPrice,
  handleBook,
  setPayment,
  payment,
}) {
  const handleGoogleLogin = () => {
    window.location.href =
      "http://127.0.0.1:8000/api/auth/google/login?redirect=http://localhost:5173/";
  };
  const isPaymentDisabled = !range?.to || totalPrice <= 0;

  return (
    <div className="flex flex-col items-start gap-4">
      {!authenticated && (
        <Button
          onClick={handleGoogleLogin}
          className="flex items-center gap-2 border px-4 py-2 rounded"
        >
          <FaGoogle className="w-8" />
          Continue with Google
        </Button>
      )}

      {authenticated && (
        <>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-4">
              <span className="text-lg font-heading font-semibold justify-self-start text-tSecondary">
                Check in
              </span>

              <span className="bg-background2 p-2 rounded-lg shadow-sm font-heading text-sm">
                {range?.to ? range.from.toDateString() : "No date"}
              </span>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-lg font-heading font-semibold justify-self-start text-tSecondary">
                Check out
              </span>

              <span className="bg-background2 p-2 rounded-lg shadow-sm font-heading text-sm">
                {range?.to ? range.to.toDateString() : "No date"}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-lg font-heading font-semibold justify-self-start text-tSecondary">
              Total Price
            </span>

            <span className="bg-background2 p-2 rounded-lg shadow-sm font-heading text-sm">
              {range && totalPrice > 0
                ? "$" + totalPrice
                : "Select check in/out dates"}
            </span>
          </div>
          <select
            value={payment || ""}
            onChange={(e) => setPayment(e.target.value)}
            disabled={isPaymentDisabled}
            className={`font-heading px-2 py-1 outline-none border border-tSecondary rounded-lg ${
              isPaymentDisabled ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            <option value="" disabled>
              Select payment method
            </option>
            <option value="cash">Cash</option>
            <option value="card">Card</option>
            <option value="mobile">Mobile</option>
          </select>

          <CheckInOut
            handleBook={handleBook}
            disabled={!range?.to || totalPrice <= 0 || !payment}
          />
        </>
      )}
    </div>
  );
}

function CheckInOut({ handleBook, disabled }) {
  return (
    <div className="flex gap-2">
      <Button
        disabled={disabled}
        className={`rounded-lg p-2 text-white ${
          disabled
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-primary hover:bg-[#4338ca]"
        }`}
        onClick={handleBook}
      >
        Check-in
      </Button>

      <Button
        className={"bg-error rounded-lg p-2 text-white hover:bg-[#4338ca]"}
      >
        Cancel
      </Button>
    </div>
  );
}
