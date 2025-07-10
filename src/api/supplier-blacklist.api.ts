import { api_instance } from "@/apiIntelesence";
import type { SUPPLIER_BLACKLIST } from "@/types/supplier-blacklist.type";

export const getAllSupplierBlacklist = () =>
  api_instance.get(`Supplier/GetAllBlacklistSuppliers`);

export const getSupplierBlacklist = (id: number) =>
  api_instance.get(`Supplier/GetBlacklistSupplier/${id}`);

export const createSupplierBlacklist = (data: SUPPLIER_BLACKLIST) =>
  api_instance.post(`Supplier/CreateSupplierBlacklist`, data);

export const deleteSupplierBlacklist = (id: number) =>
  api_instance.delete(`Supplier/DeleteSupplierBlacklist/${id}`);

export const approveSupplierBlacklist = ({
  id,
  data,
}: {
  id: number | string;
  data: any;
}) => api_instance.post(`Supplier/ApproveBlacklistSupplier/${id}`, data);

export const declineSupplierBlacklist = ({
  id,
  data,
}: {
  id: number | string;
  data: any;
}) => api_instance.post(`Supplier/DeclineBlacklistSupplier/${id}`, data);
