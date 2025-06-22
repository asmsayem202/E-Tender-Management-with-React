import { api_instance } from "@/apiIntelesence";
import type { ROLE } from "@/types/role.type";

export const getAllRole = () => api_instance.get(`Role/GetRolesList`);

export const getRole = (id: number) => api_instance.get(`Role/GetRole/${id}`);

export const createRole = (data: ROLE) =>
  api_instance.post(`Role/CreateRole`, data);

export const updateRole = ({ id, data }: { id: number; data: ROLE }) =>
  api_instance.put(`Role/EditRole/${id}`, data);

export const deleteRole = (id: number) =>
  api_instance.delete(`Role/DeleteRole/${id}`);
