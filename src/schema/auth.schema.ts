import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email().min(1),
  password: z.string().min(1),
});

export const forgotpassSchema = z.object({
  email: z.string().email(),
});

export const resetPassSchema = z
  .object({
    token: z.string(),
    email: z.string().email(),
    password: z.string().min(8, {
      message: "The password field must be at least 8 characters.",
    }),
    password_confirmation: z.string().min(8, {
      message: "The password field must be at least 8 characters.",
    }),
  })
  .refine((data) => data.password === data.password_confirmation, {
    message: "Passwords must match.",
    path: ["password_confirmation"], // This will attach the error to the confirm password field
  });
