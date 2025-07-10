import { z } from "zod";

export const itemSchema = z.object({
  categoryId: z.string().min(1, {
    message: "This is required",
  }),
  unitId: z.string().min(1, {
    message: "This is required",
  }),
  name: z.string().min(1, {
    message: "This is required",
  }),
  description: z.string().optional(),
});
