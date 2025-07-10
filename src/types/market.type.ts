import type { marketSchema } from "@/schema/market.schema";
import type { z } from "zod";

export type MUTATE_MARKET = z.infer<typeof marketSchema>;

export interface MARKET extends MUTATE_MARKET {
  id?: number;
}
