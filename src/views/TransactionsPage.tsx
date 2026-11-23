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
import {
  getAllTransactions,
  get_accounts_list,
  get_categories,
  get_five_months_list,
} from "../services/transactions/transactionsService";
import type { Transaction } from "../types/transactions/transactionsType";
import { CalendarDays, Download, Plus } from "lucide-react";
import AllTransactionsTable from "../components/Table/transactions/AllTransactionsTable";

const TransactionsPage = () => {
  const [value, setValue] = useState<string[]>(["All Period"]);
  const [loading, setLoading] = useState(true);
  const [allTransactions, setAllTransactions] = useState<Transaction[]>([]);
  const [totalTransactions, setTotalTransactions] = useState(0);
  const [accountsList, setAccountsList] = useState<string[]>([]);
  const [monthsList, setMonthsList] = useState<string[]>([]);
  const [categoriesList, setCategoriesList] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedAccount, setSelectedAccount] = useState<string | null>(null);
  const [selectedPeriod, setSelectedPeriod] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [ordering, setOrdering] = useState<string>("newest");
  const [selectedType, setSelectedType] = useState("all");

  useEffect(() => {
    async function fetchFilterData() {
      setLoading(true);
      try {
        const [accounts, months, categories] = await Promise.all([
          get_accounts_list(),
          get_five_months_list(),
          get_categories(),
        ]);
        setCategoriesList(categories.categories_list);
        setMonthsList(months.last_five_months);
        setAccountsList(accounts.accounts_list);
      } catch (error) {
        console.error("Error fetching filter data:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchFilterData();
  }, []);

  useEffect(() => {
    async function fetchTransactions() {
      setLoading(true);

      try {
        const transactions = await getAllTransactions(
          currentPage,
          selectedCategory,
          selectedAccount,
          selectedPeriod,
          search,
          ordering,
          selectedType,
        );
        setAllTransactions(transactions.results);
        setTotalTransactions(transactions.count);
      } catch (error) {
        console.error("Error fetching transactions:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchTransactions();
  }, [
    currentPage,
    selectedCategory,
    selectedAccount,
    selectedPeriod,
    search,
    ordering,
    selectedType,
  ]);

  useEffect(() => {
    console.log("All transactions:", allTransactions);
    console.log("Accounts:", accountsList);
  }, [allTransactions, accountsList]);

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
              data={monthsList}
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
                  {value.length > 0 ? value.join(", ") : "November"}
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
            <Tabs
              value={selectedType}
              onChange={(value) => {
                setSelectedType(value || "all");
                setCurrentPage(1);
              }}
              color="#20765B"
            >
              <Tabs.List>
                <Tabs.Tab
                  value="all"
                  rightSection={
                    selectedType === "all" ? totalTransactions : null
                  }
                >
                  All transactions
                </Tabs.Tab>

                <Tabs.Tab
                  value="income"
                  rightSection={
                    selectedType === "income" ? totalTransactions : null
                  }
                >
                  Income
                </Tabs.Tab>

                <Tabs.Tab
                  value="expense"
                  rightSection={
                    selectedType === "expense" ? totalTransactions : null
                  }
                >
                  Expenses
                </Tabs.Tab>
              </Tabs.List>
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
              data={[]}
              value={search}
              onChange={(value) => {
                setSearch(value);
                setCurrentPage(1);
              }}
            />
            <Select
              placeholder="Categories"
              data={categoriesList}
              value={selectedCategory}
              onChange={(value) => {
                setSelectedCategory(value);
                setCurrentPage(1);
              }}
              clearable
            />

            <Select
              placeholder="Accounts"
              data={accountsList}
              value={selectedAccount}
              onChange={(value) => {
                setSelectedAccount(value);
                setCurrentPage(1);
              }}
              clearable
              nothingFoundMessage="No accounts found"
            />

            <Select
              placeholder="Period"
              data={monthsList}
              value={selectedPeriod}
              onChange={(value) => {
                setSelectedPeriod(value);
                setCurrentPage(1);
              }}
              clearable
            />

            <Select
              placeholder="Sort by"
              data={[
                { value: "newest", label: "Newest" },
                { value: "oldest", label: "Oldest" },
                { value: "↑ Price", label: "↑ Price" },
                { value: "↓ Price", label: "↓ Price" },
              ]}
              value={ordering}
              onChange={(value) => {
                setOrdering(value || "newest");
                setCurrentPage(1);
              }}
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
