import type { factorSchema } from "@/schema/factor.schema";
import type { z } from "zod";

export type MUTATE_FACTOR = z.infer<typeof factorSchema>;

export interface FACTOR extends MUTATE_FACTOR {
  id?: number;
}
