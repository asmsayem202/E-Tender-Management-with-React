import type { permissionSchema } from "@/schema/permission.schema";
import type { z } from "zod";

export type MUTATE_PERMISSION = z.infer<typeof permissionSchema>;

export interface PERMISSION extends MUTATE_PERMISSION {
  id?: number;
  tag?: string;
}
