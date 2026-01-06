import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { budgetApi } from "@/http/api/budget.api";
import {
  BudgetResponse,
  BudgetsListResponse,
  BudgetSummaryResponse,
  ErrorResponse,
} from "@/http/schema/budget.schema";

export const useBudgets = (
  options?: Omit<UseQueryOptions<BudgetsListResponse, ErrorResponse>, "queryKey" | "queryFn">
) => {
  return useQuery({
    queryKey: ["budgets"],
    queryFn: budgetApi.getBudgets,
    ...options,
  });
};

export const useActiveBudgets = (
  options?: Omit<UseQueryOptions<BudgetsListResponse, ErrorResponse>, "queryKey" | "queryFn">
) => {
  return useQuery({
    queryKey: ["budgets", "active"],
    queryFn: budgetApi.getActiveBudgets,
    ...options,
  });
};

export const useBudgetSummary = (
  options?: Omit<UseQueryOptions<BudgetSummaryResponse, ErrorResponse>, "queryKey" | "queryFn">
) => {
  return useQuery({
    queryKey: ["budgets", "summary"],
    queryFn: budgetApi.getBudgetSummary,
    ...options,
  });
};

export const useBudget = (
  id: string,
  options?: Omit<UseQueryOptions<BudgetResponse, ErrorResponse>, "queryKey" | "queryFn">
) => {
  return useQuery({
    queryKey: ["budgets", id],
    queryFn: () => budgetApi.getBudget(id),
    enabled: !!id,
    ...options,
  });
};
