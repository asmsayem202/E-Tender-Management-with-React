import { z } from "zod";

export const userSchema = z.object({
  fullName: z.string().min(1, {
    message: "This is required",
  }),
  userName: z.string().min(1, {
    message: "This is required",
  }),
  email: z.string().email("Invalid Email"),
  phoneNumber: z.string().min(10).max(15),
  departmentId: z.string(),
  password: z.string().optional(),
  ssdOrBsd: z.string().optional(),
  bsdId: z.string().optional().nullable(),
  ssdId: z.string().optional().nullable(),
  roleIds: z.array(z.number()).optional(),
});

export const assignRoleSchema = z.object({
  roleIds: z.array(z.number()),
});
