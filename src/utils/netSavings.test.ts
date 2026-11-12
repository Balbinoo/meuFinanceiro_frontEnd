import { describe, it, expect } from "vitest";
import { calculateNetSaving, percentageNetSaving } from "./netSavings";

describe("netSavings", () => {
  it("deve calcular o NetSavings corretamente", () => {
    const result = calculateNetSaving(10000, 5000);
    expect(result).toBe("R$\u00a05.000,00");
  });
  it("deve retornar saldo negativo quando as despesas forem maiores", () => {
    const result = calculateNetSaving(5000, 10000);
    expect(result).toBe("-R$\u00a05.000,00");
  });
  it("deve retornar zero quando receitas e despesas forem iguais", () => {
    const result = calculateNetSaving(10000, 10000);
    expect(result).toBe("R$\u00a00,00");
  });

  it("deve calcular a porcentagem de economia corretamente", () => {
    expect(percentageNetSaving(10000, 5000)).toBe(50);
  });

  it("deve retornar uma porcentagem negativa quando as despesas forem maiores", () => {
    expect(percentageNetSaving(5000, 10000)).toBe(-100);
  });

  it("deve retornar zero quando receitas e despesas forem iguais", () => {
    expect(percentageNetSaving(10000, 10000)).toBe(0);
  });
});
