import { z } from "zod";

export const cantonmentSchema = z.object({
  name: z.string().min(1, {
    message: "This is required",
  }),
});
