import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import ChartDataLabels from "chartjs-plugin-datalabels";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartDataLabels
);

interface ChartProps {
  labels: any[];
  values: any[];
}

export function Chart(props: ChartProps) {
  const { labels, values } = props;

  const options = {
    maintainAspectRatio: false,
    responsive: true,
    plugins: [
      {
        legend: {
          display: false,
        },
        title: {
          display: true,
          text: "Dias",
        },
      },
      ChartDataLabels,
    ],
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        grid: {
          display: false,
        },
      },
    },
  };

  const data = {
    labels,
    datasets: [
      {
        label: "Últimos dias",
        data: values,
        backgroundColor: "#FF0040",
        datalabels: {
          color: "black",
          font: {
            weight: "bolder",
            size: "13",
          },
        },
      },
    ],
  };

  return <Bar options={options} data={data} />;
}
