import { z } from "zod";

export const bsdSchema = z.object({
  name: z.string().min(3),
  district: z.string().min(5),
  upozilla: z.string().min(5),
  isActive: z.boolean().optional(),
  cantonmentId: z.string().min(1, {
    message: "Cantonment is required",
  }),
});
