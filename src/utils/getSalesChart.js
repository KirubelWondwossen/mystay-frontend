export function getSalesChartData(bookings) {
  const sales = {};

  bookings.forEach((b) => {
    if (!b.total_price) return;

    const date = new Date(b.created_at).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });

    sales[date] = (sales[date] || 0) + b.total_price;
  });

  return {
    labels: Object.keys(sales),
    values: Object.values(sales),
  };
}
