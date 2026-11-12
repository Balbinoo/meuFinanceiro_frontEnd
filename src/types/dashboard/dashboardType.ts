export interface TotalBalanceResponse {
  total_balance: string | number;
}

export interface MonthlyIncomeResponse {
  monthly_income: string | number;
}
export interface MonthlyExpenseResponse {
  monthly_expense: string | number;
}

export interface LastMonthlyIncomeResponse {
  last_monthly_income: string | number;
}
export interface LastMonthlyExpenseResponse {
  last_monthly_expense: string | number;
}

export interface ExpenseCategoryResponse {
  category: string;
  count: number;
}

export interface MonthlySummaryResponse {
  label: string;
  Income: number;
  Expenses: number;
}

export interface RecentTransactionResponse {
  id: number;
  type: "income" | "expense";
  description: string;
  category: string;
  amount: string;
  date: string;
}

export interface GoalsResponse {
  id: number;
  name: string;
  saved: number;
  objective: number;
}

export interface TotalAccountsResponse {
  total_accounts: number;
}

export interface UserNameResponse {
  user_name: string;
}
