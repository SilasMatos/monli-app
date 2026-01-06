import axiosInstance from "@/lib/axios-instance";
import {
  CreateCreditCardInput,
  UpdateCreditCardInput,
  CreditCardExpenseInput,
  creditCardResponseSchema,
  creditCardsListResponseSchema,
  availableCreditResponseSchema,
  creditCardExpenseResponseSchema,
  deleteCreditCardResponseSchema,
} from "@/http/schema/credit-card.schema";

export const creditCardApi = {
  createCreditCard: async (data: CreateCreditCardInput) => {
    const response = await axiosInstance.post("/credit-cards", data);
    return creditCardResponseSchema.parse(response.data);
  },

  getCreditCards: async () => {
    const response = await axiosInstance.get("/credit-cards");
    return creditCardsListResponseSchema.parse(response.data);
  },

  getCreditCard: async (id: string) => {
    const response = await axiosInstance.get(`/credit-cards/${id}`);
    return creditCardResponseSchema.parse(response.data);
  },

  updateCreditCard: async (id: string, data: UpdateCreditCardInput) => {
    const response = await axiosInstance.put(`/credit-cards/${id}`, data);
    return creditCardResponseSchema.parse(response.data);
  },

  deleteCreditCard: async (id: string) => {
    const response = await axiosInstance.delete(`/credit-cards/${id}`);
    return deleteCreditCardResponseSchema.parse(response.data);
  },

  getAvailableCredit: async (id: string) => {
    const response = await axiosInstance.get(`/credit-cards/${id}/available-credit`);
    return availableCreditResponseSchema.parse(response.data);
  },

  addExpense: async (id: string, data: CreditCardExpenseInput) => {
    const response = await axiosInstance.post(`/credit-cards/${id}/expense`, data);
    return creditCardExpenseResponseSchema.parse(response.data);
  },
};
