import { z } from "zod";

export const marketSchema = z.object({
  name: z.string().min(1, {
    message: "This is required",
  }),
});
