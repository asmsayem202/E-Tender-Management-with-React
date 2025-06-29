import { api_instance } from "@/apiIntelesence";
import type { UNIT } from "@/types/unit.type";

export const getAllUnit = () => api_instance.get(`Management/GetAllUnit`);

export const getUnit = (id: number) =>
  api_instance.get(`Management/GetUnit/${id}`);

export const createUnit = (data: UNIT) =>
  api_instance.post(`Management/CreateUnit`, data);

export const updateUnit = ({ id, data }: { id: number; data: UNIT }) =>
  api_instance.put(`Management/EditUnit/${id}`, data);

export const deleteUnit = (id: number) =>
  api_instance.delete(`Management/DeleteUnit/${id}`);
