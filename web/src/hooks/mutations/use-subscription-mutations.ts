import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { subscriptionApi } from "@/http/api/subscription.api";
import {
  CreateSubscriptionInput,
  UpdateSubscriptionInput,
  SubscriptionResponse,
  DeleteSubscriptionResponse,
  PauseSubscriptionResponse,
  ReactivateSubscriptionResponse,
  ErrorResponse,
} from "@/http/schema/subscription.schema";

export const useCreateSubscription = (
  options?: UseMutationOptions<SubscriptionResponse, ErrorResponse, CreateSubscriptionInput>
) => {
  return useMutation({
    mutationKey: ["subscriptions", "create"],
    mutationFn: subscriptionApi.createSubscription,
    ...options,
  });
};

type UpdateSubscriptionVariables = {
  id: string;
  data: UpdateSubscriptionInput;
};

export const useUpdateSubscription = (
  options?: UseMutationOptions<SubscriptionResponse, ErrorResponse, UpdateSubscriptionVariables>
) => {
  return useMutation({
    mutationKey: ["subscriptions", "update"],
    mutationFn: ({ id, data }) => subscriptionApi.updateSubscription(id, data),
    ...options,
  });
};

export const useDeleteSubscription = (
  options?: UseMutationOptions<DeleteSubscriptionResponse, ErrorResponse, string>
) => {
  return useMutation({
    mutationKey: ["subscriptions", "delete"],
    mutationFn: subscriptionApi.deleteSubscription,
    ...options,
  });
};

export const usePauseSubscription = (
  options?: UseMutationOptions<PauseSubscriptionResponse, ErrorResponse, string>
) => {
  return useMutation({
    mutationKey: ["subscriptions", "pause"],
    mutationFn: subscriptionApi.pauseSubscription,
    ...options,
  });
};

export const useReactivateSubscription = (
  options?: UseMutationOptions<ReactivateSubscriptionResponse, ErrorResponse, string>
) => {
  return useMutation({
    mutationKey: ["subscriptions", "reactivate"],
    mutationFn: subscriptionApi.reactivateSubscription,
    ...options,
  });
};
