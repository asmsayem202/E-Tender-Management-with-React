import { api_instance } from "@/apiIntelesence";
import type { REASONABLE_PRICE } from "@/types/reasonable-price.type";

export const getAllReasonablePrice = () =>
  api_instance.get(`ReasonableRate/GetReasonableList`);

export const getReasonablePrice = (id: number) =>
  api_instance.get(`ReasonableRate/GetReasonableRate/${id}`);

export const createReasonablePrice = (data: REASONABLE_PRICE) =>
  api_instance.post(`ReasonableRate/CreateReasonableRate`, data);

export const updateReasonablePrice = ({
  id,
  data,
}: {
  id: number;
  data: REASONABLE_PRICE;
}) => api_instance.put(`ReasonableRate/EditReasonableRate/${id}`, data);

export const deleteReasonablePrice = (id: number) =>
  api_instance.delete(`ReasonableRate/DeleteReasonableRate/${id}`);

export const updateBoardApprovedPrice = ({
  id,
  data,
}: {
  id: number;
  data: any;
}) => api_instance.put(`ReasonableRate/UpdateBoardApprovedPrice/${id}`, data);
