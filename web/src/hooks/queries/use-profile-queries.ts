import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { profileApi } from "@/http/api/profile.api";
import {
  ProfileResponse,
  ErrorResponse,
} from "@/http/schema/profile.schema";

export const useProfile = (
  options?: Omit<UseQueryOptions<ProfileResponse, ErrorResponse>, "queryKey" | "queryFn">
) => {
  return useQuery({
    queryKey: ["profile"],
    queryFn: profileApi.getProfile,
    ...options,
  });
};
