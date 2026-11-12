import ReactApexChart from "react-apexcharts";
import type { ApexOptions } from "apexcharts";

interface ExpenseCategory {
  category: string;
  count: number;
}

interface ExpensePieChartProps {
  chartData: ExpenseCategory[];
}

const ApexChart = ({ chartData }: ExpensePieChartProps) => {
  const series = chartData.map((item) => item.count);

  const options: ApexOptions = {
    chart: {
      type: "donut",
      width: 420,
    },

    labels: chartData.map((item) => item.category),

    colors: [
      "#20765B",
      "#A9CBB6",
      "#D7C8A8",
      "#7D9C88",
      "#B59980",
      "#B8A0C9",
      "#D98C8C",
      "#8CA6B8",
    ],

    plotOptions: {
      pie: {
        borderRadius: 12,
        donut: {
          size: "68%",
          labels: {
            show: true,
            total: {
              show: true,
              label: "Total expenses",
              formatter: (w) =>
                w.globals.seriesTotals
                  .reduce((a: any, b: any) => a + b, 0)
                  .toString(),
            },
          },
        },
      },
    },

    stroke: {
      width: 0,
    },

    dataLabels: {
      enabled: false,
    },

    legend: {
      position: "right",
    },

    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 320,
          },
          legend: {
            position: "bottom",
          },
        },
      },
    ],
  };

  return (
    <div id="chart">
      <ReactApexChart
        options={options}
        series={series}
        type="donut"
        width="100%"
      />
    </div>
  );
};

export default ApexChart;
