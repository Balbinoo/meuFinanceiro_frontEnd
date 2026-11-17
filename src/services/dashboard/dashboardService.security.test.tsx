// @vitest-environment node

import { describe, it, expect, beforeAll, afterAll, vi } from "vitest";
import dotenv from "dotenv";
dotenv.config({ path: ".env.test.local" });
import { api } from "../api";
import {
  expenseCategories,
  getGoals,
  getRecentTransactions,
  getTotalAccounts,
  getUserName,
  lastMonthlyExpense,
  lastMonthlyIncome,
  monthlyExpense,
  monthlyIncome,
  monthlySummary,
  totalBalance,
} from "./dashboardService";

const storage = new Map<string, string>();

vi.stubGlobal("sessionStorage", {
  getItem: (key: string) => storage.get(key) ?? null,
  setItem: (key: string, value: string) => storage.set(key, String(value)),
  removeItem: (key: string) => storage.delete(key),
});

let tokenUser1: string;
let tokenUser2: string;

beforeAll(async () => {
  const responseUser1 = await api.post("/api/token/", {
    username: process.env.TEST_USERNAME,
    password: process.env.TEST_PASSWORD,
  });

  tokenUser1 = responseUser1.data.access;

  const responseUser2 = await api.post("/api/token/", {
    username: process.env.TEST_USERNAME2,
    password: process.env.TEST_PASSWORD2,
  });

  tokenUser2 = responseUser2.data.access;
});

afterAll(() => {
  storage.clear();
  vi.unstubAllGlobals();
});

describe("Isolamento de dados - totalBalance", () => {
  it("deve retornar somente o saldo do usuário 1", async () => {
    sessionStorage.setItem("access_token", tokenUser1);

    const result = await totalBalance();

    expect(result).toEqual({ total_balance: 37000 });
  });

  it("deve retornar somente o saldo do usuário 2", async () => {
    sessionStorage.setItem("access_token", tokenUser2);

    const result = await totalBalance();

    expect(result).toEqual({ total_balance: 80000 });
  });

  it("não deve retornar os dados do usuário 1 quando autenticado como usuário 2", async () => {
    sessionStorage.setItem("access_token", tokenUser2);

    const result = await totalBalance();

    expect(result.total_balance).not.toBe(37000);
    expect(result.total_balance).toBe(80000);
  });
});

describe("Isolamento de dados - monthlyIncome", () => {
  it("deve retornar somente o monthlyIncome do usuário 1", async () => {
    sessionStorage.setItem("access_token", tokenUser1);

    const result = await monthlyIncome();

    expect(result).toEqual({ monthly_income: 17552 });
  });

  it("deve retornar somente o monthlyIncome do usuário 2", async () => {
    sessionStorage.setItem("access_token", tokenUser2);

    const result = await monthlyIncome();

    expect(result).toEqual({ monthly_income: 16000 });
  });

  it("não deve retornar o monthlyIncome do usuário 1 quando autenticado como usuário 2", async () => {
    sessionStorage.setItem("access_token", tokenUser2);

    const result = await monthlyIncome();

    expect(result.monthly_income).not.toBe(17552);
    expect(result.monthly_income).toBe(16000);
  });
});

describe("Isolamento de dados - monthlyExpense", () => {
  it("deve retornar somente o monthlyExpense do usuário 1", async () => {
    sessionStorage.setItem("access_token", tokenUser1);

    const result = await monthlyExpense();

    expect(result).toEqual({ monthly_expense: 3201 });
  });

  it("deve retornar somente o monthlyExpense do usuário 2", async () => {
    sessionStorage.setItem("access_token", tokenUser2);

    const result = await monthlyExpense();

    expect(result).toEqual({ monthly_expense: 3227.5 });
  });

  it("não deve retornar o monthlyExpense do usuário 1 quando autenticado como usuário 2", async () => {
    sessionStorage.setItem("access_token", tokenUser2);

    const result = await monthlyExpense();

    expect(result.monthly_expense).not.toBe(3201);
    expect(result.monthly_expense).toBe(3227.5);
  });
});

describe("Isolamento de dados - monthlySummary", () => {
  it("deve retornar somente o monthlySummary do usuário 1", async () => {
    sessionStorage.setItem("access_token", tokenUser1);

    const result = await monthlySummary();

    expect(result).toEqual(
      expect.arrayContaining([{ expense: 3201, income: 17552, label: "11" }]),
    );
  });

  it("deve retornar somente o monthlySummary do usuário 2", async () => {
    sessionStorage.setItem("access_token", tokenUser2);

    const result = await monthlySummary();

    expect(result).toEqual(
      expect.arrayContaining([{ expense: 3227.5, income: 16000, label: "11" }]),
    );
  });

  it("não deve retornar o monthlySummary do usuário 1 quando autenticado como usuário 2", async () => {
    sessionStorage.setItem("access_token", tokenUser2);

    const result = await monthlySummary();

    expect(result).not.toEqual(
      expect.arrayContaining([{ expense: 3201, income: 17552, label: "11" }]),
    );
    expect(result).toEqual(
      expect.arrayContaining([{ expense: 3227.5, income: 16000, label: "11" }]),
    );
  });
});

describe("Isolamento de dados - expenseCategories", () => {
  it("deve retornar somente o expenseCategories do usuário 1", async () => {
    sessionStorage.setItem("access_token", tokenUser1);

    const result = await expenseCategories();

    expect(result).toEqual(
      expect.arrayContaining([{ category: "Entertainment", count: 6 }]),
    );
  });

  it("deve retornar somente o expenseCategories do usuário 2", async () => {
    sessionStorage.setItem("access_token", tokenUser2);

    const result = await expenseCategories();

    expect(result).toEqual(
      expect.arrayContaining([{ category: "Entertainment", count: 5 }]),
    );
  });

  it("não deve retornar o expenseCategories do usuário 1 quando autenticado como usuário 2", async () => {
    sessionStorage.setItem("access_token", tokenUser2);

    const result = await expenseCategories();

    expect(result).not.toEqual(
      expect.arrayContaining([{ category: "Entertainment", count: 6 }]),
    );
    expect(result).toEqual(
      expect.arrayContaining([{ category: "Entertainment", count: 5 }]),
    );
  });
});

describe("Isolamento de dados - getRecentTransactions", () => {
  it("deve retornar somente o getRecentTransactions do usuário 1", async () => {
    sessionStorage.setItem("access_token", tokenUser1);

    const result = await getRecentTransactions();

    expect(result).toEqual(
      expect.arrayContaining([
        {
          id: 70,
          type: "expense",
          description: "Renner",
          category: "Shopping",
          amount: 315.9,
          date: "2026-11-16",
        },
      ]),
    );
  });

  it("deve retornar somente o getRecentTransactions do usuário 2", async () => {
    sessionStorage.setItem("access_token", tokenUser2);

    const result = await getRecentTransactions();

    expect(result).toEqual(
      expect.arrayContaining([
        {
          id: 143,
          type: "expense",
          description: "Renner",
          category: "Shopping",
          amount: 315.9,
          date: "2026-11-16",
        },
      ]),
    );
  });

  it("não deve retornar o getRecentTransactions do usuário 1 quando autenticado como usuário 2", async () => {
    sessionStorage.setItem("access_token", tokenUser2);

    const result = await getRecentTransactions();

    expect(result).not.toEqual(
      expect.arrayContaining([
        {
          id: 70,
          type: "expense",
          description: "Renner",
          category: "Shopping",
          amount: 315.9,
          date: "2026-11-16",
        },
      ]),
    );
    expect(result).toEqual(
      expect.arrayContaining([
        {
          id: 143,
          type: "expense",
          description: "Renner",
          category: "Shopping",
          amount: 315.9,
          date: "2026-11-16",
        },
      ]),
    );
  });
});

describe("Isolamento de dados - getGoals", () => {
  it("deve retornar somente o getGoals do usuário 1", async () => {
    sessionStorage.setItem("access_token", tokenUser1);

    const result = await getGoals();

    expect(result).toEqual(
      expect.arrayContaining([
        { name: "Carro", objective: 50000, saved: 5000 },
      ]),
    );
  });

  it("deve retornar somente o getGoals do usuário 2", async () => {
    sessionStorage.setItem("access_token", tokenUser2);

    const result = await getGoals();

    expect(result).toEqual(
      expect.arrayContaining([
        { name: "Viagem para Paris", objective: 50000, saved: 5000 },
      ]),
    );
  });

  it("não deve retornar o getGoals do usuário 1 quando autenticado como usuário 2", async () => {
    sessionStorage.setItem("access_token", tokenUser2);

    const result = await getGoals();

    expect(result).not.toEqual(
      expect.arrayContaining([
        { name: "Carro", objective: 50000, saved: 5000 },
      ]),
    );
    expect(result).toEqual(
      expect.arrayContaining([
        { name: "Viagem para Paris", objective: 50000, saved: 5000 },
      ]),
    );
  });
});

describe("Isolamento de dados - lastMonthlyIncome", () => {
  it("deve retornar somente a renda do último mês do usuário 1", async () => {
    sessionStorage.setItem("access_token", tokenUser1);

    const result = await lastMonthlyIncome();

    expect(result).toEqual({ last_monthly_income: 17552 });
  });

  it("deve retornar somente a renda do último mês do usuário 2", async () => {
    sessionStorage.setItem("access_token", tokenUser2);

    const result = await lastMonthlyIncome();

    expect(result).toEqual({ last_monthly_income: 17505 });
  });

  it("não deve retornar a renda do usuário 1 quando autenticado como usuário 2", async () => {
    sessionStorage.setItem("access_token", tokenUser2);

    const result = await lastMonthlyIncome();

    expect(result.last_monthly_income).not.toBe(17552);
    expect(result.last_monthly_income).toBe(17505);
  });
});

describe("Isolamento de dados - lastMonthlyExpense", () => {
  it("deve retornar somente a despesa do último mês do usuário 1", async () => {
    sessionStorage.setItem("access_token", tokenUser1);

    const result = await lastMonthlyExpense();

    expect(result).toEqual({ last_monthly_expense: 3036.9 });
  });

  it("deve retornar somente a despesa do último mês do usuário 2", async () => {
    sessionStorage.setItem("access_token", tokenUser2);

    const result = await lastMonthlyExpense();

    expect(result).toEqual({ last_monthly_expense: 3057 });
  });

  it("não deve retornar a despesa do usuário 1 quando autenticado como usuário 2", async () => {
    sessionStorage.setItem("access_token", tokenUser2);

    const result = await lastMonthlyExpense();

    expect(result.last_monthly_expense).not.toBe(3036.9);
    expect(result.last_monthly_expense).toBe(3057);
  });
});

describe("Isolamento de dados - getTotalAccounts", () => {
  it("deve retornar somente o total de contas do usuário 1", async () => {
    sessionStorage.setItem("access_token", tokenUser1);

    const result = await getTotalAccounts();

    expect(result).toEqual({ total_accounts: 2 });
  });

  it("deve retornar somente o total de contas do usuário 2", async () => {
    sessionStorage.setItem("access_token", tokenUser2);

    const result = await getTotalAccounts();

    expect(result).toEqual({ total_accounts: 3 });
  });

  it("não deve retornar o total de contas do usuário 1 quando autenticado como usuário 2", async () => {
    sessionStorage.setItem("access_token", tokenUser2);

    const result = await getTotalAccounts();

    expect(result.total_accounts).not.toBe(2);
    expect(result.total_accounts).toBe(3);
  });
});

describe("Isolamento de dados - getUserName", () => {
  it("deve retornar somente o nome do usuário 1", async () => {
    sessionStorage.setItem("access_token", tokenUser1);

    const result = await getUserName();

    expect(result).toEqual({ user_name: "Rodrigo" });
  });

  it("deve retornar somente o nome do usuário 2", async () => {
    sessionStorage.setItem("access_token", tokenUser2);

    const result = await getUserName();

    expect(typeof result.user_name).toBe("string");
    expect(result).toEqual({ user_name: "Teste" });
  });

  it("não deve retornar o nome do usuário 1 quando autenticado como usuário 2", async () => {
    sessionStorage.setItem("access_token", tokenUser2);

    const result = await getUserName();

    expect(result.user_name).not.toBe("Rodrigo");
    expect(result.user_name).toBe("Teste");
  });
});
