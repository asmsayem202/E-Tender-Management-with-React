import type { tenderPriceSchema } from "@/schema/tender-price.schema";
import type { z } from "zod";

export type MUTATE_TENDER_PRICE = z.infer<typeof tenderPriceSchema>;

export interface TENDER_PRICE extends MUTATE_TENDER_PRICE {
  id?: number;
  createdDate?: string;
}
