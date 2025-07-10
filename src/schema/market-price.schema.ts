import { z } from "zod";

export const marketPriceSchema = z.object({
  itemId: z.string().min(1, {
    message: "This is required",
  }),
  marketId: z.string().min(1, {
    message: "This is required",
  }),
  marketPrice: z.string().min(1, {
    message: "This is required",
  }),
});
