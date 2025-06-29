import { z } from "zod";

export const roleSchema = z.object({
  roleIds: z.array(z.number()),
});
