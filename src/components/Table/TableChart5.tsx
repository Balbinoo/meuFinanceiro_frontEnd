import { Group, Stack, Table, Text } from "@mantine/core";
import {
  IconBus,
  IconDeviceLaptop,
  IconPill,
  IconShoppingCart,
  IconTicket,
} from "@tabler/icons-react";

const elements = [
  {
    category: (
      <Group gap="sm" align="center" w="100%">
        <IconShoppingCart size={16} color="black" />
        <Stack gap={4} align="flex-start">
          <Text size="xs">Food & groceries</Text>
          <Text c="dimmed" size="xs">
            Groceries, cafés & dining
          </Text>
        </Stack>
      </Group>
    ),
    date1: "R$820",
    date2: "R$860",
    date3: "R$870",
    estimate: "R$850",
    spent: "R$680",
    expected: "R$170",
  },
  {
    category: (
      <Group gap="sm" align="center" w="100%">
        <IconPill size={16} color="black" />
        <Stack gap={4} align="flex-start">
          <Text size="xs">Pharmacy</Text>
          <Text c="dimmed" size="xs">
            Medicines & personal care
          </Text>
        </Stack>
      </Group>
    ),
    date1: "R$70",
    date2: "R$110",
    date3: "R$90",
    estimate: "R$90",
    spent: "R$60",
    expected: "R$30",
  },
  {
    category: (
      <Group gap="sm" align="center" w="100%">
        <IconTicket size={16} color="black" />
        <Stack gap={4} align="flex-start">
          <Text size="xs">Entertainment</Text>
          <Text c="dimmed" size="xs">
            Subscriptions & leisure
          </Text>
        </Stack>
      </Group>
    ),
    date1: "R$260",
    date2: "R$300",
    date3: "R$280",
    estimate: "R$280",
    spent: "R$220",
    expected: "R$60",
  },
  {
    category: (
      <Group gap="sm" align="center" w="100%">
        <IconDeviceLaptop size={16} color="black" />
        <Stack gap={4} align="flex-start">
          <Text size="xs">Electronics</Text>
          <Text c="dimmed" size="xs">
            Devices & accessories
          </Text>
        </Stack>
      </Group>
    ),
    date1: "R$360",
    date2: "R$520",
    date3: "R$440",
    estimate: "R$440",
    spent: "R$190",
    expected: "R$250",
  },
  {
    category: (
      <Group gap="sm" align="center" w="100%">
        <IconBus size={16} color="black" />
        <Stack gap={4} align="flex-start">
          <Text size="xs">Transport</Text>
          <Text c="dimmed" size="xs">
            Fuel, transit & rides
          </Text>
        </Stack>
      </Group>
    ),
    date1: "R$320",
    date2: "R$360",
    date3: "R$340",
    estimate: "R$340",
    spent: "R$280",
    expected: "R$60",
  },
  {
    category: "Total variable spending",
    date1: "R$1,830",
    date2: "R$2,150",
    date3: "R$2,020",
    estimate: "R$2,000",
    spent: "R$1,430",
    expected: "R$570",
  },
];

const TableChart5 = () => {
  const rows = elements.map((element) => (
    <Table.Tr>
      <Table.Td>{element.category}</Table.Td>
      <Table.Td>{element.date1}</Table.Td>
      <Table.Td>{element.date2}</Table.Td>
      <Table.Td>{element.date3}</Table.Td>
      <Table.Td>{element.estimate}</Table.Td>
      <Table.Td>{element.spent}</Table.Td>
      <Table.Td>{element.expected}</Table.Td>
    </Table.Tr>
  ));

  return (
    <Table mt={"xl"}>
      <Table.Thead>
        <Table.Tr>
          <Table.Th>Category</Table.Th>
          <Table.Th>Jul 2026</Table.Th>
          <Table.Th>Aug 2026</Table.Th>
          <Table.Th>Sep 2026</Table.Th>
          <Table.Th>October estimate</Table.Th>
          <Table.Th>Spent Oct 1-23</Table.Th>
          <Table.Th>Still expected</Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>{rows}</Table.Tbody>
    </Table>
  );
};

export default TableChart5;
