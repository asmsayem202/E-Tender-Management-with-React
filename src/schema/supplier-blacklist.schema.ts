import { z } from "zod";

export const supplierBlacklistSchema = z.object({
  supplierId: z.string().min(1, {
    message: "This is required",
  }),
  requestedBy: z.string(),
  blacklistRemarks: z.string().min(1, {
    message: "This is required",
  }),
});
