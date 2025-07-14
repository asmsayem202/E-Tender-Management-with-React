import type { reasonablePriceSchema } from "@/schema/reasonable-price.schema";
import type { z } from "zod";

export type MUTATE_REASONABLE_PRICE = z.infer<typeof reasonablePriceSchema>;

export interface REASONABLE_PRICE extends MUTATE_REASONABLE_PRICE {
  id?: number;
  itemName?: string;
  unitName?: string;
  boardApprovedMaxPrice?: string;
}
