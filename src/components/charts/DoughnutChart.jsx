import { Doughnut } from "react-chartjs-2";
import { getStayDurationStats } from "../../utils/getStayDurationStats";

export default function DoughnutChart({ bookings }) {
  const { short, mid, long } = getStayDurationStats(bookings);

  const data = {
    labels: ["1–2 nights", "3–7 nights", "8+ nights"],
    datasets: [
      {
        label: "Stay Duration",
        data: [short, mid, long],
        backgroundColor: [
          "rgb(249, 115, 22)", // orange
          "rgb(234, 179, 8)", // yellow
          "rgb(20, 184, 166)", // teal
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: "70%",
    plugins: {
      legend: {
        position: "right",
        labels: {
          font: { size: 14 },
          color: "#374151",
          padding: 18,
        },
      },
    },
  };

  return (
    <div className="h-56">
      <Doughnut data={data} options={options} />
    </div>
  );
}
