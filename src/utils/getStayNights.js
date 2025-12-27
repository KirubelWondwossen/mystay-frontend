export function getStayNights(check_in, check_out) {
  const start = new Date(check_in);
  const end = new Date(check_out);

  const diffTime = end - start;
  const nights = diffTime / (1000 * 60 * 60 * 24);

  return nights;
}
