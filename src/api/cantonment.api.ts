import { api_instance } from "@/apiIntelesence";
import type { CANTONMENT } from "@/types/cantonment.type";

export const getAllCantonment = () =>
  api_instance.get(`Management/GetAllCantonment`);

export const getCantonment = (id: number) =>
  api_instance.get(`Management/GetCantonment/${id}`);

export const createCantonment = (data: CANTONMENT) =>
  api_instance.post(`Management/CreateCantonment`, data);

export const updateCantonment = ({
  id,
  data,
}: {
  id: number;
  data: CANTONMENT;
}) => api_instance.put(`Management/EditCantonment/${id}`, data);

export const deleteCantonment = (id: number) =>
  api_instance.delete(`Management/DeleteCantonment/${id}`);
