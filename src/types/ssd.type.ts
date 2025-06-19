import type { ssdSchema } from "@/schema/ssd.schema";
import type { z } from "zod";

export type MUTATE_SSD = z.infer<typeof ssdSchema>;

export interface SSD extends MUTATE_SSD {
  id?: number;
  code?: string;
  cantonmentName?: string;
}
