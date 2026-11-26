import {
  Autocomplete,
  Badge,
  Button,
  Card,
  ComboboxPopover,
  Divider,
  Group,
  Input,
  Pagination,
  Progress,
  Select,
  SimpleGrid,
  Stack,
  Text,
  Title,
  Grid,
} from "@mantine/core";
import { Page } from "../layout/Page";
import { CalendarDays, Download, Plus, Search, Sparkles } from "lucide-react";
import { IconBuildingBank } from "@tabler/icons-react";
import ApexChartEconomy from "../components/Graphs/economy/ApexChartEconomy";
import TableChart3 from "../components/Table/TableChart3";
import TableChart2 from "../components/Table/TableChart2";
import { useState, useEffect } from "react";
import {
  get_accounts_list,
  get_categories,
  get_expense_filtered,
  get_five_months_list,
  get_income_filtered,
  getAllTransactions,
} from "../services/transactions/transactionsService";
import type {
  expenseFilteredResponse,
  incomeFilteredResponse,
  Transaction,
} from "../types/transactions/transactionsType";
import AllTransactionsTable from "../components/Table/transactions/AllTransactionsTable";
import { formatCurrency } from "../utils/formatCurrency";
import {
  getFilteredExpenseCategories,
  totalBalanceFiltered,
} from "../services/economy/economyService";
import type { TotalBalanceResponse } from "../types/dashboard/dashboardType";
import { calculateNetSaving, percentageNetSaving } from "../utils/netSavings";
import { expenseCategories } from "../services/dashboard/dashboardService";
import type { expenseCategoriesResponse } from "../types/economy/economyType";
import { calculateBiggestExpense } from "../utils/expense";

const EconomyPage = () => {
  const [loading, setLoading] = useState(true);
  const [accountsList, setAccountsList] = useState<string[]>([]);
  const [monthsList, setMonthsList] = useState<string[]>([]);
  const [totalTransactions, setTotalTransactions] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [allTransactions, setAllTransactions] = useState<Transaction[]>([]);
  const [expenseCategoriesData, setExpenseCategoriesData] =
    useState<expenseCategoriesResponse>({
      categories: [],
    });
  const [categoriesList, setCategoriesList] = useState<string[]>([]);
  const [incomeFiltered, setIncomeFiltered] =
    useState<incomeFilteredResponse>();
  const [expenseFiltered, setExpenseFiltered] =
    useState<expenseFilteredResponse>();

  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedAccount, setSelectedAccount] = useState<string | null>(null);
  const [selectedPeriod, setSelectedPeriod] = useState<string | null>(null);
  const [balanceFiltered, setBalanceFiltered] =
    useState<TotalBalanceResponse>();
  const [search, setSearch] = useState("");
  const [ordering, setOrdering] = useState<string>("newest");
  const [selectedType, setSelectedType] = useState("all");
  const [selectedMultiPeriod, setSelectedMultiPeriod] = useState<string[]>([]);

  useEffect(() => {
    async function fetchFilterData() {
      setLoading(true);
      try {
        const [
          accounts,
          months,
          categories,
          income,
          expense,
          balance,
          expenseCategories,
        ] = await Promise.all([
          get_accounts_list(),
          get_five_months_list(),
          get_categories(),
          get_income_filtered(selectedMultiPeriod, selectedAccount),
          get_expense_filtered(selectedMultiPeriod, selectedAccount),
          totalBalanceFiltered(selectedAccount),
          getFilteredExpenseCategories(selectedAccount, selectedMultiPeriod),
        ]);
        setCategoriesList(categories.categories_list);
        setMonthsList(months.last_five_months);
        setAccountsList(accounts.accounts_list);
        setIncomeFiltered(income);
        setExpenseFiltered(expense);
        setBalanceFiltered(balance);
        setExpenseCategoriesData(expenseCategories);
      } catch (error) {
        console.error("Error fetching filter data:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchFilterData();
  }, [incomeFiltered, expenseFiltered, balanceFiltered, expenseCategoriesData]);

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
    console.log("expenseCategories:", expenseCategoriesData);
  }, [allTransactions, accountsList]);

  const biggestExpense = calculateBiggestExpense(expenseCategoriesData);

  return (
    <Page>
      <Group justify="space-between" align="center" w="100%">
        <Stack gap={4} align="flex-start">
          <Title order={1}>Economy</Title>
          <Text c="dimmed" mt={4}>
            Spend with intention. Save for the life you want.
          </Text>
        </Stack>

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
                  ? selectedMultiPeriod.join(", ")
                  : "All Periods"}
              </Button>
            </ComboboxPopover.Target>
          </ComboboxPopover>

          <Button size="sm" bg="#20765B" leftSection={<Download size={14} />}>
            Export report
          </Button>
        </Group>
      </Group>

      <Card mt={20} withBorder radius="md" padding="md">
        <Group justify="space-between" align="center" wrap="wrap">
          <Group gap="md" align="center">
            <Text c="dimmed" size="sm">
              VIEW ACCOUNT
            </Text>

            <Select
              c="green"
              leftSection={<IconBuildingBank size={16} color="#20765B" />}
              placeholder={"Accounts"}
              data={accountsList}
              value={selectedAccount}
              onChange={(value) => {
                setSelectedAccount(value);
                setCurrentPage(1);
              }}
              styles={{
                input: {
                  color: "#20765B",
                  borderColor: "green",
                },
                section: {
                  color: "#20765B",
                },
              }}
              clearable
              nothingFoundMessage="No accounts found"
            />
          </Group>

          <Badge
            color="#EAF3ED"
            variant="light"
            radius="sm"
            styles={{
              label: {
                color: "#20765B",
                textTransform: "none",
                fontWeight: 400,
              },
            }}
          >
            {selectedAccount
              ? `Showing ${selectedAccount}'s account`
              : "Showing from all accounts"}
          </Badge>
        </Group>
      </Card>

      <SimpleGrid mt={"20"} cols={{ base: 1, sm: 4 }}>
        <Card withBorder radius="md" padding="lg" bg="#184F40" c="white">
          <Stack align="flex-start" gap={0}>
            <Text c="white" size="sm">
              Current balance
            </Text>
            <Title c={"white"} order={2} mt="sm">
              {formatCurrency(balanceFiltered?.total_balance || 0)}
            </Title>
            <Text c="white" size="xs" mt="sm">
              Everyday checking **4821
            </Text>
          </Stack>
        </Card>

        <Card withBorder radius="md" padding="lg">
          <Stack align="flex-start" gap={0}>
            <Text c="dimmed" size="sm">
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

        <Card withBorder radius="md" padding="lg">
          <Stack align="flex-start" gap={0}>
            <Text c="dimmed" size="sm">
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

        <Card withBorder radius="md" padding="lg">
          <Stack align="flex-start" gap={0}>
            <Text c="dimmed" size="sm">
              Net cash flow
            </Text>
            <Title order={2} mt="sm">
              {calculateNetSaving(
                Number(incomeFiltered?.total_income),
                Number(expenseFiltered?.total_expense),
              )}{" "}
            </Title>
            <Text c="dimmed" size="xs" mt="md">
              {Number(incomeFiltered?.total_income) === 0
                ? 0
                : percentageNetSaving(
                    Number(incomeFiltered?.total_income),
                    Number(expenseFiltered?.total_expense),
                  )}
              % of this month's income{" "}
            </Text>
          </Stack>
        </Card>
      </SimpleGrid>

      <Grid mt={20}>
        {/* Card da esquerda: categorias */}
        <Grid.Col span={{ base: 12, sm: 7 }}>
          <Card withBorder radius="md" padding="lg" h="100%">
            <Group justify="space-between" align="flex-start" mb="md">
              <Stack gap={4} align="flex-start">
                <Title size="lg" order={2}>
                  Where it went
                </Title>
                <Text size="xs" c="dimmed">
                  {selectedAccount ? `${selectedAccount} ` : "All "}
                  expenses by category
                </Text>
              </Stack>
              <Stack mt={15}>
                <Text size="xs" c="dimmed">
                  {expenseCategoriesData.categories.length} categories
                </Text>
              </Stack>
            </Group>
            <Grid align="center">
              <Grid.Col span={12}>
                <ApexChartEconomy
                  expenseCategoriesData={expenseCategoriesData.categories}
                />

                <Group
                  justify="flex-start"
                  align="center"
                  gap="sm"
                  wrap="nowrap"
                  mt={30}
                >
                  {biggestExpense && (
                    <Text
                      bg="#EAF3ED"
                      size="xs"
                      c="dimmed"
                      style={{ borderRadius: 999, padding: "8px 12px" }}
                    >
                      <Sparkles
                        size={16}
                        color="green"
                        style={{ verticalAlign: "middle", marginRight: 8 }}
                      />
                      {biggestExpense.category} is your biggest expense:{" "}
                      {formatCurrency(biggestExpense.total_amount)},
                      representing {biggestExpense.percentage.toFixed(1)}% of
                      your total spending.
                    </Text>
                  )}
                </Group>
              </Grid.Col>
            </Grid>
          </Card>
        </Grid.Col>

        {/* Card da direita: locais e fluxo */}
        <Grid.Col span={{ base: 12, sm: 5 }}>
          <Card withBorder radius="md" padding="lg" h="100%">
            <Stack gap="md">
              <Group justify="space-between" align="center">
                <Title size="lg" order={2}>
                  Top places you spent
                </Title>

                <Text size="xs" c="dimmed">
                  This month
                </Text>
              </Group>

              <TableChart3 />

              <Divider />

              <Stack gap={8}>
                <Group justify="space-between" align="center">
                  <Text size="xs">This account's cash flow</Text>

                  <Text size="xs" c="dimmed">
                    +R$3,560.00
                  </Text>
                </Group>

                <Progress
                  color="#20765B"
                  radius="lg"
                  size="md"
                  value={(6800 / (6800 + 3240)) * 100}
                />

                <Group justify="space-between" align="center">
                  <Text size="xs" c="dimmed">
                    In R$6,800
                  </Text>

                  <Text size="xs" c="dimmed">
                    Spent R$3,240.00
                  </Text>
                </Group>
              </Stack>

              <Text size="xs" c="dimmed" lh={1.5}>
                Opening balance R$2,890 + net flow R$3,560 = current balance
                R$6,450.
              </Text>
            </Stack>
          </Card>
        </Grid.Col>
      </Grid>

      <Card mt={25} withBorder radius={"md"} padding="lg">
        <Group mt={20} justify="space-between" align="center" w="100%">
          {/* Left side */}
          <Stack gap={4} align="flex-start">
            <Title size={"lg"} order={1}>
              {selectedAccount || "All"} Account Transactions
            </Title>
            <Text size="xs">
              Everyday checking **4821 -
              {selectedMultiPeriod.length > 0
                ? selectedMultiPeriod.join(", ")
                : "All Periods"}
            </Text>
          </Stack>

          {/* Right side */}
          <Group gap="sm">
            <Button
              variant="default"
              size="sm"
              leftSection={<Download size={14} />}
            >
              Export CSV
            </Button>
          </Group>
        </Group>
        <Divider mt={15} />
        <Group
          mt={30}
          justify="space-between"
          align="center"
          wrap="nowrap"
          gap="md"
        >
          <Autocomplete
            leftSection={<Search size={16} color="black" />}
            size="md"
            radius="lg"
            placeholder="Search merchant or description"
            style={{ flex: 1 }}
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
            placeholder="Sort by"
            w={160}
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
        </Group>

        <AllTransactionsTable data={allTransactions} />
        <Divider />

        <Group mt={30} justify="space-between" align="center">
          <Text c="dimmed" size="xs">
            Showing {totalTransactions === 0 ? 0 : (currentPage - 1) * 10 + 1}–
            {Math.min(currentPage * 10, totalTransactions)} of{" "}
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
export default EconomyPage;
