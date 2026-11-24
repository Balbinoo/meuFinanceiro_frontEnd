// @vitest-environment node

import { describe, it, expect, beforeAll, afterAll, vi } from "vitest";
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

describe("Isolamento de dados - getAllTransactions", () => {
  it("deve retornar somente as transações do usuário 1", async () => {
    sessionStorage.setItem("access_token", tokenUser1);

    const result = await getAllTransactions();

    expect(result.results.length).toBeGreaterThan(0);

    expect(
      result.results.every(
        (transaction) => transaction.account_name === "Banco do Brasil",
      ),
    ).toBe(true);
  });

  it("deve retornar somente as transações do usuário 2", async () => {
    sessionStorage.setItem("access_token", tokenUser2);

    const result = await getAllTransactions();

    const user2Accounts = ["Caixa", "Nubank", "Inter"];

    expect(result.results.length).toBeGreaterThan(0);

    expect(
      result.results.every((transaction) =>
        user2Accounts.includes(transaction.account_name),
      ),
    ).toBe(true);
  });

  it("não deve retornar transações do usuário 2 para o usuário 1", async () => {
    sessionStorage.setItem("access_token", tokenUser1);

    const result = await getAllTransactions();

    const user2Transactions = result.results.filter(
      (transaction) => transaction.account_name in ["Caixa", "Nubank", "Inter"],
    );

    expect(user2Transactions).toHaveLength(0);
  });

  it("não deve retornar transações do usuário 1 para o usuário 2", async () => {
    sessionStorage.setItem("access_token", tokenUser2);

    const result = await getAllTransactions();

    const user1Transactions = result.results.filter(
      (transaction) => transaction.account_name === "Banco do Brasil",
    );

    expect(user1Transactions).toHaveLength(0);
  });
});

describe("Isolamento de dados - get_accounts_list", () => {
  it("deve retornar somente o get_accounts_list do usuário 1", async () => {
    sessionStorage.setItem("access_token", tokenUser1);

    const result = await get_accounts_list();

    expect(result).toEqual({ accounts_list: ["Banco do Brasil", "Rico"] });
  });

  it("deve retornar somente o get_accounts_list do usuário 2", async () => {
    sessionStorage.setItem("access_token", tokenUser2);

    const result = await get_accounts_list();

    expect(result).toEqual({ accounts_list: ["Caixa", "Nubank", "Inter"] });
  });

  it("não deve retornar o get_accounts_list do usuário 1 quando autenticado como usuário 2", async () => {
    sessionStorage.setItem("access_token", tokenUser2);

    const result = await get_accounts_list();

    expect(result).not.toEqual({ accounts_list: ["Banco do Brasil", "Rico"] });
    expect(result).toEqual({ accounts_list: ["Caixa", "Nubank", "Inter"] });
  });
});

describe("Isolamento de dados - get_five_months_list", () => {
  it("deve retornar somente o get_five_months_list do usuário 1", async () => {
    sessionStorage.setItem("access_token", tokenUser1);

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

  it("deve retornar somente o get_five_months_list do usuário 2", async () => {
    sessionStorage.setItem("access_token", tokenUser2);

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
  it("deve retornar a mesma classificação para os dois usuários", async () => {
    sessionStorage.setItem("access_token", tokenUser1);
    const resultUser1 = await get_five_months_list();

    sessionStorage.setItem("access_token", tokenUser2);
    const resultUser2 = await get_five_months_list();

    expect(resultUser1).toEqual(resultUser2);
  });
});

describe("Isolamento de dados - get_categories", () => {
  it("deve retornar somente o get_categories do usuário 1", async () => {
    sessionStorage.setItem("access_token", tokenUser1);

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

  it("deve retornar somente o get_five_months_list do usuário 2", async () => {
    sessionStorage.setItem("access_token", tokenUser2);

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
  it("deve retornar as mesmas categorias para os dois usuários", async () => {
    sessionStorage.setItem("access_token", tokenUser1);
    const resultUser1 = await get_categories();

    sessionStorage.setItem("access_token", tokenUser2);
    const resultUser2 = await get_categories();

    expect(resultUser1).toEqual(resultUser2);
  });
});

describe("Isolamento de dados - get_income_filtered", () => {
  it("deve retornar somente o get_income_filtered do usuário 1", async () => {
    sessionStorage.setItem("access_token", tokenUser1);

    const result = await get_income_filtered();

    expect(result).toEqual({
      counted: 14,
      total_income: 122864,
    });
  });

  it("deve retornar somente o get_income_filtered do usuário 2", async () => {
    sessionStorage.setItem("access_token", tokenUser2);

    const result = await get_income_filtered();

    expect(result).toEqual({
      counted: 14,
      total_income: 121265,
    });
  });

  it("não deve retornar o get_income_filtered do usuário 1 quando autenticado como usuário 2", async () => {
    sessionStorage.setItem("access_token", tokenUser2);

    const result = await get_income_filtered();

    expect(result).not.toEqual({
      counted: 14,
      total_income: 122864,
    });
    expect(result).toEqual({
      counted: 14,
      total_income: 121265,
    });
  });
});

describe("Isolamento de dados - get_expense_filtered", () => {
  it("deve retornar somente o get_expense_filtered do usuário 1", async () => {
    sessionStorage.setItem("access_token", tokenUser1);

    const result = await get_expense_filtered();

    expect(result).toEqual({
      counted: 68,
      total_expense: 19693.7,
    });
  });

  it("deve retornar somente o get_expense_filtered do usuário 2", async () => {
    sessionStorage.setItem("access_token", tokenUser2);

    const result = await get_expense_filtered();

    expect(result).toEqual({
      counted: 73,
      total_expense: 21584.1,
    });
  });

  it("não deve retornar o get_expense_filtered do usuário 1 quando autenticado como usuário 2", async () => {
    sessionStorage.setItem("access_token", tokenUser2);

    const result = await get_expense_filtered();

    expect(result).not.toEqual({
      counted: 68,
      total_expense: 19693.7,
    });
    expect(result).toEqual({
      counted: 73,
      total_expense: 21584.1,
    });
  });
});
