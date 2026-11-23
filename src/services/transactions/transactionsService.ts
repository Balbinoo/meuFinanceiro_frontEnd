import type {
  accountsListResponse,
  categoriesListResponse,
  getAllTransactionsResponse,
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
