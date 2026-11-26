import type {
  expenseCategoriesResponse,
  ExpenseCategory,
} from "../types/economy/economyType";

export function calculateBiggestExpense(
  expenseCategoriesData: expenseCategoriesResponse,
): ExpenseCategory | null {
  return expenseCategoriesData.categories.length
    ? expenseCategoriesData.categories.reduce((biggest, current) =>
        current.total_amount > biggest.total_amount ? current : biggest,
      )
    : null;
}
