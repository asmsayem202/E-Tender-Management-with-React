import type { parentCategorySchema } from "@/schema/parent-category.schema";
import type { z } from "zod";

export type MUTATE_PARENT_CATEGORY = z.infer<typeof parentCategorySchema>;

export interface PARENT_CATEGORY extends MUTATE_PARENT_CATEGORY {
  id?: number;
}
