import { z } from "zod";

export const supplierWarningSchema = z.object({
  remarks: z.string().min(1, "Remarks are required"),
  supplierId: z.string().min(1, "Supplier ID is required"),
  warningId: z.string().min(1, "Warning ID is required"),
});
