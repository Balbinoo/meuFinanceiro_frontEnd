import { describe, it, expect, vi, beforeEach } from "vitest";
import { api } from "../api";
import {
  monthlyIncome,
  totalBalance,
  monthlyExpense,
  monthlySummary,
  expenseCategories,
  getRecentTransactions,
  getGoals,
  lastMonthlyIncome,
  lastMonthlyExpense,
  getTotalAccounts,
  getUserName,
} from "./dashboardService";

vi.mock("../api", () => ({
  api: {
    get: vi.fn(),
  },
}));

beforeEach(() => vi.clearAllMocks());

describe("lastMonthlyIncome", () => {
  it("deve chamar o endpoint lastMonthlyIncome correto", async () => {
    vi.mocked(api.get).mockResolvedValue({ data: 1000 });

    await lastMonthlyIncome();

    expect(api.get).toHaveBeenCalledWith("/api/dashboard/last_monthly_income/");
  });

  it("deve retornar os dados recebidos da API lastMonthlyIncome", async () => {
    const last_monthly_income = 2000;
    vi.mocked(api.get).mockResolvedValue({ data: last_monthly_income });

    const result = await lastMonthlyIncome();

    expect(result).toEqual(last_monthly_income);
  });

  it("deve propagar o erro quando a API lastMonthlyIncome falhar", async () => {
    const error = new Error("Erro ao buscar última receita mensal");
    vi.mocked(api.get).mockRejectedValue(error);

    await expect(lastMonthlyIncome()).rejects.toThrow(
      "Erro ao buscar última receita mensal",
    );
  });
});

describe("lastMonthlyExpense", () => {
  it("deve chamar o endpoint lastMonthlyExpense correto", async () => {
    vi.mocked(api.get).mockResolvedValue({ data: 1000 });

    await lastMonthlyExpense();

    expect(api.get).toHaveBeenCalledWith(
      "/api/dashboard/last_monthly_expense/",
    );
  });

  it("deve retornar os dados recebidos da API lastMonthlyExpense", async () => {
    const last_monthly_expense = 1000;
    vi.mocked(api.get).mockResolvedValue({ data: last_monthly_expense });

    const result = await lastMonthlyExpense();

    expect(result).toEqual(last_monthly_expense);
  });

  it("deve propagar o erro quando a API lastMonthlyExpense falhar", async () => {
    const error = new Error("Erro ao buscar última despesa mensal");
    vi.mocked(api.get).mockRejectedValue(error);

    await expect(lastMonthlyExpense()).rejects.toThrow(
      "Erro ao buscar última despesa mensal",
    );
  });
});

describe("getTotalAccounts", () => {
  it("deve chamar o endpoint getTotalAccounts correto", async () => {
    vi.mocked(api.get).mockResolvedValue({ data: 3 });

    await getTotalAccounts();

    expect(api.get).toHaveBeenCalledWith("/api/dashboard/total_accounts/");
  });

  it("deve retornar os dados recebidos da API getTotalAccounts", async () => {
    const total_accounts = 3;
    vi.mocked(api.get).mockResolvedValue({ data: total_accounts });

    const result = await getTotalAccounts();

    expect(result).toEqual(total_accounts);
  });

  it("deve propagar o erro quando a API getTotalAccounts falhar", async () => {
    const error = new Error("Erro ao buscar total de contas");
    vi.mocked(api.get).mockRejectedValue(error);

    await expect(getTotalAccounts()).rejects.toThrow(
      "Erro ao buscar total de contas",
    );
  });
});

describe("getUserName", () => {
  it("deve chamar o endpoint getUserName correto", async () => {
    vi.mocked(api.get).mockResolvedValue({ data: "Rodrigo" });

    await getUserName();

    expect(api.get).toHaveBeenCalledWith("/api/dashboard/user_name/");
  });

  it("deve retornar os dados recebidos da API getUserName", async () => {
    const user_name = "Rodrigo";
    vi.mocked(api.get).mockResolvedValue({ data: user_name });

    const result = await getUserName();

    expect(result).toEqual(user_name);
  });

  it("deve propagar o erro quando a API getUserName falhar", async () => {
    const error = new Error("Erro ao buscar nome do usuário");
    vi.mocked(api.get).mockRejectedValue(error);

    await expect(getUserName()).rejects.toThrow(
      "Erro ao buscar nome do usuário",
    );
  });
});

describe("getGoals", () => {
  it("deve chamar o endpoint getGoals correto", async () => {
    vi.mocked(api.get).mockResolvedValue({ data: { goals: [] } });

    await getGoals();

    expect(api.get).toHaveBeenCalledWith("/api/dashboard/goals/");
  });

  it("deve retornar os dados recebidos da API getGoals", async () => {
    const goals = [{ id: 1, name: "Rodrigo", saved: 1000, objective: 2000 }];
    vi.mocked(api.get).mockResolvedValue({ data: { goals } });

    const result = await getGoals();

    expect(result).toEqual(goals);
  });

  it("deve propagar o erro quando a API getGoals falhar", async () => {
    const error = new Error("Erro ao buscar metas");
    vi.mocked(api.get).mockRejectedValue(error);

    await expect(getGoals()).rejects.toThrow("Erro ao buscar metas");
  });
});

describe("expenseCategories", () => {
  it("deve chamar o endpoint expenseCategories correto", async () => {
    vi.mocked(api.get).mockResolvedValue({ data: [] });

    await expenseCategories();

    expect(api.get).toHaveBeenCalledWith("/api/dashboard/expense_categories/");
  });

  it("deve retornar os dados recebidos da API expenseCategories", async () => {
    const categories = [{ category: "alimentos", count: 45 }];
    vi.mocked(api.get).mockResolvedValue({ data: categories });

    const result = await expenseCategories();

    expect(result).toEqual(categories);
  });

  it("deve propagar o erro quando a API expenseCategories falhar", async () => {
    const error = new Error("Erro ao buscar categorias de despesas");
    vi.mocked(api.get).mockRejectedValue(error);

    await expect(expenseCategories()).rejects.toThrow(
      "Erro ao buscar categorias de despesas",
    );
  });
});

describe("getRecentTransactions", () => {
  it("deve chamar o endpoint getRecentTransactions correto", async () => {
    vi.mocked(api.get).mockResolvedValue({ data: [] });

    await getRecentTransactions();

    expect(api.get).toHaveBeenCalledWith("/api/dashboard/recent_transactions/");
  });

  it("deve retornar os dados recebidos da API getRecentTransactions", async () => {
    const transactions = [
      {
        id: 1,
        type: "income",
        description: "alimentos",
        category: "fixo",
        amount: 10000,
        date: "2026-05-18",
      },
    ];
    vi.mocked(api.get).mockResolvedValue({ data: transactions });

    const result = await getRecentTransactions();

    expect(result).toEqual(transactions);
  });

  it("deve propagar o erro quando a API getRecentTransactions falhar", async () => {
    const error = new Error("Erro ao buscar transações recentes");
    vi.mocked(api.get).mockRejectedValue(error);

    await expect(getRecentTransactions()).rejects.toThrow(
      "Erro ao buscar transações recentes",
    );
  });
});

describe("monthlySummary", () => {
  it("deve chamar o endpoint monthlySummary correto", async () => {
    vi.mocked(api.get).mockResolvedValue({
      data: [],
    });

    await monthlySummary();

    expect(api.get).toHaveBeenCalledWith("/api/dashboard/monthly_summary/");
  });

  it("deve retornar os dados recebidos da API monthlySummary", async () => {
    const mockData = [
      {
        income: 1500,
        expense: 800,
        label: "Janeiro",
      },
    ];

    vi.mocked(api.get).mockResolvedValue({
      data: mockData,
    });

    const result = await monthlySummary();

    expect(result).toEqual(mockData);
  });

  it("deve propagar o erro quando a API monthlySummary falhar", async () => {
    const error = new Error("Erro ao buscar monthlySummary");

    vi.mocked(api.get).mockRejectedValue(error);

    await expect(monthlySummary()).rejects.toThrow(
      "Erro ao buscar monthlySummary",
    );
  });
});

describe("monthlyExpense", () => {
  it("deve chamar o endpoint monthlyExpense correto", async () => {
    vi.mocked(api.get).mockResolvedValue({
      data: 1000,
    });

    await monthlyExpense();

    expect(api.get).toHaveBeenCalledWith("/api/dashboard/monthly_expense/");
  });

  it("deve retornar os dados recebidos da API monthlyExpense", async () => {
    const monthly_expense = 1000;

    vi.mocked(api.get).mockResolvedValue({
      data: monthly_expense,
    });

    const result = await monthlyExpense();

    expect(result).toEqual(monthly_expense);
  });

  it("deve propagar o erro quando a API monthlyExpense falhar", async () => {
    const error = new Error("Erro ao buscar monthlyExpense");

    vi.mocked(api.get).mockRejectedValue(error);

    await expect(monthlyExpense()).rejects.toThrow(
      "Erro ao buscar monthlyExpense",
    );
  });
});

describe("monthlyIncome", () => {
  it("deve chamar o endpoint monthlyIncome correto", async () => {
    vi.mocked(api.get).mockResolvedValue({
      data: 2000,
    });

    await monthlyIncome();

    expect(api.get).toHaveBeenCalledWith("/api/dashboard/monthly_income/");
  });

  it("deve retornar os dados recebidos da API monthlyIncome", async () => {
    const monthly_income = 1000;
    vi.mocked(api.get).mockResolvedValue({
      data: monthly_income,
    });

    const result = await monthlyIncome();

    expect(result).toEqual(monthly_income);
  });

  it("deve propagar o erro quando a API monthlyIncome falhar", async () => {
    const error = new Error("Erro ao buscar monthlyIncome");

    vi.mocked(api.get).mockRejectedValue(error);

    await expect(monthlyIncome()).rejects.toThrow(
      "Erro ao buscar monthlyIncome",
    );
  });
});

describe("totalBalance", () => {
  it("deve chamar o endpoint totalBalance correto", async () => {
    vi.mocked(api.get).mockResolvedValue({
      data: 10000,
    });

    await totalBalance();

    expect(api.get).toHaveBeenCalledWith("/api/dashboard/total-balance/");
  });

  it("deve retornar os dados recebidos da API totalBalance", async () => {
    const total_balance = 10000;
    vi.mocked(api.get).mockResolvedValue({
      data: total_balance,
    });

    const result = await totalBalance();

    expect(result).toEqual(total_balance);
  });

  it("deve propagar o erro quando a API totalBalance falhar", async () => {
    const error = new Error("Erro ao buscar totalBalance");

    vi.mocked(api.get).mockRejectedValue(error);

    await expect(totalBalance()).rejects.toThrow("Erro ao buscar totalBalance");
  });
});
