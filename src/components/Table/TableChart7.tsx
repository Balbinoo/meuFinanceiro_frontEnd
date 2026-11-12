import { Badge, Group, Stack, Table, Text } from "@mantine/core";
import {
  IconBolt,
  IconBriefcase,
  IconCar,
  IconClockHour3,
  IconDeviceLaptop,
  IconDroplet,
  IconPercentage,
} from "@tabler/icons-react";
import { House, ShoppingBag, ShoppingBasket } from "lucide-react";

const elements = [
  {
    source: (
      <Group gap="sm" align="center" w="100%">
        <IconClockHour3 size={16} color="black" />
        <Stack gap={4} align="flex-start">
          <Text size="xs">Dividends</Text>
          <Text c="dimmed" size="xs">
            Vanguard R$100 - Fidelity R$80
          </Text>
        </Stack>
      </Group>
    ),

    amount: (
      <Text size="xs" c={"#20765B"}>
        +R$180.00
      </Text>
    ),
  },
  {
    source: (
      <Group gap="sm" align="center" w="100%">
        <IconPercentage size={16} color="black" />
        <Stack gap={4} align="flex-start">
          <Text size="xs">Bond & cash interest</Text>
          <Text c="dimmed" size="xs">
            Fidelity R$20 - Charles Schwab R$40
          </Text>
        </Stack>
      </Group>
    ),
    amount: (
      <Text size="xs" c={"#20765B"}>
        +R$60.00
      </Text>
    ),
  },
];

const TableChart7 = () => {
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

export default TableChart7;
