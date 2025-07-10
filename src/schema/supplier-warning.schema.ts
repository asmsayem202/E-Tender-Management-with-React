import { z } from "zod";

export const supplierWarningSchema = z.object({
  remarks: z.string().min(1, {
    message: "This is required",
  }),
  supplierId: z.string().min(1, {
    message: "This is required",
  }),
  warningId: z.string().min(1, {
    message: "This is required",
  }),
});
