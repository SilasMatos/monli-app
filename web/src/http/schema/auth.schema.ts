import { z } from "zod";

const emailRegex = /^(?!\.)(?!.*\.\.)([A-Za-z0-9_'+\-\.]*)[A-Za-z0-9_+-]@([A-Za-z0-9][A-Za-z0-9\-]*\.)+[A-Za-z]{2,}$/;

export const registerSchema = z.object({
  email: z.string().email().regex(emailRegex),
  password: z.string().min(8),
  name: z.string().optional(),
});

export const loginSchema = z.object({
  email: z.string().email().regex(emailRegex),
  password: z.string(),
  twoFactorCode: z.string().optional(),
});

export const twoFactorCodeSchema = z.object({
  code: z.string().min(6).max(6),
});

export const userSchema = z.object({
  id: z.string(),
  email: z.string(),
  name: z.string().nullable(),
  emailVerified: z.boolean().nullable(),
  twoFactorEnabled: z.boolean().nullable(),
});

export const userDetailsSchema = userSchema.extend({
  isActive: z.boolean().nullable(),
  createdAt: z.string().datetime().nullable(),
});

export const registerResponseSchema = z.object({
  success: z.boolean(),
  data: z.object({
    user: userSchema,
  }),
});

export const loginResponseSchema = z.discriminatedUnion("requiresTwoFactor", [
  z.object({
    success: z.boolean(),
    requiresTwoFactor: z.literal(true),
    message: z.string(),
  }),
  z.object({
    success: z.boolean(),
    requiresTwoFactor: z.literal(false).optional(),
    data: z.object({
      user: userSchema,
    }),
  }),
]);

export const logoutResponseSchema = z.object({
  success: z.boolean(),
  message: z.string(),
});

export const refreshResponseSchema = z.object({
  success: z.boolean(),
  message: z.string(),
});

export const meResponseSchema = z.object({
  success: z.boolean(),
  data: z.object({
    user: userDetailsSchema,
  }),
});

export const twoFactorSetupResponseSchema = z.object({
  success: z.boolean(),
  data: z.object({
    secret: z.string(),
    qrCode: z.string(),
  }),
});

export const twoFactorToggleResponseSchema = z.object({
  success: z.boolean(),
  message: z.string(),
});

export const googleAuthUrlResponseSchema = z.object({
  success: z.boolean(),
  data: z.object({
    url: z.string(),
  }),
});

export const errorResponseSchema = z.object({
  success: z.boolean(),
  error: z.string(),
});

export type RegisterInput = z.infer<typeof registerSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
export type TwoFactorCodeInput = z.infer<typeof twoFactorCodeSchema>;
export type User = z.infer<typeof userSchema>;
export type UserDetails = z.infer<typeof userDetailsSchema>;
export type RegisterResponse = z.infer<typeof registerResponseSchema>;
export type LoginResponse = z.infer<typeof loginResponseSchema>;
export type LogoutResponse = z.infer<typeof logoutResponseSchema>;
export type RefreshResponse = z.infer<typeof refreshResponseSchema>;
export type MeResponse = z.infer<typeof meResponseSchema>;
export type TwoFactorSetupResponse = z.infer<typeof twoFactorSetupResponseSchema>;
export type TwoFactorToggleResponse = z.infer<typeof twoFactorToggleResponseSchema>;
export type GoogleAuthUrlResponse = z.infer<typeof googleAuthUrlResponseSchema>;
export type ErrorResponse = z.infer<typeof errorResponseSchema>;
