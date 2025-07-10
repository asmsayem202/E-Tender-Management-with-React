import { z } from "zod";

export const parentCategorySchema = z.object({
  name: z.string().min(1, {
    message: "This is required",
  }),
});
