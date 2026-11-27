export interface ExpenseCategory {
  category: string;
  count: number;
  total_amount: number;
  percentage: number;
}

export interface expenseCategoriesResponse {
  categories: ExpenseCategory[];
}

export interface TopExpenses {
  store: string;
  category: string;
  total_amount: number;
  frequency: number;
}

export interface topExpensesResponse {
  top_expenses: TopExpenses[];
}
