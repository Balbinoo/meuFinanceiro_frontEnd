import { useState } from "react";
import { Group, Text, Table, Checkbox, Stack, Badge } from "@mantine/core";

import type { Transaction } from "../../../types/transactions/transactionsType";
import { getCategoryIcon } from "../../../utils/categories";

interface AllTransactionsTableProps {
  data: Transaction[];
}

const formatAmount = (
  amount: string,
  transactionType: "income" | "expense",
) => {
  const formattedAmount = Number(amount).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });

  return `${transactionType === "income" ? "+" : "-"}${formattedAmount}`;
};

const formatDate = (date: string) => {
  return new Date(`${date}T00:00:00`).toLocaleDateString("pt-BR");
};

const AllTransactionsTable = ({ data }: AllTransactionsTableProps) => {
  const [selectedRows, setSelectedRows] = useState<string[]>([]);

  const getRowKey = (transaction: Transaction) =>
    `${transaction.transaction_type}-${transaction.date}-${transaction.account_name}-${transaction.description}`;

  const handleSelectRow = (key: string, checked: boolean) => {
    setSelectedRows((current) =>
      checked
        ? [...current, key]
        : current.filter((selectedKey) => selectedKey !== key),
    );
  };

  const allSelected =
    data.length > 0 &&
    data.every((transaction) => selectedRows.includes(getRowKey(transaction)));

  const handleSelectAll = (checked: boolean) => {
    setSelectedRows(checked ? data.map(getRowKey) : []);
  };

  const rows = data.map((transaction) => {
    const rowKey = getRowKey(transaction);
    const isIncome = transaction.transaction_type === "income";

    return (
      <Table.Tr
        key={rowKey}
        bg={
          selectedRows.includes(rowKey)
            ? "var(--mantine-color-blue-light)"
            : undefined
        }
      >
        <Table.Td>
          <Checkbox
            aria-label="Select row"
            checked={selectedRows.includes(rowKey)}
            onChange={(event) =>
              handleSelectRow(rowKey, event.currentTarget.checked)
            }
          />
        </Table.Td>

        <Table.Td>
          <Group gap="sm" align="center" wrap="nowrap">
            {getCategoryIcon(transaction.category)}

            <Stack gap={4}>
              <Text size="sm" fw={500}>
                {transaction.description}
              </Text>

              <Text c="dimmed" size="xs">
                {transaction.type === "Fixed" ? "Fixa" : "Variável"}
              </Text>
            </Stack>
          </Group>
        </Table.Td>

        <Table.Td>
          <Text size="sm">{formatDate(transaction.date)}</Text>
        </Table.Td>

        <Table.Td>
          <Badge
            bg={isIncome ? "#EAF3ED" : "#EDF0EA"}
            c={isIncome ? "#20765B" : "#56635C"}
            variant="light"
          >
            {transaction.category}
          </Badge>
        </Table.Td>

        <Table.Td>
          <Text size="sm">{transaction.account_name}</Text>
        </Table.Td>

        <Table.Td>
          <Text size="sm" fw={500} c={isIncome ? "#20765B" : "red"}>
            {formatAmount(transaction.amount, transaction.transaction_type)}
          </Text>
        </Table.Td>
      </Table.Tr>
    );
  });

  return (
    <Table
      horizontalSpacing="md"
      verticalSpacing="sm"
      styles={{
        th: { textAlign: "left" },
        td: { textAlign: "left" },
      }}
    >
      <Table.Thead>
        <Table.Tr>
          <Table.Th>
            <Checkbox
              aria-label="Select all rows"
              checked={allSelected}
              indeterminate={selectedRows.length > 0 && !allSelected}
              onChange={(event) => handleSelectAll(event.currentTarget.checked)}
            />
          </Table.Th>

          <Table.Th>Merchant/description</Table.Th>
          <Table.Th>Date</Table.Th>
          <Table.Th>Category</Table.Th>
          <Table.Th>Account</Table.Th>
          <Table.Th>Amount</Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>
        {data.length > 0 ? (
          rows
        ) : (
          <Table.Tr>
            <Table.Td colSpan={6}>
              <Stack align="center" gap="xs" py="xl">
                <Text size="sm" fw={500} c="dimmed">
                  No transactions found
                </Text>

                <Text size="xs" c="dimmed" ta="center">
                  Your transactions will appear here once you register an income
                  or expense.
                </Text>
              </Stack>
            </Table.Td>
          </Table.Tr>
        )}
      </Table.Tbody>{" "}
    </Table>
  );
};

export default AllTransactionsTable;
