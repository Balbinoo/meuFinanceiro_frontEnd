import { Table, Group, Stack, Text, Center } from "@mantine/core";
import type { TopExpenses } from "../../../types/economy/economyType";
import { formatCurrency } from "../../../utils/formatCurrency";
import { getCategoryIcon } from "../../../utils/categories";

interface ChartDataProps {
  topExpensesData: TopExpenses[];
}

const TopExpensesTable = ({ topExpensesData }: ChartDataProps) => {
  const rows = topExpensesData.map((element) => (
    <Table.Tr key={`${element.store}-${element.category}`}>
      <Table.Td>{getCategoryIcon(element.category)}</Table.Td>

      <Table.Td>
        <Stack gap={2} align="flex-start">
          <Text size="xs" fw={600}>
            {element.store}
          </Text>

          <Text size="xs" c="dimmed">
            {element.category} · {element.frequency} payments
          </Text>
        </Stack>
      </Table.Td>

      <Table.Td>
        <Text size="xs" fw={500}>
          {formatCurrency(element.total_amount)}
        </Text>
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <Table>
      <Table.Tbody>
        {topExpensesData.length > 0 ? (
          rows
        ) : (
          <Table.Tr>
            <Table.Td colSpan={3}>
              <Center py="xl">
                <Stack align="center" gap="xs">
                  <Text size="sm" fw={500} c="dimmed">
                    No expenses found
                  </Text>

                  <Text size="xs" c="dimmed" ta="center">
                    Your top places will appear here when you register your
                    expenses.
                  </Text>
                </Stack>
              </Center>
            </Table.Td>
          </Table.Tr>
        )}
      </Table.Tbody>
    </Table>
  );
};

export default TopExpensesTable;
