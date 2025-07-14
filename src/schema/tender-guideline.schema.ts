import { z } from "zod";

export const tenderGuidelineSchema = z.object({
  name: z.string().min(1, {
    message: "This is required",
  }),
  formatStructure: z.string().min(1, {
    message: "This is required",
  }),
});
