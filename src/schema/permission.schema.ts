import { z } from "zod";

export const permissionSchema = z.object({
  name: z.string().min(3),
  moduleName: z.string().optional(),
  submoduleName: z.string().optional(),
  action: z.string().optional(),
});
