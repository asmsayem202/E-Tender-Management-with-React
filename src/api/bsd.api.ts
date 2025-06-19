import { api_instance } from "@/apiIntelesence";
import type { BSD } from "@/types/bsd.type";

export const getAllBsd = () => api_instance.get(`Bsd/GetAllBsdList`);

export const getBsd = (id: number | string) =>
  api_instance.get(`Bsd/GetBsd/${id}`);

export const deactivateBsd = ({ bsd_id }: { bsd_id: number }) =>
  api_instance.get(`Bsd/DeactivateBsd/${bsd_id}`);

export const activateBsd = ({ bsd_id }: { bsd_id: number }) =>
  api_instance.get(`Bsd/ActivateBsd/${bsd_id}`);

export const createBsd = (data: BSD) =>
  api_instance.post(`Bsd/CreateBsd`, data);

export const updateBsd = ({ id, data }: { id: number | string; data: BSD }) =>
  api_instance.put(`Bsd/UpdateBsd/${id}`, data);
