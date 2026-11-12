import { describe, it, expect, beforeEach, vi } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import { createMemoryRouter, RouterProvider } from "react-router-dom";

import { routes } from "./router";
import { ROUTES } from "./routes";

// Evita que o teste dependa de chamadas reais à API
vi.mock("../services/auth/authService", () => ({
  login: vi.fn(),
}));

describe("Router", () => {
  beforeEach(() => {
    sessionStorage.clear();
  });

  it("deve renderizar a rota de login", async () => {
    const router = createMemoryRouter(routes, {
      initialEntries: [ROUTES.LOGIN],
    });

    render(<RouterProvider router={router} />);

    screen.debug();
  });
});
