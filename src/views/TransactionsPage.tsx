import { Button, Divider, Group, Pagination } from "@mantine/core";
import { Page } from "../layout/Page";
import {
  Card,
  Tabs,
  Stack,
  Text,
  Title,
  SimpleGrid,
  Autocomplete,
  Select,
  MultiSelect,
} from "@mantine/core";
import { CalendarDays, Download, Plus } from "lucide-react";
import TableChart2 from "../components/Table/TableChart2";

const TransactionsPage = () => {
  return (
    <Page>
      <Stack gap="xl" maw={1100} mx="auto">
        <Group justify="space-between" align="center" w="100%">
          {/* Left side */}
          <Stack gap={4} align="flex-start">
            <Title order={1}>Transactions</Title>
            <Text>
              Every little detail. One clear view of your income and spending.
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
              Add transaction
            </Button>
          </Group>
        </Group>

        <SimpleGrid cols={{ base: 1, sm: 3 }}>
          <Card withBorder radius={"md"} padding="lg">
            <Stack align="flex-start" gap={0}>
              <Text c={"dimmed"} size="sm">
                Money in
              </Text>
              <Title order={2} mt="sm">
                R$ 6,800.00
              </Title>
              <Text c={"dimmed"} size="xs" mt="md">
                2 income transactions this month
              </Text>
            </Stack>
          </Card>

          <Card withBorder radius={"md"} padding="lg">
            <Stack align="flex-start" gap={0}>
              <Text c={"dimmed"} size="sm">
                Money out
              </Text>
              <Title order={2} mt="sm">
                R$ 3,240.00
              </Title>
              <Text c={"dimmed"} size="xs" mt="md">
                46 expense transactions this month
              </Text>
            </Stack>
          </Card>

          <Card withBorder radius={"md"} padding="lg" bg={"#184F40"}>
            <Stack align="flex-start" gap={0}>
              <Text c={"white"} size="sm">
                Net cash flow
              </Text>
              <Title c={"white"} order={2} mt="sm">
                +R$ 3,560.00
              </Title>
              <Text c={"white"} size="xs" mt="md">
                2 income transactions this month
              </Text>
            </Stack>
          </Card>
        </SimpleGrid>

        <Card withBorder radius="md" padding="lg">
          <Group justify="space-between" align="center" w="100%">
            <Tabs defaultValue="transactions">
              <Tabs.List>
                <Tabs.Tab value="transactions" rightSection="45">
                  All transactions
                </Tabs.Tab>

                <Tabs.Tab value="Income" rightSection="2">
                  Income
                </Tabs.Tab>

                <Tabs.Tab value="Expenses" rightSection="46">
                  Expenses
                </Tabs.Tab>
              </Tabs.List>
              {/*
            <Tabs.Panel value="Income">Income tab filter</Tabs.Panel>
            <Tabs.Panel value="transactions">
              Transactions tab filter
            </Tabs.Panel>
            <Tabs.Panel value="Expenses">Expenses tab filter</Tabs.Panel>
            */}
            </Tabs>
            <Button
              variant="default"
              size="sm"
              leftSection={<Download size={14} />}
            >
              Export CSV
            </Button>
          </Group>

          <SimpleGrid mb={10} mt={25} cols={{ base: 1, sm: 5 }}>
            <Autocomplete
              placeholder="Search merchantor description"
              data={["Foods", "transport", "Mc", "amazon"]}
            />

            <Select
              placeholder="All categories"
              data={[
                "Food & groiceries",
                "Salary",
                "Shoppimg",
                "Lifestyle",
                "Transport",
              ]}
            />

            <Select
              placeholder="All accounts"
              data={["account 1", "account 2", "account 3", "account 4"]}
            />

            <Select
              placeholder="Oct 1 - Oct 23"
              data={[
                "Set 1 - Set 30",
                "Ago 1 - Ago 30",
                "Jul 1 - Jul 30",
                "Jun 1 - Jun 30",
              ]}
            />

            <MultiSelect
              placeholder="Filter"
              data={["Newest", "Oldest", "↑ Price", "↓ Price"]}
            />
          </SimpleGrid>

          <TableChart2 />
          <Divider />
          <Group mt={30} justify="space-between" align="center">
            <Text c="dimmed" size="xs">
              Showing 1–10 of 48 transactions
            </Text>
            <Pagination
              total={5}
              color="#EAF3ED"
              styles={{ control: { color: "#20765B" } }}
            />
          </Group>
        </Card>
      </Stack>

      <Group mt={30} justify="space-between" align="center">
        <Text c={"dimmed"} size="xs" mt="md">
          Your money, in perspective.
        </Text>
        <Text c={"dimmed"} size="xs" mt="md">
          Last updated today at 9:41 AM
        </Text>
      </Group>
    </Page>
  );
};
export default TransactionsPage;
