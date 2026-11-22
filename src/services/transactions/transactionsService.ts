import type {
  accountsListResponse,
  categoriesListResponse,
  getAllTransactionsResponse,
  monthsListResponse,
} from "../../types/transactions/transactionsType";

import { api } from "../api";

export const getAllTransactions = async (
  page: number = 1,
): Promise<getAllTransactionsResponse> => {
  const response = await api.get<getAllTransactionsResponse>(
    `/api/transactions/all/?page=${page}`,
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
