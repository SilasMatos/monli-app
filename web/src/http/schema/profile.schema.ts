import { z } from "zod";

export const profileSchema = z.object({
  id: z.string(),
  userId: z.string(),
  firstName: z.string().nullable(),
  lastName: z.string().nullable(),
  avatar: z.string().nullable(),
  phone: z.string().nullable(),
  language: z.string(),
  timezone: z.string().nullable(),
  currency: z.string(),
  dateFormat: z.string().nullable(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

export const updateProfileSchema = z.object({
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  avatar: z.string().optional(),
  phone: z.string().optional(),
  language: z.string().optional(),
  timezone: z.string().optional(),
  currency: z.string().optional(),
  dateFormat: z.string().optional(),
});

export const subscriptionPreferencesSchema = z.object({
  subscriptionTier: z.enum(["free", "premium", "enterprise"]).optional(),
  autoRenew: z.boolean().optional(),
});

export const notificationPreferencesSchema = z.object({
  emailNotifications: z.boolean().optional(),
  pushNotifications: z.boolean().optional(),
  budgetAlerts: z.boolean().optional(),
  billReminders: z.boolean().optional(),
});

export const profileResponseSchema = z.object({
  success: z.boolean(),
  data: z.object({
    profile: profileSchema,
  }),
});

export const deleteProfileResponseSchema = z.object({
  success: z.boolean(),
  message: z.string(),
});

export const updateSubscriptionResponseSchema = z.object({
  success: z.boolean(),
  message: z.string(),
});

export const cancelSubscriptionResponseSchema = z.object({
  success: z.boolean(),
  message: z.string(),
});

export const updateNotificationsResponseSchema = z.object({
  success: z.boolean(),
  message: z.string(),
});

export type Profile = z.infer<typeof profileSchema>;
export type UpdateProfileInput = z.infer<typeof updateProfileSchema>;
export type SubscriptionPreferencesInput = z.infer<typeof subscriptionPreferencesSchema>;
export type NotificationPreferencesInput = z.infer<typeof notificationPreferencesSchema>;
export type ProfileResponse = z.infer<typeof profileResponseSchema>;
export type DeleteProfileResponse = z.infer<typeof deleteProfileResponseSchema>;
export type UpdateSubscriptionResponse = z.infer<typeof updateSubscriptionResponseSchema>;
export type CancelSubscriptionResponse = z.infer<typeof cancelSubscriptionResponseSchema>;
export type UpdateNotificationsResponse = z.infer<typeof updateNotificationsResponseSchema>;
