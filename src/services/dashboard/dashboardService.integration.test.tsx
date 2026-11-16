// @vitest-environment node

import { describe, it, expect, beforeEach, vi } from "vitest";
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
import { afterEach } from "node:test";

// Simula somente o sessionStorage para o interceptor
const storage = new Map<string, string>();

vi.stubGlobal("sessionStorage", {
  getItem: (key: string) => storage.get(key) ?? null,
  setItem: (key: string, value: string) => storage.set(key, String(value)),
  removeItem: (key: string) => storage.delete(key),
});

beforeEach(async () => {
  const response = await api.post("/api/token/", {
    username: process.env.TEST_USERNAME,
    password: process.env.TEST_PASSWORD,
  });

  sessionStorage.setItem("access_token", response.data.access);
});

beforeEach(async () => {
  const response = await api.post("/api/token/", {
    username: process.env.TEST_USERNAME2,
    password: process.env.TEST_PASSWORD2,
  });

  sessionStorage.setItem("access_token2", response.data.access);
});

afterEach(() => {
  sessionStorage.removeItem("access_token");
  sessionStorage.removeItem("refresh_token");
  vi.unstubAllGlobals();
});

describe("Integração - totalBalance", () => {
  it("deve consultar o backend e retornar o saldo total_balance correto", async () => {
    const result = await totalBalance();

    expect(result).toEqual({ total_balance: 37000 });
  });

  it("deve retornar um objeto com a chave total_balance em um valor numérico finito", async () => {
    const result = await totalBalance();

    expect(result).toHaveProperty("total_balance");
    expect(result.total_balance).toEqual(expect.any(Number));
    expect(Number.isFinite(result.total_balance)).toBe(true);
  });

  it("deve rejeitar a requisição quando não houver token", async () => {
    sessionStorage.removeItem("access_token");

    await expect(totalBalance()).rejects.toMatchObject({
      response: {
        status: 401,
      },
    });
  });
});

describe("Integração - monthlyIncome", () => {
  it("deve consultar o backend e retornar o saldo monthlyIncome correto", async () => {
    const result = await monthlyIncome();

    expect(result).toEqual({ monthly_income: 17552.0 });
  });

  it("deve retornar um objeto com a chave monthlyIncome e um valor numérico finito", async () => {
    const result = await monthlyIncome();

    expect(result).toHaveProperty("monthly_income");
    expect(result.monthly_income).toEqual(expect.any(Number));
    expect(Number.isFinite(result.monthly_income)).toBe(true);
  });

  it("deve rejeitar a requisição quando não houver token", async () => {
    sessionStorage.removeItem("access_token");

    await expect(monthlyIncome()).rejects.toMatchObject({
      response: {
        status: 401,
      },
    });
  });
});

describe("Integração - monthlyExpense", () => {
  it("deve consultar o backend e retornar o saldo monthlyExpense correto", async () => {
    const result = await monthlyExpense();

    expect(result).toEqual({ monthly_expense: 3201.0 });
  });

  it("deve retornar um objeto com a chave monthlyExpense e um valor numérico finito", async () => {
    const result = await monthlyExpense();

    expect(result).toHaveProperty("monthly_expense");
    expect(result.monthly_expense).toEqual(expect.any(Number));
    expect(Number.isFinite(result.monthly_expense)).toBe(true);
  });

  it("deve rejeitar a requisição quando não houver token", async () => {
    sessionStorage.removeItem("access_token");

    await expect(monthlyExpense()).rejects.toMatchObject({
      response: {
        status: 401,
      },
    });
  });
});

describe("Integração - monthlySummary", () => {
  it("deve consultar o backend e retornar o saldo monthlySummary correto", async () => {
    const result = await monthlySummary();

    expect(result).toEqual(
      expect.arrayContaining([{ expense: 3201, income: 17552, label: "11" }]),
    );
  });

  it("deve retornar um objeto com a chave monthlySummary e um valor numérico finito", async () => {
    const result = await monthlySummary();

    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toBeGreaterThan(0);

    result.forEach((summary) => {
      expect(summary).toHaveProperty("label");
      expect(summary.income).toEqual(expect.any(Number));
      expect(Number.isFinite(summary.income)).toBe(true);
      expect(summary.expense).toEqual(expect.any(Number));
      expect(Number.isFinite(summary.expense)).toBe(true);
    });
  });

  it("deve rejeitar a requisição quando não houver token", async () => {
    sessionStorage.removeItem("access_token");

    await expect(monthlySummary()).rejects.toMatchObject({
      response: {
        status: 401,
      },
    });
  });
});

describe("Integração - expenseCategories", () => {
  it("deve consultar o backend e retornar o saldo expenseCategories correto", async () => {
    const result = await expenseCategories();

    expect(result).toEqual(
      expect.arrayContaining([{ category: "Entertainment", count: 6 }]),
    );
  });

  it("deve retornar um objeto com a chave expenseCategories e um valor numérico finito", async () => {
    const result = await expenseCategories();

    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toBeGreaterThan(0);

    result.forEach((category) => {
      expect(category).toHaveProperty("category");
      expect(category.count).toEqual(expect.any(Number));
      expect(Number.isFinite(category.count)).toBe(true);
    });
  });

  it("deve rejeitar a requisição quando não houver token", async () => {
    sessionStorage.removeItem("access_token");

    await expect(expenseCategories()).rejects.toMatchObject({
      response: {
        status: 401,
      },
    });
  });
});

describe("Integração - getRecentTransactions", () => {
  it("deve consultar o backend e retornar o saldo getRecentTransactions correto", async () => {
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

  it("deve retornar um objeto com a chave getRecentTransactions e um valor numérico finito", async () => {
    const result = await getRecentTransactions();

    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toBeGreaterThan(0);

    result.forEach((transaction) => {
      expect(transaction).toHaveProperty("category");
      expect(transaction).toHaveProperty("description");
      expect(transaction).toHaveProperty("date");
      expect(transaction).toHaveProperty("type");

      expect(transaction.id).toEqual(expect.any(Number));
      expect(Number.isFinite(transaction.amount)).toBe(true);
    });
  });

  it("deve rejeitar a requisição quando não houver token", async () => {
    sessionStorage.removeItem("access_token");

    await expect(getRecentTransactions()).rejects.toMatchObject({
      response: {
        status: 401,
      },
    });
  });
});

describe("Integração - getGoals", () => {
  it("deve consultar o backend e retornar o saldo getGoals correto", async () => {
    const result = await getGoals();

    expect(result).toEqual(
      expect.arrayContaining([
        { name: "Carro", objective: 50000, saved: 5000 },
      ]),
    );
  });

  it("deve retornar um objeto com a chave getGoals e um valor numérico finito", async () => {
    const result = await getGoals();

    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toBeGreaterThan(0);

    result.forEach((goals) => {
      expect(goals).toHaveProperty("name");

      expect(goals.saved).toEqual(expect.any(Number));
      expect(goals.objective).toEqual(expect.any(Number));
      expect(Number.isFinite(goals.saved)).toBe(true);
      expect(Number.isFinite(goals.objective)).toBe(true);
    });
  });

  it("deve rejeitar a requisição quando não houver token", async () => {
    sessionStorage.removeItem("access_token");

    await expect(getGoals()).rejects.toMatchObject({
      response: {
        status: 401,
      },
    });
  });
});

describe("Integração - lastMonthlyIncome", () => {
  it("deve consultar o backend e retornar a renda do último mês", async () => {
    const result = await lastMonthlyIncome();

    expect(result).toHaveProperty("last_monthly_income");
    expect(result).toEqual({ last_monthly_income: 17552 });
  });

  it("deve retornar um valor numérico finito", async () => {
    const result = await lastMonthlyIncome();

    expect(result.last_monthly_income).toEqual(expect.any(Number));
    expect(Number.isFinite(result.last_monthly_income)).toBe(true);
  });

  it("deve rejeitar a requisição quando não houver token", async () => {
    sessionStorage.removeItem("access_token");

    await expect(lastMonthlyIncome()).rejects.toMatchObject({
      response: { status: 401 },
    });
  });
});

describe("Integração - lastMonthlyExpense", () => {
  it("deve consultar o backend e retornar a despesa do último mês", async () => {
    const result = await lastMonthlyExpense();

    expect(result).toHaveProperty("last_monthly_expense");
    expect(result).toEqual({ last_monthly_expense: 3036.9 });
  });

  it("deve retornar um valor numérico finito", async () => {
    const result = await lastMonthlyExpense();

    expect(result.last_monthly_expense).toEqual(expect.any(Number));
    expect(Number.isFinite(result.last_monthly_expense)).toBe(true);
  });

  it("deve rejeitar a requisição quando não houver token", async () => {
    sessionStorage.removeItem("access_token");

    await expect(lastMonthlyExpense()).rejects.toMatchObject({
      response: { status: 401 },
    });
  });
});

describe("Integração - getTotalAccounts", () => {
  it("deve consultar o backend e retornar o total de contas", async () => {
    const result = await getTotalAccounts();

    expect(result).toHaveProperty("total_accounts");
    expect(result).toEqual({ total_accounts: 2 });
  });

  it("deve retornar um total numérico finito", async () => {
    const result = await getTotalAccounts();

    expect(result.total_accounts).toEqual(expect.any(Number));
    expect(Number.isFinite(result.total_accounts)).toBe(true);
  });

  it("deve rejeitar a requisição quando não houver token", async () => {
    sessionStorage.removeItem("access_token");

    await expect(getTotalAccounts()).rejects.toMatchObject({
      response: { status: 401 },
    });
  });
});

describe("Integração - getUserName", () => {
  it("deve consultar o backend e retornar o nome do usuário", async () => {
    const result = await getUserName();

    expect(result).toHaveProperty("user_name");
    expect(result).toEqual({ user_name: "Rodrigo" });
  });

  it("deve retornar um nome não vazio", async () => {
    const result = await getUserName();

    expect(typeof result.user_name).toBe("string");
    expect(result.user_name.trim().length).toBeGreaterThan(0);
  });

  it("deve rejeitar a requisição quando não houver token", async () => {
    sessionStorage.removeItem("access_token");

    await expect(getUserName()).rejects.toMatchObject({
      response: { status: 401 },
    });
  });
});
