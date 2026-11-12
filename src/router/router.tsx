import { lazy, Suspense } from "react";
import { createBrowserRouter, Navigate } from "react-router-dom";

import { ROUTES } from "./routes";
import { MainLayout } from "../layout/MainLayout";
import { ProtectedRoute } from "../components/auth/ProtectedRoute";

const DashboardPage = lazy(() => import("../views/DashboardPage"));
const TransactionsPage = lazy(() => import("../views/TransactionsPage"));
const EconomyPage = lazy(() => import("../views/EconomyPage"));
const AccountPage = lazy(() => import("../views/AccountPage"));
const SettingsPage = lazy(() => import("../views/SettingsPage"));
const ExpensesPage = lazy(() => import("../views/ExpensesPage"));
const IncomePage = lazy(() => import("../views/IncomePage"));
const LoginPage = lazy(() => import("../views/LoginPage"));

export const routes = [
  {
    path: ROUTES.LOGIN,
    element: (
      <Suspense fallback={<div>Carregando login...</div>}>
        <LoginPage />
      </Suspense>
    ),
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        element: <MainLayout />,
        children: [
          {
            path: ROUTES.ROOT,
            element: <Navigate to={ROUTES.DASHBOARD} replace />,
          },
          {
            path: ROUTES.DASHBOARD,
            element: (
              <Suspense fallback={<div>Carregando dashboard...</div>}>
                <DashboardPage />
              </Suspense>
            ),
          },
          {
            path: ROUTES.TRANSACTIONS,
            element: (
              <Suspense fallback={<div>Carregando transações...</div>}>
                <TransactionsPage />
              </Suspense>
            ),
          },
          {
            path: ROUTES.ACCOUNT,
            element: (
              <Suspense fallback={<div>Carregando contas...</div>}>
                <AccountPage />
              </Suspense>
            ),
          },
          {
            path: ROUTES.SETTINGS,
            element: (
              <Suspense fallback={<div>Carregando configurações...</div>}>
                <SettingsPage />
              </Suspense>
            ),
          },
          {
            path: ROUTES.ECONOMY,
            element: (
              <Suspense fallback={<div>Carregando economia...</div>}>
                <EconomyPage />
              </Suspense>
            ),
          },
          {
            path: ROUTES.EXPENSES,
            element: (
              <Suspense fallback={<div>Carregando despesas...</div>}>
                <ExpensesPage />
              </Suspense>
            ),
          },
          {
            path: ROUTES.INCOME,
            element: (
              <Suspense fallback={<div>Carregando receitas...</div>}>
                <IncomePage />
              </Suspense>
            ),
          },
        ],
      },
    ],
  },
];

export const router = createBrowserRouter(routes);
