import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { walletApi } from "@/http/api/wallet.api";
import {
  WalletResponse,
  WalletBalanceResponse,
  TransactionsListResponse,
  ErrorResponse,
} from "@/http/schema/wallet.schema";

export const useWallet = (
  options?: Omit<UseQueryOptions<WalletResponse, ErrorResponse>, "queryKey" | "queryFn">
) => {
  return useQuery({
    queryKey: ["wallet"],
    queryFn: walletApi.getWallet,
    ...options,
  });
};

export const useWalletBalance = (
  options?: Omit<UseQueryOptions<WalletBalanceResponse, ErrorResponse>, "queryKey" | "queryFn">
) => {
  return useQuery({
    queryKey: ["wallet", "balance"],
    queryFn: walletApi.getBalance,
    ...options,
  });
};

export const useTransactions = (
  options?: Omit<UseQueryOptions<TransactionsListResponse, ErrorResponse>, "queryKey" | "queryFn">
) => {
  return useQuery({
    queryKey: ["transactions"],
    queryFn: walletApi.getTransactions,
    ...options,
  });
};
