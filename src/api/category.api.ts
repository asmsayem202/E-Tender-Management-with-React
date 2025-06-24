import { api_instance } from "@/apiIntelesence";
import type { CATEGORY } from "@/types/category.type";

export const getAllCategory = () =>
  api_instance.get(`ProductCategory/GetProductCategoriesList`);

export const getCategory = (id: number) =>
  api_instance.get(`ProductCategory/GetProductCategory/${id}`);

export const createCategory = (data: CATEGORY) =>
  api_instance.post(`ProductCategory/CreateProductCategory`, data);

export const updateCategory = ({ id, data }: { id: number; data: CATEGORY }) =>
  api_instance.put(`ProductCategory/EditProductCategory/${id}`, data);

export const deleteCategory = (id: number) =>
  api_instance.delete(`ProductCategory/DeleteProductCategory/${id}`);
