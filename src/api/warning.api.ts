import { api_instance } from "@/apiIntelesence";
import type { WARNING } from "@/types/warning.type";

export const getAllWarning = () =>
  api_instance.get(`Management/GetWarningList`);

export const getWarning = (id: number) =>
  api_instance.get(`Management/GetWarning/${id}`);

export const createWarning = (data: WARNING) =>
  api_instance.post(`Management/CreateWarning`, data);

export const updateWarning = ({ id, data }: { id: number; data: WARNING }) =>
  api_instance.put(`Management/EditWarning/${id}`, data);

export const deleteWarning = (id: number) =>
  api_instance.delete(`Management/DeleteWarning/${id}`);
