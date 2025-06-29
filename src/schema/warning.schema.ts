import { z } from "zod";

export const warningSchema = z.object({
  name: z.string().min(3),
});
