import { z } from "zod";

export const itemSchema = z.object({
  categoryId: z.string().min(1, "Category is required"),
  unitId: z.string().min(1, "Unit is required"),
  name: z.string().min(3),
  description: z.string().optional(),
});
