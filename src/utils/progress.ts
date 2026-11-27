export function monthlyBudget(income: number, expense: number): number {
  return (expense / (income / 2)) * 100;
}

export function goalPercentage(saved: number, objective: number): number {
  return objective > 0 ? Math.min((saved / objective) * 100, 100) : 0;
}

export function cashFlowIn(income: number, expense: number): number {
  if (income <= 0) return 0;

  return Math.max(0, ((income - expense) / income) * 100);
}

export function cashFlowOut(income: number, expense: number): number {
  if (income <= 0) return 0;

  return Math.min(100, (expense / income) * 100);
}
