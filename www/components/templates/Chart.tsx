import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineElement
} from "chart.js";
import { Bar, Line } from "react-chartjs-2";
import ChartDataLabels from "chartjs-plugin-datalabels";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartDataLabels,
  PointElement,
  LineElement
);

interface ChartProps {
  chartData: any;
  type: string;
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


  const data = {
    labels: ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "L", "M"],
    datasets: [
      {
        label: "Últimos dias",
        data: chartData,
        backgroundColor: "purple",
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

  const getChart = (type: string) => {
    if(type === "line") {
      return <Line options={options} data={data} />;
    } else if(type === "bar") {
      return <Bar options={options} data={data} />;
    }
  }

  return getChart(props.type)
}
