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
  Button,
  ComboboxPopover,
} from "@mantine/core";
import {
  getAllTransactions,
  get_accounts_list,
  get_categories,
  get_expense_filtered,
  get_five_months_list,
  get_income_filtered,
} from "../services/transactions/transactionsService";
import type {
  expenseFilteredResponse,
  incomeFilteredResponse,
  Transaction,
} from "../types/transactions/transactionsType";
import { CalendarDays, Download, Plus } from "lucide-react";
import AllTransactionsTable from "../components/Table/transactions/AllTransactionsTable";
import { formatCurrency } from "../utils/formatCurrency";
import { calculateNetSaving, percentageNetSaving } from "../utils/netSavings";

const TransactionsPage = () => {
  const [loading, setLoading] = useState(true);
  const [allTransactions, setAllTransactions] = useState<Transaction[]>([]);
  const [totalTransactions, setTotalTransactions] = useState(0);
  const [accountsList, setAccountsList] = useState<string[]>([]);
  const [monthsList, setMonthsList] = useState<string[]>([]);
  const [categoriesList, setCategoriesList] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [incomeFiltered, setIncomeFiltered] =
    useState<incomeFilteredResponse>();
  const [expenseFiltered, setExpenseFiltered] =
    useState<expenseFilteredResponse>();

  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedAccount, setSelectedAccount] = useState<string | null>(null);
  const [selectedPeriod, setSelectedPeriod] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [ordering, setOrdering] = useState<string>("newest");
  const [selectedType, setSelectedType] = useState("all");
  const [selectedMultiPeriod, setSelectedMultiPeriod] = useState<string[]>([]);

  useEffect(() => {
    async function fetchFilterData() {
      setLoading(true);
      try {
        const [accounts, months, categories, income, expense] =
          await Promise.all([
            get_accounts_list(),
            get_five_months_list(),
            get_categories(),
            get_income_filtered(selectedMultiPeriod),
            get_expense_filtered(selectedMultiPeriod),
          ]);
        setCategoriesList(categories.categories_list);
        setMonthsList(months.last_five_months);
        setAccountsList(accounts.accounts_list);
        setIncomeFiltered(income);
        setExpenseFiltered(expense);
      } catch (error) {
        console.error("Error fetching filter data:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchFilterData();
  }, [incomeFiltered, expenseFiltered]);

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
          selectedMultiPeriod,
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
    selectedMultiPeriod,
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
              value={selectedMultiPeriod}
              onChange={(values: string[]) => {
                setSelectedMultiPeriod(values);
                setCurrentPage(1);
              }}
              multiple
            >
              <ComboboxPopover.Target>
                <Button
                  variant="default"
                  size="sm"
                  leftSection={<CalendarDays size={14} />}
                >
                  {selectedMultiPeriod.length > 0
                    ? selectedMultiPeriod.join(",")
                    : "All Periods"}
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
                {formatCurrency(incomeFiltered?.total_income || 0)}
              </Title>
              <Text c={"dimmed"} size="xs" mt="md">
                {incomeFiltered?.counted || "Multiple"} income transactions
              </Text>
            </Stack>
          </Card>

          <Card withBorder radius={"md"} padding="lg">
            <Stack align="flex-start" gap={0}>
              <Text c={"dimmed"} size="sm">
                Money out
              </Text>
              <Title order={2} mt="sm">
                {formatCurrency(expenseFiltered?.total_expense || 0)}
              </Title>
              <Text c={"dimmed"} size="xs" mt="md">
                {expenseFiltered?.counted || "Multiple"} expense transactions
              </Text>
            </Stack>
          </Card>

          <Card withBorder radius={"md"} padding="lg" bg={"#184F40"}>
            <Stack align="flex-start" gap={0}>
              <Text c={"white"} size="sm">
                Net cash flow
              </Text>
              <Title c={"white"} order={2} mt="sm">
                {calculateNetSaving(
                  Number(incomeFiltered?.total_income),
                  Number(expenseFiltered?.total_expense),
                )}
              </Title>
              <Text c={"white"} size="xs" mt="md">
                {Number(incomeFiltered?.total_income) === 0
                  ? 0
                  : percentageNetSaving(
                      Number(incomeFiltered?.total_income),
                      Number(expenseFiltered?.total_expense),
                    )}
                % of this month's income
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
