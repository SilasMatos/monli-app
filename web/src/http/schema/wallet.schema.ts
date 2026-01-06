import { z } from "zod";

export const walletSchema = z.object({
  id: z.string(),
  userId: z.string(),
  balance: z.number(),
  savedBalance: z.number(),
  currency: z.string(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

export const updateWalletSchema = z.object({
  currency: z.string().optional(),
});

export const walletBalanceSchema = z.object({
  balance: z.number(),
  savedBalance: z.number(),
  totalBalance: z.number(),
});

export const transactionSchema = z.object({
  id: z.string(),
  walletId: z.string(),
  type: z.enum(["income", "expense", "transfer"]),
  amount: z.number(),
  category: z.string(),
  description: z.string().nullable(),
  date: z.string().datetime(),
  createdAt: z.string().datetime(),
});

export const createTransactionSchema = z.object({
  type: z.enum(["income", "expense", "transfer"]),
  amount: z.number().positive(),
  category: z.string(),
  description: z.string().optional(),
  date: z.string().datetime().optional(),
});

export const transferSchema = z.object({
  amount: z.number().positive(),
});

export const walletResponseSchema = z.object({
  success: z.boolean(),
  data: z.object({
    wallet: walletSchema,
  }),
});

export const walletBalanceResponseSchema = z.object({
  success: z.boolean(),
  data: walletBalanceSchema,
});

export const transactionResponseSchema = z.object({
  success: z.boolean(),
  data: z.object({
    transaction: transactionSchema,
  }),
});

export const transactionsListResponseSchema = z.object({
  success: z.boolean(),
  data: z.object({
    transactions: z.array(transactionSchema),
  }),
});

export const transferResponseSchema = z.object({
  success: z.boolean(),
  message: z.string(),
  data: z.object({
    wallet: walletSchema,
  }),
});

export type Wallet = z.infer<typeof walletSchema>;
export type UpdateWalletInput = z.infer<typeof updateWalletSchema>;
export type WalletBalance = z.infer<typeof walletBalanceSchema>;
export type Transaction = z.infer<typeof transactionSchema>;
export type CreateTransactionInput = z.infer<typeof createTransactionSchema>;
export type TransferInput = z.infer<typeof transferSchema>;
export type WalletResponse = z.infer<typeof walletResponseSchema>;
export type WalletBalanceResponse = z.infer<typeof walletBalanceResponseSchema>;
export type TransactionResponse = z.infer<typeof transactionResponseSchema>;
export type TransactionsListResponse = z.infer<typeof transactionsListResponseSchema>;
export type TransferResponse = z.infer<typeof transferResponseSchema>;
