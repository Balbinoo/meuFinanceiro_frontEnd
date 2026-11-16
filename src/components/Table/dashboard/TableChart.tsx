import { Table, Text, Stack } from "@mantine/core";
import { formatCurrency } from "../../../utils/formatCurrency";

interface Transaction {
  id: number;
  type: "income" | "expense";
  description: string;
  category: string;
  amount: number;
  date: string;
}

interface TableChartProps {
  transactions: Transaction[];
}

const TableChart = ({ transactions }: TableChartProps) => {
  const formatDate = (date: string) => {
    return new Date(`${date}T12:00:00`).toLocaleDateString("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
    });
  };

  const rows = transactions.map((transaction) => (
    <Table.Tr key={`${transaction.type}-${transaction.id}`}>
      <Table.Td>
        <Stack gap={4} align="flex-start">
          <Text size="xs">{transaction.description}</Text>

          <Text c="dimmed" size="xs">
            {transaction.category}
          </Text>
        </Stack>
      </Table.Td>

      <Table.Td>
        <Text size="xs">{formatDate(transaction.date)}</Text>
      </Table.Td>

      <Table.Td>
        <Text
          size="xs"
          fw={600}
          c={transaction.type === "income" ? "green" : "red"}
        >
          {transaction.type === "income" ? "+" : "-"}
          {formatCurrency(transaction.amount)}
        </Text>
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <Table mt="xl">
      <Table.Thead>
        <Table.Tr>
          <Table.Th>Transaction</Table.Th>
          <Table.Th>Date</Table.Th>
          <Table.Th>Amount</Table.Th>
        </Table.Tr>
      </Table.Thead>

      <Table.Tbody>
        {transactions.length > 0 ? (
          rows
        ) : (
          <Table.Tr>
            <Table.Td colSpan={3}>
              <Text size="sm" c="dimmed" ta="center">
                No transactions found.
              </Text>
            </Table.Td>
          </Table.Tr>
        )}
      </Table.Tbody>
    </Table>
  );
};

export default TableChart;
