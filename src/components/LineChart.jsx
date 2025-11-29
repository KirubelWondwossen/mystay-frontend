import { Line } from "react-chartjs-2";

export default function LineChart() {
  const chartData = {
    labels: [
      "Nov 23",
      "Nov 24",
      "Nov 25",
      "Nov 26",
      "Nov 27",
      "Nov 28",
      "Nov 29",
    ],
    datasets: [
      {
        label: "Total Sales",
        data: [12000, 85000, 50000, 28000, 110000, 0, 0],
        borderColor: "#4338ca",
        backgroundColor: "rgba(224, 231, 255,0.2)",
        fill: true,
        borderWidth: 2,
        tension: 0.4,
      },
      {
        label: "Extra Sales",
        data: [0, 2000, 3000, 8000, 15000, 0, 0],
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
    hover: {
      mode: "nearest",
      intersect: true,
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="w-full">
      <Line data={chartData} options={chartOptions} />;
    </div>
  );
}
