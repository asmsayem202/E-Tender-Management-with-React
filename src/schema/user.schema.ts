import { z } from "zod";

export const userSchema = z.object({
  fullName: z.string().min(3),
  userName: z.string().min(3),
  email: z.string().email("Invalid Email"),
  phoneNumber: z.string().min(10).max(15),
  departmentId: z.string(),
  password: z.string().optional(),
  ssdOrBsd: z.string().optional(),
  bsdId: z.string().optional(),
  ssdId: z.string().optional(),
  roleIds: z.array(z.string()).optional(),
});
