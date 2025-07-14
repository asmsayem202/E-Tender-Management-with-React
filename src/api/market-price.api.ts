import { api_instance } from "@/apiIntelesence";
import type { MARKET_PRICE } from "@/types/market-price.type";

export const getAllMarketPrice = () =>
  api_instance.get(`MarketPriceEntry/GetAllMarketPrice`);

export const getMarketPrice = (id: number) =>
  api_instance.get(`MarketPriceEntry/GetMarketPrice/${id}`);

export const createMarketPrice = (data: MARKET_PRICE) =>
  api_instance.post(`MarketPriceEntry/AddMarketPriceEntry`, data);

export const updateMarketPrice = ({
  id,
  data,
}: {
  id: number;
  data: MARKET_PRICE;
}) => api_instance.put(`MarketPriceEntry/UpdateMarketPrice/${id}`, data);

export const deleteMarketPrice = (id: number) =>
  api_instance.delete(`MarketPriceEntry/DeleteMarketPrice/${id}`);

export const getItemMarketPrice = (itemId: number) =>
  api_instance.get(`MarketPriceEntry/GetItemMarketPrice/${itemId}`);
