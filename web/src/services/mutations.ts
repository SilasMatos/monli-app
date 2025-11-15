
import axiosInstance from "@/lib/axios-instance";
import { RegisterMutation, LoginMutation, createAccount } from "@/types/mutations-types";

export async function Login(payload: LoginMutation) {
  const response = await axiosInstance.post("/api/auth/login", payload, {
  });
  return response.data;
}

export async function Register(payload: RegisterMutation) {
  const response = await axiosInstance.post("/api/auth/register", payload, {});
  return response.data;
}

export async function Logout() {
  const response = await axiosInstance.post("/api/auth/logout", {});
  return response.data;
}

export async function CreateAccount(payload: createAccount) {
  const formData = new FormData();
  const processedPayload = {
    ...payload,
    initialBalance: Number(payload.initialBalance)
  };

  Object.entries(processedPayload).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      formData.append(key, value as any);
    }
  });

  const response = await axiosInstance.post("/api/auth/account", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
}