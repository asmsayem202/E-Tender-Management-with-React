import { api_instance } from "@/apiIntelesence";
import type { ITEM } from "@/types/item.type";

export const getAllItem = () => api_instance.get(`Item/GetItemsList`);

export const getItem = (id: number) => api_instance.get(`Item/GetItem/${id}`);

export const createItem = (data: ITEM) =>
  api_instance.post(`Item/CreateItem`, data);

export const updateItem = ({ id, data }: { id: number; data: ITEM }) =>
  api_instance.put(`Item/EditItem/${id}`, data);

export const deleteItem = (id: number) =>
  api_instance.delete(`Item/DeleteItem/${id}`);
