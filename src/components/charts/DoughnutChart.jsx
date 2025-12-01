import { Doughnut } from "react-chartjs-2";

export default function DoughnutChart() {
  const data = {
    labels: ["2 nights", "3 nights", "8-14 nights"],
    datasets: [
      {
        label: ["Stays"],
        data: [30, 45, 25],
        backgroundColor: [
          "rgb(249, 115, 22)",
          "rgb(234, 179, 8)",
          "rgb(20, 184, 166)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: "75%", // doughnut hole size
    animation: {
      duration: 1000,
      easing: "easeOut",
    },
    plugins: {
      legend: {
        position: "right",

        labels: {
          color: "#333",
          font: {
            size: 14,
            family: "Poppins",
          },
          boxWidth: 15,
          padding: 20,
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
