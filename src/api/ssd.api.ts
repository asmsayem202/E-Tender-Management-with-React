import { api_instance } from "@/apiIntelesence";
import type { SSD } from "@/types/ssd.type";

export const getAllSsd = () => api_instance.get(`Ssd/GetAllSsdList`);

export const getSsd = (id: number | string) =>
  api_instance.get(`Ssd/GetSsd/${id}`);

export const deactivateSsd = ({ ssd_id }: { ssd_id: number }) =>
  api_instance.get(`Ssd/DeactivateSsd/${ssd_id}`);

export const activateSsd = ({ ssd_id }: { ssd_id: number }) =>
  api_instance.get(`Ssd/ActivateSsd/${ssd_id}`);

export const createSsd = (data: SSD) =>
  api_instance.post(`Ssd/CreateSsd`, data);

export const updateSsd = ({ id, data }: { id: number | string; data: SSD }) =>
  api_instance.put(`Ssd/UpdateSsd/${id}`, data);
