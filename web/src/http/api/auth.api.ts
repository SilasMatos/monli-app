import axiosInstance from "@/lib/axios-instance";
import {
  RegisterInput,
  LoginInput,
  TwoFactorCodeInput,
  registerResponseSchema,
  loginResponseSchema,
  logoutResponseSchema,
  refreshResponseSchema,
  meResponseSchema,
  twoFactorSetupResponseSchema,
  twoFactorToggleResponseSchema,
  googleAuthUrlResponseSchema,
} from "@/http/schema/auth.schema";

export const authApi = {
  register: async (data: RegisterInput) => {
    const response = await axiosInstance.post("/api/auth/register", data);
    return registerResponseSchema.parse(response.data);
  },

  login: async (data: LoginInput) => {
    const response = await axiosInstance.post("/api/auth/login", data);
    return loginResponseSchema.parse(response.data);
  },

  logout: async () => {
    const response = await axiosInstance.post("/api/auth/logout");
    return logoutResponseSchema.parse(response.data);
  },

  refresh: async () => {
    const response = await axiosInstance.post("/api/auth/refresh");
    return refreshResponseSchema.parse(response.data);
  },

  me: async () => {
    const response = await axiosInstance.get("/api/auth/me");
    return meResponseSchema.parse(response.data);
  },

  setup2FA: async () => {
    const response = await axiosInstance.post("/api/auth/2fa/setup");
    return twoFactorSetupResponseSchema.parse(response.data);
  },

  enable2FA: async (data: TwoFactorCodeInput) => {
    const response = await axiosInstance.post("/api/auth/2fa/enable", data);
    return twoFactorToggleResponseSchema.parse(response.data);
  },

  disable2FA: async (data: TwoFactorCodeInput) => {
    const response = await axiosInstance.post("/api/auth/2fa/disable", data);
    return twoFactorToggleResponseSchema.parse(response.data);
  },

  getGoogleAuthUrl: async () => {
    const response = await axiosInstance.get("/api/auth/google");
    return googleAuthUrlResponseSchema.parse(response.data);
  },
};
