import {
  Badge,
  Button,
  Card,
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
} from "@mantine/core";
import { Page } from "../layout/Page";
import { CalendarDays, Download, Plus, Search, Sparkles } from "lucide-react";
import { IconBuildingBank } from "@tabler/icons-react";
import ApexChart from "../components/Graphs/ApexChart";
import TableChart3 from "../components/Table/TableChart3";
import TableChart2 from "../components/Table/TableChart2";

const EconomyPage = () => {
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
          <Button
            variant="default"
            size="sm"
            leftSection={<CalendarDays size={14} />}
          >
            October 2026
          </Button>

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
              placeholder={"Everyday checking"}
              data={[
                "Everyday checking",
                "Account 2",
                "Account 3",
                "Account 4",
              ]}
              styles={{
                input: {
                  color: "#20765B",
                  borderColor: "green",
                },
                section: {
                  color: "#20765B",
                },
              }}
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
            Showing only this account
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
              R$ 6,450.00
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
              R$ 6,800.00
            </Title>
            <Text c="dimmed" size="xs" mt="md">
              2 income transactions this month
            </Text>
          </Stack>
        </Card>

        <Card withBorder radius="md" padding="lg">
          <Stack align="flex-start" gap={0}>
            <Text c="dimmed" size="sm">
              Money spent
            </Text>
            <Title order={2} mt="sm">
              R$ 3,240.00
            </Title>
            <Text c="dimmed" size="xs" mt="md">
              46 payments · 9.5% less than Sep
            </Text>
          </Stack>
        </Card>

        <Card withBorder radius="md" padding="lg">
          <Stack align="flex-start" gap={0}>
            <Text c="dimmed" size="sm">
              Net cash flow
            </Text>
            <Title order={2} mt="sm">
              +R$ 3,560.00
            </Title>
            <Text c="dimmed" size="xs" mt="md">
              Income minus expenses
            </Text>
          </Stack>
        </Card>
      </SimpleGrid>

      <SimpleGrid mt={"20"} cols={{ base: 1, sm: 2 }}>
        <Card mt={20} withBorder radius="md" padding="lg">
          <Stack mb={15} gap={4} align="flex-start">
            <Title size={"lg"} order={1}>
              Where it went
            </Title>
            <Text size="xs"> Spending from Everyday checking · Oct 1-23</Text>
          </Stack>
          <ApexChart />

          <Group justify="flex-start" align="center" gap="sm" wrap="nowrap">
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
              Home & bills is your biggest expense: $1,400 at Oakwood
              Apartments, or 43,2% of this account's spending.
            </Text>
          </Group>
        </Card>

        <Card mt={20} withBorder radius="md" padding="lg">
          <Group justify="space-between" align="center">
            <Title mb={10} size={"lg"}>
              Top places you spent
            </Title>
            <Text size="xs" c={"dimmed"}>
              This month
            </Text>
          </Group>
          <TableChart3 />
          <Divider />

          <Group mt={25} justify="space-between" align="center">
            <Text size={"xs"}>This account's cash flow</Text>
            <Text size="xs" c={"dimmed"}>
              +R$3,560.00
            </Text>
          </Group>
          <Progress
            color="#20765B"
            mt={10}
            radius={"lg"}
            size="md"
            value={(6800 / (6800 + 3240)) * 100}
          />
          <Group mt={10} justify="space-between" align="center">
            <Text c={"dimmed"} mb={10} size={"xs"}>
              In R$6,800
            </Text>
            <Text size="xs" c={"dimmed"}>
              Spent R$3,240.00
            </Text>
          </Group>
          <Text mt={10} size="xs" c={"dimmed"}>
            Opening balance R$2,890 + net flow R$3,560 = current balance
            R$6,450.
          </Text>
        </Card>
      </SimpleGrid>

      <Card mt={25} withBorder radius={"md"} padding="lg">
        <Group mt={20} justify="space-between" align="center" w="100%">
          {/* Left side */}
          <Stack gap={4} align="flex-start">
            <Title size={"lg"} order={1}>
              Account transactions
            </Title>
            <Text size="xs">Everyday checking **4821 - October 2026</Text>
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
          <Input
            leftSection={<Search size={16} color="black" />}
            size="md"
            radius="lg"
            placeholder="Search merchant or description"
            style={{ flex: 1 }}
          />

          <Select
            placeholder="All categories"
            data={[
              "Food & groceries",
              "Salary",
              "Shopping",
              "Lifestyle",
              "Transport",
            ]}
            w={200}
          />

          <Select
            placeholder="Sort"
            data={["Newest first", "Oldest first"]}
            w={160}
          />
        </Group>
        <TableChart2 />

        <Group mt={30} justify="space-between" align="center">
          <Text c="dimmed" size="xs">
            Showing 1–10 of 48 transactions
          </Text>
          <Pagination
            total={5}
            color="#EAF3ED"
            styles={{ control: { color: "#20765B" } }}
          />{" "}
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
