import axiosInstance from "@/lib/axios-instance";
import {
  CreateTransactionInput,
  TransferInput,
  UpdateWalletInput,
  walletResponseSchema,
  walletBalanceResponseSchema,
  transactionResponseSchema,
  transactionsListResponseSchema,
  transferResponseSchema,
} from "@/http/schema/wallet.schema";

export const walletApi = {
  getWallet: async () => {
    const response = await axiosInstance.get("/wallet");
    return walletResponseSchema.parse(response.data);
  },

  updateWallet: async (data: UpdateWalletInput) => {
    const response = await axiosInstance.put("/wallet", data);
    return walletResponseSchema.parse(response.data);
  },

  getBalance: async () => {
    const response = await axiosInstance.get("/wallet/balance");
    return walletBalanceResponseSchema.parse(response.data);
  },

  createTransaction: async (data: CreateTransactionInput) => {
    const response = await axiosInstance.post("/transactions", data);
    return transactionResponseSchema.parse(response.data);
  },

  getTransactions: async () => {
    const response = await axiosInstance.get("/transactions");
    return transactionsListResponseSchema.parse(response.data);
  },

  transferToSaved: async (data: TransferInput) => {
    const response = await axiosInstance.post("/wallet/transfer-to-saved", data);
    return transferResponseSchema.parse(response.data);
  },

  transferFromSaved: async (data: TransferInput) => {
    const response = await axiosInstance.post("/wallet/transfer-from-saved", data);
    return transferResponseSchema.parse(response.data);
  },
};
