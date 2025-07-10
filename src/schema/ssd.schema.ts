import { z } from "zod";

export const ssdSchema = z.object({
  name: z.string().min(1, {
    message: "This is required",
  }),
  district: z.string().min(1, {
    message: "This is required",
  }),
  upozilla: z.string().min(1, {
    message: "This is required",
  }),
  isActive: z.boolean().optional(),
  cantonmentId: z.string().min(1, {
    message: "This is required",
  }),
});
