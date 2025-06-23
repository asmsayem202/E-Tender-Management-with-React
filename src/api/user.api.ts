import { api_instance } from "@/apiIntelesence";
import type { USER } from "@/types/user.type";

export const getAllUser = () => api_instance.get(`User/GetAllUsers`);

export const getUser = (id: number) => api_instance.get(`User/GetUser/${id}`);

export const createUser = (data: USER) =>
  api_instance.post(`User/CreateUser`, data);

export const changePassword = (data: any) =>
  api_instance.post(`User/ChangePassword`, data);

export const updateUser = ({ id, data }: { id: number; data: USER }) =>
  api_instance.put(`User/UpdateUser/${id}`, data);

export const deleteUser = (id: number) =>
  api_instance.delete(`User/DeleteUser/${id}`);
