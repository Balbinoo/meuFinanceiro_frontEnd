import { describe, it, expect } from "vitest";
import {
  monthlyBudget,
  goalPercentage,
  cashFlowIn,
  cashFlowOut,
} from "./progress";

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

describe("cashFlowIn", () => {
  it("deve calcular o percentual da renda restante após as despesas", () => {
    expect(cashFlowIn(4000, 1000)).toBe(75);
  });

  it("não deve retornar um percentual negativo", () => {
    expect(cashFlowIn(1000, 1200)).toBe(0);
  });

  it("deve retornar 0 quando a renda não for positiva", () => {
    expect(cashFlowIn(0, 100)).toBe(0);
    expect(cashFlowIn(-100, 50)).toBe(0);
  });
});

describe("cashFlowOut", () => {
  it("deve calcular o percentual da renda gasto com despesas", () => {
    expect(cashFlowOut(4000, 1000)).toBe(25);
  });

  it("não deve ultrapassar 100%", () => {
    expect(cashFlowOut(1000, 1200)).toBe(100);
  });

  it("deve retornar 0 quando a renda não for positiva", () => {
    expect(cashFlowOut(0, 100)).toBe(0);
    expect(cashFlowOut(-100, 50)).toBe(0);
  });
});
