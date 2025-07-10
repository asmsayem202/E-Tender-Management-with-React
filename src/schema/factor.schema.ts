import { z } from "zod";

export const factorSchema = z.object({
  name: z.string().min(1, {
    message: "This is required",
  }),
  percentageRate: z.string().min(1, {
    message: "This is required",
  }),
  description: z.string().optional(),
});
