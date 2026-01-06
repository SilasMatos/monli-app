import { z } from "zod";

export const subscriptionCompanySchema = z.object({
  id: z.string(),
  name: z.string(),
  logo: z.string().nullable(),
  website: z.string().nullable(),
  category: z.string().nullable(),
});

export const subscriptionSchema = z.object({
  id: z.string(),
  userId: z.string(),
  companyId: z.string().nullable(),
  name: z.string(),
  amount: z.number(),
  billingCycle: z.enum(["monthly", "yearly", "weekly", "quarterly"]),
  nextBillingDate: z.string().datetime(),
  category: z.string().nullable(),
  isActive: z.boolean(),
  isPaused: z.boolean(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

export const createSubscriptionSchema = z.object({
  companyId: z.string().optional(),
  name: z.string(),
  amount: z.number().positive(),
  billingCycle: z.enum(["monthly", "yearly", "weekly", "quarterly"]),
  nextBillingDate: z.string().datetime(),
  category: z.string().optional(),
});

export const updateSubscriptionSchema = z.object({
  name: z.string().optional(),
  amount: z.number().positive().optional(),
  billingCycle: z.enum(["monthly", "yearly", "weekly", "quarterly"]).optional(),
  nextBillingDate: z.string().datetime().optional(),
  category: z.string().optional(),
  isActive: z.boolean().optional(),
});

export const monthlyTotalSchema = z.object({
  total: z.number(),
  subscriptionsCount: z.number(),
});

export const upcomingSubscriptionSchema = z.object({
  id: z.string(),
  name: z.string(),
  amount: z.number(),
  nextBillingDate: z.string().datetime(),
  daysUntilBilling: z.number(),
});

export const subscriptionResponseSchema = z.object({
  success: z.boolean(),
  data: z.object({
    subscription: subscriptionSchema,
  }),
});

export const subscriptionsListResponseSchema = z.object({
  success: z.boolean(),
  data: z.object({
    subscriptions: z.array(subscriptionSchema),
  }),
});

export const monthlyTotalResponseSchema = z.object({
  success: z.boolean(),
  data: monthlyTotalSchema,
});

export const upcomingSubscriptionsResponseSchema = z.object({
  success: z.boolean(),
  data: z.object({
    upcoming: z.array(upcomingSubscriptionSchema),
  }),
});

export const pauseSubscriptionResponseSchema = z.object({
  success: z.boolean(),
  message: z.string(),
});

export const reactivateSubscriptionResponseSchema = z.object({
  success: z.boolean(),
  message: z.string(),
});

export const deleteSubscriptionResponseSchema = z.object({
  success: z.boolean(),
  message: z.string(),
});

export const subscriptionCompaniesResponseSchema = z.object({
  success: z.boolean(),
  data: z.object({
    companies: z.array(subscriptionCompanySchema),
  }),
});

export const subscriptionCompanyResponseSchema = z.object({
  success: z.boolean(),
  data: z.object({
    company: subscriptionCompanySchema,
  }),
});

export type SubscriptionCompany = z.infer<typeof subscriptionCompanySchema>;
export type Subscription = z.infer<typeof subscriptionSchema>;
export type CreateSubscriptionInput = z.infer<typeof createSubscriptionSchema>;
export type UpdateSubscriptionInput = z.infer<typeof updateSubscriptionSchema>;
export type MonthlyTotal = z.infer<typeof monthlyTotalSchema>;
export type UpcomingSubscription = z.infer<typeof upcomingSubscriptionSchema>;
export type SubscriptionResponse = z.infer<typeof subscriptionResponseSchema>;
export type SubscriptionsListResponse = z.infer<typeof subscriptionsListResponseSchema>;
export type MonthlyTotalResponse = z.infer<typeof monthlyTotalResponseSchema>;
export type UpcomingSubscriptionsResponse = z.infer<typeof upcomingSubscriptionsResponseSchema>;
export type PauseSubscriptionResponse = z.infer<typeof pauseSubscriptionResponseSchema>;
export type ReactivateSubscriptionResponse = z.infer<typeof reactivateSubscriptionResponseSchema>;
export type DeleteSubscriptionResponse = z.infer<typeof deleteSubscriptionResponseSchema>;
export type SubscriptionCompaniesResponse = z.infer<typeof subscriptionCompaniesResponseSchema>;
export type SubscriptionCompanyResponse = z.infer<typeof subscriptionCompanyResponseSchema>;
