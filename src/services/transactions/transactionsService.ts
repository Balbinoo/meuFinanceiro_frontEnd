import type {
  accountsListResponse,
  categoriesListResponse,
  expenseFilteredResponse,
  getAllTransactionsResponse,
  incomeFilteredResponse,
  monthsListResponse,
} from "../../types/transactions/transactionsType";

import { api } from "../api";

export const getAllTransactions = async (
  page: number = 1,
  category?: string | null,
  account?: string | null,
  period?: string | null,
  search?: string,
  ordering?: string,
  transaction_type?: string,
  periods?: string[],
): Promise<getAllTransactionsResponse> => {
  const response = await api.get<getAllTransactionsResponse>(
    "/api/transactions/all/",
    {
      params: {
        page,
        category: category || undefined,
        account: account || undefined,
        period: period || undefined,
        search: search || undefined,
        ordering: ordering || undefined,
        transaction_type:
          transaction_type === "all" ? undefined : transaction_type,
        periods: periods?.length ? periods.join(",") : undefined,
      },
    },
  );

  return response.data;
};

export const get_accounts_list = async (): Promise<accountsListResponse> => {
  const response = await api.get<accountsListResponse>(
    `/api/transactions/accounts_list/`,
  );

  return response.data;
};

export const get_five_months_list = async (): Promise<monthsListResponse> => {
  const response = await api.get<monthsListResponse>(
    `/api/transactions/last_five_months/`,
  );
  return response.data;
};

export const get_categories = async (): Promise<categoriesListResponse> => {
  const response = await api.get<categoriesListResponse>(
    `/api/transactions/all_categories/`,
  );
  return response.data;
};

export const get_income_filtered = async (
  periods?: string[],
): Promise<incomeFilteredResponse> => {
  const response = await api.get<incomeFilteredResponse>(
    "/api/transactions/income_filtered/",
    {
      params: {
        periods: periods?.length ? periods.join(",") : undefined,
      },
    },
  );
  return response.data;
};

export const get_expense_filtered = async (
  periods?: string[],
): Promise<expenseFilteredResponse> => {
  const response = await api.get<expenseFilteredResponse>(
    "/api/transactions/expense_filtered/",
    {
      params: {
        periods: periods?.length ? periods.join(",") : undefined,
      },
    },
  );
  return response.data;
};
