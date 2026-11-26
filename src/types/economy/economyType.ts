export interface ExpenseCategory {
  category: string;
  count: number;
  total_amount: number;
  percentage: number;
}

export interface expenseCategoriesResponse {
  categories: ExpenseCategory[];
}
