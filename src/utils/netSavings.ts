import { formatCurrency } from "./formatCurrency";

export function calculateNetSaving(income: number, expense: number): string {
  return formatCurrency(income - expense);
}

export function percentageNetSaving(income: number, expense: number): number {
  return Math.round(((income - expense) * 100) / income);
}
