import { z } from 'zod'

export const welcomeSchema = z.object({
  initialBalance: z.string(),
  theme: z.enum(['light', 'dark', 'system']),
  language: z.enum(['pt-BR', 'en-US']),
  currency: z.enum(['BRL', 'USD', 'EUR', 'GBP']),
  notifications: z.boolean(),
  emailNotifications: z.boolean(),
  twoFactorEnabled: z.boolean(),
  avatar: z.string().optional()
})

export type WelcomeFormData = z.infer<typeof welcomeSchema>