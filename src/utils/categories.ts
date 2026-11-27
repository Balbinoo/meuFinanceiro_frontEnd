import { createElement } from "react";
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

export const getCategoryIcon = (category: string) => {
  const normalizedCategory = category.toLowerCase();

  if (normalizedCategory.includes("food"))
    return createElement(IconMug, { size: 18 });
  if (normalizedCategory.includes("transport"))
    return createElement(IconCar, { size: 18 });
  if (normalizedCategory.includes("housing"))
    return createElement(IconHome, { size: 18 });
  if (normalizedCategory.includes("education"))
    return createElement(IconBook, { size: 18 });
  if (normalizedCategory.includes("shopping"))
    return createElement(IconShoppingBag, { size: 18 });
  if (normalizedCategory.includes("entertainment"))
    return createElement(IconMusic, { size: 18 });
  if (normalizedCategory.includes("salary"))
    return createElement(IconBriefcase, { size: 18 });
  if (normalizedCategory.includes("freelance"))
    return createElement(IconDeviceLaptop, { size: 18 });

  return createElement(IconBriefcase, { size: 18 });
};
