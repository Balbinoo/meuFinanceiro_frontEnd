import { describe, it, expect } from "vitest";
import { monthlyBudget, goalPercentage } from "./progress";

describe("monthlyBudget", () => {
  it("deve calcular o percentual da despesa em relação à metade da renda", () => {
    expect(monthlyBudget(4000, 1000)).toBe(50);
  });
});

describe("goalPercentage", () => {
  it("deve calcular o percentual da meta alcançado", () => {
    expect(goalPercentage(25, 100)).toBe(25);
  });

  it("não deve ultrapassar 100%", () => {
    expect(goalPercentage(120, 100)).toBe(100);
  });

  it("deve retornar 0 quando o objetivo não for positivo", () => {
    expect(goalPercentage(50, 0)).toBe(0);
  });
});
