import { Group, Stack, Table, Text } from "@mantine/core";
import { IconLetterF, IconLetterS, IconLetterV } from "@tabler/icons-react";

const elements = [
  {
    brokerage: (
      <Group gap="sm" align="center" w="100%">
        <IconLetterV size={16} color="black" />
        <Stack gap={4} align="flex-start">
          <Text size="xs">Vanguard</Text>
          <Text c="dimmed" size="xs">
            Individual **8042
          </Text>
        </Stack>
      </Group>
    ),
    investment: (
      <Group gap="sm" align="center" w="100%">
        <Stack gap={4} align="flex-start">
          <Text size="xs">Equity ETFs</Text>
          <Text c="dimmed" size="xs">
            VTI - US stocks/VXUS - international stocks
          </Text>
        </Stack>
      </Group>
    ),
    balance: <Text size="xs">R$30,000.00</Text>,
    amount: (
      <Text size="xs" c={"#20765B"}>
        R$100.00
      </Text>
    ),
  },
  {
    brokerage: (
      <Group gap="sm" align="center" w="100%">
        <IconLetterF size={16} color="black" />
        <Stack gap={4} align="flex-start">
          <Text size="xs">Fidelity</Text>
          <Text c="dimmed" size="xs">
            Individual **1096
          </Text>
        </Stack>
      </Group>
    ),
    investment: (
      <Group gap="sm" align="center" w="100%">
        <Stack gap={4} align="flex-start">
          <Text size="xs">Stocks & bond funds</Text>
          <Text c="dimmed" size="xs">
            FXAIX - s&P 500/FXNAX - US bonds
          </Text>
        </Stack>
      </Group>
    ),
    balance: <Text size="xs">R$20,000.00</Text>,
    amount: (
      <Text size="xs" c={"#20765B"}>
        R$100.00
      </Text>
    ),
  },
  {
    brokerage: (
      <Group gap="sm" align="center" w="100%">
        <IconLetterS size={16} color="black" />
        <Stack gap={4} align="flex-start">
          <Text size="xs">Charles Schwab</Text>
          <Text c="dimmed" size="xs">
            Individual **6731
          </Text>
        </Stack>
      </Group>
    ),
    investment: (
      <Group gap="sm" align="center" w="100%">
        <Stack gap={4} align="flex-start">
          <Text size="xs">Treasuries & cash</Text>
          <Text c="dimmed" size="xs">
            US treasury bills / money market fund
          </Text>
        </Stack>
      </Group>
    ),
    balance: <Text size="xs">R$10,000.00</Text>,
    amount: (
      <Text size="xs" c={"#20765B"}>
        R$40.00
      </Text>
    ),
  },
  {
    brokerage: (
      <Text ta={"left"} size="xs">
        Total invested
      </Text>
    ),
    investment: (
      <Text ta={"left"} size="xs" c={"dimmed"}>
        3 connected brokerage accounts
      </Text>
    ),
    balance: <Text size="xs">R$60,000.00</Text>,
    amount: (
      <Text size="xs" c={"#20765B"}>
        R$240.00
      </Text>
    ),
  },
];

const TableChart8 = () => {
  const rows = elements.map((element) => (
    <Table.Tr>
      <Table.Td>{element.brokerage}</Table.Td>
      <Table.Td>{element.investment}</Table.Td>
      <Table.Td>{element.balance}</Table.Td>
      <Table.Td>{element.amount}</Table.Td>
    </Table.Tr>
  ));

  return (
    <Table mt={"xl"}>
      <Table.Tbody>{rows}</Table.Tbody>
    </Table>
  );
};

export default TableChart8;
