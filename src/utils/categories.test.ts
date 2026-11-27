import { describe, it, expect } from "vitest";
import { isValidElement } from "react";

import {
  IconBook,
  IconBriefcase,
  IconCar,
  IconDeviceLaptop,
  IconHome,
  IconMug,
  IconMusic,
  IconShoppingBag,
} from "@tabler/icons-react";

import { getCategoryIcon } from "./categories";

describe("getCategoryIcon", () => {
  it.each([
    ["Food", IconMug],
    ["Transport", IconCar],
    ["Housing", IconHome],
    ["Education", IconBook],
    ["Shopping", IconShoppingBag],
    ["Entertainment", IconMusic],
    ["Salary", IconBriefcase],
    ["Freelance", IconDeviceLaptop],
  ])("should return the correct icon for %s", (category, expectedIcon) => {
    const result = getCategoryIcon(category);

    expect(isValidElement(result)).toBe(true);
    expect(result.type).toBe(expectedIcon);
  });

  it("should handle lowercase categories", () => {
    const result = getCategoryIcon("food");

    expect(result.type).toBe(IconMug);
  });

  it("should handle uppercase categories", () => {
    const result = getCategoryIcon("TRANSPORT");

    expect(result.type).toBe(IconCar);
  });

  it("should handle categories containing the category name", () => {
    const result = getCategoryIcon("Monthly Food Expenses");

    expect(result.type).toBe(IconMug);
  });

  it("should return the default icon for unknown categories", () => {
    const result = getCategoryIcon("Other");

    expect(result.type).toBe(IconBriefcase);
  });
});
