import { api_instance } from "@/apiIntelesence";
import type { PERMISSION } from "@/types/permission.type";

export const getAllPermission = () =>
  api_instance.get(`Permission/GetPermissionsList`);

export const getPermission = (id: number) =>
  api_instance.get(`Permission/GetPermission/${id}`);

export const createPermission = (data: PERMISSION) =>
  api_instance.post(`Permission/CreatePermission`, data);

export const updatePermission = ({
  id,
  data,
}: {
  id: number;
  data: PERMISSION;
}) => api_instance.put(`Permission/EditPermission/${id}`, data);

export const deletePermission = (id: number) =>
  api_instance.delete(`Permission/DeletePermission/${id}`);
