import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { budgetApi } from "@/http/api/budget.api";
import {
  CreateBudgetInput,
  UpdateBudgetInput,
  BudgetResponse,
  DeleteBudgetResponse,
  ErrorResponse,
} from "@/http/schema/budget.schema";

export const useCreateBudget = (
  options?: UseMutationOptions<BudgetResponse, ErrorResponse, CreateBudgetInput>
) => {
  return useMutation({
    mutationKey: ["budgets", "create"],
    mutationFn: budgetApi.createBudget,
    ...options,
  });
};

type UpdateBudgetVariables = {
  id: string;
  data: UpdateBudgetInput;
};

export const useUpdateBudget = (
  options?: UseMutationOptions<BudgetResponse, ErrorResponse, UpdateBudgetVariables>
) => {
  return useMutation({
    mutationKey: ["budgets", "update"],
    mutationFn: ({ id, data }) => budgetApi.updateBudget(id, data),
    ...options,
  });
};

export const useDeleteBudget = (
  options?: UseMutationOptions<DeleteBudgetResponse, ErrorResponse, string>
) => {
  return useMutation({
    mutationKey: ["budgets", "delete"],
    mutationFn: budgetApi.deleteBudget,
    ...options,
  });
};
