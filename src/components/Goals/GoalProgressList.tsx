import { Group, Stack, Text, Title, Progress } from "@mantine/core";
import { ShieldCheck } from "lucide-react";

import type { GoalsResponse } from "../../types/dashboard/dashboardType";
import { formatCurrency } from "../../utils/formatCurrency";
import { goalPercentage } from "../../utils/progress";

interface GoalProgressListProps {
  goals: GoalsResponse[];
}

export default function GoalProgressList({ goals }: GoalProgressListProps) {
  if (goals.length === 0) {
    return (
      <Text size="sm" c="dimmed" ta="center" mt="md">
        Você ainda não possui metas cadastradas.
      </Text>
    );
  }

  return (
    <Stack gap="lg">
      {goals.map((goal) => {
        const saved = Number(goal.saved);
        const objective = Number(goal.objective);
        const percentage = goalPercentage(saved, objective);

        return (
          <Stack key={goal.id} gap={5}>
            <Group gap="md">
              <Group
                bg="#EAF3ED"
                w={36}
                h={36}
                style={{
                  borderRadius: "35%",
                  justifyContent: "center",
                }}
              >
                <ShieldCheck color="#20765B" />
              </Group>

              <Stack gap={0} style={{ flex: 1 }}>
                <Title size="xs">{goal.name}</Title>

                <Text c="dimmed" size="xs">
                  {formatCurrency(saved)} de {formatCurrency(objective)}
                  guardados
                </Text>
              </Stack>

              <Group
                bg="#EAF3ED"
                w={45}
                h={36}
                style={{
                  borderRadius: "35%",
                  justifyContent: "center",
                }}
              >
                <Text size="xs" c="#20765B">
                  {percentage.toFixed(0)}%
                </Text>
              </Group>
            </Group>

            <Progress
              color="#20765B"
              radius="lg"
              size="md"
              value={percentage}
            />
          </Stack>
        );
      })}
    </Stack>
  );
}
