import { describe, it, expect, vi, beforeEach } from "vitest";
import { api } from "../api";
import {
  getAllTransactions,
  get_accounts_list,
  get_five_months_list,
  get_categories,
  get_income_filtered,
  get_expense_filtered,
} from "./transactionsService";

vi.mock("../api", () => ({
  api: {
    get: vi.fn(),
  },
}));

beforeEach(() => vi.clearAllMocks());

describe("getAllTransactions", () => {
  beforeEach(() => {
    vi.mocked(api.get).mockResolvedValue({
      data: {
        count: 0,
        next: null,
        previous: null,
        results: [],
      },
    });
  });

  it("deve chamar o endpoint correto com os parâmetros padrão", async () => {
    await getAllTransactions();

    expect(api.get).toHaveBeenCalledWith("/api/transactions/all/", {
      params: {
        page: 1,
        category: undefined,
        account: undefined,
        period: undefined,
        search: undefined,
        ordering: undefined,
        transaction_type: undefined,
        periods: undefined,
      },
    });
  });

  it("deve passar o número da página corretamente", async () => {
    await getAllTransactions(3);

    expect(api.get).toHaveBeenCalledWith(
      "/api/transactions/all/",
      expect.objectContaining({
        params: expect.objectContaining({
          page: 3,
        }),
      }),
    );
  });

  it("deve passar a categoria corretamente", async () => {
    await getAllTransactions(1, "Food");

    expect(api.get).toHaveBeenCalledWith(
      "/api/transactions/all/",
      expect.objectContaining({
        params: expect.objectContaining({
          category: "Food",
        }),
      }),
    );
  });

  it("deve passar a conta corretamente", async () => {
    await getAllTransactions(1, null, "Checking");

    expect(api.get).toHaveBeenCalledWith(
      "/api/transactions/all/",
      expect.objectContaining({
        params: expect.objectContaining({
          account: "Checking",
        }),
      }),
    );
  });

  it("deve passar o período corretamente", async () => {
    await getAllTransactions(1, null, null, "November 2026");

    expect(api.get).toHaveBeenCalledWith(
      "/api/transactions/all/",
      expect.objectContaining({
        params: expect.objectContaining({
          period: "November 2026",
        }),
      }),
    );
  });

  it("deve passar o texto de pesquisa corretamente", async () => {
    await getAllTransactions(1, null, null, null, "Supermarket");

    expect(api.get).toHaveBeenCalledWith(
      "/api/transactions/all/",
      expect.objectContaining({
        params: expect.objectContaining({
          search: "Supermarket",
        }),
      }),
    );
  });

  it("deve passar a ordenação corretamente", async () => {
    await getAllTransactions(1, null, null, null, "", "oldest");

    expect(api.get).toHaveBeenCalledWith(
      "/api/transactions/all/",
      expect.objectContaining({
        params: expect.objectContaining({
          ordering: "oldest",
        }),
      }),
    );
  });

  it("não deve passar transaction_type quando o tipo for all", async () => {
    await getAllTransactions(1, null, null, null, "", "newest", "all");

    expect(api.get).toHaveBeenCalledWith(
      "/api/transactions/all/",
      expect.objectContaining({
        params: expect.objectContaining({
          transaction_type: undefined,
        }),
      }),
    );
  });

  it("deve passar transaction_type como income", async () => {
    await getAllTransactions(1, null, null, null, "", "newest", "income");

    expect(api.get).toHaveBeenCalledWith(
      "/api/transactions/all/",
      expect.objectContaining({
        params: expect.objectContaining({
          transaction_type: "income",
        }),
      }),
    );
  });

  it("deve passar transaction_type como expense", async () => {
    await getAllTransactions(1, null, null, null, "", "newest", "expense");

    expect(api.get).toHaveBeenCalledWith(
      "/api/transactions/all/",
      expect.objectContaining({
        params: expect.objectContaining({
          transaction_type: "expense",
        }),
      }),
    );
  });

  it("deve passar vários períodos separados por vírgula", async () => {
    const periods = ["September 2026", "October 2026", "November 2026"];

    await getAllTransactions(1, null, null, null, "", "newest", "all", periods);

    expect(api.get).toHaveBeenCalledWith(
      "/api/transactions/all/",
      expect.objectContaining({
        params: expect.objectContaining({
          periods: "September 2026,October 2026,November 2026",
        }),
      }),
    );
  });

  it("deve enviar periods como undefined quando receber array vazio", async () => {
    await getAllTransactions(1, null, null, null, "", "newest", "all", []);

    expect(api.get).toHaveBeenCalledWith(
      "/api/transactions/all/",
      expect.objectContaining({
        params: expect.objectContaining({
          periods: undefined,
        }),
      }),
    );
  });

  it("deve combinar todos os filtros corretamente", async () => {
    const periods = ["October 2026", "November 2026"];

    await getAllTransactions(
      2,
      "Food",
      "Checking",
      null,
      "Market",
      "newest",
      "expense",
      periods,
    );

    expect(api.get).toHaveBeenCalledWith("/api/transactions/all/", {
      params: {
        page: 2,
        category: "Food",
        account: "Checking",
        period: undefined,
        search: "Market",
        ordering: "newest",
        transaction_type: "expense",
        periods: "October 2026,November 2026",
      },
    });
  });

  it("deve retornar os dados recebidos da API", async () => {
    const transactions = {
      count: 2,
      next: null,
      previous: null,
      results: [
        {
          transaction_type: "income",
          description: "Salary",
          category: "Salary",
          type: "Fixed",
          date: "2026-11-01",
          amount: "5000.00",
          account_name: "Checking",
        },
        {
          transaction_type: "expense",
          description: "Supermarket",
          category: "Food",
          type: "Variable",
          date: "2026-11-02",
          amount: "250.00",
          account_name: "Checking",
        },
      ],
    };

    vi.mocked(api.get).mockResolvedValue({
      data: transactions,
    });

    const result = await getAllTransactions();

    expect(result).toEqual(transactions);
  });

  it("deve propagar o erro quando a API falhar", async () => {
    const error = new Error("Erro ao buscar transações");

    vi.mocked(api.get).mockRejectedValue(error);

    await expect(getAllTransactions()).rejects.toThrow(
      "Erro ao buscar transações",
    );
  });
});

describe("get_accounts_list", () => {
  it("deve chamar o endpoint get_account_list correto", async () => {
    vi.mocked(api.get).mockResolvedValue({ data: 1000 });

    await get_accounts_list();

    expect(api.get).toHaveBeenCalledWith("/api/transactions/accounts_list/");
  });

  it("deve retornar os dados recebidos da API get_account_list", async () => {
    const accounts_list = ["Rico", "Caixa", "Banco do Brasil"];
    vi.mocked(api.get).mockResolvedValue({ data: accounts_list });

    const result = await get_accounts_list();

    expect(result).toEqual(accounts_list);
  });

  it("deve propagar o erro quando a API get_accounts_list falhar", async () => {
    const error = new Error("Erro ao buscar accounts list");
    vi.mocked(api.get).mockRejectedValue(error);

    await expect(get_accounts_list()).rejects.toThrow(
      "Erro ao buscar accounts list",
    );
  });
});

describe("get_five_months_list", () => {
  it("deve chamar o endpoint get_five_months_list correto", async () => {
    vi.mocked(api.get).mockResolvedValue({ data: [] });

    await get_five_months_list();

    expect(api.get).toHaveBeenCalledWith("/api/transactions/last_five_months/");
  });

  it("deve retornar os dados recebidos da API get_five_months_list", async () => {
    const fiveMonthsList = ["Jan", "Fev", "Mar", "Abr", "Mai"];
    vi.mocked(api.get).mockResolvedValue({ data: fiveMonthsList });

    const result = await get_five_months_list();

    expect(result).toEqual(fiveMonthsList);
  });

  it("deve propagar o erro quando a API get_five_months_list falhar", async () => {
    const error = new Error("Erro ao buscar five months list");
    vi.mocked(api.get).mockRejectedValue(error);

    await expect(get_five_months_list()).rejects.toThrow(
      "Erro ao buscar five months list",
    );
  });
});

describe("get_categories", () => {
  it("deve chamar o endpoint get_categories correto", async () => {
    vi.mocked(api.get).mockResolvedValue({ data: [] });

    await get_categories();

    expect(api.get).toHaveBeenCalledWith("/api/transactions/all_categories/");
  });

  it("deve retornar os dados recebidos da API get_categories", async () => {
    const categories = ["Alimentação", "Transporte", "Moradia"];
    vi.mocked(api.get).mockResolvedValue({ data: categories });

    const result = await get_categories();

    expect(result).toEqual(categories);
  });

  it("deve propagar o erro quando a API get_categories falhar", async () => {
    const error = new Error("Erro ao buscar categorias");
    vi.mocked(api.get).mockRejectedValue(error);

    await expect(get_categories()).rejects.toThrow("Erro ao buscar categorias");
  });
});

describe("get_income_filtered", () => {
  it("deve chamar o endpoint get_income_filtered correto", async () => {
    vi.mocked(api.get).mockResolvedValue({ data: [] });

    await get_income_filtered([]);

    expect(api.get).toHaveBeenCalledWith("/api/transactions/income_filtered/", {
      params: {
        periods: undefined,
        account: undefined,
      },
    });
  });

  it("deve passar os periods como parâmetro", async () => {
    const periods = ["Jan", "Fev", "Mar"];
    vi.mocked(api.get).mockResolvedValue({ data: [] });

    await get_income_filtered(periods);

    expect(api.get).toHaveBeenCalledWith("/api/transactions/income_filtered/", {
      params: {
        periods: "Jan,Fev,Mar",
      },
    });
  });

  it("deve passar account como parâmetro", async () => {
    const account = "Banco do Brasil";
    vi.mocked(api.get).mockResolvedValue({ data: [] });

    await get_income_filtered(undefined, account);

    expect(api.get).toHaveBeenCalledWith("/api/transactions/income_filtered/", {
      params: {
        periods: undefined,
        account: "Banco do Brasil",
      },
    });
  });

  it("deve retornar os dados recebidos da API get_income_filtered", async () => {
    const incomeFiltered = [
      { category: "Salário", amount: 5000 },
      { category: "Freelance", amount: 1500 },
    ];
    vi.mocked(api.get).mockResolvedValue({ data: incomeFiltered });

    const result = await get_income_filtered();

    expect(result).toEqual(incomeFiltered);
  });

  it("deve propagar o erro quando a API get_income_filtered falhar", async () => {
    const error = new Error("Erro ao buscar renda filtrada");
    vi.mocked(api.get).mockRejectedValue(error);

    await expect(get_income_filtered()).rejects.toThrow(
      "Erro ao buscar renda filtrada",
    );
  });
});

describe("get_expense_filtered", () => {
  it("deve chamar o endpoint get_expense_filtered correto", async () => {
    vi.mocked(api.get).mockResolvedValue({ data: [] });

    await get_expense_filtered([]);

    expect(api.get).toHaveBeenCalledWith(
      "/api/transactions/expense_filtered/",
      {
        params: {
          periods: undefined,
        },
      },
    );
  });

  it("deve passar os periods como parâmetro", async () => {
    const periods = ["Jan", "Fev", "Mar"];
    vi.mocked(api.get).mockResolvedValue({ data: [] });

    await get_expense_filtered(periods);

    expect(api.get).toHaveBeenCalledWith(
      "/api/transactions/expense_filtered/",
      {
        params: {
          periods: "Jan,Fev,Mar",
        },
      },
    );
  });

  it("deve passar os account como parâmetro", async () => {
    const account = "Banco do Brasil";
    vi.mocked(api.get).mockResolvedValue({ data: [] });

    await get_expense_filtered(undefined, account);

    expect(api.get).toHaveBeenCalledWith(
      "/api/transactions/expense_filtered/",
      {
        params: {
          periods: undefined,
          account: "Banco do Brasil",
        },
      },
    );
  });

  it("deve retornar os dados recebidos da API get_expense_filtered", async () => {
    const expenseFiltered = [
      { category: "Moradia", amount: 1800 },
      { category: "Alimentação", amount: 950 },
    ];
    vi.mocked(api.get).mockResolvedValue({ data: expenseFiltered });

    const result = await get_expense_filtered();

    expect(result).toEqual(expenseFiltered);
  });

  it("deve propagar o erro quando a API get_expense_filtered falhar", async () => {
    const error = new Error("Erro ao buscar despesas filtradas");
    vi.mocked(api.get).mockRejectedValue(error);

    await expect(get_expense_filtered()).rejects.toThrow(
      "Erro ao buscar despesas filtradas",
    );
  });
});
