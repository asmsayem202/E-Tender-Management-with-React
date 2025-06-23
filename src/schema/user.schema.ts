import { z } from "zod";

export const userSchema = z
  .object({
    fullName: z.string().min(3),
    userName: z.string().min(3),
    email: z.string().email("Invalid Email"),
    phoneNumber: z.string().min(10).max(15),
    departmentId: z.string(),
    password: z.string().optional(),
    type: z.enum(["bsdId", "ssdId"], {
      required_error: "BSD/SSD is required",
    }),
    bsdId: z.string().optional(),
    ssdId: z.string().optional(),
    roleIds: z.array(z.string()).optional(),
  })
  .superRefine((data, ctx) => {
    if (data.type === "bsdId" && (!data.bsdId || data.bsdId.trim() === "")) {
      ctx.addIssue({
        path: ["bsdId"],
        code: z.ZodIssueCode.custom,
        message: "BSD is required",
      });
    }

    if (data.type === "ssdId" && (!data.ssdId || data.ssdId.trim() === "")) {
      ctx.addIssue({
        path: ["ssdId"],
        code: z.ZodIssueCode.custom,
        message: "SSD is required",
      });
    }
  });
