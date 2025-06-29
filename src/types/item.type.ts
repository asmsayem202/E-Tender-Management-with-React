import type { itemSchema } from "@/schema/item.schema";
import type { z } from "zod";

export type MUTATE_ITEM = z.infer<typeof itemSchema>;

export interface ITEM extends MUTATE_ITEM {
  id?: number;
  categoryName?: string;
  unitName?: string;
  isActive?: boolean;
}
