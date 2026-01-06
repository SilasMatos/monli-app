import { z } from "zod";

export const budgetSchema = z.object({
  id: z.string(),
  userId: z.string(),
  name: z.string(),
  amount: z.number(),
  spent: z.number(),
  category: z.string(),
  startDate: z.string().datetime(),
  endDate: z.string().datetime(),
  isActive: z.boolean(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

export const createBudgetSchema = z.object({
  name: z.string(),
  amount: z.number().positive(),
  category: z.string(),
  startDate: z.string().datetime(),
  endDate: z.string().datetime(),
});

export const updateBudgetSchema = z.object({
  name: z.string().optional(),
  amount: z.number().positive().optional(),
  category: z.string().optional(),
  startDate: z.string().datetime().optional(),
  endDate: z.string().datetime().optional(),
  isActive: z.boolean().optional(),
});

export const budgetSummarySchema = z.object({
  totalBudget: z.number(),
  totalSpent: z.number(),
  remaining: z.number(),
  percentageUsed: z.number(),
  activeBudgets: z.number(),
});

export const budgetResponseSchema = z.object({
  success: z.boolean(),
  data: z.object({
    budget: budgetSchema,
  }),
});

export const budgetsListResponseSchema = z.object({
  success: z.boolean(),
  data: z.object({
    budgets: z.array(budgetSchema),
  }),
});

export const budgetSummaryResponseSchema = z.object({
  success: z.boolean(),
  data: budgetSummarySchema,
});

export const deleteBudgetResponseSchema = z.object({
  success: z.boolean(),
  message: z.string(),
});

export type Budget = z.infer<typeof budgetSchema>;
export type CreateBudgetInput = z.infer<typeof createBudgetSchema>;
export type UpdateBudgetInput = z.infer<typeof updateBudgetSchema>;
export type BudgetSummary = z.infer<typeof budgetSummarySchema>;
export type BudgetResponse = z.infer<typeof budgetResponseSchema>;
export type BudgetsListResponse = z.infer<typeof budgetsListResponseSchema>;
export type BudgetSummaryResponse = z.infer<typeof budgetSummaryResponseSchema>;
export type DeleteBudgetResponse = z.infer<typeof deleteBudgetResponseSchema>;
