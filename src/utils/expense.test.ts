import { describe, it, expect } from "vitest";
import { calculateBiggestExpense } from "./expense";

import type { expenseCategoriesResponse } from "../types/economy/economyType";

describe("calculateBiggestExpense", () => {
  it("should return the category with the highest total_amount", () => {
    const expenseCategoriesData: expenseCategoriesResponse = {
      categories: [
        {
          category: "Food",
          count: 10,
          total_amount: 500,
          percentage: 25,
        },
        {
          category: "Transport",
          count: 5,
          total_amount: 200,
          percentage: 10,
        },
        {
          category: "Housing",
          count: 3,
          total_amount: 1500,
          percentage: 75,
        },
      ],
    };

    const result = calculateBiggestExpense(expenseCategoriesData);

    expect(result).toEqual({
      category: "Housing",
      count: 3,
      total_amount: 1500,
      percentage: 75,
    });
  });

  it("should return null when categories is empty", () => {
    const expenseCategoriesData: expenseCategoriesResponse = {
      categories: [],
    };

    const result = calculateBiggestExpense(expenseCategoriesData);

    expect(result).toBeNull();
  });

  it("should return the only category when there is just one", () => {
    const expenseCategoriesData: expenseCategoriesResponse = {
      categories: [
        {
          category: "Food",
          count: 10,
          total_amount: 500,
          percentage: 100,
        },
      ],
    };

    const result = calculateBiggestExpense(expenseCategoriesData);

    expect(result).toEqual(expenseCategoriesData.categories[0]);
  });

  it("should return the first category when there is a tie", () => {
    const expenseCategoriesData: expenseCategoriesResponse = {
      categories: [
        {
          category: "Food",
          count: 10,
          total_amount: 500,
          percentage: 50,
        },
        {
          category: "Transport",
          count: 5,
          total_amount: 500,
          percentage: 50,
        },
      ],
    };

    const result = calculateBiggestExpense(expenseCategoriesData);

    expect(result).toEqual(expenseCategoriesData.categories[0]);
  });
});
