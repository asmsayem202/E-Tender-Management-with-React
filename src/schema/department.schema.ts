import { z } from "zod";

export const departmentSchema = z.object({
  name: z.string().min(1, {
    message: "This is required",
  }),
});
