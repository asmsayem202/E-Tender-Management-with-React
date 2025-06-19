import type { cantonmentSchema } from "@/schema/cantonment.schema";
import type { z } from "zod";

export type MUTATE_CANTONMENT = z.infer<typeof cantonmentSchema>;

export interface CANTONMENT extends MUTATE_CANTONMENT {
  id?: number;
}
