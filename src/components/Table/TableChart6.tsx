import { Badge, Group, Stack, Table, Text } from "@mantine/core";
import {
  IconBolt,
  IconBriefcase,
  IconCar,
  IconDeviceLaptop,
  IconDroplet,
} from "@tabler/icons-react";
import { House, ShoppingBag, ShoppingBasket } from "lucide-react";

const elements = [
  {
    source: (
      <Group gap="sm" align="center" w="100%">
        <IconBriefcase size={16} color="black" />
        <Stack gap={4} align="flex-start">
          <Text size="xs">Linear Studio</Text>
          <Text c="dimmed" size="xs">
            October salary - Oct 22 - take-home-pay
          </Text>
        </Stack>
      </Group>
    ),

    amount: (
      <Text size="xs" c={"#20765B"}>
        +R$5,800.00
      </Text>
    ),
  },
  {
    source: (
      <Group gap="sm" align="center" w="100%">
        <IconDeviceLaptop size={16} color="black" />
        <Stack gap={4} align="flex-start">
          <Text size="xs">Freelance project</Text>
          <Text c="dimmed" size="xs">
            Brand stategy - Acme - Oct1 9
          </Text>
        </Stack>
      </Group>
    ),
    amount: (
      <Text size="xs" c={"#20765B"}>
        +R$1,000.00
      </Text>
    ),
  },
];

const TableChart6 = () => {
  const rows = elements.map((element) => (
    <Table.Tr>
      <Table.Td>{element.source}</Table.Td>
      <Table.Td>{element.amount}</Table.Td>
    </Table.Tr>
  ));

  return (
    <Table mt={"xl"}>
      <Table.Tbody>{rows}</Table.Tbody>
    </Table>
  );
};

export default TableChart6;
