import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { subscriptionApi } from "@/http/api/subscription.api";
import {
  SubscriptionResponse,
  SubscriptionsListResponse,
  MonthlyTotalResponse,
  UpcomingSubscriptionsResponse,
  SubscriptionCompaniesResponse,
  SubscriptionCompanyResponse,
  ErrorResponse,
} from "@/http/schema/subscription.schema";

export const useSubscriptions = (
  options?: Omit<UseQueryOptions<SubscriptionsListResponse, ErrorResponse>, "queryKey" | "queryFn">
) => {
  return useQuery({
    queryKey: ["subscriptions"],
    queryFn: subscriptionApi.getSubscriptions,
    ...options,
  });
};

export const useSubscriptionMonthlyTotal = (
  options?: Omit<UseQueryOptions<MonthlyTotalResponse, ErrorResponse>, "queryKey" | "queryFn">
) => {
  return useQuery({
    queryKey: ["subscriptions", "monthly-total"],
    queryFn: subscriptionApi.getMonthlyTotal,
    ...options,
  });
};

export const useUpcomingSubscriptions = (
  options?: Omit<UseQueryOptions<UpcomingSubscriptionsResponse, ErrorResponse>, "queryKey" | "queryFn">
) => {
  return useQuery({
    queryKey: ["subscriptions", "upcoming"],
    queryFn: subscriptionApi.getUpcoming,
    ...options,
  });
};

export const useSubscription = (
  id: string,
  options?: Omit<UseQueryOptions<SubscriptionResponse, ErrorResponse>, "queryKey" | "queryFn">
) => {
  return useQuery({
    queryKey: ["subscriptions", id],
    queryFn: () => subscriptionApi.getSubscription(id),
    enabled: !!id,
    ...options,
  });
};

export const useSubscriptionCompanies = (
  options?: Omit<UseQueryOptions<SubscriptionCompaniesResponse, ErrorResponse>, "queryKey" | "queryFn">
) => {
  return useQuery({
    queryKey: ["subscription-companies"],
    queryFn: subscriptionApi.getCompanies,
    ...options,
  });
};

export const useSubscriptionCompany = (
  id: string,
  options?: Omit<UseQueryOptions<SubscriptionCompanyResponse, ErrorResponse>, "queryKey" | "queryFn">
) => {
  return useQuery({
    queryKey: ["subscription-companies", id],
    queryFn: () => subscriptionApi.getCompany(id),
    enabled: !!id,
    ...options,
  });
};
