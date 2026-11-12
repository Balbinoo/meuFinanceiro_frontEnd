import { Badge, Group, Stack, Table, Text } from "@mantine/core";
import { IconBolt, IconCar, IconDroplet } from "@tabler/icons-react";
import { House, ShoppingBag, ShoppingBasket } from "lucide-react";

const elements = [
  {
    bill: (
      <Group gap="sm" align="center" w="100%">
        <House size={16} color="black" />
        <Stack gap={4} align="flex-start">
          <Text size="xs">Housing</Text>
          <Text c="dimmed" size="xs">
            Oakwood Apatments
          </Text>
        </Stack>
      </Group>
    ),
    date: "Oct 18",
    status: (
      <Badge c={"#20765B"} bg={"#EAF3ED"} color="">
        Paid
      </Badge>
    ),
    amount: "R$1,400.00",
  },
  {
    bill: (
      <Group gap="sm" align="center" w="100%">
        <IconCar size={16} color="black" />
        <Stack gap={4} align="flex-start">
          <Text size="xs">Car payment</Text>
          <Text c="dimmed" size="xs">
            Auto loan
          </Text>
        </Stack>
      </Group>
    ),
    date: "Oct 12",
    status: (
      <Badge c={"#20765B"} bg={"#EAF3ED"} color="">
        Paid
      </Badge>
    ),
    amount: "R$360.00",
  },
  {
    bill: (
      <Group gap="sm" align="center" w="100%">
        <IconBolt size={16} color="black" />
        <Stack gap={4} align="flex-start">
          <Text size="xs">Electricity</Text>
          <Text c="dimmed" size="xs">
            City Energy
          </Text>
        </Stack>
      </Group>
    ),
    date: "Oct 27",
    status: (
      <Badge c={"#936C31"} bg={"#F7F1E6"} color="">
        "Due in 4 days"
      </Badge>
    ),
    amount: "R$130.00",
  },
  {
    bill: (
      <Group gap="sm" align="center" w="100%">
        <IconDroplet size={16} color="black" />
        <Stack gap={4} align="flex-start">
          <Text size="xs">Water</Text>
          <Text c="dimmed" size="xs">
            City Water
          </Text>
        </Stack>
      </Group>
    ),
    date: "Oct 08",
    status: (
      <Badge c={"#20765B"} bg={"#EAF3ED"} color="">
        Paid
      </Badge>
    ),
    amount: "R$50.00",
  },
];

const TableChart4 = () => {
  const rows = elements.map((element) => (
    <Table.Tr>
      <Table.Td>{element.bill}</Table.Td>
      <Table.Td>{element.date}</Table.Td>
      <Table.Td>{element.status}</Table.Td>
      <Table.Td>{element.amount}</Table.Td>
    </Table.Tr>
  ));

  return (
    <Table mt={"xl"}>
      <Table.Thead>
        <Table.Tr>
          <Table.Th>Bill/ Monthly payment</Table.Th>
          <Table.Th>Due date</Table.Th>
          <Table.Th>Status</Table.Th>
          <Table.Th>Amount</Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>{rows}</Table.Tbody>
    </Table>
  );
};

export default TableChart4;
