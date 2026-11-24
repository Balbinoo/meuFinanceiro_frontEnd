// @vitest-environment node

import { describe, it, expect, beforeEach, vi } from "vitest";
import dotenv from "dotenv";
dotenv.config({ path: ".env.test.local" });
import { api } from "../api";
import {
  get_accounts_list,
  get_categories,
  get_expense_filtered,
  get_five_months_list,
  get_income_filtered,
  getAllTransactions,
} from "./transactionsService";
import { afterEach } from "node:test";

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

afterEach(() => {
  sessionStorage.removeItem("access_token");
  sessionStorage.removeItem("refresh_token");
  vi.unstubAllGlobals();
});

describe("Integração - getAllTransactions", () => {
  it("deve consultar o backend e retornar todas as transações", async () => {
    const result = await getAllTransactions();

    expect(result).toHaveProperty("count");
    expect(result).toHaveProperty("next");
    expect(result).toHaveProperty("previous");
    expect(result).toHaveProperty("results");

    expect(Array.isArray(result.results)).toBe(true);
  });

  it("deve retornar a quantidade correta de transações", async () => {
    const result = await getAllTransactions();

    expect(result.count).toBe(82);
  });

  it("deve retornar somente receitas quando transaction_type for income", async () => {
    const result = await getAllTransactions(
      1,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      "income",
    );

    expect(result.results.length).toBeGreaterThan(0);

    result.results.forEach((transaction) => {
      expect(transaction.transaction_type).toBe("income");
    });
  });

  it("deve retornar somente despesas quando transaction_type for expense", async () => {
    const result = await getAllTransactions(
      1,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      "expense",
    );

    expect(result.results.length).toBeGreaterThan(0);

    result.results.forEach((transaction) => {
      expect(transaction.transaction_type).toBe("expense");
    });
  });

  it("deve retornar receitas e despesas quando transaction_type for all", async () => {
    const result = await getAllTransactions(
      1,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      "all",
    );

    const types = result.results.map(
      (transaction) => transaction.transaction_type,
    );

    expect(types).toEqual(expect.arrayContaining(["income", "expense"]));
  });

  it("deve filtrar transações por categoria", async () => {
    const result = await getAllTransactions(1, "Food");

    expect(result.results.length).toBeGreaterThan(0);

    result.results.forEach((transaction) => {
      expect(transaction.category).toBe("Food");
    });
  });

  it("deve filtrar transações por conta", async () => {
    const result = await getAllTransactions(1, undefined, "Banco do Brasil");

    expect(result.results.length).toBeGreaterThan(0);

    result.results.forEach((transaction) => {
      expect(transaction.account_name).toBe("Banco do Brasil");
    });
  });

  it("deve filtrar transações por período", async () => {
    const result = await getAllTransactions(
      1,
      undefined,
      undefined,
      "September 2026",
    );

    expect(result.results.length).toBeGreaterThan(0);

    result.results.forEach((transaction) => {
      expect(transaction.date.startsWith("2026-09")).toBe(true);
    });
  });

  it("deve filtrar transações por pesquisa", async () => {
    const result = await getAllTransactions(
      1,
      undefined,
      undefined,
      undefined,
      "Mercado",
    );

    expect(result.results.length).toBeGreaterThan(0);
  });

  it("deve ordenar transações pelas mais recentes", async () => {
    const result = await getAllTransactions(
      1,
      undefined,
      undefined,
      undefined,
      undefined,
      "newest",
    );

    const dates = result.results.map((transaction) =>
      new Date(transaction.date).getTime(),
    );

    expect(dates).toEqual([...dates].sort((a, b) => b - a));
  });

  it("deve ordenar transações pelas mais antigas", async () => {
    const result = await getAllTransactions(
      1,
      undefined,
      undefined,
      undefined,
      undefined,
      "oldest",
    );

    const dates = result.results.map((transaction) =>
      new Date(transaction.date).getTime(),
    );

    expect(dates).toEqual([...dates].sort((a, b) => a - b));
  });

  it("deve filtrar transações por vários períodos", async () => {
    const result = await getAllTransactions(
      1,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      ["September 2026", "October 2026"],
    );

    expect(result.results.length).toBeGreaterThan(0);

    result.results.forEach((transaction) => {
      const month = transaction.date.substring(0, 7);

      expect(["2026-09", "2026-10"]).toContain(month);
    });
  });

  it("deve retornar a página solicitada", async () => {
    const result = await getAllTransactions(2);

    expect(result).toHaveProperty("results");
    expect(result.results.length).toBeGreaterThan(0);
  });

  it("deve rejeitar a requisição quando não houver token", async () => {
    sessionStorage.removeItem("access_token");
    sessionStorage.removeItem("refresh_token");

    await expect(getAllTransactions()).rejects.toMatchObject({
      response: {
        status: 401,
      },
    });
  });
});

describe("Integração - get_accounts_list", () => {
  it("deve consultar o backend e retornar a lista de contas correta", async () => {
    const result = await get_accounts_list();

    expect(result).toEqual({
      accounts_list: ["Banco do Brasil", "Rico"],
    });
  });

  it("deve retornar um objeto contendo a propriedade accounts_list", async () => {
    const result = await get_accounts_list();

    expect(result).toHaveProperty("accounts_list");
    expect(Array.isArray(result.accounts_list)).toBe(true);
  });

  it("deve rejeitar a requisição quando não houver token", async () => {
    sessionStorage.removeItem("access_token");
    sessionStorage.removeItem("refresh_token");

    await expect(get_accounts_list()).rejects.toMatchObject({
      response: {
        status: 401,
      },
    });
  });
});

describe("Integração - get_five_months_list", () => {
  it("deve consultar o backend e retornar a lista de meses correta", async () => {
    const result = await get_five_months_list();

    expect(result).toEqual({
      last_five_months: [
        "November 2026",
        "October 2026",
        "September 2026",
        "August 2026",
        "July 2026",
      ],
    });
  });

  it("deve retornar um objeto contendo a propriedade get_five_months_list", async () => {
    const result = await get_five_months_list();

    expect(result).toHaveProperty("last_five_months");
    expect(Array.isArray(result.last_five_months)).toBe(true);
  });

  it("deve rejeitar a requisição quando não houver token", async () => {
    sessionStorage.removeItem("access_token");
    sessionStorage.removeItem("refresh_token");

    await expect(get_five_months_list()).rejects.toMatchObject({
      response: {
        status: 401,
      },
    });
  });
});

describe("Integração - get_categories", () => {
  it("deve consultar o backend e retornar a lista de categorias correta", async () => {
    const result = await get_categories();

    expect(result).toEqual({
      categories_list: [
        "Food",
        "Entertainment",
        "Housing",
        "Transport",
        "Shopping",
        "Education",
        "Health",
      ],
    });
  });

  it("deve retornar um objeto contendo a propriedade get_categories", async () => {
    const result = await get_categories();

    expect(result).toHaveProperty("categories_list");
    expect(Array.isArray(result.categories_list)).toBe(true);
  });

  it("deve rejeitar a requisição quando não houver token", async () => {
    sessionStorage.removeItem("access_token");
    sessionStorage.removeItem("refresh_token");

    await expect(get_categories()).rejects.toMatchObject({
      response: {
        status: 401,
      },
    });
  });
});

describe("Integração - get_income_filtered", () => {
  it("deve retornar todas as receitas quando não informar períodos", async () => {
    const result = await get_income_filtered();

    expect(result).toEqual({
      counted: 14,
      total_income: 122864,
    });
  });

  it("deve filtrar receitas de um único período", async () => {
    const result = await get_income_filtered(["September 2026"]);

    expect(result).toEqual({
      counted: 2,
      total_income: 17552,
    });
  });

  it("deve filtrar receitas de vários períodos", async () => {
    const result = await get_income_filtered([
      "September 2026",
      "October 2026",
    ]);

    expect(result).toEqual({
      counted: 4,
      total_income: 35104,
    });
  });

  it("deve retornar todas as receitas quando receber uma lista vazia", async () => {
    const result = await get_income_filtered([]);

    expect(result).toEqual({
      counted: 14,
      total_income: 122864,
    });
  });

  it("deve retornar um objeto com as propriedades esperadas", async () => {
    const result = await get_income_filtered();

    expect(result).toHaveProperty("total_income");
    expect(result).toHaveProperty("counted");

    expect(Number.isFinite(result.counted)).toBe(true);
    expect(Number.isFinite(result.total_income)).toBe(true);
  });

  it("deve rejeitar a requisição quando não houver token", async () => {
    sessionStorage.removeItem("access_token");
    sessionStorage.removeItem("refresh_token");

    await expect(get_income_filtered()).rejects.toMatchObject({
      response: {
        status: 401,
      },
    });
  });
});

describe("Integração - get_expense_filtered", () => {
  it("deve retornar todas as receitas quando não informar períodos", async () => {
    const result = await get_expense_filtered();

    expect(result).toEqual({
      counted: 68,
      total_expense: 19693.7,
    });
  });

  it("deve filtrar receitas de um único período", async () => {
    const result = await get_expense_filtered(["September 2026"]);

    expect(result).toEqual({
      counted: 12,
      total_expense: 3164.9,
    });
  });

  it("deve filtrar receitas de vários períodos", async () => {
    const result = await get_expense_filtered([
      "September 2026",
      "October 2026",
    ]);

    expect(result).toEqual({
      counted: 22,
      total_expense: 6201.8,
    });
  });

  it("deve retornar todas as receitas quando receber uma lista vazia", async () => {
    const result = await get_expense_filtered([]);

    expect(result).toEqual({
      counted: 68,
      total_expense: 19693.7,
    });
  });

  it("deve retornar um objeto com as propriedades esperadas", async () => {
    const result = await get_expense_filtered();

    expect(result).toHaveProperty("total_expense");
    expect(result).toHaveProperty("counted");

    expect(Number.isFinite(result.counted)).toBe(true);
    expect(Number.isFinite(result.total_expense)).toBe(true);
  });

  it("deve rejeitar a requisição quando não houver token", async () => {
    sessionStorage.removeItem("access_token");
    sessionStorage.removeItem("refresh_token");

    await expect(get_expense_filtered()).rejects.toMatchObject({
      response: {
        status: 401,
      },
    });
  });
});
