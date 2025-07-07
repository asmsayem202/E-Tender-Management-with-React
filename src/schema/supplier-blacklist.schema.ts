import { z } from "zod";

export const supplierBlacklistSchema = z.object({
  supplierId: z.string().min(1, "Supplier ID is required"),
  requestedBy: z.string(),
  blacklistRemarks: z.string().min(1, "Blacklist Remarks are required"),
});
