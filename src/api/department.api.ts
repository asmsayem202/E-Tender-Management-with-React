import { api_instance } from "@/apiIntelesence";
import type { DEPARTMENT } from "@/types/department.type";

export const getAllDepartment = () =>
  api_instance.get(`Management/GetDepartmentsList`);

export const getDepartment = (id: number) =>
  api_instance.get(`Management/GetDepartment/${id}`);

export const createDepartment = (data: DEPARTMENT) =>
  api_instance.post(`Management/CreateDepartment`, data);

export const updateDepartment = ({
  id,
  data,
}: {
  id: number;
  data: DEPARTMENT;
}) => api_instance.put(`Management/EditDepartment/${id}`, data);

export const deleteDepartment = (id: number) =>
  api_instance.delete(`Management/DeleteDepartment/${id}`);
