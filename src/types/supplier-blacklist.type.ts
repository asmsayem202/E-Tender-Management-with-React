import type { supplierBlacklistSchema } from "@/schema/supplier-blacklist.schema";
import type { z } from "zod";

export type MUTATE_SUPPLIER_BLACKLIST = z.infer<typeof supplierBlacklistSchema>;

export interface SUPPLIER_BLACKLIST extends MUTATE_SUPPLIER_BLACKLIST {
  id?: number;
  supplierName?: string;
  requesterName?: string;
  requestDate?: string;
  approvedBy?: number;
  approverName?: string;
  approvalDate?: string;
  status?: string;
}
