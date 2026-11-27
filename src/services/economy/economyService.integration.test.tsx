// @vitest-environment node

import { describe, it, expect, beforeEach, vi } from "vitest";
import dotenv from "dotenv";
dotenv.config({ path: ".env.test.local" });
import { api } from "../api";
import { afterEach } from "node:test";
import {
  getFilteredExpenseCategories,
  getTotalBalanceFiltered,
  getTopExpensesFiltered,
} from "./economyService";

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

describe("Integração - getTotalBalanceFiltered", () => {
  it("deve consultar o backend e retornar o total balance", async () => {
    const result = await getTotalBalanceFiltered();

    expect(result).toEqual({
      total_balance: 37000,
    });
  });

  it("deve consultar o backend e retornar o total balance filtered por account", async () => {
    const result = await getTotalBalanceFiltered("Banco do Brasil");

    expect(result).toEqual({
      total_balance: 12000,
    });
  });

  it("deve retornar um objecto com as propriedas esperadas", async () => {
    const result = await getTotalBalanceFiltered();

    expect(result).toHaveProperty("total_balance");

    expect(Number.isFinite(result.total_balance)).toBe(true);
  });

  it("deve rejeitar a requisição quando não houver token", async () => {
    sessionStorage.removeItem("access_token");
    sessionStorage.removeItem("refresh_token");

    await expect(getTotalBalanceFiltered()).rejects.toMatchObject({
      response: {
        status: 401,
      },
    });
  });
});

describe("Integração - getFilteredExpenseCategories", () => {
  it("deve retornar todas as categorias quando não informar períodos", async () => {
    const result = await getFilteredExpenseCategories();

    expect(result).toHaveProperty("categories");
    expect(Array.isArray(result.categories)).toBe(true);

    expect(result.categories.length).toBeGreaterThan(0);
  });

  it("deve filtrar despesas de um único período", async () => {
    const result = await getFilteredExpenseCategories(undefined, [
      "September 2026",
    ]);

    expect(result).toHaveProperty("categories");

    expect(result.categories.length).toBeGreaterThan(0);
  });

  it("deve filtrar despesas de vários períodos", async () => {
    const result = await getFilteredExpenseCategories(undefined, [
      "September 2026",
      "October 2026",
    ]);

    expect(result).toHaveProperty("categories");
    expect(Array.isArray(result.categories)).toBe(true);

    expect(result.categories.length).toBeGreaterThan(0);
  });

  it("deve retornar todas as categorias quando receber uma lista vazia", async () => {
    const result = await getFilteredExpenseCategories(undefined, []);

    expect(result).toHaveProperty("categories");
    expect(Array.isArray(result.categories)).toBe(true);
  });

  it("deve retornar um objeto com as propriedades esperadas", async () => {
    const result = await getFilteredExpenseCategories();

    result.categories.forEach((category) => {
      expect(category).toHaveProperty("category");
      expect(category).toHaveProperty("count");
      expect(category).toHaveProperty("total_amount");
      expect(category).toHaveProperty("percentage");

      expect(typeof category.category).toBe("string");
      expect(Number.isFinite(category.count)).toBe(true);
      expect(Number.isFinite(category.total_amount)).toBe(true);
      expect(Number.isFinite(category.percentage)).toBe(true);
    });
  });

  it("deve retornar valores numéricos válidos", async () => {
    const result = await getFilteredExpenseCategories();

    result.categories.forEach((category) => {
      expect(category.count).toBeGreaterThanOrEqual(0);
      expect(category.total_amount).toBeGreaterThanOrEqual(0);
      expect(category.percentage).toBeGreaterThanOrEqual(0);
      expect(category.percentage).toBeLessThanOrEqual(100);
    });
  });

  it("deve retornar o valor correto das categorias", async () => {
    const result = await getFilteredExpenseCategories();

    const foodCategory = result.categories.find(
      (category) => category.category === "Food",
    );

    expect(foodCategory).toBeDefined();
    expect(foodCategory?.count).toBe(10);
    expect(foodCategory?.total_amount).toBe(1618.2);
  });

  it("deve rejeitar a requisição quando não houver token", async () => {
    sessionStorage.removeItem("access_token");
    sessionStorage.removeItem("refresh_token");

    await expect(getFilteredExpenseCategories()).rejects.toMatchObject({
      response: {
        status: 401,
      },
    });
  });
});

describe("Integração - getTopExpensesFiltered", () => {
  it("deve retornar todas as despesas agrupadas por estabelecimento quando não informar filtros", async () => {
    const result = await getTopExpensesFiltered();

    expect(result).toHaveProperty("top_expenses");
    expect(Array.isArray(result.top_expenses)).toBe(true);
  });

  it("deve filtrar despesas por conta", async () => {
    const result = await getTopExpensesFiltered("Nubank");

    expect(result).toHaveProperty("top_expenses");
    expect(Array.isArray(result.top_expenses)).toBe(true);

    // A consulta deve retornar somente estabelecimentos
    // associados à conta informada.
  });

  it("deve filtrar despesas por um único período", async () => {
    const result = await getTopExpensesFiltered(undefined, ["September 2026"]);

    expect(result).toHaveProperty("top_expenses");
    expect(Array.isArray(result.top_expenses)).toBe(true);
  });

  it("deve filtrar despesas por vários períodos", async () => {
    const result = await getTopExpensesFiltered(undefined, [
      "September 2026",
      "October 2026",
    ]);

    expect(result).toHaveProperty("top_expenses");
    expect(Array.isArray(result.top_expenses)).toBe(true);
  });

  it("deve retornar todas as despesas quando receber uma lista de períodos vazia", async () => {
    const result = await getTopExpensesFiltered(undefined, []);

    expect(result).toHaveProperty("top_expenses");
    expect(Array.isArray(result.top_expenses)).toBe(true);
  });

  it("deve retornar objetos com as propriedades esperadas", async () => {
    const result = await getTopExpensesFiltered();

    result.top_expenses.forEach((expense) => {
      expect(expense).toHaveProperty("store");
      expect(expense).toHaveProperty("category");
      expect(expense).toHaveProperty("total_amount");
      expect(expense).toHaveProperty("frequency");

      expect(typeof expense.store).toBe("string");
      expect(typeof expense.category).toBe("string");
      expect(Number.isFinite(expense.total_amount)).toBe(true);
      expect(Number.isFinite(expense.frequency)).toBe(true);
    });
  });

  it("deve retornar os estabelecimentos ordenados pelo maior valor de despesas", async () => {
    const result = await getTopExpensesFiltered();

    for (let i = 0; i < result.top_expenses.length - 1; i++) {
      expect(result.top_expenses[i].total_amount).toBeGreaterThanOrEqual(
        result.top_expenses[i + 1].total_amount,
      );
    }
  });

  it("deve retornar os valores corretos agrupados por estabelecimento", async () => {
    const result = await getTopExpensesFiltered();

    const expense = result.top_expenses[0];

    expect(expense).toEqual({
      store: "Imobiliária Central",
      category: "Housing",
      total_amount: 10150.0,
      frequency: 7,
    });
  });

  it("deve rejeitar a requisição quando não houver token", async () => {
    sessionStorage.removeItem("access_token");
    sessionStorage.removeItem("refresh_token");

    await expect(getTopExpensesFiltered()).rejects.toMatchObject({
      response: {
        status: 401,
      },
    });
  });

  it("deve filtrar despesas por conta e período", async () => {
    const result = await getTopExpensesFiltered("Nubank", ["September 2026"]);

    expect(result).toHaveProperty("top_expenses");
    expect(Array.isArray(result.top_expenses)).toBe(true);
  });
});
