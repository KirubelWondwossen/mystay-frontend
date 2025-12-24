export function formatBookingDates(checkIn, checkOut) {
  const options = {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
  };
  const now = new Date();
  const checkInDate = new Date(checkIn);
  const checkOutDate = new Date(checkOut);

  const checkInStr = checkInDate.toLocaleDateString("en-US", options);
  const checkOutStr = checkOutDate.toLocaleDateString("en-US", options);

  const diffTime = checkInDate - now;
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  let relative = "";
  if (diffDays === 0) relative = "(Today)";
  else if (diffDays === 1) relative = "(Tomorrow)";
  else if (diffDays > 1 && diffDays < 30) relative = `(In ${diffDays} days)`;
  else if (diffDays >= 30 && diffDays < 365) {
    const months = Math.round(diffDays / 30);
    relative = `(In ${months} month${months > 1 ? "s" : ""})`;
  } else {
    const years = Math.round(diffDays / 365);
    relative = `(In ${years} year${years > 1 ? "s" : ""})`;
  }

  return `${checkInStr} ${relative} — ${checkOutStr}`;
}
