export interface Transaction {
  transaction_type: "income" | "expense";
  type: "Variable" | "Fixed";
  description: string;
  category: string;
  date: string;
  account_id: number;
  amount: string;
}

export interface getAllTransactionsResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Transaction[];
}
