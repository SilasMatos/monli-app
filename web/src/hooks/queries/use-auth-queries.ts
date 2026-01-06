import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { authApi } from "@/http/api/auth.api";
import {
  MeResponse,
  GoogleAuthUrlResponse,
  ErrorResponse,
} from "@/http/schema/auth.schema";

export const useMe = (
  options?: Omit<UseQueryOptions<MeResponse, ErrorResponse>, "queryKey" | "queryFn">
) => {
  return useQuery({
    queryKey: ["auth", "me"],
    queryFn: authApi.me,
    ...options,
  });
};

export const useGoogleAuthUrl = (
  options?: Omit<UseQueryOptions<GoogleAuthUrlResponse, ErrorResponse>, "queryKey" | "queryFn">
) => {
  return useQuery({
    queryKey: ["auth", "google", "url"],
    queryFn: authApi.getGoogleAuthUrl,
    enabled: false,
    ...options,
  });
};
