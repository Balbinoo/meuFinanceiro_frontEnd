import type { getAllTransactionsResponse } from "../../types/transactions/transactionsType";

import { api } from "../api";

export const getAllTransactions = async (
  page: number = 1,
): Promise<getAllTransactionsResponse> => {
  const response = await api.get<getAllTransactionsResponse>(
    `/api/transactions/all/?page=${page}`,
  );

  return response.data;
};
