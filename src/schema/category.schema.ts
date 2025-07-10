import { z } from "zod";

export const categorySchema = z.object({
  name: z.string().min(1, {
    message: "This is required",
  }),
  parentCategoryId: z.string().min(1, {
    message: "This is required",
  }),
});
