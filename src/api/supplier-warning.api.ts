import { api_instance } from "@/apiIntelesence";
import type { UNIT } from "@/types/unit.type";

export const getAllSupplierWarning = () =>
  api_instance.get(`Supplier/GetAllSupplierWarnings`);

export const getSupplierWarning = (id: number) =>
  api_instance.get(`Supplier/GetSupplierWarning/${id}`);

export const createSupplierWarning = (data: UNIT) =>
  api_instance.post(`Supplier/CreateSupplierWarning`, data);

export const updateSupplierWarning = ({
  id,
  data,
}: {
  id: number;
  data: UNIT;
}) => api_instance.put(`Supplier/EditSupplierWarning/${id}`, data);

export const deleteSupplierWarning = (id: number) =>
  api_instance.delete(`Supplier/DeleteSupplierWarning/${id}`);
