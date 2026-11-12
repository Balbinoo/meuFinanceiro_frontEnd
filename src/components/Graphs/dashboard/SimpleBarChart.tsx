import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
/*const data = [
  { label: "05", Income: 400, Expenses: 240 },
  { label: "06", Income: 300, Expenses: 139 },
  { label: "07", Income: 200, Expenses: 980 },
  { label: "08", Income: 278, Expenses: 390 },
  { label: "09", Income: 189, Expenses: 480 },
  { label: "10", Income: 239, Expenses: 380 },
];*/

export interface MonthlySummary {
  label: string;
  Income: number;
  Expenses: number;
}

interface SimpleBarChartProps {
  chartData: MonthlySummary[];
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
      <Bar fill="#20765B" dataKey="Income" radius={[10, 10, 0, 0]} />
      <Bar fill="#D7C8A8" dataKey="Expenses" radius={[10, 10, 0, 0]} />
    </BarChart>
  );
};

export default SimpleBarChart;
