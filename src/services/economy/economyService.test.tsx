import { describe, it, expect, vi, beforeEach } from "vitest";
import { api } from "../api";
import {
  getFilteredExpenseCategories,
  getTopExpensesFiltered,
  getTotalBalanceFiltered,
} from "./economyService";

vi.mock("../api", () => ({
  api: {
    get: vi.fn(),
  },
}));

beforeEach(() => vi.clearAllMocks());

describe("getTotalBalanceFiltered", () => {
  it("deve chamar o endpoint getTotalBalanceFiltered correto", async () => {
    vi.mocked(api.get).mockResolvedValue({ data: [] });
    await getTotalBalanceFiltered("");

    expect(api.get).toHaveBeenCalledWith("/api/economy/balance_filtered/", {
      params: {
        account: undefined,
      },
    });
  });

  it("deve passar account como parâmetro", async () => {
    const account = "Banco do Brasil";
    vi.mocked(api.get).mockResolvedValue({ data: [] });

    await getTotalBalanceFiltered(account);

    expect(api.get).toHaveBeenCalledWith("/api/economy/balance_filtered/", {
      params: {
        account: "Banco do Brasil",
      },
    });
  });

  it("deve retornar os dados recebidos da API getTotalBalanceFiltered", async () => {
    const total_balance = 10000;
    vi.mocked(api.get).mockResolvedValue({ data: total_balance });

    const result = await getTotalBalanceFiltered();
    expect(result).toEqual(total_balance);
  });

  it("deve propagar o erro quando a API getTotalBalanceFiltered falhar", async () => {
    const error = new Error("Erro ao buscar balance filtered");
    vi.mocked(api.get).mockRejectedValue(error);

    await expect(getTotalBalanceFiltered()).rejects.toThrow(
      "Erro ao buscar balance filtered",
    );
  });
});

describe("getFilteredExpenseCategories", () => {
  it("deve chamar o endpoint com parâmetros vazios como undefined", async () => {
    vi.mocked(api.get).mockResolvedValue({ data: [] });

    await getFilteredExpenseCategories();

    expect(api.get).toHaveBeenCalledWith("/api/economy/expense_categories/", {
      params: {
        account: undefined,
        periods: undefined,
      },
    });
  });

  it("deve passar account e períodos separados por vírgula", async () => {
    vi.mocked(api.get).mockResolvedValue({ data: [] });

    await getFilteredExpenseCategories("Banco do Brasil", [
      "2024-01",
      "2024-02",
    ]);

    expect(api.get).toHaveBeenCalledWith("/api/economy/expense_categories/", {
      params: {
        account: "Banco do Brasil",
        periods: "2024-01,2024-02",
      },
    });
  });

  it("deve retornar os dados recebidos da API", async () => {
    const categories = [{ name: "Alimentação", total: 250 }];
    vi.mocked(api.get).mockResolvedValue({ data: categories });

    const result = await getFilteredExpenseCategories();

    expect(result).toEqual(categories);
  });

  it("deve propagar o erro quando a API falhar", async () => {
    const error = new Error("Erro ao buscar categorias de despesas");
    vi.mocked(api.get).mockRejectedValue(error);

    await expect(getFilteredExpenseCategories()).rejects.toThrow(
      "Erro ao buscar categorias de despesas",
    );
  });
});

describe("getTopExpensesFiltered", () => {
  it("deve chamar o endpoint com parâmetros vazios como undefined", async () => {
    vi.mocked(api.get).mockResolvedValue({ data: [] });

    await getTopExpensesFiltered();

    expect(api.get).toHaveBeenCalledWith("/api/economy/top_expenses/", {
      params: {
        account: undefined,
        periods: undefined,
      },
    });
  });

  it("deve passar account e períodos separados por vírgula", async () => {
    vi.mocked(api.get).mockResolvedValue({ data: [] });

    await getTopExpensesFiltered("Banco do Brasil", ["2024-01", "2024-02"]);

    expect(api.get).toHaveBeenCalledWith("/api/economy/top_expenses/", {
      params: {
        account: "Banco do Brasil",
        periods: "2024-01,2024-02",
      },
    });
  });

  it("deve retornar os dados recebidos da API", async () => {
    const topExpenses = [{ name: "Alimentação", total: 250 }];
    vi.mocked(api.get).mockResolvedValue({ data: topExpenses });

    const result = await getTopExpensesFiltered();

    expect(result).toEqual(topExpenses);
  });

  it("deve propagar o erro quando a API falhar", async () => {
    const error = new Error("Erro ao buscar maiores despesas");
    vi.mocked(api.get).mockRejectedValue(error);

    await expect(getTopExpensesFiltered()).rejects.toThrow(
      "Erro ao buscar maiores despesas",
    );
  });
});
