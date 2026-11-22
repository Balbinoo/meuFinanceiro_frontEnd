import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import type { MonthlySummaryResponse } from "../../../types/dashboard/dashboardType";

interface SimpleBarChartProps {
  chartData: MonthlySummaryResponse[];
}

const SimpleBarChart = ({ chartData }: SimpleBarChartProps) => {
  return (
    <BarChart
      style={{
        width: "100%",
        maxWidth: "700px",
        maxHeight: "70vh",
        aspectRatio: 1.618,
      }}
      responsive
      data={chartData}
      margin={{
        top: 5,
        right: 0,
        left: 0,
        bottom: 5,
      }}
    >
      <CartesianGrid />
      <XAxis dataKey="label" />
      <YAxis width="auto" />
      <Tooltip />
      <Legend />
      <Bar fill="#20765B" dataKey="income" radius={[10, 10, 0, 0]} />
      <Bar fill="#D7C8A8" dataKey="expense" radius={[10, 10, 0, 0]} />
    </BarChart>
  );
};

export default SimpleBarChart;
