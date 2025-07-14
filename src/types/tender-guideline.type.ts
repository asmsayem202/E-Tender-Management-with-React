import type { tenderGuidelineSchema } from "@/schema/tender-guideline.schema";
import type { z } from "zod";

export type MUTATE_TENDER_GUIDELINE = z.infer<typeof tenderGuidelineSchema>;

export interface TENDER_GUIDELINE extends MUTATE_TENDER_GUIDELINE {
  id?: number;
  description?: string;
  createdDate?: string;
}
