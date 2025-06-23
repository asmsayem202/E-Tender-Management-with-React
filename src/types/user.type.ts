import type { userSchema } from "@/schema/user.schema";
import type { z } from "zod";

export type MUTATE_USER = z.infer<typeof userSchema>;

export interface USER extends MUTATE_USER {
  id?: number;
  departmentName?: string;
  bsdName?: string;
  ssdName?: string;
  roleNames?: string[];
  roles?: { roleId: string; roleName: string }[];
}
