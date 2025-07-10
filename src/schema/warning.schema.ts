import { z } from "zod";

export const warningSchema = z.object({
  name: z.string().min(1, {
    message: "This is required",
  }),
});
