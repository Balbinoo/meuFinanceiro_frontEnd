import { CalendarDays, Plus } from "lucide-react";
import { Page } from "../layout/Page";
import {
  Badge,
  Stack,
  Title,
  Group,
  Text,
  Button,
  Card,
  SimpleGrid,
  Divider,
  Progress,
} from "@mantine/core";
import TableChart6 from "../components/Table/TableChart6";
import TableChart7 from "../components/Table/TableChart7";
import TableChart8 from "../components/Table/TableChart8";

const IncomePage = () => {
  return (
    <Page>
      <Stack gap="xl" maw={1100} mx="auto">
        <Group justify="space-between" align="center" w="100%">
          {/* Left side */}
          <Stack gap={4} align="flex-start">
            <Title order={1}>Income</Title>
            <Text>
              What you earn today. What your money could earn tomorrow.
            </Text>
          </Stack>

          {/* Right side */}
          <Group gap="sm">
            <Button
              variant="default"
              size="sm"
              leftSection={<CalendarDays size={14} />}
            >
              October 2026
            </Button>

            <Button size="sm" bg="#20765B" leftSection={<Plus size={14} />}>
              Add income
            </Button>
          </Group>
        </Group>

        <SimpleGrid cols={{ base: 1, sm: 3 }}>
          <Card withBorder radius={"md"} padding="lg" bg={"#184F40"}>
            <Stack align="flex-start" gap={0}>
              <Text c={"white"} size="sm">
                Work income this month
              </Text>
              <Title c={"white"} order={2} mt="sm">
                R$ 6,800.00
              </Title>
              <Text c={"white"} size="xs" mt="md">
                Salary - freelance - received in checking
              </Text>
            </Stack>
          </Card>

          <Card withBorder radius={"md"} padding="lg">
            <Stack align="flex-start" gap={0}>
              <Text c={"dimmed"} size="sm">
                Investment income this month
              </Text>
              <Title order={2} mt="sm">
                R$ 240.00
              </Title>
              <Text c={"dimmed"} size="xs" mt="md">
                Dividends + intereset . held in brokerages
              </Text>
            </Stack>
          </Card>

          <Card withBorder radius={"md"} padding="lg">
            <Stack align="flex-start" gap={0}>
              <Text c={"dimmed"} size="sm">
                Invested balance
              </Text>
              <Title order={2} mt="sm">
                R$ 60,000.00
              </Title>
              <Text c={"dimmed"} size="xs" mt="md">
                Across 3 brokerages as of Oct 23
              </Text>
            </Stack>
          </Card>
        </SimpleGrid>

        <SimpleGrid cols={{ base: 1, sm: 2 }}>
          <Card withBorder radius={"md"} padding="lg">
            <Group justify="space-between" align="center" w="100%">
              {/* Left side */}
              <Stack gap={4} align="flex-start">
                <Title size={"md"} order={1}>
                  Employment
                </Title>
                <Text size="xs" c={"dimmed"}>
                  Money received - October 1-23, 2026
                </Text>
              </Stack>

              {/* Right side */}
              <Group gap="sm">
                <Badge c={"#20765B"} bg={"#EAF3ED"} color="">
                  2 payments
                </Badge>
              </Group>
            </Group>

            <TableChart6 />
            <Divider mt={15} />
            <Text mt={15} size="xs" c={"dimmed"} ta="left">
              Deposited to Everyday checking **4821
            </Text>
          </Card>

          <Card withBorder radius={"md"} padding="lg">
            <Group justify="space-between" align="center" w="100%">
              {/* Left side */}
              <Stack gap={4} align="flex-start">
                <Title size={"md"} order={1}>
                  Dividends & Interest
                </Title>
                <Text size="xs" c={"dimmed"}>
                  Earned in brokerages - October 1-23, 2026
                </Text>
              </Stack>

              {/* Right side */}
              <Group gap="sm">
                <Badge c={"#20765B"} bg={"#EAF3ED"} color="">
                  Not capital gains
                </Badge>
              </Group>
            </Group>
            <TableChart7 />
            <Divider mt={15} />
            <Text mt={15} size="xs" ta={"left"} c={"dimmed"}>
              Retained or reinvested; not included in checking's R$6,800 money
              in
            </Text>
          </Card>
        </SimpleGrid>
        <Card withBorder radius={"md"} padding="lg">
          <Group justify="space-between" align="center" w="100%">
            {/* Left side */}
            <Stack gap={4} align="flex-start">
              <Title size={"md"} order={1}>
                Where your money is invested
              </Title>
              <Text size="xs" c={"dimmed"}>
                Brokerage assets are separate from your checking and savings
                balances
              </Text>
            </Stack>

            {/* Right side */}
            <Group gap="sm">
              <Text size="xs" c={"#20765B"}>
                Manage brokerages ➚
              </Text>
            </Group>
          </Group>
          <TableChart8 />
        </Card>
        <Group mt={30} justify="space-between" align="center">
          <Text c={"dimmed"} size="xs" mt="md">
            Your money, in perspective.
          </Text>
          <Text c={"dimmed"} size="xs" mt="md">
            Last updated today at 9:41 AM
          </Text>
        </Group>
      </Stack>
    </Page>
  );
};
export default IncomePage;
