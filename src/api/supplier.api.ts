import { api_instance } from "@/apiIntelesence";
import type { SUPPLIER } from "@/types/supplier.type";

export const getAllSupplier = (status?: string) =>
  api_instance.get(`Supplier/GetAllSuppliers?status=${status}`);

export const getSupplier = (id: number) =>
  api_instance.get(`Supplier/GetSupplier/${id}`);

export const createSupplier = (data: SUPPLIER) =>
  api_instance.post(`Supplier/CreateSupplier`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

export const updateSupplier = ({
  id,
  data,
}: {
  id: number | string;
  data: SUPPLIER;
}) =>
  api_instance.put(`Supplier/UpdateSupplier/${id}`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

export const deleteSupplier = (id: number) =>
  api_instance.delete(`Supplier/DeleteSupplier/${id}`);

export const approveSupplier = ({
  id,
  data,
}: {
  id: number | string;
  data: any;
}) => api_instance.post(`Supplier/ApproveSupplier/${id}`, data);

export const declineSupplier = ({
  id,
  data,
}: {
  id: number | string;
  data: any;
}) => api_instance.post(`Supplier/DeclineSupplier/${id}`, data);
