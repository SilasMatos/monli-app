import axiosInstance from "@/lib/axios-instance";
import {
  CreateSubscriptionInput,
  UpdateSubscriptionInput,
  subscriptionResponseSchema,
  subscriptionsListResponseSchema,
  monthlyTotalResponseSchema,
  upcomingSubscriptionsResponseSchema,
  pauseSubscriptionResponseSchema,
  reactivateSubscriptionResponseSchema,
  deleteSubscriptionResponseSchema,
  subscriptionCompaniesResponseSchema,
  subscriptionCompanyResponseSchema,
} from "@/http/schema/subscription.schema";

export const subscriptionApi = {
  createSubscription: async (data: CreateSubscriptionInput) => {
    const response = await axiosInstance.post("/subscriptions", data);
    return subscriptionResponseSchema.parse(response.data);
  },

  getSubscriptions: async () => {
    const response = await axiosInstance.get("/subscriptions");
    return subscriptionsListResponseSchema.parse(response.data);
  },

  getMonthlyTotal: async () => {
    const response = await axiosInstance.get("/subscriptions/monthly-total");
    return monthlyTotalResponseSchema.parse(response.data);
  },

  getUpcoming: async () => {
    const response = await axiosInstance.get("/subscriptions/upcoming");
    return upcomingSubscriptionsResponseSchema.parse(response.data);
  },

  getSubscription: async (id: string) => {
    const response = await axiosInstance.get(`/subscriptions/${id}`);
    return subscriptionResponseSchema.parse(response.data);
  },

  updateSubscription: async (id: string, data: UpdateSubscriptionInput) => {
    const response = await axiosInstance.put(`/subscriptions/${id}`, data);
    return subscriptionResponseSchema.parse(response.data);
  },

  deleteSubscription: async (id: string) => {
    const response = await axiosInstance.delete(`/subscriptions/${id}`);
    return deleteSubscriptionResponseSchema.parse(response.data);
  },

  pauseSubscription: async (id: string) => {
    const response = await axiosInstance.patch(`/subscriptions/${id}/pause`);
    return pauseSubscriptionResponseSchema.parse(response.data);
  },

  reactivateSubscription: async (id: string) => {
    const response = await axiosInstance.patch(`/subscriptions/${id}/reactivate`);
    return reactivateSubscriptionResponseSchema.parse(response.data);
  },

  getCompanies: async () => {
    const response = await axiosInstance.get("/subscription-companies");
    return subscriptionCompaniesResponseSchema.parse(response.data);
  },

  getCompany: async (id: string) => {
    const response = await axiosInstance.get(`/subscription-companies/${id}`);
    return subscriptionCompanyResponseSchema.parse(response.data);
  },
};
