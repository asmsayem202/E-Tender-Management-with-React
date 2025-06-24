import { api_instance } from "@/apiIntelesence";
import type { PARENT_CATEGORY } from "@/types/parent-category.type";

export const getAllParentCategory = () =>
  api_instance.get(`ParentCategory/GetParentCategoriesList`);

export const getParentCategory = (id: number) =>
  api_instance.get(`ParentCategory/GetParentCategory/${id}`);

export const createParentCategory = (data: PARENT_CATEGORY) =>
  api_instance.post(`ParentCategory/CreateParentCategory`, data);

export const updateParentCategory = ({
  id,
  data,
}: {
  id: number;
  data: PARENT_CATEGORY;
}) => api_instance.put(`ParentCategory/EditParentCategory/${id}`, data);

export const deleteParentCategory = (id: number) =>
  api_instance.delete(`ParentCategory/DeleteParentCategory/${id}`);
