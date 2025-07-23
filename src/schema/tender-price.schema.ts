import { z } from "zod";

export const tenderPriceSchema = z.object({
  name: z.string().min(1, {
    message: "This is required",
  }),
  unitPrice: z.string().min(1, {
    message: "This is required",
  }),
});
