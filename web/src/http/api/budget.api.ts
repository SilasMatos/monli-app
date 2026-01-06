import axiosInstance from "@/lib/axios-instance";
import {
  CreateBudgetInput,
  UpdateBudgetInput,
  budgetResponseSchema,
  budgetsListResponseSchema,
  budgetSummaryResponseSchema,
  deleteBudgetResponseSchema,
} from "@/http/schema/budget.schema";

export const budgetApi = {
  createBudget: async (data: CreateBudgetInput) => {
    const response = await axiosInstance.post("/budgets", data);
    return budgetResponseSchema.parse(response.data);
  },

  getBudgets: async () => {
    const response = await axiosInstance.get("/budgets");
    return budgetsListResponseSchema.parse(response.data);
  },

  getActiveBudgets: async () => {
    const response = await axiosInstance.get("/budgets/active");
    return budgetsListResponseSchema.parse(response.data);
  },

  getBudgetSummary: async () => {
    const response = await axiosInstance.get("/budgets/summary");
    return budgetSummaryResponseSchema.parse(response.data);
  },

  getBudget: async (id: string) => {
    const response = await axiosInstance.get(`/budgets/${id}`);
    return budgetResponseSchema.parse(response.data);
  },

  updateBudget: async (id: string, data: UpdateBudgetInput) => {
    const response = await axiosInstance.put(`/budgets/${id}`, data);
    return budgetResponseSchema.parse(response.data);
  },

  deleteBudget: async (id: string) => {
    const response = await axiosInstance.delete(`/budgets/${id}`);
    return deleteBudgetResponseSchema.parse(response.data);
  },
};
