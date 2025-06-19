import type { bsdSchema } from "@/schema/bsd.schema";
import type { z } from "zod";

export type MUTATE_BSD = z.infer<typeof bsdSchema>;

export interface BSD extends MUTATE_BSD {
  id?: number;
  code?: string;
  cantonmentName?: string;
}
