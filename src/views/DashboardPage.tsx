import {
  Divider,
  Card,
  Group,
  SimpleGrid,
  Stack,
  Text,
  Title,
  Progress,
} from "@mantine/core";
import { Page } from "../layout/Page";
import SimpleBarChart from "../components/Graphs/dashboard/SimpleBarChart";
import ApexChart from "../components/Graphs/dashboard/ApexChart";
import TableChart from "../components/Table/dashboard/TableChart";
import GoalProgressList from "../components/Goals/GoalProgressList";
import { useEffect, useState } from "react";
import { formatCurrency } from "../utils/formatCurrency";
import {
  lastMonthlyExpense,
  lastMonthlyIncome,
  expenseCategories,
  getRecentTransactions,
  monthlyExpense,
  monthlyIncome,
  monthlySummary,
  totalBalance,
  getGoals,
  getTotalAccounts,
  getUserName,
} from "../services/dashboard/dashboardService";
import type {
  ExpenseCategoryResponse,
  GoalsResponse,
  MonthlySummaryResponse,
  RecentTransactionResponse,
} from "../types/dashboard/dashboardType";
import { calculatePercentageChange } from "../utils/percentageChange";
import { calculateNetSaving, percentageNetSaving } from "../utils/netSavings";
import { monthlyBudget } from "../utils/progress";

const DashboardPage = () => {
  const [accounts, setAccounts] = useState<number>(0);
  const [balance, setBalance] = useState<number>(0);
  const [income, setIncome] = useState<number>(0);
  const [username, setUsername] = useState<string>("");
  const [lastMonthIncome, setLastMonthIncome] = useState<number>(0);
  const [expense, setExpense] = useState<number>(0);
  const [lastMonthExpense, setLastMonthExpense] = useState<number>(0);
  const [goals, setGoals] = useState<GoalsResponse[]>([]);
  const [transactions, setTransactions] = useState<RecentTransactionResponse[]>(
    [],
  );
  const [categoryData, setCategoryData] = useState<ExpenseCategoryResponse[]>(
    [],
  );
  const [chartData, setChartData] = useState<MonthlySummaryResponse[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchDashboardData() {
      try {
        const [
          recentTransactions,
          dataSummary,
          dataBalance,
          dataIncome,
          dataExpense,
          dataCategory,
          dataGoals,
          dataLastExpense,
          dataLastIncome,
          dataAccounts,
          dataUserName,
        ] = await Promise.all([
          getRecentTransactions(),
          monthlySummary(),
          totalBalance(),
          monthlyIncome(),
          monthlyExpense(),
          expenseCategories(),
          getGoals(),
          lastMonthlyExpense(),
          lastMonthlyIncome(),
          getTotalAccounts(),
          getUserName(),
        ]);
        setTransactions(recentTransactions);
        setChartData(dataSummary);
        setBalance(Number(dataBalance.total_balance));
        setIncome(Number(dataIncome.monthly_income));
        setExpense(Number(dataExpense.monthly_expense));
        setCategoryData(dataCategory);
        setGoals(dataGoals);
        setLastMonthExpense(Number(dataLastExpense.last_monthly_expense));
        setLastMonthIncome(Number(dataLastIncome.last_monthly_income));
        setAccounts(dataAccounts.total_accounts);
        setUsername(dataUserName.user_name);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchDashboardData();
  }, []);

  const incomeChange = calculatePercentageChange(income, lastMonthIncome);
  const expenseChange = calculatePercentageChange(expense, lastMonthExpense);

  return (
    <Page>
      <Stack gap="xl" maw={1100} mx="auto">
        <Stack gap={4} align="flex-start">
          <Title order={1}>Dashboard</Title>
          <Text c="dimmed" mt={4}>
            Welcome back, {username}. Here's the bigger picture of your money.
          </Text>
        </Stack>

        <SimpleGrid cols={{ base: 1, sm: 4 }}>
          <Card withBorder radius="md" padding="lg" bg="#184F40" c="white">
            <Stack align="flex-start" gap={0}>
              <Text c="white" size="sm">
                Total balance
              </Text>
              <Title c={"white"} order={2} mt="sm">
                {loading ? "Carregando..." : formatCurrency(balance)}
              </Title>
              <Text c="white" size="xs" mt="sm">
                Across {accounts} connected accounts
              </Text>
            </Stack>
          </Card>

          <Card withBorder radius="md" padding="lg">
            <Stack align="flex-start" gap={0}>
              <Text c="dimmed" size="sm">
                Monthly income
              </Text>
              <Title order={2} mt="sm">
                {loading ? "Carregando..." : formatCurrency(income)}
              </Title>
              <Text c="dimmed" size="xs" mt="md">
                {incomeChange === null
                  ? "No income last month"
                  : `${incomeChange > 0 ? "⬈" : "⬊"} ${Math.abs(incomeChange).toFixed(1)}% vs. last month`}
              </Text>
            </Stack>
          </Card>

          <Card withBorder radius="md" padding="lg">
            <Stack align="flex-start" gap={0}>
              <Text c="dimmed" size="sm">
                Monthly expenses
              </Text>
              <Title order={2} mt="sm">
                {loading ? "Carregando..." : formatCurrency(expense)}
              </Title>
              <Text c="dimmed" size="xs" mt="md">
                {expenseChange === null
                  ? "No expenses last month"
                  : `${expenseChange > 0 ? "⬈" : "⬊"} ${Math.abs(expenseChange).toFixed(1)}% vs. last month`}
              </Text>
            </Stack>
          </Card>

          <Card withBorder radius="md" padding="lg">
            <Stack align="flex-start" gap={0}>
              <Text c="dimmed" size="sm">
                Net savings
              </Text>
              <Title order={2} mt="sm">
                {loading
                  ? "Carregando..."
                  : calculateNetSaving(income, expense)}
              </Title>
              <Text c="dimmed" size="xs" mt="md">
                {income === 0 ? 0 : percentageNetSaving(income, expense)}% of
                this month's income
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
            <Stack align="flex-start" gap={0} mb={10}>
              <Title size={"md"}>Cash flow</Title>
              <Text size="xs">
                A little more coming in. A little less going out.
              </Text>
            </Stack>
            <SimpleBarChart chartData={chartData} />
          </Card>

          <Card
            withBorder
            radius="md"
            padding="lg"
            style={{ gridColumn: "span 5" }}
          >
            <Stack mb={25} align="flex-start" gap={0}>
              <Title size={"md"}>Where it went</Title>
            </Stack>

            <ApexChart chartData={categoryData} />

            <Divider my={"xs"} />

            <Group mt="15" justify="space-between" align="center">
              <Text size={"sm"}> Monthly budget </Text>
              <Text size={"sm"}>
                {formatCurrency(expense)}/{formatCurrency(income / 2)}
              </Text>
            </Group>
            <Progress
              color="#20765B"
              mt={10}
              radius={"lg"}
              size="md"
              value={monthlyBudget(income, expense)}
            />
            <Stack align="flex-start" gap={0} mt={5}>
              <Text size="xs" c="#20765B">
                {formatCurrency(income / 2 - expense)} left to spend. You're on
                track.
              </Text>
            </Stack>
          </Card>
        </SimpleGrid>

        <SimpleGrid cols={{ base: 1, sm: 2 }}>
          <Card withBorder radius="md" padding="lg">
            <Group mt={"15"} justify="space-between" align="center">
              <Title size={"lg"}> Recent Transactions </Title>
              <Text size="xs" c={"#20765B"}>
                View all →
              </Text>
            </Group>
            <TableChart transactions={transactions} />
          </Card>

          <Card withBorder radius="md" padding="lg">
            <Group mt={"15"} justify="space-between" align="center">
              <Title mb={10} size={"lg"}>
                A future worth saving for
              </Title>
              <Text size="xs" c={"#20765B"}>
                View goals →
              </Text>
            </Group>
            <GoalProgressList goals={goals} />
            <Group mt={5} align="flex-start" gap={0}>
              <Text size="xs" c={"dimmed"}>
                A stronger safety net,one month at a time.
              </Text>
            </Group>
          </Card>
        </SimpleGrid>
      </Stack>
    </Page>
  );
};
export default DashboardPage;
