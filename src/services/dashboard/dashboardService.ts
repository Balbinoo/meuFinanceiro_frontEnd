import type {
  ExpenseCategoryResponse,
  GoalsResponse,
  LastMonthlyExpenseResponse,
  LastMonthlyIncomeResponse,
  MonthlyExpenseResponse,
  MonthlyIncomeResponse,
  MonthlySummaryResponse,
  RecentTransactionResponse,
  TotalAccountsResponse,
  TotalBalanceResponse,
  UserNameResponse,
} from "../../types/dashboard/dashboardType";

import { api } from "../api";

export async function totalBalance(): Promise<TotalBalanceResponse> {
  const response = await api.get<TotalBalanceResponse>(
    "/api/dashboard/total-balance/",
  );
  return response.data;
}

export async function monthlyIncome(): Promise<MonthlyIncomeResponse> {
  const response = await api.get<MonthlyIncomeResponse>(
    "/api/dashboard/monthly_income/",
  );
  return response.data;
}

export async function monthlyExpense(): Promise<MonthlyExpenseResponse> {
  const response = await api.get<MonthlyExpenseResponse>(
    "/api/dashboard/monthly_expense/",
  );
  return response.data;
}

export async function monthlySummary(): Promise<MonthlySummaryResponse[]> {
  const response = await api.get<MonthlySummaryResponse[]>(
    "/api/dashboard/monthly_summary/",
  );
  return response.data;
}

export async function expenseCategories(): Promise<ExpenseCategoryResponse[]> {
  const response = await api.get<ExpenseCategoryResponse[]>(
    "/api/dashboard/expense_categories/",
  );

  return response.data;
}

export async function getRecentTransactions(): Promise<
  RecentTransactionResponse[]
> {
  const response = await api.get<RecentTransactionResponse[]>(
    "/api/dashboard/recent_transactions/",
  );

  return response.data;
}

export async function getGoals(): Promise<GoalsResponse[]> {
  const response = await api.get<{ goals: GoalsResponse[] }>(
    "/api/dashboard/goals/",
  );

  return response.data.goals;
}

export async function lastMonthlyIncome(): Promise<LastMonthlyIncomeResponse> {
  const response = await api.get<LastMonthlyIncomeResponse>(
    "/api/dashboard/last_monthly_income/",
  );
  return response.data;
}

export async function lastMonthlyExpense(): Promise<LastMonthlyExpenseResponse> {
  const response = await api.get<LastMonthlyExpenseResponse>(
    "/api/dashboard/last_monthly_expense/",
  );
  return response.data;
}

export async function getTotalAccounts(): Promise<TotalAccountsResponse> {
  const response = await api.get<TotalAccountsResponse>(
    "/api/dashboard/total_accounts/",
  );
  return response.data;
}

export async function getUserName(): Promise<UserNameResponse> {
  const response = await api.get<UserNameResponse>("/api/dashboard/user_name/");
  return response.data;
}
