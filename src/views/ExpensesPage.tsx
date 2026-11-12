import {
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
import { Page } from "../layout/Page";
import { CalendarDays, Plus, Sparkles } from "lucide-react";
import TableChart4 from "../components/Table/TableChart4";
import { IconHistory, IconInfoCircle, IconRepeat } from "@tabler/icons-react";
import TableChart5 from "../components/Table/TableChart5";

const ExpensesPage = () => {
  return (
    <Page>
      <Stack gap="xl" maw={1100} mx="auto">
        <Group justify="space-between" align="center" w="100%">
          {/* Left side */}
          <Stack gap={4} align="flex-start">
            <Title order={1}>Expenses</Title>
            <Text>Know what's coming. Make room for what matters.</Text>
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
              Add recurring bill
            </Button>
          </Group>
        </Group>

        <SimpleGrid cols={{ base: 1, sm: 3 }}>
          <Card withBorder radius={"md"} padding="lg" bg={"#184F40"}>
            <Stack align="flex-start" gap={0}>
              <Text c={"white"} size="sm">
                Expected this month
              </Text>
              <Title c={"white"} order={2} mt="sm">
                R$ 3,940.00
              </Title>
              <Text c={"white"} size="xs" mt="md">
                R$3,240 spent - R$700 still expected
              </Text>
            </Stack>
          </Card>

          <Card withBorder radius={"md"} padding="lg">
            <Stack align="flex-start" gap={0}>
              <Text c={"dimmed"} size="sm">
                Fixed recurring expenses
              </Text>
              <Title order={2} mt="sm">
                R$ 1,940.00
              </Title>
              <Text c={"dimmed"} size="xs" mt="md">
                4 monthly bills - R$130 left to pay
              </Text>
            </Stack>
          </Card>

          <Card withBorder radius={"md"} padding="lg">
            <Stack align="flex-start" gap={0}>
              <Text c={"dimmed"} size="sm">
                Estimated variable spending
              </Text>
              <Title order={2} mt="sm">
                R$ 2,000.00
              </Title>
              <Text c={"dimmed"} size="xs" mt="md">
                5 categories - based on July-September records
              </Text>
            </Stack>
          </Card>
        </SimpleGrid>

        <SimpleGrid cols={12} spacing="lg">
          <Card
            withBorder
            radius="md"
            padding="lg"
            style={{ gridColumn: "span 7" }}
          >
            <Group justify="space-between" align="center" w="100%">
              {/* Left side */}
              <Stack gap={4} align="flex-start">
                <Title size={"md"} order={1}>
                  Fixed recurring expenses
                </Title>
                <Text size="xs" c={"dimmed"}>
                  Your monthly commitments, all in one place.
                </Text>
              </Stack>

              {/* Right side */}
              <Group gap="sm">
                <Text size="xs" c={"#20765B"}>
                  Manage bills ➚
                </Text>
              </Group>
            </Group>

            <TableChart4 />

            <Divider />
            <Group mt="15" gap="sm" align="center">
              <IconRepeat color="gray" size={16} />
              <Text c="dimmed" size="xs">
                Monthly - Auto-pay from Checking **4821
              </Text>
            </Group>
          </Card>
          <Card
            withBorder
            radius="md"
            padding="lg"
            style={{ gridColumn: "span 5" }}
          >
            <Group justify="space-between" align="center" w="100%">
              <Title size={"md"} order={1}>
                Your month ahead
              </Title>
              <Text size="xs" c={"dimmed"}>
                Oct 1-31
              </Text>
            </Group>

            <Group mt={25} justify="space-between" align="center">
              <Text size={"xs"}>Expected / monthly budget</Text>
              <Text size="xs" c={"dimmed"}>
                +R$3,940.00/R$4,000
              </Text>
            </Group>
            <Progress
              color="#20765B"
              mt={10}
              radius={"lg"}
              size="md"
              value={(3940 / (700 + 3240)) * 100}
            />
            <Group mt={10} justify="space-between" align="center">
              <Text c="#20765B" size={"xs"}>
                Spent R$3,240
              </Text>
              <Text size="xs" c={"dimmed"}>
                Remaining R$700
              </Text>
            </Group>

            <Divider mt={10} />

            <Group mt={10} justify="space-between" align="center">
              <Text c={"dimmed"} size="xs">
                Unpaid recurring bills
              </Text>
              <Text size="xs">R$130.00</Text>
            </Group>
            <Group mt={10} justify="space-between" align="center">
              <Text c={"dimmed"} size="xs">
                Variable spending still expected
              </Text>
              <Text size="xs">R$570.00</Text>
            </Group>
            <Divider mt={10} />

            <Group
              mt={15}
              justify="flex-start"
              align="center"
              gap="sm"
              wrap="nowrap"
            >
              <Text
                bg="#EAF3ED"
                size="xs"
                c="dimmed"
                style={{ borderRadius: 10, padding: "8px 10px" }}
              >
                <Group gap="sm" align="center" w="100%">
                  <Sparkles
                    size={16}
                    color="green"
                    style={{ verticalAlign: "middle", marginRight: 8 }}
                  />
                  <Title c="#20765B" size={"xs"}>
                    Within budget, with R$60 to spare
                  </Title>
                </Group>
                At this pace, you could save R$2,860 of your R$6,800 monthly
                income.
              </Text>
            </Group>

            <Text mt={15} size="xs" c={"dimmed"}>
              Forecast includes paid bills and estimated spending through the
              end of October
            </Text>
          </Card>
        </SimpleGrid>

        <Card withBorder radius={"md"} padding="lg">
          <Group justify="space-between" align="center" w="100%">
            {/* Left side */}
            <Stack gap={4} align="flex-start">
              <Title size={"md"} order={1}>
                Variable spending estimates
              </Title>

              <Group gap={4} align="center" wrap="nowrap">
                <Text size="xs" c="dimmed">
                  A little less predictable. A lot easier to plan for.
                </Text>
              </Group>
            </Stack>

            {/* Right side */}
            <Group gap="sm">
              <IconHistory color="gray" size={14} />
              <Text size="xs" c={"dimmed"}>
                Last 3 complete months ➚
              </Text>
            </Group>
          </Group>

          <TableChart5 />
          <Divider />

          <Group
            mt={20}
            mb={20}
            gap={"sm"}
            align="left"
            w={"100%"}
            wrap="nowrap"
            bg={"#F6f7f3"}
            style={{ borderRadius: 10, padding: "8px 10px" }}
          >
            <IconInfoCircle />
            <Text size="xs" c={"dimmed"}>
              How we estimate: each category uses the average of your July,
              August and September transactions. Still expected = estimate minus
              spending so far. These are planning estimates, not bills; actual
              spending may vary
            </Text>
          </Group>
        </Card>
      </Stack>
    </Page>
  );
};
export default ExpensesPage;
