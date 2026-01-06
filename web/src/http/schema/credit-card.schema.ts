import { z } from "zod";

export const creditCardSchema = z.object({
  id: z.string(),
  userId: z.string(),
  name: z.string(),
  lastFourDigits: z.string(),
  limit: z.number(),
  usedCredit: z.number(),
  dueDay: z.number(),
  closingDay: z.number(),
  brand: z.string().nullable(),
  color: z.string().nullable(),
  isActive: z.boolean(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

export const createCreditCardSchema = z.object({
  name: z.string(),
  lastFourDigits: z.string().length(4),
  limit: z.number().positive(),
  dueDay: z.number().min(1).max(31),
  closingDay: z.number().min(1).max(31),
  brand: z.string().optional(),
  color: z.string().optional(),
});

export const updateCreditCardSchema = z.object({
  name: z.string().optional(),
  limit: z.number().positive().optional(),
  dueDay: z.number().min(1).max(31).optional(),
  closingDay: z.number().min(1).max(31).optional(),
  brand: z.string().optional(),
  color: z.string().optional(),
  isActive: z.boolean().optional(),
});

export const availableCreditSchema = z.object({
  limit: z.number(),
  usedCredit: z.number(),
  availableCredit: z.number(),
});

export const creditCardExpenseSchema = z.object({
  amount: z.number().positive(),
  description: z.string(),
  category: z.string(),
  date: z.string().datetime().optional(),
});

export const creditCardResponseSchema = z.object({
  success: z.boolean(),
  data: z.object({
    creditCard: creditCardSchema,
  }),
});

export const creditCardsListResponseSchema = z.object({
  success: z.boolean(),
  data: z.object({
    creditCards: z.array(creditCardSchema),
  }),
});

export const availableCreditResponseSchema = z.object({
  success: z.boolean(),
  data: availableCreditSchema,
});

export const creditCardExpenseResponseSchema = z.object({
  success: z.boolean(),
  message: z.string(),
  data: z.object({
    creditCard: creditCardSchema,
  }),
});

export const deleteCreditCardResponseSchema = z.object({
  success: z.boolean(),
  message: z.string(),
});

export type CreditCard = z.infer<typeof creditCardSchema>;
export type CreateCreditCardInput = z.infer<typeof createCreditCardSchema>;
export type UpdateCreditCardInput = z.infer<typeof updateCreditCardSchema>;
export type AvailableCredit = z.infer<typeof availableCreditSchema>;
export type CreditCardExpenseInput = z.infer<typeof creditCardExpenseSchema>;
export type CreditCardResponse = z.infer<typeof creditCardResponseSchema>;
export type CreditCardsListResponse = z.infer<typeof creditCardsListResponseSchema>;
export type AvailableCreditResponse = z.infer<typeof availableCreditResponseSchema>;
export type CreditCardExpenseResponse = z.infer<typeof creditCardExpenseResponseSchema>;
export type DeleteCreditCardResponse = z.infer<typeof deleteCreditCardResponseSchema>;
