import type { departmentSchema } from "@/schema/department.schema";
import type { z } from "zod";

export type MUTATE_DEPARTMENT = z.infer<typeof departmentSchema>;

export interface DEPARTMENT extends MUTATE_DEPARTMENT {
  id?: number;
}
