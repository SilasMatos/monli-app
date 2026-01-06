import axiosInstance from "@/lib/axios-instance";
import {
  UpdateProfileInput,
  SubscriptionPreferencesInput,
  NotificationPreferencesInput,
  profileResponseSchema,
  deleteProfileResponseSchema,
  updateSubscriptionResponseSchema,
  cancelSubscriptionResponseSchema,
  updateNotificationsResponseSchema,
} from "@/http/schema/profile.schema";

export const profileApi = {
  getProfile: async () => {
    const response = await axiosInstance.get("/profile");
    return profileResponseSchema.parse(response.data);
  },

  updateProfile: async (data: UpdateProfileInput) => {
    const response = await axiosInstance.put("/profile", data);
    return profileResponseSchema.parse(response.data);
  },

  deleteProfile: async () => {
    const response = await axiosInstance.delete("/profile");
    return deleteProfileResponseSchema.parse(response.data);
  },

  updateSubscription: async (data: SubscriptionPreferencesInput) => {
    const response = await axiosInstance.put("/profile/subscription", data);
    return updateSubscriptionResponseSchema.parse(response.data);
  },

  cancelSubscription: async () => {
    const response = await axiosInstance.post("/profile/subscription/cancel");
    return cancelSubscriptionResponseSchema.parse(response.data);
  },

  updateNotifications: async (data: NotificationPreferencesInput) => {
    const response = await axiosInstance.put("/profile/notifications", data);
    return updateNotificationsResponseSchema.parse(response.data);
  },
};
