import { z } from "zod";

export const unitSchema = z.object({
  name: z.string().min(3),
  description: z.string().optional(),
});
