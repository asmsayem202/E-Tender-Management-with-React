import { api_instance } from "@/apiIntelesence";
import type { TENDER_GUIDELINE } from "@/types/tender-guideline.type";

export const getAllTenderGuidelines = () =>
  api_instance.get(`Tender/GetAllTenderGuidelines`);

export const getTenderGuideline = (id: any) =>
  api_instance.get(`Tender/GetTenderGuideline/${id}`);

export const createTenderGuideline = (data: TENDER_GUIDELINE) =>
  api_instance.post(`Tender/CreateTenderGuideline`, data);

export const updateTenderGuideline = ({
  id,
  data,
}: {
  id: any;
  data: TENDER_GUIDELINE;
}) => api_instance.put(`Tender/EditTenderGuideline/${id}`, data);

export const deleteTenderGuideline = (id: number) =>
  api_instance.delete(`Tender/DeleteTenderGuideline/${id}`);
