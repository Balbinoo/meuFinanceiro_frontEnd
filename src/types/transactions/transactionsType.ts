export interface Transaction {
  transaction_type: "income" | "expense";
  type: "Variable" | "Fixed";
  description: string;
  category: string;
  date: string;
  account_name: string;
  amount: string;
}

export interface getAllTransactionsResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Transaction[];
}

export interface accountsListResponse {
  accounts_list: string[];
}

export interface monthsListResponse {
  last_five_months: string[];
}

export interface categoriesListResponse {
  categories_list: string[];
}
