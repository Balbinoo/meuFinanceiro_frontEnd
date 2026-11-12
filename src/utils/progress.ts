export function monthlyBudget(income: number, expense: number): number {
  return (expense / (income / 2)) * 100;
}

export function goalPercentage(saved: number, objective: number): number {
  return objective > 0 ? Math.min((saved / objective) * 100, 100) : 0;
}
