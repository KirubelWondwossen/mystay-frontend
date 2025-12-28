import { Line } from "react-chartjs-2";
import { getSalesChartData } from "../../utils/getSalesChart";

export default function LineChart({ bookings }) {
  const { labels, values } = getSalesChartData(bookings);

  const chartData = {
    labels,
    datasets: [
      {
        label: "Total Sales",
        data: values,
        borderColor: "#4338ca",
        backgroundColor: "rgba(224, 231, 255,0.2)",
        fill: true,
        borderWidth: 2,
        tension: 0.4,
      },
      {
        label: "Extra Sales",
        data: values.map((val) => val * 0.1),
        borderColor: "#15803d",
        backgroundColor: "rgba(21, 128, 61,0.2)",
        fill: true,
        borderWidth: 2,
        tension: 0.4,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: true,
        mode: "index",
        intersect: false,
        backgroundColor: "rgba(0,0,0,0.7)",
        titleColor: "#fff",
        bodyColor: "#fff",
        titleFont: { size: 14, weight: "bold" },
        bodyFont: { size: 12 },
      },
    },
    hover: { mode: "nearest", intersect: true },
    scales: {
      y: { beginAtZero: true },
    },
  };

  return (
    <div className="w-full">
      <Line data={chartData} options={chartOptions} />
    </div>
  );
}
