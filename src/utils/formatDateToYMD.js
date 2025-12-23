export function formatDateToYMD(date) {
  const d = new Date(date);

  const year = d.getFullYear();

  // getMonth() returns 0–11, so add 1
  const month = String(d.getMonth() + 1).padStart(2, "0");

  const day = String(d.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}
