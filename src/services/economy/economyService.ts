import type { TotalBalanceResponse } from "../../types/dashboard/dashboardType";
import { api } from "../api";

export const totalBalanceFiltered = async (
  account?: string | null,
): Promise<TotalBalanceResponse> => {
  const response = await api.get<TotalBalanceResponse>(
    "/api/economy/balance_filtered/",
    {
      params: {
        account: account || undefined,
      },
    },
  );
  return response.data;
};
