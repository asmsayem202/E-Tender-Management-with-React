import { z } from "zod";

export const unitSchema = z.object({
  name: z.string().min(1, {
    message: "This is required",
  }),
  description: z.string().optional(),
});
