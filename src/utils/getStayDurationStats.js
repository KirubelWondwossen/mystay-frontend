import { getStayNights } from "./getStayNights";

export function getStayDurationStats(bookings = []) {
  let short = 0;
  let mid = 0;
  let long = 0;

  bookings.forEach((b) => {
    const nights = getStayNights(b.check_in, b.check_out);

    if (nights <= 2) short++;
    else if (nights <= 7) mid++;
    else long++;
  });

  return { short, mid, long };
}
