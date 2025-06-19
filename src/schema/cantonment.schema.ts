import { z } from "zod";

export const cantonmentSchema = z.object({
  name: z.string().min(3),
});
