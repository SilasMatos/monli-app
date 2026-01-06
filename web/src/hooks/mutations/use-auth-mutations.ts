import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { authApi } from "@/http/api/auth.api";
import {
  RegisterInput,
  LoginInput,
  TwoFactorCodeInput,
  RegisterResponse,
  LoginResponse,
  LogoutResponse,
  TwoFactorSetupResponse,
  TwoFactorToggleResponse,
  ErrorResponse,
} from "@/http/schema/auth.schema";

export const useRegister = (
  options?: UseMutationOptions<RegisterResponse, ErrorResponse, RegisterInput>
) => {
  return useMutation({
    mutationKey: ["auth", "register"],
    mutationFn: authApi.register,
    ...options,
  });
};

export const useLogin = (
  options?: UseMutationOptions<LoginResponse, ErrorResponse, LoginInput>
) => {
  return useMutation({
    mutationKey: ["auth", "login"],
    mutationFn: authApi.login,
    ...options,
  });
};

export const useLogout = (
  options?: UseMutationOptions<LogoutResponse, ErrorResponse, void>
) => {
  return useMutation({
    mutationKey: ["auth", "logout"],
    mutationFn: authApi.logout,
    ...options,
  });
};

export const useRefreshToken = (
  options?: UseMutationOptions<LogoutResponse, ErrorResponse, void>
) => {
  return useMutation({
    mutationKey: ["auth", "refresh"],
    mutationFn: authApi.refresh,
    ...options,
  });
};

export const useSetup2FA = (
  options?: UseMutationOptions<TwoFactorSetupResponse, ErrorResponse, void>
) => {
  return useMutation({
    mutationKey: ["auth", "2fa", "setup"],
    mutationFn: authApi.setup2FA,
    ...options,
  });
};

export const useEnable2FA = (
  options?: UseMutationOptions<TwoFactorToggleResponse, ErrorResponse, TwoFactorCodeInput>
) => {
  return useMutation({
    mutationKey: ["auth", "2fa", "enable"],
    mutationFn: authApi.enable2FA,
    ...options,
  });
};

export const useDisable2FA = (
  options?: UseMutationOptions<TwoFactorToggleResponse, ErrorResponse, TwoFactorCodeInput>
) => {
  return useMutation({
    mutationKey: ["auth", "2fa", "disable"],
    mutationFn: authApi.disable2FA,
    ...options,
  });
};
