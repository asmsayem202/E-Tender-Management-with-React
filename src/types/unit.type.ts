import type { unitSchema } from "@/schema/unit.schema";
import type { z } from "zod";

export type MUTATE_UNIT = z.infer<typeof unitSchema>;

export interface UNIT extends MUTATE_UNIT {
  id?: number;
}
