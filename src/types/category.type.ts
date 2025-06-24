import type { categorySchema } from "@/schema/category.schema";
import type { z } from "zod";

export type MUTATE_CATEGORY = z.infer<typeof categorySchema>;

export interface CATEGORY extends MUTATE_CATEGORY {
  id?: number;
  parentCategoryName?: string;
  isActive?: boolean;
}
