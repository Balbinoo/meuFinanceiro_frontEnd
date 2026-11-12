import { describe, it, expect } from "vitest";
import { formatCurrency } from "./formatCurrency";

describe("formatCurrency", () => {
  it("deve formatar o valor para a Real", () => {
    const result = formatCurrency(1000);
    expect(result).toBe("R$\u00a01.000,00");
  });
  it("deve formatar o valor para a Real em negativo", () => {
    const result = formatCurrency(-1000);
    expect(result).toBe("-R$\u00a01.000,00");
  });
  it("deve formatar valores decimais", () => {
    const result = formatCurrency(1234.56);
    expect(result).toBe("R$\u00a01.234,56");
  });
  it("deve converter uma string numérica para Real", () => {
    const result = formatCurrency("2500.5");
    expect(result).toBe("R$\u00a02.500,50");
  });
  it("deve formatar zero", () => {
    const result = formatCurrency(0);
    expect(result).toBe("R$\u00a00,00");
  });
});
