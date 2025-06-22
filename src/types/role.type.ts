import type { roleSchema } from "@/schema/role.schema";
import type { z } from "zod";

export type MUTATE_ROLE = z.infer<typeof roleSchema>;

export interface ROLE extends MUTATE_ROLE {
  id?: number;
}
