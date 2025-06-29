import type { warningSchema } from "@/schema/warning.schema";
import type { z } from "zod";

export type MUTATE_WARNING = z.infer<typeof warningSchema>;

export interface WARNING extends MUTATE_WARNING {
  id?: number;
}
