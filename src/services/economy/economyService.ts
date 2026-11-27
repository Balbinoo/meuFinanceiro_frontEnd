import type { TotalBalanceResponse } from "../../types/dashboard/dashboardType";
import type {
  expenseCategoriesResponse,
  topExpensesResponse,
} from "../../types/economy/economyType";
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

export const getFilteredExpenseCategories = async (
  account?: string | null,
  periods?: string[],
): Promise<expenseCategoriesResponse> => {
  const response = await api.get<expenseCategoriesResponse>(
    "/api/economy/expense_categories/",
    {
      params: {
        account: account || undefined,
        periods: periods?.length ? periods.join(",") : undefined,
      },
    },
  );
  return response.data;
};

export const getTopExpensesFiltered = async (
  account?: string | null,
  periods?: string[],
): Promise<topExpensesResponse> => {
  const response = await api.get<topExpensesResponse>(
    "/api/economy/top_expenses/",
    {
      params: {
        account: account || undefined,
        periods: periods?.length ? periods.join(",") : undefined,
      },
    },
  );
  return response.data;
};
