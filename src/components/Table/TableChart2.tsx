import { useState } from "react";
import { Badge, Checkbox, Group, Stack, Table, Text } from "@mantine/core";
import {
  IconBook,
  IconBriefcase,
  IconBriefcase2,
  IconCar,
  IconDeviceLaptop,
  IconHome,
  IconMug,
  IconMusic,
} from "@tabler/icons-react";
import { ShoppingBasket } from "lucide-react";
import type { ReactNode } from "react";

interface Transaction {
  id: number | string;
  merchant: ReactNode;
  date: string;
  category: ReactNode;
  account: string;
  amount: ReactNode;
}

const elements: Transaction[] = [
  {
    id: 1,
    merchant: (
      <Group gap="sm" align="center" w="100%">
        <ShoppingBasket size={16} color="black" />
        <Stack gap={4} align="flex-start">
          <Text size="xs">Whole Foods Market</Text>
          <Text c="dimmed" size="xs">
            Groceries
          </Text>
        </Stack>
      </Group>
    ),
    date: "Oct 23, 2026",
    category: (
      <Badge bg="#EDF0EA" c="#56635C">
        Food & groceries
      </Badge>
    ),
    account: "account 1",
    amount: "-R$86.40",
  },
  {
    id: 2,
    merchant: (
      <Group gap="sm" align="center" w="100%">
        <IconBriefcase size={16} color="black" />
        <Stack gap={4} align="flex-start">
          <Text size="xs">Linear Studio</Text>
          <Text c="dimmed" size="xs">
            October salary
          </Text>
        </Stack>
      </Group>
    ),
    date: "Oct 22, 2026",
    category: (
      <Badge bg="#EAF3ED" c="#20765B">
        Salary
      </Badge>
    ),
    account: "account 2",
    amount: (
      <Text size="md" c="#20765B">
        +R$5,800.00
      </Text>
    ),
  },
  {
    id: 3,
    merchant: (
      <Group gap="sm" align="center" w="100%">
        <IconMug size={16} color="black" />
        <Stack gap={4} align="flex-start">
          <Text size="xs">Blue Bottle Coffee</Text>
          <Text c="dimmed" size="xs">
            Morning coffee
          </Text>
        </Stack>
      </Group>
    ),
    date: "Oct 22, 2026",
    category: (
      <Badge bg="#EDF0EA" c="#56635C">
        Food & groceries
      </Badge>
    ),
    account: "account 2",
    amount: "-R$12.50",
  },
  {
    id: 4,
    merchant: (
      <Group gap="sm" align="center" w="100%">
        <IconBriefcase2 size={16} color="black" />
        <Stack gap={4} align="flex-start">
          <Text size="xs">Nike</Text>
          <Text c="dimmed" size="xs">
            Running essentials
          </Text>
        </Stack>
      </Group>
    ),
    date: "Oct 21, 2026",
    category: (
      <Badge bg="#EDF0EA" c="#56635C">
        Shopping
      </Badge>
    ),
    account: "account 3",
    amount: "-R$124.00",
  },
  {
    id: 5,
    merchant: (
      <Group gap="sm" align="center" w="100%">
        <IconMusic size={16} color="black" />
        <Stack gap={4} align="flex-start">
          <Text size="xs">Spotify</Text>
          <Text c="dimmed" size="xs">
            Premium subscription
          </Text>
        </Stack>
      </Group>
    ),
    date: "Oct 21, 2026",
    category: (
      <Badge bg="#EDF0EA" c="#56635C">
        Lifestyle
      </Badge>
    ),
    account: "account 3",
    amount: "-R$10.99",
  },
  {
    id: 6,
    merchant: (
      <Group gap="sm" align="center" w="100%">
        <IconCar size={16} color="black" />
        <Stack gap={4} align="flex-start">
          <Text size="xs">Uber</Text>
          <Text c="dimmed" size="xs">
            Trip to downtown
          </Text>
        </Stack>
      </Group>
    ),
    date: "Oct 20, 2026",
    category: (
      <Badge bg="#EDF0EA" c="#56635C">
        Transport
      </Badge>
    ),
    account: "account 3",
    amount: "-R$24.80",
  },
  {
    id: 7,
    merchant: (
      <Group gap="sm" align="center" w="100%">
        <IconDeviceLaptop size={16} color="black" />
        <Stack gap={4} align="flex-start">
          <Text size="xs">Freelance project</Text>
          <Text c="dimmed" size="xs">
            Brand strategy - Acme
          </Text>
        </Stack>
      </Group>
    ),
    date: "Oct 19, 2026",
    category: (
      <Badge bg="#EAF3ED" c="#20765B">
        Freelance
      </Badge>
    ),
    account: "account 1",
    amount: (
      <Text size="md" c="#20765B">
        +R$1,000.00
      </Text>
    ),
  },
  {
    id: 8,
    merchant: (
      <Group gap="sm" align="center" w="100%">
        <IconHome size={16} color="black" />
        <Stack gap={4} align="flex-start">
          <Text size="xs">Oakwood Apartments</Text>
          <Text c="dimmed" size="xs">
            October rent
          </Text>
        </Stack>
      </Group>
    ),
    date: "Oct 18, 2026",
    category: (
      <Badge bg="#EDF0EA" c="#56635C">
        Home & bills
      </Badge>
    ),
    account: "account 1",
    amount: "-R$1,400.00",
  },
  {
    id: 9,
    merchant: (
      <Group gap="sm" align="center" w="100%">
        <ShoppingBasket size={16} color="black" />
        <Stack gap={4} align="flex-start">
          <Text size="xs">Trader Joe&apos;s</Text>
          <Text c="dimmed" size="xs">
            Weekly groceries
          </Text>
        </Stack>
      </Group>
    ),
    date: "Oct 17, 2026",
    category: (
      <Badge bg="#EDF0EA" c="#56635C">
        Food & groceries
      </Badge>
    ),
    account: "account 1",
    amount: "-R$62.35",
  },
  {
    id: 10,
    merchant: (
      <Group gap="sm" align="center" w="100%">
        <IconBook size={16} color="black" />
        <Stack gap={4} align="flex-start">
          <Text size="xs">Kinfolk Bookshop</Text>
          <Text c="dimmed" size="xs">
            A little weekend reading
          </Text>
        </Stack>
      </Group>
    ),
    date: "Oct 16, 2026",
    category: (
      <Badge bg="#EDF0EA" c="#56635C">
        Lifestyle
      </Badge>
    ),
    account: "account 1",
    amount: "-R$32.00",
  },
];

interface TableChart2Props {
  data?: Transaction[];
}

const TableChart2 = ({ data = elements }: TableChart2Props) => {
  const [selectedRows, setSelectedRows] = useState<(number | string)[]>([]);

  const handleSelectRow = (id: number | string, checked: boolean) => {
    setSelectedRows((current) =>
      checked
        ? [...current, id]
        : current.filter((selectedId) => selectedId !== id),
    );
  };

  const allSelected =
    data.length > 0 &&
    data.every((element) => selectedRows.includes(element.id));

  const handleSelectAll = (checked: boolean) => {
    setSelectedRows(checked ? data.map((element) => element.id) : []);
  };

  const rows = data.map((element) => (
    <Table.Tr
      key={element.id}
      bg={
        selectedRows.includes(element.id)
          ? "var(--mantine-color-blue-light)"
          : undefined
      }
    >
      <Table.Td>
        <Checkbox
          aria-label="Select row"
          checked={selectedRows.includes(element.id)}
          onChange={(event) =>
            handleSelectRow(element.id, event.currentTarget.checked)
          }
        />
      </Table.Td>

      <Table.Td>{element.merchant}</Table.Td>
      <Table.Td>{element.date}</Table.Td>
      <Table.Td>{element.category}</Table.Td>
      <Table.Td>{element.account}</Table.Td>
      <Table.Td>{element.amount}</Table.Td>
    </Table.Tr>
  ));

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

      <Table.Tbody>{rows}</Table.Tbody>
    </Table>
  );
};

export default TableChart2;
