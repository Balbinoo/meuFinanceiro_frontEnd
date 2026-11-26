import ReactApexChart from "react-apexcharts";
import type { ApexOptions } from "apexcharts";
import { Group, Stack, Text, Box } from "@mantine/core";
import type { ExpenseCategory } from "../../../types/economy/economyType";
import { formatCurrency } from "../../../utils/formatCurrency";

interface ChartDataProps {
  expenseCategoriesData: ExpenseCategory[];
}

const chartColors = [
  "#20765B",
  "#A9CBB6",
  "#D7C8A8",
  "#7D9C88",
  "#B59980",
  "#B8A0C9",
  "#D98C8C",
  "#8CA6B8",
];

const ApexChartEconomy = ({ expenseCategoriesData }: ChartDataProps) => {
  // Remove categorias sem valores positivos
  const validCategories = expenseCategoriesData.filter(
    (item) => item.total_amount > 0,
  );

  const series = validCategories.map((item) => item.total_amount);

  const totalExpenses = series.reduce((a, b) => a + b, 0);

  const hasData = series.length > 0 && totalExpenses > 0;

  const options: ApexOptions = {
    chart: {
      type: "donut",
      toolbar: {
        show: false,
      },
    },

    labels: validCategories.map((item) => item.category),

    colors: chartColors.slice(0, validCategories.length),

    plotOptions: {
      pie: {
        borderRadius: 12,
        expandOnClick: false,

        donut: {
          size: "70%",

          labels: {
            show: true,

            name: {
              show: true,
              fontSize: "20px",
              color: "#888888",
            },

            value: {
              show: true,
              fontSize: "20px",
              fontWeight: 600,
              formatter: (value) => formatCurrency(Number(value) || 0),
            },

            total: {
              show: true,
              label: "Total expenses",
              fontSize: "16px",
              color: "#888888",

              formatter: () => formatCurrency(totalExpenses),
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
      show: false,
    },

    tooltip: {
      enabled: false,
      shared: false,
      intersect: true,

      y: {
        formatter: (value) => formatCurrency(value ?? 0),
      },
    },
  };

  return (
    <Group align="center" gap="lg" wrap="wrap">
      {/* Donut chart */}
      <Box style={{ flex: "1 1 260px", minWidth: 0 }}>
        {hasData ? (
          <ReactApexChart
            options={options}
            series={series}
            type="donut"
            width="100%"
          />
        ) : (
          <Stack align="center" justify="center" h={260} gap="xs">
            <Text size="sm" fw={500} c="dimmed">
              No expenses yet
            </Text>

            <Text size="xs" c="dimmed" ta="center">
              Your spending chart will appear here when you register your
              expenses.
            </Text>
          </Stack>
        )}
      </Box>

      {/* Custom legend */}
      <Stack gap="sm" style={{ flex: "1 1 220px" }}>
        {hasData ? (
          validCategories.map((item, index) => (
            <Group
              key={item.category}
              justify="space-between"
              align="center"
              wrap="nowrap"
            >
              <Group gap="xs" wrap="nowrap">
                <Box
                  w={10}
                  h={10}
                  style={{
                    backgroundColor: chartColors[index % chartColors.length],
                    borderRadius: 3,
                    flexShrink: 0,
                  }}
                />

                <Stack gap={2} align="flex-start">
                  <Text size="xs" fw={600}>
                    {item.category}
                  </Text>

                  <Text size="xs" c="dimmed">
                    {item.count} transactions
                  </Text>
                </Stack>
              </Group>

              <Stack gap={2} align="flex-end">
                <Text size="xs" fw={500}>
                  {formatCurrency(item.total_amount)}
                </Text>

                <Text size="xs" c="dimmed">
                  {item.percentage.toFixed(1)}%
                </Text>
              </Stack>
            </Group>
          ))
        ) : (
          <Text size="xs" c="dimmed">
            No categories to display.
          </Text>
        )}
      </Stack>
    </Group>
  );
};

export default ApexChartEconomy;
