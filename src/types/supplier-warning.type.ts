import type { supplierWarningSchema } from "@/schema/supplier-warning.schema";
import type { z } from "zod";

export type MUTATE_SUPPLIER_WARNING = z.infer<typeof supplierWarningSchema>;

export interface SUPPLIER_WARNING extends MUTATE_SUPPLIER_WARNING {
  id?: number;
  supplierName?: string;
  warningType?: string;
  issuedOn?: string;
}
