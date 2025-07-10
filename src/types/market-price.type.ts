import type { marketPriceSchema } from "@/schema/market-price.schema";
import type { z } from "zod";

export type MUTATE_MARKET_PRICE = z.infer<typeof marketPriceSchema>;

export interface MARKET_PRICE extends MUTATE_MARKET_PRICE {
  id?: number;
  itemName?: string;
  marketName?: string;
}
