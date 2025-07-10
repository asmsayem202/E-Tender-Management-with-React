import { api_instance } from "@/apiIntelesence";
import type { FACTOR } from "@/types/factor.type";

export const getAllFactor = () => api_instance.get(`Management/GetAllFactors`);

export const getFactor = (id: number) =>
  api_instance.get(`Management/GetFactor/${id}`);

export const createFactor = (data: FACTOR) =>
  api_instance.post(`Management/CreateFactor`, data);

export const updateFactor = ({ id, data }: { id: number; data: FACTOR }) =>
  api_instance.put(`Management/EditFactor/${id}`, data);

export const deleteFactor = (id: number) =>
  api_instance.delete(`Management/DeleteFactor/${id}`);
