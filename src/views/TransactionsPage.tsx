import { Page } from "../layout/Page";
import { useState, useEffect } from "react";
import {
  Divider,
  Group,
  Pagination,
  Card,
  Tabs,
  Stack,
  Text,
  Title,
  SimpleGrid,
  Autocomplete,
  Select,
  MultiSelect,
  Button,
  ComboboxPopover,
} from "@mantine/core";
import { getAllTransactions } from "../services/transactions/transactionsService";
import type { Transaction } from "../types/transactions/transactionsType";
import { CalendarDays, Download, Plus } from "lucide-react";
import AllTransactionsTable from "../components/Table/transactions/AllTransactionsTable";

const TransactionsPage = () => {
  const [value, setValue] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [allTransactions, setAllTransactions] = useState<Transaction[]>([]);
  const [totalTransactions, setTotalTransactions] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    async function fetchTransactionsData() {
      setLoading(true);
      try {
        const response = await getAllTransactions(currentPage);
        setAllTransactions(response.results);
        setTotalTransactions(response.count);

        console.log("Transactions:", response.results);
        console.log("Total:", response.count);
      } catch (error) {
        console.error("Error fetching transactions:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchTransactionsData();
  }, [currentPage]);

  useEffect(() => {
    console.log("All transactions:", allTransactions);
  }, [allTransactions]);

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
            <ComboboxPopover
              data={["React", "Angular", "Vue", "Svelte"]}
              value={value}
              onChange={setValue}
              multiple
            >
              <ComboboxPopover.Target>
                <Button
                  variant="default"
                  size="sm"
                  leftSection={<CalendarDays size={14} />}
                >
                  {value.length > 0 ? value.join(", ") : "Select frameworks"}
                </Button>
              </ComboboxPopover.Target>
            </ComboboxPopover>
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
              placeholder="Search"
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

          <AllTransactionsTable data={allTransactions} />

          <Divider />

          <Group mt={30} justify="space-between" align="center">
            <Text c="dimmed" size="xs">
              Showing {totalTransactions === 0 ? 0 : (currentPage - 1) * 10 + 1}
              –{Math.min(currentPage * 10, totalTransactions)} of{" "}
              {totalTransactions} transactions
            </Text>

            <Pagination
              total={Math.ceil(totalTransactions / 10)}
              value={currentPage}
              onChange={setCurrentPage}
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
