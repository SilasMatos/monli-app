import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { profileApi } from "@/http/api/profile.api";
import {
  UpdateProfileInput,
  SubscriptionPreferencesInput,
  NotificationPreferencesInput,
  ProfileResponse,
  DeleteProfileResponse,
  UpdateSubscriptionResponse,
  CancelSubscriptionResponse,
  UpdateNotificationsResponse,
  ErrorResponse,
} from "@/http/schema/profile.schema";

export const useUpdateProfile = (
  options?: UseMutationOptions<ProfileResponse, ErrorResponse, UpdateProfileInput>
) => {
  return useMutation({
    mutationKey: ["profile", "update"],
    mutationFn: profileApi.updateProfile,
    ...options,
  });
};

export const useDeleteProfile = (
  options?: UseMutationOptions<DeleteProfileResponse, ErrorResponse, void>
) => {
  return useMutation({
    mutationKey: ["profile", "delete"],
    mutationFn: profileApi.deleteProfile,
    ...options,
  });
};

export const useUpdateSubscriptionPreferences = (
  options?: UseMutationOptions<UpdateSubscriptionResponse, ErrorResponse, SubscriptionPreferencesInput>
) => {
  return useMutation({
    mutationKey: ["profile", "subscription", "update"],
    mutationFn: profileApi.updateSubscription,
    ...options,
  });
};

export const useCancelSubscriptionPreferences = (
  options?: UseMutationOptions<CancelSubscriptionResponse, ErrorResponse, void>
) => {
  return useMutation({
    mutationKey: ["profile", "subscription", "cancel"],
    mutationFn: profileApi.cancelSubscription,
    ...options,
  });
};

export const useUpdateNotifications = (
  options?: UseMutationOptions<UpdateNotificationsResponse, ErrorResponse, NotificationPreferencesInput>
) => {
  return useMutation({
    mutationKey: ["profile", "notifications", "update"],
    mutationFn: profileApi.updateNotifications,
    ...options,
  });
};
