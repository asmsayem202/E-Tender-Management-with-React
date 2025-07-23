import { api_instance } from "@/apiIntelesence";
import type { TENDER_PRICE } from "@/types/tender-price.type";

export const getAllTenderPrices = () =>
  api_instance.get(`Tender/GetAllTenderPrices`);

export const getTenderPrice = (id: any) =>
  api_instance.get(`Tender/GetTenderPriceById/${id}`);

export const createTenderPrice = (data: TENDER_PRICE) =>
  api_instance.post(`Tender/CreateTenderPrice`, data);

export const updateTenderPrice = ({
  id,
  data,
}: {
  id: number;
  data: TENDER_PRICE;
}) => api_instance.put(`Tender/EditTenderPrice/${id}`, data);

export const deleteTenderPrice = (id: any) =>
  api_instance.delete(`Tender/DeleteTenderPrice/${id}`);
