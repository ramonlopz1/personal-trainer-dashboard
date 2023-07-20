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
  chartData: any;
}

export function Chart(props: ChartProps) {
  const { chartData } = props;

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

  const labels = chartData
    .map((obj: any) => obj.name)
    .reverse()
    .slice(0, 7)
    .reverse();
    
  const values = chartData
    .map((obj: any) => obj.value)
    .reverse()
    .slice(0, 7)
    .reverse();

  const data = {
    labels: labels,
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
