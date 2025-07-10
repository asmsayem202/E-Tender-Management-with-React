import { api_instance } from "@/apiIntelesence";
import type { MARKET } from "@/types/market.type";

export const getAllMarket = () => api_instance.get(`Management/GetMarketsList`);

export const getMarket = (id: number) =>
  api_instance.get(`Management/GetMarket/${id}`);

export const createMarket = (data: MARKET) =>
  api_instance.post(`Management/CreateMarket`, data);

export const updateMarket = ({ id, data }: { id: number; data: MARKET }) =>
  api_instance.put(`Management/EditMarket/${id}`, data);

export const deleteMarket = (id: number) =>
  api_instance.delete(`Management/DeleteMarket/${id}`);
