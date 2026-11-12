import { describe, it, expect } from "vitest";
import { calculatePercentageChange } from "./percentageChange";

describe("calculatePercentageChange", () => {
  it("deve calcular o aumento percentual", () => {
    expect(calculatePercentageChange(110, 100)).toBe(10);
  });

  it("deve calcular a redução percentual", () => {
    expect(calculatePercentageChange(90, 100)).toBe(-10);
  });

  it("deve retornar zero quando os valores forem iguais", () => {
    expect(calculatePercentageChange(100, 100)).toBe(0);
  });

  it("deve retornar null quando o valor anterior for zero", () => {
    expect(calculatePercentageChange(100, 0)).toBeNull();
  });
});
