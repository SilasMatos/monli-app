import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { walletApi } from "@/http/api/wallet.api";
import {
  CreateTransactionInput,
  TransferInput,
  UpdateWalletInput,
  WalletResponse,
  TransactionResponse,
  TransferResponse,
  ErrorResponse,
} from "@/http/schema/wallet.schema";

export const useUpdateWallet = (
  options?: UseMutationOptions<WalletResponse, ErrorResponse, UpdateWalletInput>
) => {
  return useMutation({
    mutationKey: ["wallet", "update"],
    mutationFn: walletApi.updateWallet,
    ...options,
  });
};

export const useCreateTransaction = (
  options?: UseMutationOptions<TransactionResponse, ErrorResponse, CreateTransactionInput>
) => {
  return useMutation({
    mutationKey: ["transactions", "create"],
    mutationFn: walletApi.createTransaction,
    ...options,
  });
};

export const useTransferToSaved = (
  options?: UseMutationOptions<TransferResponse, ErrorResponse, TransferInput>
) => {
  return useMutation({
    mutationKey: ["wallet", "transfer-to-saved"],
    mutationFn: walletApi.transferToSaved,
    ...options,
  });
};

export const useTransferFromSaved = (
  options?: UseMutationOptions<TransferResponse, ErrorResponse, TransferInput>
) => {
  return useMutation({
    mutationKey: ["wallet", "transfer-from-saved"],
    mutationFn: walletApi.transferFromSaved,
    ...options,
  });
};
