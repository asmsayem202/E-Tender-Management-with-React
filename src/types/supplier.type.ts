import type { supplierSchema } from "@/schema/supplier.schema";
import type { z } from "zod";

export type MUTATE_SUPPLIER = z.infer<typeof supplierSchema>;

export interface SUPPLIER extends MUTATE_SUPPLIER {
  id?: number;
  approvalStatus?: string;
  approvedBy?: number;
  approvalDate?: string;
  purchasedDate?: string;
}
