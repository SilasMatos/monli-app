import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { creditCardApi } from "@/http/api/credit-card.api";
import {
  CreateCreditCardInput,
  UpdateCreditCardInput,
  CreditCardExpenseInput,
  CreditCardResponse,
  CreditCardExpenseResponse,
  DeleteCreditCardResponse,
  ErrorResponse,
} from "@/http/schema/credit-card.schema";

export const useCreateCreditCard = (
  options?: UseMutationOptions<CreditCardResponse, ErrorResponse, CreateCreditCardInput>
) => {
  return useMutation({
    mutationKey: ["creditCards", "create"],
    mutationFn: creditCardApi.createCreditCard,
    ...options,
  });
};

type UpdateCreditCardVariables = {
  id: string;
  data: UpdateCreditCardInput;
};

export const useUpdateCreditCard = (
  options?: UseMutationOptions<CreditCardResponse, ErrorResponse, UpdateCreditCardVariables>
) => {
  return useMutation({
    mutationKey: ["creditCards", "update"],
    mutationFn: ({ id, data }) => creditCardApi.updateCreditCard(id, data),
    ...options,
  });
};

export const useDeleteCreditCard = (
  options?: UseMutationOptions<DeleteCreditCardResponse, ErrorResponse, string>
) => {
  return useMutation({
    mutationKey: ["creditCards", "delete"],
    mutationFn: creditCardApi.deleteCreditCard,
    ...options,
  });
};

type AddExpenseVariables = {
  id: string;
  data: CreditCardExpenseInput;
};

export const useAddCreditCardExpense = (
  options?: UseMutationOptions<CreditCardExpenseResponse, ErrorResponse, AddExpenseVariables>
) => {
  return useMutation({
    mutationKey: ["creditCards", "expense", "add"],
    mutationFn: ({ id, data }) => creditCardApi.addExpense(id, data),
    ...options,
  });
};
