import { z } from "zod";

export const permissionSchema = z.object({
  name: z.string().min(1, {
    message: "This is required",
  }),
  moduleName: z.string().optional(),
  submoduleName: z.string().optional(),
  action: z.string().optional(),
});
