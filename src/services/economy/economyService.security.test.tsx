// @vitest-environment node

import { describe, it, expect, beforeAll, afterAll, vi } from "vitest";
import dotenv from "dotenv";
dotenv.config({ path: ".env.test.local" });
import { api } from "../api";
import {
  getTotalBalanceFiltered,
  getFilteredExpenseCategories,
  getTopExpensesFiltered,
} from "./economyService";

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

describe("Isolamento de dados - getTotalBalanceFiltered", () => {
  it("deve retornar apenas o totalBalanceFiltered do usuário 1", async () => {
    sessionStorage.setItem("access_token", tokenUser1);

    const result = await getTotalBalanceFiltered();

    expect(result).toEqual({
      total_balance: 37000,
    });
  });

  it("deve retornar apenas o totalBalanceFiltered do usuário 2", async () => {
    sessionStorage.setItem("access_token", tokenUser2);

    const result = await getTotalBalanceFiltered();

    expect(result).toEqual({
      total_balance: 80000,
    });
  });

  it("não deve retornar o totalBalanceFiltered do usuário 1 quando autenticado como usuário 2", async () => {
    sessionStorage.setItem("access_token", tokenUser2);

    const result = await getTotalBalanceFiltered();

    expect(result).not.toEqual({
      total_balance: 37000,
    });
    expect(result).toEqual({
      total_balance: 80000,
    });
  });
});

describe("Isolamento de dados - getFilteredExpenseCategories", () => {
  it("deve retornar apenas as categorias de despesas do usuário 1", async () => {
    sessionStorage.setItem("access_token", tokenUser1);

    const result = await getFilteredExpenseCategories();
    const expense = result.categories[0];
    expect(expense).toEqual({
      category: "Housing",
      count: 14,
      percentage: 58.16,
      total_amount: 11454.15,
    });
  });

  it("deve retornar apenas as categorias de despesas do usuário 2", async () => {
    sessionStorage.setItem("access_token", tokenUser2);

    const result = await getFilteredExpenseCategories();
    const expense = result.categories[0];

    expect(expense).toEqual({
      category: "Housing",
      count: 15,
      percentage: 53.25,
      total_amount: 11494.05,
    });
  });

  it("não deve retornar as categorias do usuário 1 quando autenticado como usuário 2", async () => {
    sessionStorage.setItem("access_token", tokenUser2);

    const result = await getFilteredExpenseCategories();

    expect(result.categories[0]).not.toEqual({
      category: "Housing",
      count: 14,
      percentage: 58.16,
      total_amount: 11454.15,
    });

    expect(result.categories[0]).toEqual({
      category: "Housing",
      count: 15,
      percentage: 53.25,
      total_amount: 11494.05,
    });
  });

  it("não deve retornar as categorias do usuário 2 quando autenticado como usuário 1", async () => {
    sessionStorage.setItem("access_token", tokenUser1);

    const result = await getFilteredExpenseCategories();

    expect(result.categories[0]).not.toEqual({
      category: "Housing",
      count: 15,
      percentage: 53.25,
      total_amount: 11494.05,
    });

    expect(result.categories[0]).toEqual({
      category: "Housing",
      count: 14,
      percentage: 58.16,
      total_amount: 11454.15,
    });
  });
});

describe("Isolamento de dados - getTopExpensesFiltered", () => {
  it("deve retornar apenas os estabelecimentos do usuário 1", async () => {
    sessionStorage.setItem("access_token", tokenUser1);

    const result = await getTopExpensesFiltered();

    expect(result.top_expenses[0]).toEqual({
      category: "Housing",
      store: "Imobiliária Central",
      frequency: 7,
      total_amount: 10150,
    });
  });

  it("deve retornar apenas os estabelecimentos do usuário 2", async () => {
    sessionStorage.setItem("access_token", tokenUser2);

    const result = await getTopExpensesFiltered();

    expect(result.top_expenses[0]).toEqual({
      category: "Housing",
      store: "Imobiliária Central",
      total_amount: 10150,
      frequency: 7,
    });
  });

  it("não deve retornar os estabelecimentos do usuário 1 quando autenticado como usuário 2", async () => {
    sessionStorage.setItem("access_token", tokenUser2);

    const result = await getTopExpensesFiltered();

    expect(result.top_expenses).not.toContainEqual(
      expect.objectContaining({
        store: "Supermercado",
      }),
    );

    expect(result.top_expenses).not.toContainEqual(
      expect.objectContaining({
        store: "Posto de gasolina",
      }),
    );
  });

  it("deve manter o isolamento de dados ao filtrar por conta e período", async () => {
    sessionStorage.setItem("access_token", tokenUser2);

    const result = await getTopExpensesFiltered("Nubank", ["September 2026"]);

    expect(result.top_expenses[0]).toEqual({
      store: "Imobiliária Central",
      category: "Housing",
      total_amount: 1450,
      frequency: 1,
    });
  });

  it("não deve retornar os estabelecimentos do usuário 2 quando autenticado como usuário 1", async () => {
    sessionStorage.setItem("access_token", tokenUser1);

    const result = await getTopExpensesFiltered();

    expect(result.top_expenses).not.toContainEqual(
      expect.objectContaining({
        store: "Farmácia",
      }),
    );
  });
});
