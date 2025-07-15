import { api_instance } from "@/apiIntelesence";

export const getAllTenderGuidelines = () =>
  api_instance.get(`Tender/GetAllTenderGuidelines`);

export const getTenderGuideline = (id: any) =>
  api_instance.get(`Tender/GetTenderGuideline/${id}`);

export const createTenderGuideline = (data: any) =>
  api_instance.post(`Tender/CreateTenderGuideline`, data);

export const updateTenderGuideline = (data: any) =>
  api_instance.put(`Tender/EditTenderGuideline/${data.id}`, data.data);

export const deleteTenderGuideline = (id: any) =>
  api_instance.delete(`Tender/DeleteTenderGuideline/${id}`);
