import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { creditCardApi } from "@/http/api/credit-card.api";
import {
  CreditCardResponse,
  CreditCardsListResponse,
  AvailableCreditResponse,
  ErrorResponse,
} from "@/http/schema/credit-card.schema";

export const useCreditCards = (
  options?: Omit<UseQueryOptions<CreditCardsListResponse, ErrorResponse>, "queryKey" | "queryFn">
) => {
  return useQuery({
    queryKey: ["creditCards"],
    queryFn: creditCardApi.getCreditCards,
    ...options,
  });
};

export const useCreditCard = (
  id: string,
  options?: Omit<UseQueryOptions<CreditCardResponse, ErrorResponse>, "queryKey" | "queryFn">
) => {
  return useQuery({
    queryKey: ["creditCards", id],
    queryFn: () => creditCardApi.getCreditCard(id),
    enabled: !!id,
    ...options,
  });
};

export const useAvailableCredit = (
  id: string,
  options?: Omit<UseQueryOptions<AvailableCreditResponse, ErrorResponse>, "queryKey" | "queryFn">
) => {
  return useQuery({
    queryKey: ["creditCards", id, "available-credit"],
    queryFn: () => creditCardApi.getAvailableCredit(id),
    enabled: !!id,
    ...options,
  });
};
